/**
 * Created by zr on 2017-07-10.
 */

//立即执行函数
(function(window,undefined){
    "use strict";
    var _MyJquery = window.MyJquery,_$ = window.$,//把可能存在的同名变量保存起来
        //原生方法赋值给变量，简化代码量
        toString = Object.prototype.toString,
        hasOwn = Object.prototype.hasOwnProperty,
        push = Array.prototype.push,
        slice = Array.prototype.slice,
        trim = String.prototype.trim,
        indexOf = Array.prototype.indexOf;

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
                    this.length = 1;
                    this.context = this[0] = selector;
                    return this;
                } else
                //判断选择器是否为字符串
                if(toString.call(selector) == "[object String]") {
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
            selector:"",
            MyJquery:"1.0.0",
            length:0,
            size:function () {
                return this.length;
            },
            toArray:function () {
               return slice.call(this,0);
            },
            each:function (callback,args) {
                return MyJquery.each(this,callback,args);
            },
           addClass:function (value) {
               if(!this.elem)
               this.elem.className = value;
               return this;
            },
            removeClass:function () {
                this.elem.className = '';
                return this;
            }
        };

    //扩展函数
    MyJquery.extend = function () {
        var i = 1,
            deep = false,
            target = arguments[0],
            length = arguments.length;
        if(typeof target === "boolean" ){
            deep = target;
            target = arguments[1];
            i = 2;
            console.log("deep = " +deep + "  target = " +target );
        }
        if(length === i){
            for(var key in target){
                    MyJquery[key] = target[key];

            }
        }
    }

    //类型检测方法
    MyJquery.extend({
        isFunction:function (obj) {
            return MyJquery.type(obj) === "function";
        },
        isArray:Array.isArray || function (obj) {
            return MyJquery.type(obj) === "array";
        },
        type:function (obj) {
            var class2type ={
                "[object Array]":"array",
                "[object Boolean]":"boolean",
                "[object Date]":"date",
                "[object Function]":"function",
                "[object Number]":"number",
                "[object Object]":"object",
                "[object RegExp]":"regexp",
                "[object String]":"string"
            };
            var toString = Object.prototype.toString;
            return obj == null ?
                String(obj):
                class2type[toString.call(obj)] || "object";
        },
        merge:function (first,second) {
            var i = first.length,
                j = 0;

            if(typeof second.length === "number"){
                for( var l = second.length; j < l;j++){
                    first[ i ++] = second[j];
                }
            }else{
                while ( second[j] !== undefined){
                    first[ i ++ ] = second[j ++];
                }
            }
            first.length = i;
            return first;
        },
        //遍历函数
        each:function (object,callback,args) {
            var name,i = 0,
                length = object.length,
                isObject = length === undefined || MyJquery.isFunction(object);

            if(args){
                if(isObject){
                    for( name in object){
                        if ( callback.apply( object[ name ],args) === false){
                            break;
                        }
                    }
                }else{
                for(;i < length;){
                    if( callback.apply( object[ i++ ],args ) === false){
                        break;
                    }
                }
            }
        }else{
                if(isObject){
                    for( name in object){
                        if ( callback.call( object[ name ],name,object[ name ]) === false){
                            break;
                        }
                    }
                }else{
                    for(;i < length;){
                        if( callback.call( object[ i ],i,object[ i++ ] ) === false){
                            break;
                        }
                    }
                }
            }

            return object;
        }
    })
    //使无new构造的实例具有同new一样的原型对象
    MyJquery.fn.init.prototype = MyJquery.fn;

    //事件处理程序
    MyJquery.Events = {
        ready:function (fn) {
            window.onload = fn;
        }
    }

    MyJquery.extend(MyJquery.Events);

    //制作数组
    MyJquery.makeArray = function (array,results) {
        var ret = results || [],
        push = Array.prototype.push;

        if(array != null){
            var type = MyJquery.type(array);

            if(array.length == null
                || type === "string"
                || type === "function"
                || type === "regexp"
                )
                push.call(ret,array);
        }else{
            MyJquery.merge(ret,array);
        }
        return ret;
    };

    MyJquery.extend(MyJquery.makeArray);
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