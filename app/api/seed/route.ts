import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import { invoices, customers, revenue, users } from '../../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function dropTables() {
  try {
    console.log('Dropping existing tables...');
    await sql`DROP TABLE IF EXISTS invoices CASCADE`;
    await sql`DROP TABLE IF EXISTS customers CASCADE`;
    await sql`DROP TABLE IF EXISTS users CASCADE`;
    await sql`DROP TABLE IF EXISTS revenue CASCADE`;
    console.log('Tables dropped successfully');
  } catch (error) {
    console.error('Error dropping tables:', error);
    throw error;
  }
}

async function seedUsers() {
  try {
    console.log('Creating users table...');
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'admin'
      );
    `;

    console.log('Inserting users...');
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return sql`
          INSERT INTO users (id, name, email, password, role)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, 'admin')
          ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );

    console.log('Users seeded successfully');
    return insertedUsers;
  } catch (error) {
    console.error('Error in seedUsers:', error);
    throw error;
  }
}

async function seedInvoices() {
  try {
    console.log('Creating invoices table...');
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await sql`
      CREATE TABLE IF NOT EXISTS invoices (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        customer_id UUID NOT NULL,
        amount INT NOT NULL,
        status VARCHAR(255) NOT NULL,
        date DATE NOT NULL
      );
    `;

    console.log('Inserting invoices...');
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => sql`
          INSERT INTO invoices (customer_id, amount, status, date)
          VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );

    console.log('Invoices seeded successfully');
    return insertedInvoices;
  } catch (error) {
    console.error('Error in seedInvoices:', error);
    throw error;
  }
}

async function seedCustomers() {
  try {
    console.log('Creating customers table...');
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        image_url VARCHAR(255) NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'customer'
      );
    `;

    console.log('Inserting customers...');
    const insertedCustomers = await Promise.all(
      customers.map(async (customer) => {
        const hashedPassword = await bcrypt.hash(customer.password, 10);
        return sql`
          INSERT INTO customers (id, name, email, image_url, password, role)
          VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url}, ${hashedPassword}, 'customer')
          ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );

    console.log('Customers seeded successfully');
    return insertedCustomers;
  } catch (error) {
    console.error('Error in seedCustomers:', error);
    throw error;
  }
}

async function seedRevenue() {
  try {
    console.log('Creating revenue table...');
    await sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

    console.log('Inserting revenue data...');
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => sql`
          INSERT INTO revenue (month, revenue)
          VALUES (${rev.month}, ${rev.revenue})
          ON CONFLICT (month) DO NOTHING;
        `,
      ),
    );

    console.log('Revenue seeded successfully');
    return insertedRevenue;
  } catch (error) {
    console.error('Error in seedRevenue:', error);
    throw error;
  }
}

export async function GET() {
  try {
    console.log('Starting database seeding...');
    
    await sql.begin(async (transaction) => {
      await dropTables();
      
      console.log('Seeding users...');
      await seedUsers();
      
      console.log('Seeding customers...');
      await seedCustomers();
      
      console.log('Seeding invoices...');
      await seedInvoices();
      
      console.log('Seeding revenue...');
      await seedRevenue();
    });

    console.log('Database seeding completed successfully');
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('Error seeding database:', {
      message: errorMessage,
      stack: errorStack,
      error
    });
    return Response.json({ 
      error: 'Error seeding database',
      details: errorMessage,
      stack: errorStack
    }, { status: 500 });
  }
} 