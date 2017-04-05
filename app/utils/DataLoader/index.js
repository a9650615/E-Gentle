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
  /**
   * Hentai API 取得詳細資料
   * @param {Array} gallaryList [[gid, token],...] DON'T OVER 25
   * @return {Array} {gmetadata}
   * FIXME: 檢查更新成 array list foreach 輸入是否有錯誤
   */
  getGalleryData(gallaryList) {
    return new Promise((resolve, reject) => {
      ApiFetcher.getGalleryData(gallaryList)
      .then((res) => {
        let datas = res.data.gmetadata;
        datas.forEach((data, i) => {
          let tags = {};
          data.tags.forEach((tag, i) => {
            let arr = tag.split(':');
            if (!tags[arr[0]]) tags[arr[0]] = [];
            tags[arr[0]].push(arr[1]);
          });
          datas[i].tags = tags;
        });
        resolve(datas)
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
