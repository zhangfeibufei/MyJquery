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
            init: function (selector) {   //MyJQuery对象从这里扩展,选择元素，id，class
                var elem;

                //dom元素
                if(selector.nodeType){
                    this.context = this[0] = selector;
                    this.elem = selector;
                } else
                //判断选择器是否为字符串
                if(Object.prototype.toString.call(selector) == "[object String]") {
                    //id选择器,正则表达式函数，去掉字符串第一个字母
                    if((/^#/gi).test(selector)) {
                        elem = document.getElementById(selector.substr(1));
                        this[0] = elem;
                        this.selector = selector;
                        this.context = document;
                        this.length = 1;
                    }
                    //class选择器
                    else if((/^\./gi).test(selector)) {
                        elem = document.getElementsByClassName(selector.substr(1));
                        this[0] = elem;
                        this.selector = selector;
                        this.context = document;
                        this.length = elem.length;
                    }
                    else{
                        elem = document.getElementsByTagName(selector);
                        this.selector = selector;
                        this.context = document;
                        this[0] = elem;
                        this.length = elem.length;
                        return this;
                    }
                }
            },
           addClass:function (value) {
               if(!this.elem)
               this.elem.className = value;
               return this;
            },
            removeClass:function () {
                this.elem.className = '';
                return this;
            },
        ready:function(fn){
                return MyJquery.Events.ready(fn);
        }
        };

    //使无new构造的实例具有同new一样的原型对象
    MyJquery.fn.init.prototype = MyJquery.fn;

    //事件处理程序
    MyJquery.Events = {
        ready:function (fn) {
            window.onload = fn;
        }
    }

    //闭包实现回调函数
    MyJquery.Callbacks = function (flag) {
        var list = [];

        return {
            //添加回调函数
            add: function (flag) {
                list.push(flag);
            },

            //触发回调函数
            fire: function () {
                for (var fn in this.list)
                    fn();
            }
        }
    }


    //解决命名空间冲突，让出$使用权
    MyJquery.noConflict = function () {
        window.$ = _$;
        return MyJquery;
    };

    //取得的命名空间加入window对象
    window.MyJquery = window.$ = MyJquery;

})(window);