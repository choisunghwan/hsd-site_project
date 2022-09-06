$(function(){
    // 모두동의
    $('#all_agree').click(function(){
        if($(this).is(":checked")){
            $("#regForm :checkbox").prop("checked", true);
        } else{
            $("#regForm :checkbox").prop("checked", false);
        }
    });

    $(".ad_wrap :checkbox").not(":eq(0)").click(function(){
       if($("#agree_01").is(":checked") && $("#agree_02").is(":checked") && $("#agree_03").is(":checked")){
           $("#all_agree").prop("checked", true);
       }else{
           $("#all_agree").prop("checked", false);
       }
    });

    // 시도, 군구, 점포명선택
    if($("#sido").length > 0) {
        searchSido();

        $("#sido").on("change", function () {
            searchGungoo();
        });
    }
    if($("#store").length > 0){
        $("#gungoo").on("change", function () {
            searchStore();
        });
    }

});


// 상담구분
function searchCode(cd, id, type){
    $.getJSON("/api/find/code/" + cd, function(data){
        $.each(data,function(key,val){
            if(type == "radio"){
                $("#" + id).append('<label><input type="radio" name="' + id + '" value="' + val['idx'] + '"><span>' + val['cval'] + '</span></label>');
            }else {
                $("#" + id).append("<option value='" + val['idx'] + "'>" + val['cval'] + "</option>");
            }
        });

        if(type == "radio"){
            $("#" + id).find("input:eq(0)").prop("checked", "checked");
        }
    });
}

// 시도
function searchSido(){
    $.getJSON("/api/find/sido", function(data){
        $.each(data,function(key,val){
            $("#sido").append("<option value='" + val['sidoCode'] + "'>" + val['sidoName'] + "</option>");
        });
    });
}

// 군구
function searchGungoo(){
    var sido = $("#sido").val();
    if(sido == "") return;

    $.getJSON("/api/find/sido?sido=" + sido, function(data){
        $("#gungoo > option").not(":eq(0)").remove();
        $("#store > option").not(":eq(0)").remove();
        $.each(data,function(key,val){
            $("#gungoo").append("<option value='" + val['gungooCode'] + "'>" + val['gungooName'] + "</option>");
        });
    });
}

// 매장
function searchStore(){
    var sido = $("#sido").val();
    var gungoo = $("#gungoo").val();
    if(sido == "" || gungoo == "") return;

    $.getJSON("/api/find/store?sido=" + sido + "&gungoo=" + gungoo, function(data){
        $("#store > option").not(":eq(0)").remove();
        $.each(data,function(key,val){
            $("#store").append("<option value='" + val['name'] + "'>" + val['name'] + "</option>");
        });
    });
}

// 날짜포멧변경
function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return year + '-' + month + '-' + day;
}

// 주소찾기
function searchAddress(){
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
            // 예제를 참고하여 다양한 활용법을 확인해 보세요.
            $("#zipcode").val(data.zonecode).trigger('focusin');
            $("#addr1").val(data.roadAddress).trigger('focusin');
            $("#addr2").focus();
        }
    }).open();
}

// 레이어팝업띄우기
var currentLayer = null;
function openLayerPopup(target){
    currentLayer = $("#"+target);
    var tx = ($(window).width()- currentLayer.width())/2;
    var ty = ($(window).height()- currentLayer.height())/2;
    var dimLayerConfig = {
        'display' : 'none',
        'position' : 'fixed',
        'left' : 0,
        'right' : 0,
        'top' : 0,
        'bottom' : 0,
        'background' : '#000',
        'z-index' : 9999,
        'opacity' : .8
    };

    currentLayer.css({left:tx + 'px', top:ty + 'px'}).show();
    $("body").append('<div class="dim-layer">').css("overflow", "hidden");
    $(".dim-layer").css(dimLayerConfig).show();
}

// 레이어팝업 삭제
function closeLayerPopup(){
    $(".dim-layer").remove();
    currentLayer.hide();
    $("body").css("overflow","auto");
}

// 휴대전화번호 '-' 추가
function autoHypenPhone(str){
  str = str.replace(/[^0-9]/g, '');
  var tmp = '';
  if( str.length < 4){
    return str;
  }else if(str.length < 7){
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3);
    return tmp;
  }else if(str.length < 11){
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3, 3);
    tmp += '-';
    tmp += str.substr(6);
    return tmp;
  }else{
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3, 4);
    tmp += '-';
    tmp += str.substr(7);
    return tmp;
  }
  return str;
};

