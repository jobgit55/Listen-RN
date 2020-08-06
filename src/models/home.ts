import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import {RootState} from '@/models/index';

const CAROUSEL_URL = 'mock/11/carousel';
const RECOMMEND_URL = 'mock/11/recommend';
const CHANNEL_URL = 'mock/11/channel';

export interface CarouselProps {
  id: string;
  image: string;
  colors: [string, string];
}

export interface RecommendProps {
  id: string;
  title: string;
  image: string;
}

export interface ChannelProps {
  id: string;
  title: string;
  image: string;
  remark: string;
  played: number;
  playing: number;
}

export interface PageProps {
  current: number;
  total: number;
  hasMore: boolean;
}

export interface HomeState {
  carousels: CarouselProps[];
  activeCarouselIndex: number;
  gradientVisible: boolean;
  recommends: RecommendProps[];
  channels: ChannelProps[];
  pagination: PageProps;
}

interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  reducers: {
    setState: Reducer<HomeState>;
  };
  effects: {
    fetchCarousels: Effect;
    fetchRecommends: Effect;
    fetchChannels: Effect;
  };
}

const initialState: HomeState = {
  carousels: [],
  activeCarouselIndex: 0,
  gradientVisible: true,
  recommends: [],
  channels: [],
  pagination: {
    current: 1,
    total: 0,
    hasMore: true,
  },
};

const homeModel: HomeModel = {
  namespace: 'home',
  state: initialState,
  reducers: {
    setState(state = initialState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *fetchCarousels(_, {call, put}) {
      const {data} = yield call(axios.get, CAROUSEL_URL);
      yield put({
        type: 'setState',
        payload: {
          carousels: data,
        },
      });
    },
    *fetchRecommends(_, {call, put}) {
      const {data} = yield call(axios.get, RECOMMEND_URL);
      yield put({
        type: 'setState',
        payload: {
          recommends: data,
        },
      });
    },
    *fetchChannels({callback, payload}, {call, put, select}) {
      const {channels, pagination} = yield select(
        (state: RootState) => state.home,
      );
      let page = 1;
      if (payload && payload.loadMore) {
        page = pagination.current + 1;
      }
      const {data} = yield call(axios.get, CHANNEL_URL, {
        params: {
          page,
        },
      });
      let newChannels = data.results;
      if (payload && payload.loadMore) {
        newChannels = channels.concat(newChannels);
      }
      yield put({
        type: 'setState',
        payload: {
          channels: newChannels,
          pagination: {
            current: data.pagination.current,
            total: data.pagination.total,
            hasMore: newChannels.length < data.pagination.total,
          },
        },
      });
      if (typeof callback === 'function') {
        callback();
      }
    },
  },
};

export default homeModel;
