export type Env = 'development' | 'test' | 'sandbox' | 'production';
export interface UploadFiles {
  actionEum: {
    development: string;
    test: string;
    sandbox: string;
    production: string;
  };
  getAction(env: Env): string;
  getAccessToken({
    http,
    url,
    bizType,
  }: {
    http: any;
    url: string;
    bizType?: string;
  }): Promise<AccessToken>;
  getEnvs({ http }: { http: any }): Promise<Envs>;
}

export interface AccessToken {
  ctToken: string;
  storeType: number;
  expiredTimeMills: string;
  ak?: string;
  bucketName?: string;
  contentHost?: string | null;
  dir?: string;
  obsHost?: string;
  sk?: string;
  st?: string;
}

export interface Envs {
  env_content: { [key: string]: string };
}

export const envPrefix = 'obs.domain.';
