// Chapter 14: Form Validation and Error Handling in Next.js
// This file implements server-side form validation using Zod and proper error handling
// Features:
// - Custom error messages for form fields
// - Validation for required fields and data types
// - Proper error state management with useFormState
// - Database error handling with user-friendly messages

'use server';
 
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import sql from './db';
import { sql as vercelSql } from '@vercel/postgres';

// Form validation schemas
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer name.',
    required_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    required_error: 'Please select an invoice status.',
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

const UpdateCustomer = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

const UpdatePassword = z.object({
  id: z.string(),
  currentPassword: z.string().min(6, "Current password is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Define the shape of validation errors
export type State = {
  errors?: {
    [key: string]: string[] | undefined;
  };
  message: string;
};

// Create a new invoice with error handling
export async function createInvoice(prevState: State, formData: FormData) {
  try {
    const validatedFields = CreateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    const { customerId, amount, status } = validatedFields;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
 
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        errors: error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
      };
    }
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// Update an existing invoice with error handling
export async function updateInvoice(id: string, prevState: State, formData: FormData) {
  try {
    const validatedFields = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    const { customerId, amount, status } = validatedFields;
    const amountInCents = amount * 100;

    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        errors: error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Invoice.',
      };
    }
    return {
      message: 'Database Error: Failed to Update Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// Delete an invoice with error handling
export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Invoice.',
    };
  }
  
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

/**
 * Handles user sign out with proper redirection
 */
export async function signOutAction() {
  'use server';
  try {
    await signOut({ 
      redirectTo: '/'
    });
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

export type CustomerState = {
  errors?: {
    name?: string[];
    email?: string[];
  };
  message?: string | null;
};

export async function createCustomer(prevState: CustomerState, formData: FormData) {
  try {
    const validationSchema = z.object({
      name: z.string().min(1, 'Please enter a customer name'),
      email: z.string().email('Please enter a valid email address'),
    });

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
    };

    const validatedFields = validationSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Customer.',
      };
    }

    const { name, email } = validatedFields.data;
    const image_url = '/customers/evil-rabbit.png'; // Default evil rabbit image
    const defaultPassword = '123456';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    await sql`
      INSERT INTO customers (name, email, image_url, password, role)
      VALUES (${name}, ${email}, ${image_url}, ${hashedPassword}, 'customer')
    `;

    revalidatePath('/dashboard/customers');
    redirect('/dashboard/customers');
  } catch (error) {
    console.error('Error creating customer:', error);
    return {
      message: error instanceof Error ? error.message : 'Database Error: Failed to Create Customer.',
    };
  }
}

export async function updateCustomerProfile(id: string, formData: FormData) {
  const validatedFields = UpdateCustomer.safeParse({
    id,
    name: formData.get('name'),
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update profile.',
    };
  }

  const { name, email } = validatedFields.data;

  try {
    await vercelSql`
      UPDATE customers
      SET name = ${name}, email = ${email}
      WHERE id = ${id}
    `;

    // Also update the users table to keep email in sync
    await vercelSql`
      UPDATE users
      SET name = ${name}, email = ${email}
      WHERE email = ${email}
    `;

    revalidatePath('/customers/profile');
    return { message: 'Profile updated successfully.' };
  } catch (error) {
    return {
      message: 'Database Error: Failed to update profile.',
    };
  }
}

export async function updateCustomerPassword(id: string, formData: FormData) {
  const validatedFields = UpdatePassword.safeParse({
    id,
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please check your password inputs.',
    };
  }

  const { currentPassword, newPassword } = validatedFields.data;

  try {
    // First verify the current password
    const user = await sql`
      SELECT password FROM customers WHERE id = ${id}
    `;

    if (!user.rows[0]) {
      return {
        message: 'User not found.',
      };
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.rows[0].password);
    if (!passwordMatch) {
      return {
        message: 'Current password is incorrect.',
      };
    }

    // Check if new password is same as current password
    if (currentPassword === newPassword) {
      return {
        message: 'New password must be different from your current password.',
      };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update both customers and users tables
    await sql`
      UPDATE customers
      SET password = ${hashedPassword}
      WHERE id = ${id}
    `;

    await sql`
      UPDATE users
      SET password = ${hashedPassword}
      WHERE email = (SELECT email FROM customers WHERE id = ${id})
    `;

    return { message: 'Password updated successfully.' };
  } catch (error) {
    console.error('Error updating password:', error);
    return {
      message: 'Database Error: Failed to update password.',
    };
  }
}

