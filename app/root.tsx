import styles from './tailwind.css';
import { json, type LinksFunction, type LoaderFunction } from '@remix-run/cloudflare';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import DetectLanguage from './components/detect-lang';
import Layout from './components/layout';
import { ThemeProvider } from './components/use-theme';
import { defaultLightTheme } from './themes';
import { useI18n } from 'remix-i18n';
import { themeCookie } from './cookie.server';
import { removeTrailingSlash } from './utils/trailing-slash';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/ico' },
  { rel: 'icon', href: '/favicon.png', type: 'image/png' },
  { rel: 'manifest', href: '/manifest.json' }
];

export const meta: MetaFunction = () => {
  return [
    { charSet: 'utf-8' },
    { name: 'viewport', content: 'width=device-width,initial-scale=1' },
    { title: 'Willin Wang' },
    { name: 'description', content: 'To be Willin is to be willing. ' },
    {
      name: 'keywords',
      content: ['v0', '长岛冰泪', 'JavaScript', 'Remix', 'Willin Wang'].join(', ')
    },
    { name: 'author', content: 'Willin Wang' },
    { name: 'apple-touch-fullscreen', content: 'yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'theme-color', content: '#FF8E05' }
  ];
};

export const loader: LoaderFunction = async ({ request, context, params }) => {
  removeTrailingSlash(new URL(request.url));

  const theme = (await themeCookie.parse(request.headers.get('Cookie'))) || defaultLightTheme;

  const user = await context.services.auth.authenticator.isAuthenticated(request);
  const meta = await context.services.content.getMeta();
  return json({ theme, user, meta });
};

export default function App() {
  const { theme } = useLoaderData<typeof loader>();
  const i18n = useI18n();

  return (
    <ThemeProvider specifiedTheme={theme}>
      <html lang={i18n.locale()} data-theme={theme}>
        <head>
          <Meta />
          <Links />
        </head>
        <body>
          <Layout>
            <Outlet />
          </Layout>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
          <DetectLanguage />
        </body>
      </html>
    </ThemeProvider>
  );
}
