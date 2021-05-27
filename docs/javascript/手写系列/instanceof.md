# instanceof
## 前言

原理：采用 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof) 的说法就是，`instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

于是，我们有了第一版代码，循环遍历`target`的原型链，如果等于`origin.prototype`，就`return true`，循环到顶层原型链`null`的时候，还没有相等就`return false`。简单归纳就是个类似于`链表的遍历`。

``` javascript
function instanceOf(target, origin) {
  if (target == null) return false; // null undefined直接返回false
  if (!target.__proto__) return false;
  while (target) { // 循环遍历原型链
    if (target.__proto__ === origin.prototype) return true;
    target = target.__proto__;
  }
  return false;
}

```

但是，我们现在看一下这个例子：

``` javascript
const a = 1;
const str = 'bowlofnoodles';

// 第一版代码实现
instanceOf(a, Number); // true
instanceOf(a, Object); // true
instanceOf(str, String); // true
instanceOf(str, Object); // true

// 实际的浏览器instanceof
a instanceof Object // false
a instanceof Number // false
b instanceof Object // false
b instanceof String // false
```

分析一下：是因为[包装对象](http://javascript.ruanyifeng.com/stdlib/wrapper.html)的缘故。

`a`和`str`在进行对象属性的读取即`a.__proto__`和`str.__proto__`的时候会被包装成一个`Number`对象，同理`str`会被包装成一个`String`对象。

> 这里提一下：包装类型和引用类型的区别在于`对象的生存期`。使用 `new` 操作符创建的引用类型的实例，在执行流离开当前作用域之前，`会一直保存在堆内存中`。而后台自动创建的基本包装类型的对象，`则只存在一行代码的执行瞬间，然后立即被销毁`。这意味着我们`不能为基本类型的值添加属性和方法`。

> `js`中的基本类型包装对象：`String`，`Number`，`Boolean`，`BigInt`，`Symbol`，其实就是除了`null`，`undefined`不能访问属性，所以他们没有对应的包装对象，其他都有。详细可以看一下高程红宝书里对`包装对象`的讲解。


再回来，所以上述代码其实等价于
``` javascript
const a = new Number(1);
const str = new String('bowlofnoodles');

// 第一版代码实现
instanceOf(a, Number); // true
instanceOf(a, Object); // true
instanceOf(str, String); // true
instanceOf(str, Object); // true
```

那我们怎么实现跟原生一样的效果，其实就是在入口判断一下类型，不是复杂类型的时候就直接 `return false` 即可。

于是有了第二版，改进一下，就完成啦：

``` javascript
function isComplexType(target) {
  return (
    // 注意避开null
    typeof target === 'object' && typeof target !== 'null'
  ) || typeof target === 'function'; // 注意带上function
}

function instanceOf(target, origin) {
  if (!isComplexType(target)) return false; // 不是复杂类型直接return false
  if (!target.__proto__) return false;
  while (target) { // 循环遍历原型链
    if (target.__proto__ === origin.prototype) return true;
    target = target.__proto__;
  }
  return false;
}
```