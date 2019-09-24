import CheerIo from 'cheerio';
import {
  API_HOST
} from './ApiFetcher';

class HtmlParser {
  galleryList(parseData) {
    let $ = CheerIo.load(parseData), data = [];
    $('.gltc tr:not(:first-child)').each((i,e) => {
      let gallaryData = {}, rank = 0, t = CheerIo.load(e), gl2c = t('.gl2c>div').eq(2).find('div');
      // e-hentai 會有廣告導致空白問題
      if (t('td.gl1c>div').html() == null) {
        return;
      }
      gallaryData = {};
      gallaryData.type = t('td.gl1c>div').text();
      gallaryData.publish = gl2c.eq(0).text();
      // console.log(t('.gl2c>.glthumb').html())
      gallaryData.img = t('.gl2c>.glthumb>div').eq(0).find('img').attr('src');
      // //console.log(e);
      if (i !== 0) {
        gallaryData.img = t('.gl2c>.glthumb>div').eq(0).find('img').attr('data-src');
      }
      gallaryData.title = t('.gl3c>a>.glink').text();
      gallaryData.href = t('.gl3c>a').attr('href');
      // data[i].data = data[i].href.replace(`${API_HOST}g/`, '').split('/').splice(0, 2);
      gallaryData.torrent = gl2c.eq(2).find('a').attr('href') || null;

      if (gl2c.eq(1).length > 0) {
        gallaryData.rank = gl2c.eq(1).css('background-position');
        gallaryData.rank = gallaryData.rank.match(/[+\-]?\d*px/g);
        if (gallaryData.rank[1] === '-21px') {
          rank -= 0.5;
        }
        rank += 5 + (parseInt(gallaryData.rank[0])/16);
        gallaryData.rank = rank;
      }
      gallaryData.uploader = {
        href: t('.gl4c div').eq(0).find('a').attr('href'),
        name: t('.gl4c div').eq(0).find('a').text()
      };

      data.push(gallaryData);
    });
    return data;
  }

  galleryDetail(parseData) {
    let $ = CheerIo.load(parseData), data = Object(), type;
    //data.img = $('#gleft>#gd1>img').attr('src');
    //data.title = $('#gd2>#gn').text();
    //data.rank = $('#rating_label').text().replace('Average: ','')
    data.rank_times = $('#rating_count').text()
    //data.type = $('#gdc>a>img').attr('alt');
    // 第一章圖片
    // $('.gdtm a').first().each(function(i,e){
    //   data.start = $(this).attr('href');
    // });
    data.information = Object();
    $('#gdd tr').each(function( i, e){
      type = $(this).find('.gdt1').text().replace(':','').replace(' ','_').toLowerCase();
      if(type=='parent'){
        data.information[type] = {};
        data.information[type].text = $(this).find('.gdt2').text();
        data.information[type].href = $(this).find('.gdt2 a').attr('href');
      }
      else
        data.information[type] = $(this).find('.gdt2').text();
    });
    //標籤列表
    // data.tags = {};
    // $.find('#taglist tr').each( ( i, e) => {
    //   let tags = $(e).find('td');
    //   tags.each( ( i, e) => {
    //     /*if(i == 0){
    //       data.tags[$(e).html()] = [];
    //     }*/
    //     if(i == 1){
    //       $(e).find('div').each( ( i, e) => {
    //         let cut = $(e).attr('id').replace('td_','').split(':');
    //         if(!data.tags[ cut[0] ]) data.tags[ cut[0] ] = [];
    //         data.tags[ cut[0] ].push(cut[1]);
    //       })
    //     }
    //   })
    // })
    //圖片列表
    /*this.html.find('#gdt').children('.gdtm').each(function( i, e){
      let link = $(this).find('div a').attr('href');
      console.log(link)
    });*/

    //console.log($('#favoritelink').text());

    //exhentai 有bug 無效
    //data.isfavorite = this.html.find('#favoritelink').text().indexOf('Add to Favorites')==-1? true: false;

    data.comment = {};
    /*取得用戶留言*/
    $('div.c1').each(function( i,e){
      let t;
      data.comment[i] = {};
      t = CheerIo.load(e);
      data.comment[i].User = t('.c3>a').text();
      data.comment[i].log  = t('.c3').text();
      data.comment[i].isupl = t('.c4').text()=='Uploader Comment'?true:false;
      data.comment[i].msg   = t('.c6').html();
    });
    console.log(data)
    return data;
  }
}

export default new HtmlParser();
