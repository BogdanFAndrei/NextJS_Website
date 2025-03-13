const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Acme Corp',
    email: 'acme@corp.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Monsters Inc',
    email: 'monsters@inc.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Stark Industries',
    email: 'tony@stark.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: '3958dc9e-762f-4377-85e9-fec4b6a6442a',
    name: 'Wayne Enterprises',
    email: 'bruce@wayne.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: '3958dc9e-772f-4377-85e9-fec4b6a6442a',
    name: 'Cyberdyne Systems',
    email: 'info@cyberdyne.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: '3958dc9e-782f-4377-85e9-fec4b6a6442a',
    name: 'Oscorp Industries',
    email: 'norman@oscorp.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: '3958dc9e-792f-4377-85e9-fec4b6a6442a',
    name: 'Umbrella Corporation',
    email: 'info@umbrella.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: '3958dc9e-802f-4377-85e9-fec4b6a6442a',
    name: 'Los Pollos Hermanos',
    email: 'gus@pollos.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: '3958dc9e-812f-4377-85e9-fec4b6a6442a',
    name: 'Dunder Mifflin',
    email: 'michael@dm.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: '3958dc9e-822f-4377-85e9-fec4b6a6442a',
    name: 'Hooli',
    email: 'gavin@hooli.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: '3958dc9e-832f-4377-85e9-fec4b6a6442a',
    name: 'Pied Piper',
    email: 'richard@piedpiper.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: '3958dc9e-842f-4377-85e9-fec4b6a6442a',
    name: 'InGen',
    email: 'john@ingen.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  }
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2024-03-01',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2024-03-02',
  },
  {
    customer_id: customers[0].id,
    amount: 10999,
    status: 'paid',
    date: '2024-03-03',
  },
  {
    customer_id: customers[1].id,
    amount: 5000,
    status: 'paid',
    date: '2024-03-04',
  },
  // Additional invoices for new customers
  {
    customer_id: customers[2].id,
    amount: 75000,
    status: 'pending',
    date: '2024-03-05',
  },
  {
    customer_id: customers[3].id,
    amount: 125000,
    status: 'paid',
    date: '2024-03-06',
  },
  {
    customer_id: customers[4].id,
    amount: 32000,
    status: 'pending',
    date: '2024-03-07',
  },
  {
    customer_id: customers[5].id,
    amount: 45000,
    status: 'paid',
    date: '2024-03-08',
  },
  {
    customer_id: customers[6].id,
    amount: 28500,
    status: 'pending',
    date: '2024-03-09',
  },
  {
    customer_id: customers[7].id,
    amount: 15000,
    status: 'paid',
    date: '2024-03-10',
  },
  {
    customer_id: customers[8].id,
    amount: 8500,
    status: 'pending',
    date: '2024-03-11',
  },
  {
    customer_id: customers[9].id,
    amount: 92000,
    status: 'paid',
    date: '2024-03-12',
  },
  {
    customer_id: customers[10].id,
    amount: 12500,
    status: 'pending',
    date: '2024-03-13',
  },
  {
    customer_id: customers[11].id,
    amount: 185000,
    status: 'paid',
    date: '2024-03-14',
  }
];

module.exports = {
  users,
  customers,
  revenue,
  invoices,
}; 