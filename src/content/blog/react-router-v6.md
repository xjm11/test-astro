---
title: 学习react-router v6
pubDate: "2023-03-19 23:08:16"
description: "本质就是监听 URL 的变化，然后匹配路由规则，找页面，显示页面"
heroImage: "/placeholder-hero.jpg"
---

在 React 前端项目中，使用前端路由，想必大家对 react-router-dom 肯定都很熟悉，那它的实现原理是什么？路由跟组件是怎么关联起来的？这些疑问肯定很困扰着你。

具体使用，可以参考官方手册。

## 基础实现原理

无需刷新页面，切换页面，客户端自行获取页面数据，为用户提供更快的页面切换体验。这也是前端 SPA 的概念。

原理：本质就是监听 URL 的变化，然后匹配路由规则，找到对应的页面，显示页面。

web 下路由模式有俩种，”Hash“和”History“

### Hash 模式

hash 模式是通过 hashchange 事件 监听 URL 的变化

### History 模式

基于 Html5 的 History，主要方法有 go，back，forward，pushState，replaceState 等。

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/281a535d-c04e-486b-8f2f-a12041aa6131/Untitled.png)

react-router-dom 在实践是使用的是 history 库。可以在 JavaScript 运行的任何地方轻松管理会话历史记录。history 库 抽象出各种环境中的差异，并提供一个最小的 API，使您可以管理历史堆栈、导航和在会话之间保持状态。兼容跨平台。

history 链接：https://github.com/remix-run/history

它的基本使用如下

```jsx
//基本 使用
import { createHistory } from "history";

const history = createHistory();

// 当前的地址
const location = history.getCurrentLocation();

// 监听当前的地址变换
const unlisten = history.listen((location) => {
  console.log(location.pathname);
});

// 将新入口放入历史堆栈
history.push({
  pathname: "/the/path",
  search: "?a=query",

  // 一些不存在url参数上面的当前url的状态值
  state: { the: "state" },
});

// When you're finished, stop the listener
unlisten();
```

这里的 location 对象 包括

```
pathname      同window.location.pathname
search        同window.location.search
state         一个捆绑在这个地址上的object对象
action        PUSH, REPLACE, 或者 POP中的一个
key           唯一ID
```

### React Router v6 的架构设计

这里阅读的源码是版本是 v6.3.0， 在 v6.4.0 以上 React Router 中添加了 loader 等加载数据的逻辑，目前只看核心设计理念，所有采用的是 v6.3.0。

### 文件结构

采用基于 Yarn 的 Monorepo 方案：

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/32be807e-1877-418b-a5c4-5eed3ccc0859/Untitled.png)

其核心是 react-router-dom 和 react-router

## 整体设计模式： Context

### BrowserRouter

作为最外层的组件，创建的 history 对象，监听路由变化，并更新 action 和 location 的信息。 传递到 Router 组件中。

使用：

```jsx
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

//./app.tsx
import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}
```

具体源码如下：

```jsx
/**
 * A `<Router>` for use in web browsers. Provides the cleanest URLs.
 */
export function BrowserRouter({
  basename,
  children,
  window,
}: BrowserRouterProps) {
  let historyRef = React.useRef<BrowserHistory>();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({ window });
  }

  let history = historyRef.current;
  let [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  });

//监听
  React.useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
}

```

### Router

为应用程序的其余部分提供位置上下文。 主要是构建了 Location 和 Navigation 的 Context 组件，中间的代码主要是构建参数

源码如下：

```jsx
export function Router({
  basename: basenameProp = "/",
  children = null,
  location: locationProp,
  navigationType = NavigationType.Pop,
  navigator,
  static: staticProp = false,
}: RouterProps): React.ReactElement | null {
  let basename = normalizePathname(basenameProp);
  let navigationContext = React.useMemo(
    () => ({ basename, navigator, static: staticProp }),
    [basename, navigator, staticProp]
  );

  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }

  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default",
  } = locationProp;

  let location = React.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);

    if (trailingPathname == null) {
      return null;
    }

    return {
      pathname: trailingPathname,
      search,
      hash,
      state,
      key,
    };
  }, [basename, pathname, search, hash, state, key]);

  if (location == null) {
    return null;
  }

  return (
    <NavigationContext.Provider value={navigationContext}>
      <LocationContext.Provider
        children={children}
        value={{ location, navigationType }}
      />
    </NavigationContext.Provider>
  );
}
```

### useRoutes

返回匹配当前 location 的路由 element，用正确的 context 准备以呈现路由树的剩余部分。树中的 Route elements 必须 用 <Outlet> 来呈现它们的子 Route 元素。

