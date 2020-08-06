import {create, Model} from 'dva-core-ts';
import createLoading from 'dva-loading-ts';
import models from '@/models/index';
import modelExtend from 'dva-model-extend';
import homeModel from '@/models/home';

interface Cached {
  [key: string]: boolean;
}

const cached: Cached = {
  home: true,
};

const app = create();
models.forEach((model) => {
  app.model(model);
});
app.use(createLoading());
app.start();

function registerModel(model: Model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = true;
  }
}

export function createHomeModel(namespace: string) {
  const model = modelExtend(homeModel, {namespace});
  registerModel(model);
}

export default app._store;
