import CheerIo from 'cheerio';

class HtmlParser {
  galleryList(parseData) {
    let $ = CheerIo.load(parseData), data = [];
    $('tr.gtr0,tr.gtr1').each(function(i,e) {
      //console.log(e);
      let rank = 0, t = CheerIo.load(this), itdEq1 = t('td.itd').eq(1);
      data[i] = {};
      data[i].type= t('td.itdc>a>img').attr('alt');
      data[i].publish = t('td.itd').first().text();
      data[i].img = itdEq1.find('div>div.it2>img').attr('src');
      if(i !== 0){
        data[i].img = itdEq1.find('div>div.it2').text().split('~');
        data[i].img = 'http://'+data[i].img[1]+'/'+data[i].img[2];
      }
      data[i].title = itdEq1.find('div>div.it5>a').text();
      data[i].href = itdEq1.find('div>div.it5>a').attr('href');
      data[i].torrent = itdEq1.find('>div>div.it3>div>a').attr('href');
      data[i].rank = itdEq1.find('div>div.it4>div.it4r').css('background-position');
      data[i].rank = data[i].rank.match(/[+\-]?\d*px/g);
      if (data[i].rank[1]=='-21px') {
        rank -= 0.5;
      }
      rank+= 5 + (parseInt(data[i].rank[0])/16);
      data[i].rank = rank;
      data[i].uploader={
        href : t('td.itu>div>a').attr('href'),
        name : t('td.itu>div>a').text()
      }; 
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