import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { sql } from '@vercel/postgres';

export async function fetchRevenue() {
  try {
    console.log('Fetching revenue data...');
    
    const data = await sql<Revenue>`SELECT * FROM revenue`;
    
    console.log('Data fetch completed');
    
    return data.rows || [];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = (data.rows || []).map((invoice: LatestInvoiceRaw) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const [invoiceCount, customerCount, invoiceStatus] = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(invoiceCount.rows[0]?.count ?? '0');
    const numberOfCustomers = Number(customerCount.rows[0]?.count ?? '0');
    const totalPaidInvoices = formatCurrency(invoiceStatus.rows[0]?.paid ?? '0');
    const totalPendingInvoices = formatCurrency(invoiceStatus.rows[0]?.pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const { auth } = await import('@/auth');
    const session = await auth();
    
    // Base query
    let baseQuery = `
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE 1=1
    `;

    const params: any[] = [];
    let paramIndex = 1;

    // Add customer filter for customer portal
    if (session?.user?.role === 'customer') {
      baseQuery += ` AND customers.email = $${paramIndex}`;
      params.push(session.user.email);
      paramIndex++;
    }

    // Add search filters
    if (query) {
      baseQuery += ` AND (
        customers.name ILIKE $${paramIndex} OR
        customers.email ILIKE $${paramIndex} OR
        invoices.amount::text ILIKE $${paramIndex} OR
        invoices.date::text ILIKE $${paramIndex} OR
        invoices.status ILIKE $${paramIndex}
      )`;
      params.push(`%${query}%`);
      paramIndex++;
    }

    // Add ORDER BY and LIMIT
    baseQuery += ` ORDER BY invoices.date DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(ITEMS_PER_PAGE, offset);

    const data = await sql.query<InvoicesTable>(baseQuery, params);
    return data.rows || [];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const { auth } = await import('@/auth');
    const session = await auth();
    
    // Base query
    let baseQuery = `
      SELECT COUNT(*)
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE 1=1
    `;

    const params: any[] = [];
    let paramIndex = 1;

    // Add customer filter for customer portal
    if (session?.user?.role === 'customer') {
      baseQuery += ` AND customers.email = $${paramIndex}`;
      params.push(session.user.email);
      paramIndex++;
    }

    // Add search filters
    if (query) {
      baseQuery += ` AND (
        customers.name ILIKE $${paramIndex} OR
        customers.email ILIKE $${paramIndex} OR
        invoices.amount::text ILIKE $${paramIndex} OR
        invoices.date::text ILIKE $${paramIndex} OR
        invoices.status ILIKE $${paramIndex}
      )`;
      params.push(`%${query}%`);
    }

    const data = await sql.query(baseQuery, params);
    const totalPages = Math.ceil(Number(data.rows[0]?.count || 0) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice: InvoiceForm) => ({
      ...invoice,
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    return data.rows || [];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const { auth } = await import('@/auth');
    const session = await auth();
    
    if (!session?.user?.email) {
      return [];
    }

    const data = await sql<CustomersTableType>`
      SELECT
        customers.id,
        customers.name,
        customers.email,
        customers.image_url,
        COUNT(invoices.id) AS total_invoices,
        SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
        SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
      FROM customers
      LEFT JOIN invoices ON customers.id = invoices.customer_id
      WHERE 
        customers.email = ${session.user.email}
        ${query ? sql`AND (
          customers.name ILIKE ${`%${query}%`} OR
          customers.email ILIKE ${`%${query}%`}
        )` : sql``}
      GROUP BY customers.id, customers.name, customers.email, customers.image_url
    `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending || 0),
      total_paid: formatCurrency(customer.total_paid || 0),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    return [];
  }
}

export async function fetchAllCustomers(query: string = '', sortBy: string = 'name-asc') {
  try {
    // Base query without ORDER BY
    const baseQuery = `
      SELECT
        customers.id,
        customers.name,
        customers.email,
        customers.image_url,
        COUNT(invoices.id) AS total_invoices,
        SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
        SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
      FROM customers
      LEFT JOIN invoices ON customers.id = invoices.customer_id
      WHERE
        customers.name ILIKE $1 OR
        customers.email ILIKE $1
      GROUP BY customers.id, customers.name, customers.email, customers.image_url
    `;

    // Add ORDER BY clause based on sortBy parameter
    let orderByClause = '';
    switch (sortBy) {
      case 'name-desc':
        orderByClause = 'ORDER BY customers.name DESC';
        break;
      case 'pending-high':
        orderByClause = 'ORDER BY total_pending DESC';
        break;
      case 'pending-low':
        orderByClause = 'ORDER BY total_pending ASC';
        break;
      case 'invoices-high':
        orderByClause = 'ORDER BY total_invoices DESC';
        break;
      case 'invoices-low':
        orderByClause = 'ORDER BY total_invoices ASC';
        break;
      case 'paid-high':
        orderByClause = 'ORDER BY total_paid DESC';
        break;
      case 'paid-low':
        orderByClause = 'ORDER BY total_paid ASC';
        break;
      default: // 'name-asc'
        orderByClause = 'ORDER BY customers.name ASC';
    }

    const data = await sql.query<CustomersTableType>(
      baseQuery + ' ' + orderByClause,
      [`%${query}%`]
    );

    const customers = data.rows.map((customer: CustomersTableType) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer data.');
  }
}
