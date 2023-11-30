import E404 from '~/components/atom/404';

export async function loader() {
  throw new Response('Not found', { status: 404 });
}

export default function NotFound() {
  // due to the loader, this component will never be rendered, but we'll return
  // the error boundary just in case.
  return <ErrorBoundary />;
}

export function ErrorBoundary() {
  return <E404 />;
}
