---
title: ECMAScript 2023
pubDate: "2023-5-24 10:00:00"
description: "了解什么是ECMAScript 2023，以及语法迭代流程等"
heroImage: "/placeholder-hero.jpg"
---

# ECMAScript 2023

ECMAScript 是什么：

ECMAScript 是 JavaScript 的标准化规范，它定义了 JavaScript 的语法、语义和核心特性。ECMAScript 标准由 ECMA 国际组织制定和维护。

根据过去的发展历史，ECMAScript 在每年都有新的版本发布。新版本的 ECMAScript 会在每年的年底发布，并在随后的年份得到广泛采用和支持。

### 为啥每年都更改？？

社区维护

### 每次更改的话，直接用就好了吗？

不行，有兼容性。需要等各种环境等支持新语法

1. 如浏览器支持，

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/17b5d646-91ae-4550-b94f-6fe6c03b1516/Untitled.png)

1. ts 支持

```json
目前最新版的ts支持findLast和findLastIndex， 但是还不支持toSpliced、toSorted、toReversed、with，在typescript仓库中已经有人提了pull request；如果等不及官方支持，可在项目中给global的Array添加对应的类型定义，参考pr:

https://github.com/microsoft/TypeScript/pull/51367/files[1]
```

1. polyfill

   目前 core-js 已经支持数组的 api, 但尚不支持 WeakMap 使用 Symbol 作为 key 来使用。

   参考

   > https://github.com/tc39/proposals/blob/main/finished-proposals.md[2]

2. 然后编辑器 vscode 和 websotrm 语法支持，目前还没有语法提示，告警等信息

### 如果语法需要改动，都有哪些需要支持？？如果想兼容的话，怎么加

同上，

### 哪里会说明这些，这些是怎么个过程和流程，好像还有 tc39

ECMAScript® 2023 Language Specification 的提案过程，一般流程是什么

1. 提案阶段（Proposal Stage）：在这个阶段，开发者和 TC39（ECMAScript 技术委员会）成员可以提出新的语言特性或改进的提案。提案可以由个人、组织或公司发起。提案应包含对特性的详细描述、示例代码和语法规范等内容。
2. 初步审查阶段（Stage 0: Strawman）：在这个阶段，提案还处于初步阶段，可能只是一个想法或概念。提案提交给 TC39 进行初步审查，以评估其可行性和潜在的价值。在此阶段，提案可能会被接受、拒绝或要求进一步完善。
3. 提案阶段（Stage 1: Proposal）：在这个阶段，提案经过初步审查后，进一步细化和详细讨论。提案提交更加完整和具体的规范文档、实现示例、语法变化和语义等详细信息。TC39 成员会对提案进行审查和讨论，并提供反馈和建议。
4. 初始规范阶段（Stage 2: Draft）：在这个阶段，提案已经有了较为完整和稳定的规范草案。提案的作者需要进一步完善规范文档，解决可能存在的问题、风险和潜在的影响。TC39 成员将对规范草案进行更加详细和深入的审查，并就语言设计、兼容性和性能等方面提供反馈和建议。
5. 候选规范阶段（Stage 3: Candidate）：在这个阶段，提案被认为基本成熟，并且已经准备好进入实现阶段。规范草案经过进一步的修改和修订，以解决可能存在的问题和缺陷。在此阶段，通常会有至少两个独立的实现者对提案进行实验和验证。
6. 预备规范阶段（Stage 4: Finished）：在这个阶段，提案被认为已经准备好被纳入 ECMAScript 标准中。它已经被实现并通过广泛的测试和使用。提案作者和 TC39 成员会进行最后的审查和确认，以确保提案在不同实现之间的一致性和互操作性。

7. 标准化阶段（Standardization）（续）：在通过所有阶段并被接受后，提案会被纳入 ECMAScript 标准的下一个版本中。标准发布和更新由 ECMA 国际组织负责。一旦提案通过标准化阶段，它将被纳入 ECMAScript 规范的正式版本，并成为下一个主要版本（如 ECMAScript 2022、2023 等）的一部分。
8. 实现和采用阶段（Implementation and Adoption）：一旦特性被纳入 ECMAScript 标准，各大浏览器厂商和 JavaScript 运行时环境（如 Node.js）会根据标准进行实现和集成。它们会更新其解释器和引擎，以支持新的语言特性。开发者和项目可以在这个阶段开始采用新的 ECMAScript 版本，并在其代码中使用相关特性。

