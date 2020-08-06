import {Model, Effect} from 'dva-core-ts';
import axios from 'axios';

const EXPLORE_URL = 'mock/11/explore/list';

export interface ExploreProps {
  id: string;
  title: string;
  videoUrl: string;
}

interface ExploreModel extends Model {
  namespace: 'explore';
  effects: {
    fetchList: Effect;
  };
}

const exploreModel: ExploreModel = {
  namespace: 'explore',
  state: {},
  effects: {
    *fetchList({callback}, {call}) {
      const {data} = yield call(axios.get, EXPLORE_URL);
      if (typeof callback === 'function') {
        callback(data);
      }
    },
  },
};

export default exploreModel;
