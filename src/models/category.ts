import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import storage, {load} from '@/config/storage';
import axios from 'axios';
import {RootState} from '.';

const CATEGORY_URL = 'mock/11/category';

export interface CategoryProps {
  id: string;
  name: string;
  classify?: string;
}

interface CategoryModelState {
  isEdit: boolean;
  myCategories: CategoryProps[];
  categories: CategoryProps[];
}

interface CategoryModel extends Model {
  namespace: 'category';
  state: CategoryModelState;
  effects: {
    loadData: Effect;
    toggle: Effect;
  };
  reducers: {
    setState: Reducer<CategoryModelState>;
  };
  subscriptions: SubscriptionsMapObject;
}

const initialState = {
  isEdit: false,
  myCategories: [{id: 'home', name: 'home'}],
  categories: [],
};

const categoryModel: CategoryModel = {
  namespace: 'category',
  state: initialState,
  effects: {
    *loadData(_, {call, put}) {
      const myCategories = yield call(load, {key: 'myCategories'});
      const categories = yield call(load, {key: 'categories'});
      if (myCategories) {
        yield put({
          type: 'setState',
          payload: {
            myCategories,
            categories,
          },
        });
      } else {
        yield put({
          type: 'setState',
          payload: {
            categories,
          },
        });
      }
    },
    *toggle({payload}, {put, select}) {
      const category = yield select(({category}: RootState) => category);
      yield put({
        type: 'setState',
        payload: {
          isEdit: !category.isEdit,
          myCategories: payload.myCategories,
        },
      });
      if (category.isEdit) {
        storage.save({
          key: 'myCategories',
          data: payload.myCategories,
        });
      }
    },
  },
  reducers: {
    setState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    setup({dispatch}) {
      dispatch({type: 'loadData'});
    },
    asyncStorage() {
      storage.sync.categories = async () => {
        const data = await axios.get(CATEGORY_URL);
        return data.data;
      };
      storage.sync.myCategories = async () => {
        return null;
      };
    },
  },
};

export default categoryModel;
