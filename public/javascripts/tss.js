/**
 * Created by guava on 16.6.24.
 */

/**
 * @namespace
 */
var tss = tss || {};

(function () {
    tss.Class = function (o, oParent) {
        var $init = null;
        var checkDirectCall = function () { return true; };
        var F;

        if ("$init" in o) {
            $init = o.$init;
            delete o.$init;
        }

        if (typeof oParent === "undefined") {
            F = function () {
                var args = arguments;

                if (!(this instanceof F)) {
                    return new F(checkDirectCall, args);
                }

                if (args.length && args[0] === checkDirectCall) {
                    args = args[1];
                }

                if ($init !== null) {
                    $init.apply(this, args);
                }
            };
        } else {
            F = function () {
                var args = arguments;

                if (!(this instanceof F)) {
                    return new F(checkDirectCall, args);
                }

                if (args.length && args[0] === checkDirectCall) {
                    args = args[1];
                }

                // 부모의 생성자 실행
                oParent.apply(this, args);

                // 자식의 생성자 실행
                if ($init !== null) {
                    $init.apply(this, args);
                }
            };

            var Parent = function () {};
            Parent.prototype = oParent.prototype;
            F.$super = oParent.prototype;
            F.prototype = new Parent();
            F.prototype.constructor = F;
        }

        for (var i in o) {
            if (o.hasOwnProperty(i) && i !== "prototype") {
                F.prototype[i] = o[i];
            }
        }

        return F;
    };


    $.fn.exists = function () {
        return $(this).length !== 0;
    };

    $.fn.scrollToMe = function () {
        $('html, body').animate({ scrollTop: $(this).offset().top }, 'slow');
    };

    $.fn.numOnly = function(includeDot) {
        this.each(function(){
            $(this).css(
                {'imeMode':'disabled'}
            ).on('keyup', function(){
                var _this = $(this);
                var value = _this.val().match(/[^0-9]/g);
                if(value!=null) {
                    _this.val(_this.val().replace(/[^0-9]/g,''));
                }
            }).on('keydown', function (e) {
                var key = e.which || e.charCode || e.keyCode || 0;
                // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
                return (
                key == 8 ||
                key == 9 ||
                key == 86 ||
                key == 109 ||
                key == 189 ||
                key == 46 ||
                (includeDot && key == 110) || (includeDot && key == 190) ||
                (key >= 37 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
            });
        });
    };
})();
