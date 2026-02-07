import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'love-fortune',
  web: {
    host: '0.0.0.0',
    port: 3013,
    commands: {
      dev: 'rsbuild dev --host',
      build: 'rsbuild build',
    },
  },
  permissions: [],
  outdir: 'dist',
  brand: {
    displayName: '연애 뭐래',
    icon: 'https://raw.githubusercontent.com/jino123413/app-logos/master/love-fortune.png',
    primaryColor: '#E91E63',
    bridgeColorMode: 'inverted',
  },
  webViewProps: {
    type: 'partner',
  },
});
