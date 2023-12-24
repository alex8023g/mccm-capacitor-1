import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'mcrm-capacitor-1',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
