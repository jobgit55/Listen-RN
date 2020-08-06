import Realm from 'realm';

export interface ProgramRealm {
  id: string;
  title: string;
  thumbnailUrl: string;
  currentTime: number;
  duration: number;
  rate: number;
}

class Program {
  currentTime = 0;
  duration = 0;
  
  static schema = {
    name: 'Program',
    primaryKey: 'id',
    properties: {
      id: 'string',
      title: 'string',
      thumbnailUrl: 'string',
      currentTime: {type: 'double', default: 0},
      duration: {type: 'double', default: 0},
    },
  };
  get rate() {
    return this.duration > 0
      ? Math.floor(((this.currentTime * 100) / this.duration) * 100) / 100
      : 0;
  }
}

const realm = new Realm({schema: [Program]});

export function saveProgram(data: Partial<ProgramRealm>) {
  try {
    realm.write(() => {
      realm.create('Program', data, true);
    });
  } catch (error) {
    console.log('failed to save');
  }
}

export default realm;
