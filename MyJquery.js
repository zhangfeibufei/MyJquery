/**
 * Created by zr on 2017-07-10.
 */

//立即执行函数
(function(window,undefined){
    "use strict";
    var _MyJquery = window.MyJquery,_$ = window.$; //把可能存在的同名变量保存起来

    //无new 构造
    var MyJquery = function (selector) {
            return new MyJquery.fn.init(selector);
        };

    //原型属性和方法
    MyJquery.fn = MyJquery.prototype = {
            init: function (selector) {   //MyJQuery对象从这里扩展
                var elem;
                elem = document.getElementById(selector);
                this.elem = elem;
            },
           addClass:function (value) {
               this.elem.className = value;
               return this;
            },
            removeClass:function () {
                this.elem.className = '';
                return this;
            }
        };

    //使无new构造的实例具有同new一样的原型对象
    MyJquery.fn.init.prototype = MyJquery.fn;

    //解决命名空间冲突，让出$使用权
    MyJquery.noConflict = function () {
        window.$ = _$;
        return MyJquery;
    };

    //取得的命名空间加入window对象
    window.MyJquery = window.$ = MyJquery;

})(window);