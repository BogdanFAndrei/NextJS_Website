// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
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
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'cc27c14a-0acf-4f4a-a6c9-d45682c144b9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: '13d07535-c59e-4157-a011-f8d2ef4e0cbb',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'a7d41c76-d9f9-4b7e-b17f-1234567890aa',
    name: 'Sophie Anderson',
    email: 'sophie@anderson.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'b8e52d87-e0f0-4c8f-928f-1234567890bb',
    name: 'Marcus Chen',
    email: 'marcus@chen.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'c9f63e98-f1f1-4d9f-839f-1234567890cc',
    name: 'Isabella Martinez',
    email: 'isabella@martinez.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'd0f74f09-f2f2-4e0f-940f-1234567890dd',
    name: 'Lucas Thompson',
    email: 'lucas@thompson.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'e1f85f10-f3f3-4f1f-a51f-1234567890ee',
    name: 'Emma Wilson',
    email: 'emma@wilson.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'f2f96f21-f4f4-4f2f-b62f-1234567890ff',
    name: 'Oliver Brown',
    email: 'oliver@brown.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'f3f07f32-f5f5-4f3f-c73f-123456789011',
    name: 'Sophia Garcia',
    email: 'sophia@garcia.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'f4f18f43-f6f6-4f4f-d84f-123456789022',
    name: 'William Davis',
    email: 'william@davis.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'f5f29f54-f7f7-4f5f-e95f-123456789033',
    name: 'Ava Johnson',
    email: 'ava@johnson.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'f6f30f65-f8f8-4f6f-f06f-123456789044',
    name: 'James Miller',
    email: 'james@miller.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'f7f41f76-f9f9-4f7f-f17f-123456789055',
    name: 'Mia Taylor',
    email: 'mia@taylor.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'f8f52f87-f0f0-4f8f-f28f-123456789066',
    name: 'Ethan White',
    email: 'ethan@white.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'f9f63f98-f1f1-4f9f-f39f-123456789077',
    name: 'Charlotte Lee',
    email: 'charlotte@lee.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'faf74f09-f2f2-4faf-f40f-123456789088',
    name: 'Alexander Wright',
    email: 'alexander@wright.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'fbf85f10-f3f3-4fbf-f51f-123456789099',
    name: 'Olivia Scott',
    email: 'olivia@scott.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'fcf96f21-f4f4-4fcf-f62f-1234567890aa',
    name: 'Daniel King',
    email: 'daniel@king.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'fdf07f32-f5f5-4fdf-f73f-1234567890bb',
    name: 'Zoe Baker',
    email: 'zoe@baker.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'fef18f43-f6f6-4fef-f84f-1234567890cc',
    name: 'Henry Adams',
    email: 'henry@adams.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'fff29f54-f7f7-4fff-f95f-1234567890dd',
    name: 'Victoria Clark',
    email: 'victoria@clark.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'f0f30f65-f8f8-4f0f-f06f-1234567890ee',
    name: 'Benjamin Hall',
    email: 'benjamin@hall.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'a1a41a76-a0a0-4a1a-a17a-1234567890ff',
    name: 'Rachel Green',
    email: 'rachel@green.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'b2b52b87-b1b1-4b2b-b28b-123456789011',
    name: 'David Zhang',
    email: 'david@zhang.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'c3c63c98-c2c2-4c3c-c39c-123456789022',
    name: 'Sarah Johnson',
    email: 'sarah@johnson.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'd4d74d09-d3d3-4d4d-d40d-123456789033',
    name: 'Michael Smith',
    email: 'michael@smith.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'e5e85e10-e4e4-4e5e-e51e-123456789044',
    name: 'Emily Brown',
    email: 'emily@brown.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'f6f96f21-f5f5-4f6f-f62f-123456789055',
    name: 'Christopher Lee',
    email: 'chris@lee.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'a7a07a32-a6a6-4a7a-a73a-123456789066',
    name: 'Jessica Wilson',
    email: 'jessica@wilson.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'b8b18b43-b7b7-4b8b-b84b-123456789077',
    name: 'Andrew Taylor',
    email: 'andrew@taylor.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'c9c29c54-c8c8-4c9c-c95c-123456789088',
    name: 'Lauren Martinez',
    email: 'lauren@martinez.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'd0d30d65-d9d9-4d0d-d06d-123456789099',
    name: 'Kevin Anderson',
    email: 'kevin@anderson.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'e1e41e76-e0e0-4e1e-e17e-1234567890aa',
    name: 'Michelle Thomas',
    email: 'michelle@thomas.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'f2f52f87-f1f1-4f2f-f28f-1234567890bb',
    name: 'Ryan Garcia',
    email: 'ryan@garcia.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'a3a63a98-a2a2-4a3a-a39a-1234567890cc',
    name: 'Amanda White',
    email: 'amanda@white.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'b4b74b09-b3b3-4b4b-b40b-1234567890dd',
    name: 'Brandon Clark',
    email: 'brandon@clark.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'c5c85c10-c4c4-4c5c-c51c-1234567890ee',
    name: 'Stephanie Rodriguez',
    email: 'stephanie@rodriguez.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'd6d96d21-d5d5-4d6d-d62d-1234567890ff',
    name: 'Patrick Moore',
    email: 'patrick@moore.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'e7e07e32-e6e6-4e7e-e73e-123456789011',
    name: 'Nicole Turner',
    email: 'nicole@turner.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'f8f18f43-f7f7-4f8f-f84f-123456789022',
    name: 'Gregory Phillips',
    email: 'gregory@phillips.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: 'a9a29a54-a8a8-4a9a-a95a-123456789033',
    name: 'Samantha Cooper',
    email: 'samantha@cooper.com',
    image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[2].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[0].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
  {
    customer_id: customers[6].id,
    amount: 12500,
    status: 'pending',
    date: '2024-03-01',
  },
  {
    customer_id: customers[7].id,
    amount: 18750,
    status: 'paid',
    date: '2024-03-02',
  },
  {
    customer_id: customers[8].id,
    amount: 9999,
    status: 'pending',
    date: '2024-03-03',
  },
  {
    customer_id: customers[9].id,
    amount: 15000,
    status: 'paid',
    date: '2024-03-04',
  },
  {
    customer_id: customers[10].id,
    amount: 22500,
    status: 'pending',
    date: '2024-03-05',
  },
  {
    customer_id: customers[11].id,
    amount: 7500,
    status: 'paid',
    date: '2024-03-06',
  },
  {
    customer_id: customers[12].id,
    amount: 13750,
    status: 'pending',
    date: '2024-03-07',
  },
  {
    customer_id: customers[13].id,
    amount: 28900,
    status: 'paid',
    date: '2024-03-08',
  },
  {
    customer_id: customers[14].id,
    amount: 16800,
    status: 'pending',
    date: '2024-03-09',
  },
  {
    customer_id: customers[15].id,
    amount: 11250,
    status: 'paid',
    date: '2024-03-10',
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

export { users, customers, invoices, revenue };
