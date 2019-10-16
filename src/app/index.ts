import { createHook } from 'overmind-react';
import { state } from './state';
import { onInitialize } from './onInitialize';
import * as actions from './actions';
import * as effects from './effects';
import { IConfig } from 'overmind';
import { createOvermind } from 'overmind';

export const config = {
  onInitialize,
  state,
  actions,
  effects,
};

export let useApp;
export let app;

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

if (module.hot) {
  module.hot.dispose(data => {
    data.app = app;
    data.useApp = useApp;
  });

  if (!module.hot.data) {
    useApp = createHook<typeof config>();
    app = createOvermind(config, {
      devtools: false,
    });
  } else {
    app = module.hot.data.app;
    useApp = module.hot.data.useApp;
  }
}
