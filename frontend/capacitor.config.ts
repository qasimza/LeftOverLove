import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.leftovelove.app',
  appName: 'leftover-love',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
