$(function () {
    $(window).load(function () {
    
    });

    $(document).ready(function() { 
        //main_div_hover
        main_div_hover();

        //main_bg
        // TweenMax.from( $('.bg_w .main_page .visual_bg'), 0.5,
        //     {css:{opacity:0.6 }, 
        //     ease: Sine.easeOut
        // });
        // TweenMax.to( $('.bg_w .main_page .visual_bg'), 1.0,
        //     {css:{opacity:1 }, 
        //     ease: Sine.easeIn
        // });

        //
        main_hansot();

    });

    

    // 모바일인지 여부
    function isMobile() {
        return window.innerWidth <= 1023;
    }

    //main_div_hover
    function main_div_hover() {
        $(".area_sc > a").on('mouseover click', function(){
            $(this).parent().addClass('on');
        })

        $(".area_sc > a").on('mouseleave', function(){ 
           $(this).parent().removeClass('on');
        }); 
    };

    //main_hansot
    function main_hansot() {
        $(".main_hansot_bg").on('mouseenter', function(){
            $(this).addClass('on');
        })

        $(".main_hansot_bg").on('mouseleave', function(){ 
           $(this).removeClass('on');
        }); 
    };

});

