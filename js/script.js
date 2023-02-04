$(function () {
////読み込み時の処理
    //transition開放
    //全体をwrapperで覆う→mainvisualの色変更
    //時間差でwrapper消去
    var body = $('body'),
        loadingWrapper = $('.loading_wrapper'),
        mainvisualTitle = $('.mainvisual_title');
    
    $(window).on('load', function () {
        //wrapperの高さをページ全体にする
        pageHeight = body.height();
        loadingWrapper.css('height', pageHeight);
        //mainvisual_titleの色を変更
        mainvisualTitle.addClass('mainvisual_title_preload');

        //wrapperの消去、transition開放
        setTimeout(() => {
            body.removeClass('preload');
            loadingWrapper.fadeOut(2000);
        }, 2000);

        //mainvisual_titleの色をもどす
        setTimeout(() => {
            mainvisualTitle.removeClass('mainvisual_title_preload');
        }, 3000);
    });
    
////mainvisual画像切り替え
    var sld = '.sldFade', //スライドにclass付与
        sldPre = 'sld', //スライドのidにナンバリングして付与
        sldTime = 2000, //fadein / outの時間
        sldWait = 5000; //スライド切り替え時間
    
    $(window).on('load', function () {  
        //最初のスライドを直ちに表示
        var sldNum = 2;
        $('#sld1').fadeIn(sldTime);
        $('#sld1').addClass('zoomImg');

        //スライド切り替え時間を設定して繰り返し
        //cssで.zoomImg作成
        setInterval(() => {
            $(sld).not(`#${sldPre}${sldNum}`).fadeOut(sldTime);
            $(`#${sldPre}${sldNum}`).removeClass('zoomImg');
            $(`#${sldPre}${sldNum}`).fadeIn(sldTime);
            $(`#${sldPre}${sldNum}`).addClass('zoomImg');

            sldNum++;
            if (sldNum > $(sld).length) {
                sldNum = 1;
            }
        }, sldWait);
    });
    
   

////serviceのアコーディオン
    var toggleBtn = $('.service_item_top');
    
    //コンテンツを隠す
    $('.service_item_text').hide();

    toggleBtn.click(function () {
        var toggleText = $(this).next('.service_item_text');
        var toggleIcon = $(this).find('.service_item_top_icon');

        //.openを検知してコンテンツの開閉を行う
        //アイコンのアニメーション
        if (toggleText.hasClass('open')) {
            toggleText.removeClass('open');
            toggleText.slideUp();
            toggleIcon.removeClass('service_item_top_icon_active')
        } else {
            toggleText.addClass('open');
            toggleText.slideDown();
            toggleIcon.addClass('service_item_top_icon_active')
        };
    });

////swiper
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        slidesPerView: 1.5, //1画面に収まるスライド数
        spaceBetween: 0, //スライドの間隔(px)
        centeredSlides: true, //1番目のスライドをセンターに
       
       //ページネーション
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
       
       //ナビゲーション
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

////背景パララックス
    $(window).scroll(function () {
        var displayOffset = $('.service_top_wrapper').offset();
            bgOffset = $(this).scrollTop() / 50 - displayOffset.top / 30;
        $('.service_top').css( 'background-position', '50% ' + bgOffset + 'px' );
    });

});