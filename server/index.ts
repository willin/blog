import { logDevReady } from '@remix-run/cloudflare';
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';
import * as build from '@remix-run/dev/server-build';
import { EnvSchema } from './env';
import { KVProvider } from './provider/kv.cache';
import { CacheService } from './services/cache';
import { D1Provider } from './provider/d1.db';
import { DatabaseService } from './services/database';
import { AuthService } from './services/auth';
import { ViewService } from './services/views';
import { ContentService } from './services/content';
import { InvoiceService } from './services/invoice';

if (process.env.NODE_ENV === 'development') {
  logDevReady(build);
}

export const onRequest = createPagesFunctionHandler({
  build,
  getLoadContext: async (ctx) => {
    const env = EnvSchema.parse(ctx.env);
    const url = new URL(ctx.request.url);
    // Init Providers
    const cacheProvider = new KVProvider(ctx.env.CACHE);
    const dbProvider = new D1Provider(ctx.env.DB);
    // Init Services
    const cache = new CacheService(cacheProvider);
    const db = new DatabaseService(dbProvider);
    // Inject Main Services
    const auth = new AuthService(env, url);
    const content = new ContentService(env, url, cache);
    const view = new ViewService(env, db);
    const invoice = new InvoiceService(env, db, cache);
    const services: RemixServer.Services = {
      auth,
      content,
      invoice,
      view
    };
    return { env, services };
  },
  mode: build.mode
});
