import ApiFetcher from './ApiFetcher';
import HtmlParser from './HtmlParser';

class DataLoader {
  getGalleryList(page = 0) {
    return new Promise((resolve, reject) => {
      ApiFetcher.getGalleryList(page)
      .then((res) => {
        let data = HtmlParser.galleryList(res.data);
        resolve(data)
      })
      .catch(reject)
    })
  }

  getGalleryData(id = 0, token = '') {
    return new Promise((resolve, reject) => {
      ApiFetcher.getGalleryData(id, token)
      .then((res) => {
        let data = res.data.gmetadata[0], tags = {};
        data.tags.forEach((data, i) => {
          let arr = data.split(':');
          if (!tags[arr[0]]) tags[arr[0]] = [];
          tags[arr[0]].push(arr[1]);
        });
        data.tags = tags;
        resolve(data)
      })
      .catch(reject)
    })
  }

  getGalleryDetail(id = 0, token = '') {
    return new Promise((resolve, reject) => {
      ApiFetcher.getGalleryDetail(id, token)
        .then((res) => {
          let data = HtmlParser.galleryDetail(res.data);
          resolve(data)
        })
        .catch(reject)
    })
  }
}

export default new DataLoader;