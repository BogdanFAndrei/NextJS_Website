import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test database connection by fetching users
    const users = await sql`SELECT * FROM users`;
    const customers = await sql`SELECT * FROM customers`;
    const invoices = await sql`SELECT * FROM invoices`;
    const revenue = await sql`SELECT * FROM revenue`;

    return NextResponse.json({
      message: 'Database connection successful',
      data: {
        userCount: users.rows.length,
        customerCount: customers.rows.length,
        invoiceCount: invoices.rows.length,
        revenueCount: revenue.rows.length
      }
    });
  } catch (error: any) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Database connection failed', details: error.message },
      { status: 500 }
    );
  }
} 