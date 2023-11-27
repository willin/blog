import { z } from 'zod';

export let EnvSchema = z.object({
  // BASE_URL: z.string().min(1).url(),
  CF_PAGES: z
    .literal('1')
    .optional()
    .transform(Boolean)
    .transform((isCFPages) => {
      if (isCFPages) return 'production';
      return 'development';
    }),
  COOKIE_SESSION_SECRET: z.string().min(1).optional().default('s3cret'),
  GITHUB_TOKEN: z.string(),
  GITHUB_REF: z.string().optional().default('main'),
  GITHUB_OWNER: z.string().optional().default('willin'),
  GITHUB_REPO: z.string(),
  SSO_ID: z.string().min(1),
  SSO_SECRET: z.string().min(1)
});

export type Env = z.infer<typeof EnvSchema>;
