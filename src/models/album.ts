import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';

const ALBUM_URL = 'mock/11/album/list';

export interface ProgramProps {
  id: string;
  title: string;
  playVolume: number;
  duration: string;
  date: string;
}

interface AlbumAuthorProps {
  name: string;
  avatar: string;
}

export interface AlbumModelState {
  id: string;
  title: string;
  summary: string;
  thumbnailUrl: string;
  introduction: string;
  author: AlbumAuthorProps;
  list: ProgramProps[];
}

export interface AlbumModel extends Model {
  namespace: 'album';
  state: AlbumModelState;
  effects: {
    fetchAlbum: Effect;
  };
  reducers: {
    setState: Reducer<AlbumModelState>;
  };
}

const initialState: AlbumModelState = {
  id: '',
  thumbnailUrl: '',
  title: '',
  summary: '',
  list: [],
  introduction: '',
  author: {
    name: '',
    avatar: '',
  },
};

const albumModel: AlbumModel = {
  namespace: 'album',
  state: initialState,
  effects: {
    *fetchAlbum({payload}, {call, put}) {
      const {data} = yield call(axios.get, ALBUM_URL);
      yield put({
        type: 'setState',
        payload: data,
      });
    },
  },
  reducers: {
    setState(state = initialState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default albumModel