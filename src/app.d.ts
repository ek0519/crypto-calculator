// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    interface Platform {
      env: Env;
      cf: CfProperties;
      ctx: ExecutionContext;
    }
    interface Locals {
      user: {
        id: string;
        name: string;
        email: string;
      } | null;
      accessToken: string | null;
    }
  }
}

export {};
