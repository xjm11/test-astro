---
title: jsx
pubDate: "2021-10-11 23:55:37"
description: "本质就是监听 URL 的变化，然后匹配路由规则，找页面，显示页面"
heroImage: "/placeholder-hero.jpg"
---

Question：

1. jsx 的本质是什么，它和 js 之间到底是什么关系？
2. 为什么要用 jsx？ 不用会有什么后果？
3. jsx 背后的功能模块是什么？这个功能模块都做了哪些事情？

### jsx 的本质：

jsx 标签使用 babel 可以转化成 js 的代码，主要就是调用 React.createElement，虽然它看起来有点像 HTML，但也只是看起来像，它是 React.createElement 的语法糖，充分具备 javascript 的能力。

如果直接使用 React.createElement 调用，但是结构不清晰，不友好，使用我们熟悉的类 html 语法来创建 dom，在降低学习成本的同时，也提升了研发效率与研发体验。

官网上对 jsx 的描述是 **jsx 是 javascript 的一种语法扩展，它和模板语法很接近，但是它充分具备 javascript 的能力**。

### createElement 的函数逻辑

举例：一个 jsx 结构

```jsx
<ul class>
  <li key="1">1</li>
  <li key="2">2</li>
</ul>
```

React.createElement 的调用和源码

```jsx
export function createElement(type, config, children)

React.createElement(
  "ul",
  {
    className: "list",
  },
  React.createElement(
    "li",
    {
      key: "1",
    },
    "1"
  ),
  React.createElement(
    "li",
    {
      key: "2",
    },
    "2"
  )
);
```

- type，不仅可以表示标准 HTML 标签字符串，也可以是 react 组件类型或者 React fragment 类型。
- config，配置，对象形式，键值对
- children，组件标签之前的嵌套内容，也就是所谓的子节点，子元素。

createElement 执行的内容：

目的： 主要就是**格式化数据**。

作用：与**ReactElement**调用之间的**一个转换器，一个数据处理层**。

输出：最终通过调用**ReactElement 来实现元素的创建**。

上源码：

```jsx
101. React的创建元素方法
*/
export function createElement(type, config, children) {
  let propName;
  const props = {};
  let key = null;
  let ref = null;
  let self = null;
  let source = null;
  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = "" + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}

```

### 将虚拟 dom 挂载到页面上的方法 ReactDom.render

```jsx
常见的使用方式：
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

//调用方式：
ReactDOM.render(element, container, [callback]);
```

这个函数的作用就是将虚拟 dom 转化为真实的 dom 的过程。
