紳士抓圖器 exhentai網站瀏覽器 v2
===================
此程式是基於 
[electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate)
開發, 將專案 clone 下來, 並將此專案放進 app 資料夾內 ( 不包含 E-Gentle 資料夾 )

然後到達 `electron-react-boilerplate` 開發環境的 `webpack.config.base.js` 把 `externals: Object.keys(externals || {})` 
註解 

( 因為如果弄成外部載入 專案底下的 react-tap-event-plugin 讀取 react 會有問題 , 
參考 [build-react-with-tap-event](https://github.com/swenyang/build-react-with-tap-event) )


----------

環境準備 (electron-react-boilerplate)
----

```
npm i
```
接著進入 app 資料夾內, 也執行以上指令

開發方法
====
在最外層環境同時執行以下兩條指令
```
$ npm run hot-server
$ npm run start-hot
```
或者
```
$ npm run dev
```


----------

開發工具
======

 1. Electron 程式主框架
 2. React
 