import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import FetchModule from '../module/FetchModule';

class PreLoader extends Component {
  constructor(props) {
    super(props);
    this.image = [];
    this.state = {
      imageCache: [],
      loading: false,
      show: 0
    };
  }

  componentWillMount() {
    if (!this.state.loading) {
      this.catchData();  
    }
  }

  _controlImageMount() {
    let imageStyle = this.props.children.props.style;
    let cache = [];
    let imageCache;
    // 判斷單張圖切換
    if (this.props.showOne) {
      this.imageCache.forEach((ele, i) => {
        imageCache = ele;
        cache[i] = Object.assign(imageCache,{
          imgElement: React.cloneElement(this.props.children, 
            { key: i, 
              preload: true, 
              show:(i === this.state.show)? true: false, 
              style: imageStyle, 
              ref: (data) => {this.image[i] = data}
            }
          )
        });
      });
    
      this.setState({imageCache: cache});
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.show !== this.props.show) {
      this.setState({show: nextProps.show}, this._controlImageMount.bind(this));
    };
    if (nextProps.urls.length !== this.props.urls.length) {
      this.props = nextProps;
      this.catchData();
    } else {
      for (let i in nextProps.urls) { //是否一致判斷
        if (nextProps.urls[i] !== this.props.urls[i]) { //找到不一致點
          this.props = nextProps;
          this.catchData();
          break;
        };
      };
    }
  }
  //預先處理資料與 render
  catchData(func) {
    let cache = [];
    let imageStyle = this.props.children.props.style;
    
    this.props.urls.forEach((url, i) => {
       cache[i] = Object.assign(
          { finish: 0, loadPercent: 0, url: '', index: i,
            imgElement: React.cloneElement(this.props.children, {key: i, preload: true, style: imageStyle, ref: (data) => {this.image[i] = data}})
          },
          {url: url}
        );
    });
  
    this.setState({imageCache: cache}, this.resolvePreload.bind(this));
  }


  *imageLoader() {
    // for (let i in this.state.imageCache) {
    //   yield this.state.imageCache[i];
    // }
    yield* this.state.imageCache;
  }

  onLoad(e) {
    //console.log(e);
  }

  onError(e) {
    console.log(e);
  }
  
  callLoader(loader) {
    let temp = false;
    let tempValue = {};
    temp = loader.next();
    tempValue = temp.value;
    if (tempValue && this.state.loading && tempValue.finish === 0) { //檢查此圖片是否已載入
      if (this.image[tempValue.index]) {
        this.image[tempValue.index].callLoader(tempValue)
        .then((e) => {
          this.onLoad(e);
          temp.value.finish = 1;
          if (!temp.done)
            setTimeout(this.callLoader.bind(this, loader), 1000);
          else this.state.loading = false;
        })
        .catch((e) => {
          this.onError(e);
          temp.value.finish = 2;
          if (!temp.done)
            setTimeout(this.callLoader.bind(this, loader), 200);
          else this.state.loading = false;
        });
      }
    }
  }

  resolvePreload() {
    if (this.props.urls.length>0) {
      this.state.loading = true;
      let loader = this.imageLoader();
      this.callLoader(loader);
      this._controlImageMount();// image controll
    }
  }

  render() {
    return (
      <div>
        {
          this.state.imageCache.map((val, i) => {
            return val.imgElement;
          })
        }
      </div>
    );
  }
}

class Img extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finish: 0, 
      loadPercent: 0, 
      url: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
  }

  onSuccess(e, tempValue, resolve) {
    this.setState({finish: 1, url: tempValue.url});
    resolve.call(e);
  }

  onError(e, tempValue, resolve) {
    this.setState({finish: 2});
    resolve.call(e);
  }

  callLoader(tempValue) {
    return new Promise((resolve, reject) => {
      if (this.props.withPercent){
        new FetchModule()
          .setMethod('GET')
          .setUrl(tempValue.url)
          .getProgress((e) => {
            tempValue.loadPercent = (e.loaded/e.total) * 100;
            this.setState(tempValue);
          })
          .send()
          .then((e) => this.onSuccess.call(this, e, tempValue, resolve))
          .catch((e) => this.onError.call(this, e, tempValue, resolve));
      } else {
        let image = new Image();
        // images has loaded
        image.addEventListener('load', (e) => this.onSuccess.call(this, e, tempValue, resolve), false);
        // image failed to load
        image.addEventListener('error', (e) => this.onError.call(this, e, tempValue, resolve), false);
        // image.onabort = this.onError;
        // image.onerror = this.onError;
        // set src
        image.src = this.props.src;
      }
    });
  }

  render() {    
    let style = {
      width: '100%'
    };

    let loaderStyle = {
      height: 150,
      width: 150,
      margin: 'auto'
    };
    return (
      <div style={Object.assign({position: 'relative', background: '#e0e0e0', display: (this.props.show === false)?'none':'block'}, this.props.style)}>
        {
          (!this.state.finish && this.props.preload) &&
          <div style={loaderStyle}>
            <CircularProgress
              mode="determinate"
              value={this.state.loadPercent}
              size={150}
              thickness={5}
            />
          </div>
        }
        <img
          className={this.props.className || ''}
          style={style}
          src={((this.state.finish === 1)?this.state.url:this.props.src)}
          alt=""
        />
      </div>
    );
  }
}

export {Img as default, PreLoader};
