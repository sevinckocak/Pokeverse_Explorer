import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...(config as ExpoConfig),
  extra: {
    ...config.extra,
    API_URL: process.env.API_URL,
    APP_NAME: process.env.APP_NAME,
    APP_VERSION: process.env.APP_VERSION,
  },
});
