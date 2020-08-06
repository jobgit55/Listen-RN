import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';

const LOGIN_URL = 'mock/11/login';

export interface UserProps {
  name: string;
  avatar: string;
}

export interface UserModelState {
  user?: UserProps;
}

export interface UserModel extends Model {
  namespace: 'user';
  state: UserModelState;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    setState: Reducer<UserModelState>;
  };
}

const initialState = {
  user: undefined,
};

const userModel: UserModel = {
  namespace: 'user',
  state: initialState,
  reducers: {
    setState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *login({payload}, {call, put}) {
      const {data, status, msg} = yield call(axios.post, LOGIN_URL, payload);
      if (status === 100) {
        yield put({
          type: 'setState',
          payload: {
            user: data,
          },
        });
      } else {
        console.log(msg);
      }
    },
    *logout(_, {put}) {
      yield put({
        type: 'setState',
        payload: {
          user: undefined,
        },
      });
    },
  },
};

export default userModel;
