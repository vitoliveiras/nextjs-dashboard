'use server'; // mark all the exported function within the file as Server Actions

// validation library
import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'prefer' });

// expected types from the database
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce.
            number() // coerce (change) from a string to a number
            .gt(0, { message: 'Please enter an amount greater that $0.' })
            ,
    status: z.enum(['pending', 'paid'],
        {
            invalid_type_error: 'Please select an invoice status.'
        }
    ),
    date: z.string(),
});

// validate based to FormSchema omiting the fields id and date
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
}

export async function createInvoice(prevState: State, formData: FormData) {
    // validate the types using Zod
    const validatedFields = CreateInvoice.safeParse({
        // get by the username property of the component
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    // if form validation fails, return errors early. Otherwise, continue
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.'
        };
    }

    // get the data after successful validation
    const { customerId, amount, status } = validatedFields.data;
    // storage amount in cents
    const amountInCents = amount * 100;
    // get the current date
    const date = new Date().toISOString().split('T')[0];

    try {
        // insert data into the database
        await sql`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
    } catch (error) {
        // if a database error occurs, return a more specific error
        return {
            message: 'DatabaseError: Failed to Create Invoice'
        };
    }

    // revalidate path, and fetch fresh data from the server 
    revalidatePath('/dashboard/invoices');
    // redirect to invoices
    redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, prevState: State, formData: FormData) {
    const validatedFields = UpdateInvoice.safeParse({
        // get by the username property of the component
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        // form validation fails: return error
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Invoice'
        }
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;

    try {
        await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Update Invoice'
        };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    await sql`DELETE FROM invoices
    WHERE id = ${id}`;
    
    revalidatePath('/dashboard/invoices');
}