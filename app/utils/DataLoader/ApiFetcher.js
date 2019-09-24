import axios from 'axios';

const EH_FRONTPAGE = 'https://e-hentai.org';
const EX_FRONTPAGE = 'https://exhentai.org';
const EH_API = 'https://e-hentai.org/';
const EX_API = 'https://exhentai.org/';
export const API_HOST = EH_API;
export const API_URL = `${API_HOST}api.php`;

class DataLoader {
  constructor() {
    this.API_URL = API_URL;
    this.FRONTPAGE_URL = EH_FRONTPAGE;
    this.CONFIG = {};
  }

  getGalleryList(page = 0) {
    return axios({
      method: 'GET',
      url: `${this.FRONTPAGE_URL}`,
      params: {
        page
      },
      ...this.CONFIG
    });
  }
  /**
   * Hentai API 取得詳細資料
   * @param {Array} gallaryList [gid, token]
   */
  getGalleryData(gallaryList) {
    return axios({
      method: 'POST',
      url: `${this.API_URL}`,
      headers: {
        'Content-type': 'text/json',
        Accept: 'application/jsonrequest'
      },
      data: {
        method: 'gdata',
        gidlist: [
          gallaryList
        ],
        namespace: 1
      }
    });
  }

  getGalleryDetail(id, token = '') {
    return axios({
      method: 'GET',
      url: `${this.FRONTPAGE_URL}/g/${id}/${token}/`,
      ...this.CONFIG
    });
  }

}

export default new DataLoader();
