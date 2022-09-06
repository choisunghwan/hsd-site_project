/**
 * @namespace
 */

(function () {
    "use strict";

    /**
     * 유틸리티 스태틱 클래스.
     * @namespace
     */
    tss.util = new (tss.Class(/** @lends tss.util */{
        /*** 폼 입력 내용을 json 형태로 담는다.
         * ajax 전송시 data 항목에 넣을 때 유용.
         * var searchParam = tss.util.serializeObject($('#myFormId'));
         *
         * @param {jqSelector} obj - form selector
         */
        serializeObject : function(obj) {
            var o = {};
            var a = obj.serializeArray();
            $.each(a, function() {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        },
        callFunctionByName : function(name, data) {
            if(jQuery.type(name) === "function") {
                return name(data);
            }else {
                return window[name](data);
            }
        },
        download : function(uri, param) {
            var ifr = $('<iframe />').attr('src', uri + '?' + $.param(param, true)).hide().appendTo('body');
            setTimeout(function () {ifr.remove();}, 5000);
        },
        confirm : function(msg) {
            return confirm(msg);
        },
        alert : function(msg) {
            alert(msg);
        },
        auth : function(fromUrl) {
            var _window = window;
            if(parent && parent != this) {
                // 팝업에서 호출
                _window = window.parent;
            }
            if(typeof fromUrl === 'undefined') {
                fromUrl = _window.location.pathname;
            }
            _window.location.href = '/login?_targetUrl='+fromUrl;
        },
        // Arguments :
        //  verb : 'GET'|'POST'
        //  target : an optional opening target (a name, or "_blank"), defaults to "_self"
        openNewWindow : function(verb, url, data, target) {
            var form = document.createElement("form");
            form.action = url;
            form.method = verb;
            if (data) {
                for (var key in data) {
                    var input = document.createElement("textarea");
                    input.name = key;
                    input.value = typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key];
                    form.appendChild(input);
                }
            }
            var token = $("meta[name='_csrf']").attr('content');
            var tokenInput = document.createElement("textarea");
            tokenInput.name = "_csrf";
            tokenInput.value = token;
            form.appendChild(tokenInput);
            form.style.display = 'none';
            document.body.appendChild(form);

            window.open('about:blank', target || "_self", 'width=1000,height=800,toolbar=0');
            form.target = target || "_self";
            form.submit();
        },
        comma : function(x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        nl2br : function(x){
            x = JSON.stringify(x);
            return x.replace(/\\n/g, "<br/>").replace(/\"/g, "");
        },
        phoneFormat : function(num){
            if(num == "") return "";

            var formatNum = "";
            if(num.length == 11) {
                formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
            }else if(num.length == 8){
                formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
            }else if(num.indexOf('02') == 0){
                formatNum = num.replace(/(\d{2})(\d{3,4})(\d{4})/, '$1-$2-$3');
            }else {
                formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
            }

            return formatNum;
        }
    }));

    /**
     *  유효성 체크
     *  @namespace
     */
    tss.validate = new (tss.Class(/** @lends tss.validate */{
        /**
         * 아이디 확인
         * (영문 대소문자와 숫자조합, 8자~16자)
         */
        id : function(value) {
            var re = /[^a-z0-9]+|^([a-z]+|[0-9]+)$/i;
            return !re.test(value) && value.length >=6 && value.length <= 20;
        },
        /**
         * 비밀번호 확인
         * (영문 대소문자와 숫자/특수문자 조합, 8자~16자)
         */
        password : function(value) {
            var re = /^.*(?=^.{8,16}$)(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*_\)\(+=|}{\]\[\'\":;><.,?/]).*$/;
            return re.test(value);
        },
        /**
         * 이메일 확인
         */
        email : function(value) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(value);
        },
        /**
         * 일반전화번호(하이픈 포함) 확인
         */
        tel : function(value) {
            var re = /^(0(2|3[1-3]|4[1-4|9]|5[1-5]|6[1-4]))-(\d{3,4})-(\d{4})$/;
            return re.test(value);
        },
        /**
         * 휴대전화번호(하이픈 포함) 확인
         */
        phone : function(value) {
            var re = /^(?:(010-\d{4})|(01[1|6|7|8|9]-\d{3,4}))-(\d{4})$/;
            return re.test(value);
        }
    }));

})();
