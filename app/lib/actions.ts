'use server'; // mark all the exported function within the file as Server Actions

// validation library
import { z } from 'zod';

// expected types from the database
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(), // coerce (change) from a string to a number
    status: z.enum(['pending', 'paid']),
    date: z.string(),
});

// validate based to FormSchema omiting the fields id and date
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
    // validate the types
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    // storage amount in cents
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    console.log(customerId);
    console.log(amountInCents);
    console.log(status);
    console.log(date);
}