需要注意的是，整个提案过程是一个逐渐演进的过程，从初步的想法到最终的标准发布需要经过多次讨论、反馈和修改。TC39 委员会由来自各大浏览器厂商、JavaScript 运行时环境和社区的专家组成，他们共同参与和决策整个提案过程。

此外，提案的进展和当前阶段可以通过 ECMA 的官方 GitHub 仓库（**[https://github.com/tc39）和 TC39 委员会的会议记录（https://github.com/tc39/meetings）进行跟踪和了解。这些资源提供了对最新提案、讨论和决策的详细信息。](https://github.com/tc39%EF%BC%89%E5%92%8CTC39%E5%A7%94%E5%91%98%E4%BC%9A%E7%9A%84%E4%BC%9A%E8%AE%AE%E8%AE%B0%E5%BD%95%EF%BC%88https://github.com/tc39/meetings%EF%BC%89%E8%BF%9B%E8%A1%8C%E8%B7%9F%E8%B8%AA%E5%92%8C%E4%BA%86%E8%A7%A3%E3%80%82%E8%BF%99%E4%BA%9B%E8%B5%84%E6%BA%90%E6%8F%90%E4%BE%9B%E4%BA%86%E5%AF%B9%E6%9C%80%E6%96%B0%E6%8F%90%E6%A1%88%E3%80%81%E8%AE%A8%E8%AE%BA%E5%92%8C%E5%86%B3%E7%AD%96%E7%9A%84%E8%AF%A6%E7%BB%86%E4%BF%A1%E6%81%AF%E3%80%82)**

### 举例：ECMAScript2020 添加的：

**空值合并运算符（??）** **_[Nullish coalescing operator (??)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)_**

是一个逻辑运算符，当左侧的操作数为  `[null](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null)`  或者  `[undefined](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)`  时，返回其右侧操作数，否则返回左侧操作数。

### [与可选链式运算符（`?.`）的关系](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing#%E4%B8%8E%E5%8F%AF%E9%80%89%E9%93%BE%E5%BC%8F%E8%BF%90%E7%AE%97%E7%AC%A6%EF%BC%88.%EF%BC%89%E7%9A%84%E5%85%B3%E7%B3%BB) **_[Optional chaining (?.)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining)_**

空值合并运算符针对  `undefined`  与  `null`  这两个值，[可选链式运算符（`?.`）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining)  也是如此。在这访问属性可能为  `undefined`  与  `null`  的对象时，可选链式运算符非常有用。

### ECMAScript2023 添加的新语法、特性

原文：

```json
ECMAScript 2023, the 14th edition, introduced the toSorted, toReversed, with, findLast, and findLastIndex methods on Array.prototype and TypedArray.prototype, as well as the toSpliced method on Array.prototype; added support for #! comments at the beginning of files to better facilitate executable ECMAScript files; and allowed the use of most Symbols as keys in weak collections.
```

1. **`toSorted`**, **`toReversed`**, **`with`**, **`findLast`**, and **`findLastIndex`** methods on **`Array.prototype`** and **`TypedArray.prototype`**, as well as the **`toSpliced`** method on **`Array.prototype`**;
   1. **`toSorted`**, **`toReversed`**, **`with`**, **`toSpliced`**
   2. **`findLast`**, and **`findLastIndex  从后面找`**
2. added support for **`#!`** comments at the beginning of files to better facilitate （促进）executable ECMAScript files;
3. allowed the use of most Symbols as keys in weak collections.

   \***\*WeakMap 支持 Symbol 作为键\*\***

### 参考资料

1. [ECMAScript® 2023 Language Specification (tc39.es)](https://tc39.es/ecma262/2023/)
2. https://mp.weixin.qq.com/s/pUALva4GFpMImJZdR-VxnQ
3. add change array by copy types: *https://github.com/microsoft/TypeScript/pull/51367/files*
4. TC39 Finished Proposals: *https://github.com/tc39/proposals/blob/main/finished-proposals.md*
5. https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