```jsx
export function useRoutes(
  routes: RouteObject[],
  locationArg?: Partial<Location> | string
): React.ReactElement | null {
  let { matches: parentMatches } = React.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  let parentPathname = routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  let parentRoute = routeMatch && routeMatch.route;

  let locationFromContext = useLocation();

  let location;
  if (locationArg) {
    let parsedLocationArg =
      typeof locationArg === "string" ? parsePath(locationArg) : locationArg;

    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }

  let pathname = location.pathname || "/";
  let remainingPathname =
    parentPathnameBase === "/"
      ? pathname
      : pathname.slice(parentPathnameBase.length) || "/";

  //匹配路由 传入routes，路径
  let matches = matchRoutes(routes, { pathname: remainingPathname });

  return _renderMatches(
    matches &&
      matches.map((match) =>
        Object.assign({}, match, {
          params: Object.assign({}, parentParams, match.params),
          pathname: joinPaths([parentPathnameBase, match.pathname]),
          pathnameBase:
            match.pathnameBase === "/"
              ? parentPathnameBase
              : joinPaths([parentPathnameBase, match.pathnameBase]),
        })
      ),
    parentMatches
  );
}
```

matchRoutes 函数

```jsx
export function matchRoutes(
  routes: RouteObject[],
  locationArg: Partial<Location> | string,
  basename = "/"
): RouteMatch[] | null {
  let location =
    typeof locationArg === "string" ? parsePath(locationArg) : locationArg;

  let pathname = stripBasename(location.pathname || "/", basename);

  if (pathname == null) {
    return null;
  }

  // 深度遍历：打平路由配置树结构
  let branches = flattenRoutes(routes);
  // 权重排序，决定路由匹配优先级
  rankRouteBranches(branches);

  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    matches = matchRouteBranch(branches[i], pathname);
  }

  return matches;
}
```

### **渲染**

`_renderMatches()`  函数将  `matchRoutes()`  的结果渲染为 React 元素：

[https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zibiajUhPX5HOKr6rELQ97icLI1EOq9TUKQIrkictRuJazFdziciaryhc1Lcz21uO0qB2uXcKNAGE3aicIPg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1](https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zibiajUhPX5HOKr6rELQ97icLI1EOq9TUKQIrkictRuJazFdziciaryhc1Lcz21uO0qB2uXcKNAGE3aicIPg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这个函数为每个匹配组路由组（嵌套路由）建立  `RouteContext`，children 即为需要渲染的 React 元素。

其中比较巧妙的设计是利用  `reduceRight()`  方法，从右往左开始遍历，也就是从子到父的嵌套路由顺序，将前一项的 React 节点作为下一个 React 节点的  `outlet` (这里的 outlet 就是渲染当前的渲染结果)。

其中  `outlet`  是一个非常核心的概念，其用于嵌套路由场景，outlet 的渲染实现方式可参考下文中的  `useOutlet()` Hooks。

### react-router 的核心文件：

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/704d81cc-bb9b-493a-84dd-ee57ec51e0a4/Untitled.png)

context 主要是三个上下文，从里到外是 RouteContext， LocationContext，NavigationContext

hooks 里面是要用的所有的 hooks

router 包含了匹配路由等逻辑

components 中包含了组件 Route，Router，Outlet，Navigate 等

结合 react-router-dom 里面的上下文，从外到里就是：

BrowserRouter→ Router → NavigationContext → LocationContext → RouteContext → 【 Element, Outlet 】

### useLocation

`LocationContext`  中获取 location 对象：

```jsx
/**
 * Returns the current location object, which represents the current URL in web
 * browsers.
 */
export function useLocation(): Location {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useLocation() may be used only in the context of a <Router> component.`
  );

  return React.useContext(LocationContext).location;
}
```

useNavigator
`useNavigate()`  的实现主要是从  `NavigationContext`、`RouteContext`  以及  `LocationContext`
  中获取相关路由数据、Location 和 navigator 实例，然后根据不同的入参调用相应的执行跳转逻辑。

### useOutlet

使用 RouteContext 中的 outlet 属性， 然后进行渲染

```jsx
/**
 * Returns the element for the child route at this level of the route
 * hierarchy. Used internally by <Outlet> to render child routes.
 *
 * @see https://reactrouter.com/docs/en/v6/api#useoutlet
 */
export function useOutlet(context?: unknown): React.ReactElement | null {
  let outlet = React.useContext(RouteContext).outlet;
  if (outlet) {
    return (
      <OutletContext.Provider value={context}>{outlet}</OutletContext.Provider>
    );
  }
  return outlet;
}
```

### Outlet

调用了 useOutlet，在嵌套路由中，使用<Outlet>来代表嵌套的匹配子路由元素

```

/**
 * Renders the child route's element, if there is one.
 *
 * @see https://reactrouter.com/docs/en/v6/api#outlet
 */
export function Outlet(props: OutletProps): React.ReactElement | null {
  return useOutlet(props.context);
}
```
