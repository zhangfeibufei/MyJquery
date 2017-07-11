/**
 * Created by zr on 2017-07-10.
 */

//立即执行函数
(function(window,undefined){
    "use strict";
    var _MyJquery = window.MyJquery,_$ = window.$; //把可能存在的同名变量保存起来


    //初始化MyJquery类
    //无new 构造
    var MyJquery =(function() {
        var MyJquery = function (selector) {
            return new MyJquery.fn.init(selector);
        };
        MyJquery.fn= MyJquery.prototype;
        MyJquery.fn.init = function (selector)
        {
            var elem;
            elem = document.getElementById(selector);
            this.elem = elem;
        };
        return MyJquery;
    })();
    // MyJquery.say = "hey,boy";

    //简写prototype
    // MyJquery.fn = MyJquery.prototype;


    //构造函数
    // MyJquery


    //解决命名空间冲突，让出$使用权
    MyJquery.noConflict = function () {
        window.$ = _$;
        return MyJquery;
    };

    //取得的命名空间加入window对象
    window.MyJquery = window.$ = MyJquery;

})(window);