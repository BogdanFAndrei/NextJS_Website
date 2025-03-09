'use server';

import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import { invoices, customers, revenue, users } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function dropTables() {
  try {
    await sql`DROP TABLE IF EXISTS revenue`;
    await sql`DROP TABLE IF EXISTS invoices`;
    await sql`DROP TABLE IF EXISTS customers`;
    await sql`DROP TABLE IF EXISTS users`;
    console.log('Tables dropped successfully');
  } catch (error) {
    console.error('Error dropping tables:', error);
    throw error;
  }
}

async function seedUsers() {
  try {
    console.log('Seeding users...');
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
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedCustomers() {
  try {
    console.log('Seeding customers...');
    console.log('Creating customers table...');
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        image_url TEXT,
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
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedInvoices() {
  try {
    console.log('Seeding invoices...');
    console.log('Creating invoices table...');
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
      CREATE TABLE IF NOT EXISTS invoices (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        customer_id UUID NOT NULL,
        amount INT NOT NULL,
        status VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        FOREIGN KEY (customer_id) REFERENCES customers(id)
      );
    `;

    console.log('Inserting invoices...');
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => sql`
          INSERT INTO invoices (customer_id, amount, status, date)
          VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
          ON CONFLICT DO NOTHING;
        `,
      ),
    );

    console.log('Invoices seeded successfully');
    return insertedInvoices;
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedRevenue() {
  try {
    console.log('Seeding revenue...');
    console.log('Creating revenue table...');
    await sql`CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );`;

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
    console.error('Error seeding revenue:', error);
    throw error;
  }
}

export async function GET() {
  try {
    await dropTables();
    await seedUsers();
    await seedCustomers();
    await seedInvoices();
    await seedRevenue();
    return new Response('Database seeded successfully', { status: 200 });
  } catch (error) {
    console.error('Error seeding database:', error);
    return new Response('Error seeding database', { status: 500 });
  }
}
