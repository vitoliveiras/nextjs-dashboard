'use server'; // mark all the exported function within the file as Server Actions

export async function createInvoice(formData: FormData) {
    const rawFormData = {
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    };

    console.log(rawFormData);
}