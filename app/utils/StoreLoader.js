import Datastore from 'nedb';

let db = {};
db.programSetting = new Datastore({ filename: 'data/program.config', autoload: true });

export class ProgramConfig {
  set() {

	}

	get() {
		
	}
}


export default () => db;
