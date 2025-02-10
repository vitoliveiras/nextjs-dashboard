import bcrypt from 'bcrypt';
import { invoices, customers, revenue, users } from '../lib/placeholder-data';
import { prisma } from '../lib/prisma';
import { User } from '@prisma/client';

async function seedUsers() {
  // hash users password
  const hashPassword = async (user: User) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return { ...user, password: hashedPassword };
  }

  const processUsers = async (usersList: User[]) => {
    const hashedUsers = await Promise.all(usersList.map(hashPassword));
    return hashedUsers;
  }

  processUsers(users).then(async (hashedUsers) => {
    const insertedUsers = await prisma.user.createMany({
      data: hashedUsers,
      skipDuplicates: true, // skip duplicated registers
    });

    return insertedUsers;
  });
}

async function seedInvoices() {
  // convert date to format expected by prisma (DateTime)
  const convertedInvoices = invoices.map((invoice) => {
    const [year, month, day] = invoice.date.split('-');
    return {... invoice, date: `${year}-${month}-${day}T00:00:00.000Z` }
  });

  const insertedInvoices = await prisma.invoice.createMany({
    data: convertedInvoices,
    skipDuplicates: true,
  });

  return insertedInvoices;
}

async function seedCustomers() {
  const insertedCustomers = await prisma.customer.createMany({
    data: customers,
    skipDuplicates: true
  })

  return insertedCustomers;
}

async function seedRevenue() {
  const insertedRevenue = await prisma.revenue.createMany({
    data: revenue,
    skipDuplicates: true
  });

  return insertedRevenue;
}

export async function GET() {
  try {
    await Promise.all([
      seedUsers(),
      seedCustomers(),
      seedInvoices(),
      seedRevenue(),
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}