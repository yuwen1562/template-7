$(document).ready(function () {
  const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
  document.getElementById('currentTime').innerHTML = currentTime;

  alertInfo();
  alertHeight();
  caseQuantity();
  mapHeight();
  vedioPointBtn();
  moreInfoBtn();
  moreInfoHeight();
  carDetail();
  mapWH()
});

//監聽視窗改變
$(window).resize(function () {
  alertHeight();
  mapHeight();
  moreInfoHeight();
  mapWH()
});

//警報信息動態添加
function alertInfo() {
  for (let i = 0; i < alertInfoData.length; i++) {
    const newRecord = $('.alertRecord')
      .eq(0)
      .clone()
      .removeClass('d-none')
      .appendTo($('.alertContent'));
    // console.log('newRecord =', newRecord);
    newRecord
      .find('.accidentLocation')
      .html(`案發地點：${alertInfoData[i].place}`);
    newRecord
      .find('.alertTime')
      .html(moment(alertInfoData[i].time).format('YYYY-MM-DD HH:mm'));
    newRecord
      .find('.accidentRemark')
      .html(`案發備註：${alertInfoData[i].remark}`);
  }
}

//警報信息動態計算高度
function alertHeight() {
  const leftHeight = $('.left').outerHeight(true);
  const hexagonHeight = $('.hexagon').outerHeight(true);
  const monitorHeight = $('.monitor').outerHeight(true);
  const alertTitleHeight = $('.alertInfo > .alertTitle').outerHeight(true);
  const sumHeight = hexagonHeight + monitorHeight + alertTitleHeight;
  $('.alertInfo > .alertContent').height(
    `calc(${leftHeight}px - ${sumHeight}px)`
  );
}

//中上動態生長
function caseQuantity() {
  for (let i = 0; i < caseData.length; i++) {
    const newRecord = $('.caseRecord')
      .eq(0)
      .clone()
      .removeClass('d-none')
      .addClass(`${caseData[i].case}`)
      .appendTo($('.caseContent'));
    // console.log('newRecord =', newRecord);
    newRecord.find('.caseNum').html(caseData[i].count);
    newRecord.find('.caseText').html(caseData[i].name);
  }
}

//地圖外框動態計算高度
function mapHeight() {
  const middleHeight = $('.middle').outerHeight(true);
  const caseContentHeight = $('.caseContent').outerHeight(true);
  $('.mapBg').height(`calc(${middleHeight}px - ${caseContentHeight}px - 5px)`);
}

//視頻點位動態生長
function vedioPointBtn() {
  let count = 1;
  let totalLength = 1;
  let newHtml = '<div class="d-flex">';

  for (let i = 0; i < vedioPointData.length; i++) {
    const newRecord = $('.vedioRecord').eq(0).clone().removeClass('d-none');
    // .appendTo($('.vedioPoint'));
    // console.log('newRecord =', newRecord);
    newRecord.find('.vedioPointText').html(vedioPointData[i].name);
    // console.log("newRecord.html() =", newRecord.html());
    if (vedioPointData[i].state == 'success') {
      newRecord.find('.vedioPointState').attr('src', '../img/li01.png');
    } else if (vedioPointData[i].state == 'warning') {
      newRecord.find('.vedioPointState').attr('src', '../img/li02.png');
    } else if (vedioPointData[i].state == 'danger') {
      newRecord.find('.vedioPointState').attr('src', '../img/li03.png');
    } else {
      console.log('vedioPoint state do not match');
    }

    if (count < 3 && totalLength != vedioPointData.length) {
      newHtml = newHtml + newRecord.eq(0).prop('outerHTML');
      totalLength++;
      count++;
    } else if (count < 3 && totalLength == vedioPointData.length) {
      newHtml = newHtml + newRecord.eq(0).prop('outerHTML') + '</div>';
      $(newHtml).appendTo($('.vedioPoint'));
      count = 1;
      totalLength = 1;
    } else if (count == 3) {
      newHtml = newHtml + newRecord.eq(0).prop('outerHTML') + '</div>';
      $(newHtml).appendTo($('.vedioPoint'));
      totalLength++;
      newHtml = '<div class="d-flex">';
      count = 1;
    } else {
      console.log('vedioPointBtn() error');
    }
  }
}

//右下，更多訊息
function moreInfoBtn() {
  $('.carInfo').click(function () {
    $('.carInfo').css(
      'background',
      'url(../img/rightCon02LiBg.png) no-repeat center'
    );
    $('.personInfo').css('background', 'unset');
    $('.addressInfo').css('background', 'unset');
  });
  $('.personInfo').click(function () {
    $('.personInfo').css(
      'background',
      'url(../img/rightCon02LiBg.png) no-repeat center'
    );
    $('.carInfo').css('background', 'unset');
    $('.addressInfo').css('background', 'unset');
  });
  $('.addressInfo').click(function () {
    $('.addressInfo').css(
      'background',
      'url(../img/rightCon02LiBg.png) no-repeat center'
    );
    $('.carInfo').css('background', 'unset');
    $('.personInfo').css('background', 'unset');
  });
}

//更多資訊動態計算高度
function moreInfoHeight() {
  const rightHeight = $('.right').outerHeight(true);
  const hexagonHeight = $('.hexagon').outerHeight(true);
  const vedioPointHeight = $('.vedioPoint').outerHeight(true);
  const sum = hexagonHeight + vedioPointHeight;
  $('.moreInfo').height(`calc(${rightHeight}px - ${sum}px)`);

  //資訊欄位的動態高度
  const moreInfoHeight = $('.moreInfo').outerHeight();
  const infoTitleHeight = $('.infoTitle').outerHeight(true);
  const searchHeight = $('.infoContent > .search').outerHeight(true);
  const moreInfoSum = infoTitleHeight + searchHeight + 1;
  $('.infoContent > .carDetail').height(
    `calc(${moreInfoHeight}px - ${moreInfoSum}px)`
  );
}

//更多資訊動態生長
function carDetail() {
  for (let i = 0; i < detailData.length; i++) {
    const newRecord = $('.carDetailRecord')
      .eq(0)
      .clone()
      .removeClass('d-none')
      .appendTo($('.carDetail'));
    newRecord
      .find('.detailPic')
      .css('background', `url(${detailData[i].carImg}) no-repeat center`);
    newRecord
      .find('.detailInfo')
      .find('.carNumber')
      .html(`車輛牌號：${detailData[i].carNum}`);
    newRecord
      .find('.detailInfo')
      .find('.carColor')
      .html(`車輛顏色：${detailData[i].carColor}`);
    newRecord
      .find('.detailInfo')
      .find('.carBrand')
      .html(`車輛品牌：${detailData[i].carBrand}`);
  }
}

//
function mapWH(){
  const w = $('.mapBg').width()
  const h = $('.mapBg').height()

  $('#middleMap').width(`${w}px`)
  $('#middleMap').height(`${h}px`)
}
