/**
 * Created by zr on 2017-07-10.
 */

//立即执行函数
(function(window,undefined){
    "use strict";
    var _MyJquery = window.MyJquery,_$ = window.$; //把可能存在的同名变量保存起来

    // var MyJquery = window.MyJquery = window.$ = function (selector,context) {
    //     return new MyJquery.fn.init(selector,context);
    // };
    var MyJquery = {};
    MyJquery.sayhello = function () {
        console.log("hello myJquery!");
    };
    
    MyJquery.noConflict = function () {
        window.$ = _$;
        return MyJquery;
    };
    // MyJquery.extend = MyJquery.fn = MyJquery.prototype;
    //
    // MyJquery.extend({
    //     noConflict:function (deep) {
    //         window.$ = _$;//放回去
    //         if(deep)
    //             window.MyJquery = _MyJquery;
    //         return MyJquery;
    //     }
    // })
    window.MyJquery = window.$ = MyJquery;

})(window);