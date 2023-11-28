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
import { GithubProvider } from './provider/github';
import { ContentService } from './services/content';

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
    const githubProvider = new GithubProvider(ctx.env);
    // Init Services
    const cache = new CacheService(cacheProvider);
    const db = new DatabaseService(dbProvider);
    // Inject Main Services
    const auth = new AuthService(env, url);
    const view = new ViewService(env, db);
    const content = new ContentService(env, cache, githubProvider);
    const services: RemixServer.Services = {
      auth,
      view,
      content
    };
    return { env, services };
  },
  mode: build.mode
});
