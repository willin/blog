import { json, type ActionFunction, type LoaderFunction, redirect } from '@remix-run/cloudflare';

export const loader: LoaderFunction = async () => {
  return redirect('/');
};

export const action: ActionFunction = async ({ context, request, params }) => {
  const invoices = await context.services.invoice.getInvoices();
  return json(invoices);
};
