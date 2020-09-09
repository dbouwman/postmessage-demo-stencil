import { readFileSync } from 'fs';
import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      // serviceWorker: null,
      baseUrl: 'http://site-org.fakehub.fakegis.com',
    },
  ],
  devServer: {
    // initialLoadUrl: 'http://site-org.fakehub.fakegis.com',
    reloadStrategy: 'pageReload',
    port: 4444,
    openBrowser: false, // don't open at localhost
    // https: {
    //   cert: readFileSync('ssl/cert.pem', 'utf8'),
    //   key: readFileSync('ssl/key.pem', 'utf8')
    // }
  }
};
