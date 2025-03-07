// Chapter 14: Form Validation and Error Handling in Next.js
// This file implements server-side form validation using Zod and proper error handling
// Features:
// - Custom error messages for form fields
// - Validation for required fields and data types
// - Proper error state management with useFormState
// - Database error handling with user-friendly messages

'use server';
 
import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

// Database connection
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

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

// Define the shape of validation errors
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
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

