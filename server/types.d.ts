import type { Env } from './env';
import type { IAuthService } from './services/auth';
import type { IViewsService } from './services/views';

declare global {
  namespace RemixServer {
    export interface Services {
      auth: IAuthService;
      view: IViewsService;
    }
  }

  type Paginated<T> = {
    data: T[];
    total: number;
    page: number;
    size: number;
  };
}

declare module '@remix-run/cloudflare' {
  interface AppLoadContext {
    env: Env;
    services: RemixServer.Services;
  }
}
