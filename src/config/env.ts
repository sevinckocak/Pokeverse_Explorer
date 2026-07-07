import Constants from 'expo-constants';

type AppExtra = {
  API_URL: string;
  APP_NAME: string;
  APP_VERSION: string;
};

const extra = Constants.expoConfig?.extra as Partial<AppExtra> | undefined;

function requireEnvVar<K extends keyof AppExtra>(key: K): AppExtra[K] {
  const value = extra?.[key];
  if (!value) {
    throw new Error(
      `Missing environment variable "${key}". Check your .env file and app.config.ts.`
    );
  }
  return value as AppExtra[K];
}

export const ENV: AppExtra = {
  API_URL: requireEnvVar('API_URL'),
  APP_NAME: requireEnvVar('APP_NAME'),
  APP_VERSION: requireEnvVar('APP_VERSION'),
};
