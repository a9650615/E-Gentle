import axios from 'axios';

const EH_FRONTPAGE = 'https://e-hentai.org';
const EX_FRONTPAGE = 'https://exhentai.org';
const EH_API = 'https://e-hentai.org/api.php';
const EX_API = 'https://exhentai.org/api.php';

class DataLoader {
  constructor() {
    this.API_URL = EH_API;
    this.FRONTPAGE_URL = EH_FRONTPAGE;
    this.CONFIG = {};
  }

  getGalleryList(page = 0) {
    return axios({
      method: 'GET',
      url: `${this.FRONTPAGE_URL}`,
      params: {
        page: page
      },
      ...this.CONFIG
    })
  }

  getGalleryData(id, token = '') {
    return axios({
      method: 'POST',
      url: `${this.API_URL}`,
      headers:{
        'Content-type': 'text/json',
        'Accept': 'application/jsonrequest'
      },
      data: {
        'method': 'gdata',
        'gidlist': [
            [id, token]
        ],
        'namespace': 1
      }
    })
  }

  getGalleryDetail(id, token = '') {
    return axios({
      method: 'GET',
      url: `${this.FRONTPAGE_URL}/g/${id}/${token}/`,
      ...this.CONFIG
    });
  }
  
}

export default new DataLoader;
