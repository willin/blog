import styles from './tailwind.css';
import { json, redirect, type LinksFunction, type LoaderFunction } from '@remix-run/cloudflare';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import DetectLanguage from './components/detect-lang';
import Layout from './components/layout';
import { ThemeProvider } from './components/use-theme';
import { defaultLightTheme } from './themes';
import { useI18n } from 'remix-i18n';
import { themeCookie } from './cookie.server';
import { i18nConfig } from './i18n';
import { removeTrailingSlash } from './utils/trailing-slash';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/ico' },
  { rel: 'icon', href: '/favicon.png', type: 'image/png' }
];

export const meta: MetaFunction = () => {
  return [
    { title: 'Willin Wang' },
    { name: 'description', content: 'To be Willin is to be willing. ' },
    {
      name: 'keywords',
      content: ['v0', '长岛冰泪', 'JavaScript', 'Remix', 'Willin Wang'].join(', ')
    },
    { name: 'author', content: 'Willin Wang' }
  ];
};

export const loader: LoaderFunction = async ({ request, context, params }) => {
  if (params.lang && !i18nConfig.supportedLanguages.includes(params.lang)) {
    return redirect('/');
  }
  removeTrailingSlash(new URL(request.url));

  const theme = (await themeCookie.parse(request.headers.get('Cookie'))) || defaultLightTheme;

  const user = await context.services.auth.authenticator.isAuthenticated(request);
  return json({ theme, user });
};

export default function App() {
  const { theme } = useLoaderData<typeof loader>();
  const i18n = useI18n();

  return (
    <ThemeProvider specifiedTheme={theme}>
      <html lang={i18n.locale()} data-theme={theme}>
        <head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width,initial-scale=1' />
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
