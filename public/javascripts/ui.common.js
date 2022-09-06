$(function () {
    $(window).load(function() {
         login_chek();
    });


    $(document).ready(function() {

        //메뉴
        gnb();
        //메뉴_mobile
        gnb_mobile();
        //lnb_pc
        lnb_menu();
        //lnb_mobile
        lnb_mobile();
        //모바일 메뉴버튼
        hamburger_menu();
        //로그인 체크
        login_chek();
        //탭스타일_01
        tab_st01();
        //탭스타일_02
        tab_st02();
        //게시판 상세 버튼_hover
        notice_btn();
        //개인정보 수집 동의
        accordian_menu();
        //온라인 이벤트 hover
        event_hover();
        //단체주문 swiper_mobile
        menu_swiper();
        //footer_사업자정보_up,down
        footer_toggle();
        //더 많은 이야기_2017.10.25 고객사 요청으로 삭제
        // more_cont(); 

        //visual_bg
        // TweenMax.from( $('.bg_w .sub_page .visual_bg'), 0.5,
        //     {css:{opacity:1 }, 
        //     ease: Sine.easeOut
        // });
        // TweenMax.to( $('.bg_w .sub_page .visual_bg'), 1.0,
        //     {css:{opacity:1 }, 
        //     ease: Sine.easeIn
        // });   

        //사회공헌활동
        so_btn();       

        // 스크롤 될 때 실행
        window.lastScrollTop = 0; // 현재 스크롤 이전의 스크롤 위치
        $(window).scroll(function() {
            gnb_fixed();
        });

        // 브라우저 크기 변경이 일어날 때 실행
        $(window).resize(function() {
            gnb();
            gnb_fixed();
            menu_swiper(); 
        });
    });


    // 모바일인지 여부
    function isMobile() {
        return window.innerWidth <= 1023;
    }

    function isMobile_02() {
        return window.innerWidth <= 640;
    }

    //gnb
    function gnb(){
        var gnb_dp1 = $('#header #gnb .gnb_menu > ul');
        // 초기화 시작
        gnb_dp1.find('.dp2').css('display', '');
        gnb_dp1.css('height', '');
        gnb_dp1.find('li').removeClass('active');
        $('.bg_layer').css({
            'opacity':'0',
            'height':'0'
        });
        // 초기화 종료
        gnb_dp1.on('mouseenter focusin', function(){
            if(isMobile() == false) {
                $(this).addClass('on');
                if($(this).find('.dp2').length == 0){
                    $('#gnb .gnb_menu > ul').stop(true,false).animate({
                        'height':$('#header .hd_fixed.fix').length > 0 ? 60 : 90+'px'
                    }, 300);
                    gnb_dp1.find('.dp2').stop(true,false).css('height','0px');
                } else {
                    $('#gnb .gnb_menu > ul').stop(true,false).animate({
                        'height':'420px'
                    }, 300);
                    $('.bg_layer').stop(true,false).animate({
                        'opacity':'0.96',
                        'height':'350px'
                    }, 300);
                    gnb_dp1.find('.dp2').stop(true,false).css('display','block');
                    //setTimeout(function () {
                        gnb_dp1.find('.dp2').stop(true,false).css('height','auto');
                    //}, 300);
                }
            }
        });

        gnb_dp1.on('mouseleave focusout', function(){
            if(isMobile() == false) {
                $(this).removeClass('on');
                $('#gnb .gnb_menu > ul').stop(true,false).animate({
                    'height':$('#header .hd_fixed.fix').length > 0 ? 60 : 90+'px'
                }, 300);

                $('.bg_layer').stop(true,false).animate({
                    'opacity':'0',
                    'height':'0'
                }, 300);
               
                gnb_dp1.find('.dp2').stop().css('height','');
                //setTimeout(function () {
                    gnb_dp1.find('.dp2').stop().css('display','none');
                //}, 300);
            }
        });
    }

    //lnb_pc
    function lnb_menu(){
        var lnb_dp1 = $('.lnb > .lnb_inner ul > li.dp1 > p.dp1_tit');
        var lnb_dp2 = $('.lnb > .lnb_inner ul > li.dp1 > div.dp2 > ul > li');
        //click
        lnb_dp1.on('click', function() {
            if($(this).closest('li').hasClass('active') == false) {
                $(this).closest('li').addClass('active').siblings('li').removeClass('active');
            } else {
                $(this).closest('li').removeClass('active');
            }
        });

        lnb_dp2.on('click', function() {
            if($(this).hasClass('on') == false) {
                lnb_dp2.removeClass('on');
                $(this).addClass('on');
            }
        });
    }
    //
    function lnb_mobile(){
        var lnb =$('.left_wrap .lnb');
        var lnb_btn = $('.mo_title > .lnb_btn');
        var lnb_dim = $('.dim');
        var lnb_close = $('.lnb_btn_close');
        var lnb_dp1 = $('.lnb > .lnb_inner ul > li.dp1');
        var close_lnb_dim = function() {
            lnb.removeClass('on');
            setTimeout(function() {
                lnb_dim.removeClass('on');
                $('body').removeClass('fixed').css('height', '');
                lnb_dp1.removeClass('active');
                lnb_dp1.find('div.dp2 > ul > li').removeClass('on');
            }, 500);
        };

        lnb_btn.on('click', function() {
            $('.dim').addClass('on');
            setTimeout(function() {
                if(lnb.hasClass('on') == true) {
                    lnb.removeClass('on');
                } else {
                    lnb.addClass('on');
                    $('body').css('height', $(window).height()).addClass('fixed');
                }
            }, 500);
        });
        //dim close
        lnb_dim.on('click', function() {
            close_lnb_dim();
        });
        //btn_close
        lnb_close.on('click', function() {
            close_lnb_dim();
        });

        //scroll
        if(isMobile() == true) {
            if(!$(".lnb").find(".lnb_inner").length == 0){
                $(".lnb_inner").mCustomScrollbar({
                    theme:"minimal-dark",
                    scrollInertia:400
                });
            };
        }
    }

    //gnb_fixed
    function gnb_fixed() {
        window.nowScrollTop = $(window).scrollTop(); // 현재 스크롤 위치
        var isScrollUpGnbOffset = window.nowScrollTop <= 50; // 50px보다 위에 스크롤이 있을 때 true


        if(isMobile() == false) { // PC
            $( '.hd_fixed' ).toggleClass('fix', isScrollUpGnbOffset == false);
            $( '.hd_fixed' ).css('height', '');
            $( '#header' ).css('height', '');
        } else { // MOBILE
            $( '.hd_fixed' ).css('height', '0px');
            $( '#header' ).css('height', '0px');            
        }
        

        var gnbHeight = 400;
        if(isMobile() == true) {
           gnbHeight = 80;
        }
        if(isScrollUpGnbOffset == false && Math.abs(window.lastScrollTop - window.nowScrollTop) > 10 && window.nowScrollTop >= gnbHeight) {
           var isScrollUp = window.lastScrollTop > window.nowScrollTop; // 스크롤이 위로 올라갈때 true
           $( '.hd_fixed' ).toggle(isScrollUp);
           if(isMobile() == false) {
              $( '.area_flex' ).toggle(isScrollUp);
           }
        } else if(isScrollUpGnbOffset) {
           $( '.hd_fixed' ).show();
           if(isMobile() == false) {
              $( '.area_flex' ).show();
           }
        }

        window.lastScrollTop = window.nowScrollTop;       
    }

    //gnb_mobile
    function gnb_mobile(){
        var gnb_dp1 = $('#header #gnb .gnb_menu > ul > li.dp1');
        gnb_dp1.on('click', function(){
            if(isMobile() == true) {
                $(this).addClass('active').siblings('li').removeClass('active');
            }
        });
    }

    //mobile_gnb_btn
   function hamburger_menu() {
        $(".hamburger").click(function(e){
            if(isMobile() == true) {
                e.preventDefault();

                if ($('.hamburger').hasClass('is-active'))
                {
                    $('body').removeClass('fixed').css('height', '');
                    $('#container').css('position', 'relative');
                    $('#header').removeClass('on');
                    $('.hamburger').removeClass("is-active");
                    setTimeout(function () {
                        $('body').removeClass('fixed').css('height', '');
                        $('.bg_layer').stop(true,false).animate({
                            'opacity':'0',
                            'height':'0'
                        })
                    }, 100)
                     
                }else {
                    setTimeout(function () {
                        $('#header').addClass('on');
                        $('.hamburger').addClass("is-active");
                        $('.bg_layer').stop(true,false).animate({
                            'opacity':'0.7',
                            'height':'100%'
                        })
                        setTimeout(function () {
                            $('body').css('height', $(window).height()).addClass('fixed');
                            $('#container').css('position', 'absolute');
                        }, 500)
                    })
                }
            }
        });
    };

    //login_page id,pw Form
    function login_chek() {
        //formText
        var placeholderTarget = $('.form.text input[type="text"], .form.text input[type="password"]'); 

      
        placeholderTarget.each(function(){
           if($(this).val() != ""){
              $(this).siblings('label').fadeOut('fast');
            }
        });

        placeholderTarget.on('focusin keyup', function(){
            $(this).siblings('label').fadeOut('fast'); 
        }); 
   
        placeholderTarget.on('focusout keyup', function(){
            if($(this).val() == ''){ 
               $(this).siblings('label').fadeIn('fast'); 
            } 
        }); 
    };

    //tab_01
    function tab_st01() {
        $('.tab_st01 .tab_wrap ul.tab_menu li').click(function () {
            var idx = $(this).index()
                , $pg = $(".tab_cont");
            $(this).addClass('active').siblings('li').removeClass('active');
            $pg.eq(idx).addClass('active').siblings().removeClass('active');
        });
    };

    //tab_02
    function tab_st02() {
        $('.tab_st02 .tab_wrap ul.tab_menu li').click(function () {
            var idx = $(this).index()
                , $pg = $(".tab_cont");
            $(this).addClass('active').siblings('li').removeClass('active');
            $pg.eq(idx).addClass('active').siblings().removeClass('active');
            setTimeout(function() {
                menu_swiper();
            });
        });

    };

    //notice_btn
    function notice_btn() {
        var notice_btn_np = $('.prev_btn .btn_np, .next_btn .btn_np'); 
        $('.np_txt').hide();
        //mouseover, 'off' 비활성화 체크
        notice_btn_np.on('mouseenter', function(){ 
            if($(this).children().hasClass('off')){ 
               $(this).siblings('.np_txt').hide(); 
            } else {
                $(this).siblings('.np_txt').show(); 
            }
        }); 
        //mouseleave
        notice_btn_np.on('mouseleave', function(){ 
            $(this).siblings('.np_txt').hide();
        }); 
    };

    //accordian_menu
    function accordian_menu() {
        $(".area_step dl dt").click(function(){
            $(".area_step dl dd").slideUp();
            $(this).removeClass('on');
            
            if(!$(this).next().is(":visible"))
            {
                $(this).next().slideDown();
                $(this).addClass('on');
            } 
        })
    };

    //event
    function event_hover() {
        $(".event_list_wrap li a").on('mouseover focusin click', function(){
            $(this).parent().addClass('on');
        })

        $(".event_list_wrap li a").on('mouseleave focusout', function(){ 
           $(this).parent().removeClass('on');
        }); 
    };

    //menu_swiper
    function menu_swiper() {
        var sc = $('.menu_slider.swiper-container.active');
        var idx = $('.menu_slider.swiper-container').index(sc[0]);
        var swiper = window['menuTabSwiper_' + idx];
        if(!swiper) {
            if(isMobile()) {
                window['menuTabSwiper_' + idx] = new Swiper(sc[0], {
                    slidesPerView: 2.2,
                    spaceBetween: 20,
                    //loop: true,
                    //freeMode: true,
                    autoplayDisableOnInteraction: false
                });
            }
        } else if(swiper && swiper.destroy && isMobile() == false) {
            swiper.destroy(true, true);
            delete window['menuTabSwiper_' + idx];
        }
    };

    //footer_toggle
    function footer_toggle() {
        $('.mo_info_on').slideUp();
        $(".ft_info_wrap .mo_info_list").click(function(){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                $('.mo_info_on').slideUp();
            } else {
                $(this).addClass('active');
                $('.mo_info_on').slideDown();
            }
        })
    };


    //더 많은 이야기
    // function more_cont() {
    //     $('.conts_more .more_link').on('mouseenter focusin', function() {
    //         $(this).addClass('over');
    //     });
    //     $('.conts_more .more_link').on('mouseleave focusout', function() {
    //         $(this).removeClass('over');
    //     });
    // }

    //사회공헌활동
    function so_btn() {
        $(".news_txt a").click(function(){
            $(".so_txt_cont").slideUp();
            $('.news_list').removeClass('on');
            
            if(!$(this).next().is(":visible"))
            {
                $(this).next().slideDown();
                $(this).parents('.news_list').addClass('on');
            } 
        });

        $(".news_txt a.so_close_btn").click(function(){
            $('.news_list').removeClass('on');
        });
    };

});

