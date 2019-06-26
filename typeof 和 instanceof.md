# typeof 和 instanceof

基本类型：string number boolean undefined symbol null ；按值访问，存在内存栈里的
引用类型：array类型 object类型 function 类型 date类型 regexp类型 按引用值访问的

## typeof
typeof 一般用于判断基本类型，当使用typeof判断引用类型的时候，都会显示`object`

````javascript
// 一种比较好的判断类型的方式
let Tyep = {}

for(var i = 0,type; type = ['String', 'Array', 'Number'][i++];) {
    (function(type) {
        Type['is' + type] = function(obj) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        } 
    })(type)
}

Type.isArray([]) // true
Type.isString('') // true
````