import type { Env } from './env';
import type { IAuthService } from './services/auth';
import type { IContentService } from './services/content';
import type { IInvoiceService } from './services/invoice';
import type { IViewsService } from './services/views';

declare global {
  namespace RemixServer {
    export interface Services {
      auth: IAuthService;
      content: IContentService;
      invoice: IInvoiceService;
      view: IViewsService;
    }
    export { Env };
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
