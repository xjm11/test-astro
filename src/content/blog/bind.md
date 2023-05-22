---
title: 手写bind方法
pubDate: "2021-10-11 23:55:37"
description: "本质就是监听 URL 的变化，然后匹配路由规则，找页面，显示页面"
heroImage: "/placeholder-hero.jpg"
---

### 定义：

mdn 上对 bind 函数的定义：**`bind()`**  方法创建一个新的函数，在  `bind()`  被调用时，这个新函数的  `this`  被指定为  `bind()`  的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

官方使用示例：

```jsx
const module = {
  x: 42,
  getX: function () {
    return this.x;
  },
};

const unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

const boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// expected output: 42
```

我们提取出 bind 函数的几点信息：

1. 返回一个新的函数；
2. 新函数的 this 被指定为 bind 的第一个参数；
3. bind 的其他参数作为新函数的参数；

```jsx
//手写第一版：
Function.prototype.myBind = function (context, ...args) {
  const that = this;
  const fn = function (...args1) {
    return that.call(context, ...args, ...args1);
  };
  return fn;
};

const value = 10;
function getValue() {
  console.log(this.value);
  return this.value;
}
getValue.prototype.aa = 10;

const a = getValue.myBind({ value: 20 });
console.log(a()); //20
```

这里说明下 this 的使用

this 代表当前执行上下文的一个属性；`this`  不能在执行期间被赋值，并且在每次函数被调用时  `this`  的值也可能会不同。bind 函数内部拿到的 this 是 bind 调用时的调用者。

上下的代码符合上面我们列出的几点信息，不过有几点需要注意：

1. 所有函数都可以调用 bind 方法，所以 bind 方法是所有函数都可以访问到的，往原型链上想，每个 JavaScript 函数实际上都是一个  `Function`  对象。运行  `(function(){}).constructor === Function // true`  便可以得到这个结论。 所以 Function.prototype 上的方法所有函数都可以访问；
2. mybind 方法可不可以是箭头函数呢，不可以。因为箭头函数的 this 是该函数时所在的作用域指向的对象，而不是使用时所在的作用域指向的对象，，此时就是 window，所以如果是箭头函数是拿不到调用者的，也就是原函数；

```jsx
不过上面也可以这么写：
Function.prototype.myBind = function (context, ...args) {
    const fn = (...args1)=>  {
        return this.call(context, ...args, ...args1);
    };
    return fn;
};
```

1. 使用...延展符号来简化参数操作。

另外其实除了上面列出的几点信息外，bind 函数还有一些额外的信息

1. 新函数是可以拿到原函数的原型上的方法和函数的；
2. 如果新函数不是普通的 fn()直接调用，而是 new fn()。据我们所知，new 会改变 this 指向，new 出来的函数内部的 this 是构造函数的实例，这里的构造函数其实就是原函数；也指向新函数；

```

Function.prototype.myBind = function (context, ...args) {
    const that = this;
    const fn = function (...args1) {
        if (this instanceof that) { //如果返回的函数是new 出来的构造函数；
            const res = new that(...args, ...args1);
            return res;
        }
        return that.call(context, ...args, ...args1);
    };
    const obj = Object.create(this.prototype);
    fn.prototype = obj;
    //新函数的原型与之前的保持一致

    return fn;
};

const value = 10;
function getValue() {
    console.log(this.value);
    return this.value;
}
getValue.prototype.aa = 10;

const a = getValue.myBind({ value: 20 });
console.log('普通函数调用的情况', a());
console.log('验证原型上属性', getValue.prototype.aa, a.prototype.aa);
console.log(
    '原型是否一致',
    Object.getPrototypeOf(getValue) === Object.getPrototypeOf(a)
);

const obj = new a();
console.log('验证new的情况', obj);
```
