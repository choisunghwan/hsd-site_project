/**
 * jquery validate plugin 추가 항목 정의
 * @namespace
 */

(function () {
    "use strict";

    // 기본 옵션 설정
    $.validator.setDefaults({
        ignore: [],
        onfocusout: false,
        errorPlacement: function(error, element) {
            //just nothing, empty
        },
        invalidHandler: function(form, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                tss.util.alert(validator.errorList[0].message);
                validator.errorList[0].element.focus();
            }
        }
    });

    // 아이디
    $.validator.addMethod(
        'chkId', function (value, element) {
            return !value || tss.validate.id(value);
        }, '아이디는 영문,숫자의 조합으로 6자~20자로 입력해 주세요.'
    );

    // 비밀번호
    $.validator.addMethod(
        'chkPassword', function (value, element) {
            return !value || tss.validate.password(value);
        }, '비밀번호는 영문(대소문자 구별), 숫자, 특수문자의 조합으로 8자~16자로 입력해 주세요.'
    );

    // 휴대폰 번호
    $.validator.addMethod(
        'chkPhone', function (value, element) {
            return !value || tss.validate.phone(value);
        }, '휴대폰 번호를 정확히 입력해 주세요.'
    );

    // 일반전화 번호
    $.validator.addMethod(
        'chkTel', function (value, element) {
            return !value || tss.validate.tel(value);
        }, '전화 번호를 정확히 입력해 주세요.'
    );

    //상담구분
    $.validator.addMethod(
      'checkStore', function (value, element) {
        var check = true;
        var i = $('#cate').val();
        if (i == 4 || i == 3) {
          check = true;
        }else if(value ==='' || value === null){
          check = false;
        }
        return check;
      }
    );

})();