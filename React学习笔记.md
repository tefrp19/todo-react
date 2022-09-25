[TOC]

------



## react渲染组件流程（生命周期）

类式组件：[渲染流程图](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

函数式组件：

​	第一次挂载：

1. 执行函数内部代码
	
2. 根据返回值渲染组件（执行`return`后的代码）

3. 执行`useEffect`中的函数（相当于调用`componentDidMount()`）

  当state更新：

1. 执行`useEffect`中的函数（设置第二个参数，相当于调用`componentDidUpdate()`）





### 阻止组件渲染

类组件render()返回null该组件不会被渲染，但并不会影响生命周期，componentDidUpdate 依然会被调用



### 检测state的值是否更改来更新视图


React会检测state的值是否变化来更新视图。如果state是数组，由于数组是引用值，直接在原数组上修改元素，原数组的引用也不会改变，React则认为state未发生改变不会更新视图，正确做法是修改state后拷贝一份新的state再setState

```jsx
const [data,setData]=useState([])

data.push(1)

setData(data) // wrong

const tempData=[...data]
setData(tempData) // right
```





##  列表

在react列表中需要给每个元素添加一个key值。但如果列表项目的顺序可能会变化，数组索引做key值会导致性能变差，还可能引起组件状态的问题

## 受控组件与非受控组件

在 HTML 中，表单元素（如`<input>`、 `<textarea>` 和 `<select>`）通常自己维护 state，并根据用户输入进行更新。而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 [`setState()`](https://react.docschina.org/docs/react-component.html#setstate)来更新。

我们可以把两者结合起来，使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

如果不需要实时获取输入框的内容（例如实时校验），就可以使用非受控组件

[受控组件和非受控组件的区别与使用](https://goshacmd.com/controlled-vs-uncontrolled-inputs-react/)

## 组件的三大属性

> 组件实例三大属性state/props/ref  只有是类组件才能直接谈这三个属性，如果是函数组件需要用到hooks才能谈这三个属性



### props

当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）（下面代码中的name）以及子组件（children）（`<div>123</div>`）转换为单个对象传递给组件，这个对象被称之为 “props”。

```jsx
function Welcome(props) {  return <h1>Hello, {props.name}</h1>;}

const element = <Welcome name="Sara" >
      	<div>123</div>
      </Welcome>

ReactDOM.render(element,document.getElementById('root'));


```

### state

首先React 元素是[不可变对象](https://en.wikipedia.org/wiki/Immutable_object)。一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI。

根据我们已有的知识，更新 UI 唯一的方式是创建一个全新的元素，并将其传入 [`ReactDOM.render()`](https://react.docschina.org/docs/react-dom.html#render)。

考虑一个计时器的例子：

```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));}

setInterval(tick, 1000);
```

在实践中，大多数 React 应用只会调用一次 [`ReactDOM.render()`](https://react.docschina.org/docs/react-dom.html#render)。当组件频繁地有数据切换时就需要使用state

state是一个组件的私有属性，值是对象（包含多个key-value）



不能直接修改（等号赋值）或更新，需要使用react封装好的setSate()方法

> 类式组件直接在类中调用从React.component继承的setState方法





#### state与生命周期

下面这段代码的功能：每一秒更新Clock组件的状态，渲染新的dom元素

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {    this.setState({      date: new Date()    });  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

这一段代码[发生了什么](https://react.docschina.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class)和这些方法的**调用顺序**：

1. 当 `<Clock />` 被传给 `ReactDOM.render()`的时候，React 会**调用** `Clock` 组件的**构造函数**。因为 `Clock` 需要显示当前的时间，所以它会用一个包含当前时间的对象来初始化 `this.state`。我们会在之后更新 state。
2. **之后** React 会**调用**组件的 `render()` 方法。这就是 React 确定该在页面上展示什么的方式。然后 React 更新 DOM 来匹配 `Clock` 渲染的输出。
3. 当 `Clock` 的输出被插入到 DOM 中**后**，React 就会调用 `ComponentDidMount()` 生命周期方法。在这个方法中，`Clock` 组件向浏览器请求设置一个计时器来每秒调用一次组件的 `tick()` 方法。
4. 浏览器每秒都会调用一次 `tick()` 方法。 在这方法之中，`Clock` 组件会通过调用 `setState()` 来计划进行一次 UI 更新。得益于 `setState()` 的调用，**React 能够知道 state 已经改变了，然后会重新调用 `render()` 方法来确定页面上该显示什么**。这一次，`render()` 方法中的 `this.state.date` 就不一样了，如此以来就会渲染输出更新过的时间。React 也会相应的更新 DOM。
5. 一旦 `Clock` 组件从 DOM 中被移除，React 就会调用 `componentWillUnmount()` 生命周期方法，这样计时器就停止了。

#### State 的更新可能是异步的

出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用。

因为 `this.props` 和 `this.state` 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。

例如，此代码可能会无法更新计数器：

```jsx
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,//increment增量
});
```

要解决这个问题，可以让 `setState()` 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：

```jsx
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

#### State 的更新会被合并

当你调用 `setState()` 的时候，React 会把你提供的对象合并到当前的 state。

#### 特别注意

- 组件（class）中render方法中的this为组件实例对象
- 组件自定义的方法中this为undefined如何解决：
  - 强制绑定this：通过函数对象的bind()
  
  - 箭头函数（箭头函数中this不指向function自身而是function父元素），但使用箭头函数可能会带来性能问题，此语法问题在于每次渲染 `LoggingButton` （下面代码）时都会创建不同的回调函数。在大多数情况下，这没什么问题，但如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的**重新渲染**。我们通常建议在构造器中绑定或使用 class fields 语法来避免这类性能问题。
  
    ```jsx
    class LoggingButton extends React.Component {
      handleClick() {
        console.log('this is:', this);
      }
    
      render() {
        // 此语法确保 `handleClick` 内的 `this` 已被绑定。 
          return (
              <button onClick={() => this.handleClick()}>
                  Click me
              </button>
        );
      }
    }
    ```
  

### [ref](https://react.docschina.org/docs/refs-and-the-dom.html#refs-and-function-components)

类似于dom元素的id属性，我们能通过ref获取到react元素节点做某些事

ref属用于类式组件的实例化对象或真实dom节点（eg：div，p），函数式组件有ref hook

`React.creatRef()`只能用到一个节点上，不能多个

## state状态提升

**当你遇到需要同时获取多个子组件数据，或者两个组件之间需要相互通讯的情况时，需要把子组件的 state 数据提升至其共同的父组件当中保存。之后父组件可以通过 props 将状态数据传递到子组件当中。这样应用当中所有组件的状态数据就能够更方便地同步共享了。**

将组件的 state 提升到父组件的情形在重构 React 组件时经常会遇到

##  路由

### 设置路由步骤

1. 将`<Router><Router/>`（react组件）包裹在整个程序（`<APP/>`）的外部（只包裹一次）
2. 设置`<Route path="/xxx" component=<xxx/>>`监测到路径的变化，当路径发生改变并匹配上对应Route组件中的path内容（匹配有精准匹配和模糊匹配，模糊匹配用于设置多级路由），页面就会发生改变（渲染新的组件）

## HOOK

### 为什么需要hook

它可以让你在不编写 class 的情况下使用 state 、ref以及其他的 React 特性。

### useState 

在这里，`useState` 就是一个 *Hook* （等下我们会讲到这是什么意思）。通过在函数组件里调用它来给组件添加一些内部 state。React 会在重复渲染时保留这个 state。`useState` 会返回一对值：**当前**状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 `this.setState`，但是它不会把新的 state 和旧的 state 进行合并。（我们会在[使用 State Hook](https://react.docschina.org/docs/hooks-state.html) 里展示一个对比 `useState` 和 `this.state` 的例子）。

`useState` 唯一的参数就是初始 state。在上面的例子中，我们的计数器是从零开始的，所以初始 state 就是 `0`。值得注意的是，不同于 `this.state`，这里的 state 不一定要是一个对象 —— 如果你有需要，它也可以是。这个初始 state 参数只有在第一次渲染时会被用到。

### useEffect

useEffect(()=>{})函数体中的内容在组件第一次渲染的时候会执行，在状态更新的时候会执行（可选择监听或不监听部分或全部状态），在组件卸载的时候会执行（可选，如果useEffect有返回函数，在组件卸载的时候会执行这个返回函数）

## context

当祖先组件需要向后代组件（嵌套很深时）传状态时使用context，不用一层一层地通过pros传state

## 事件

React中的事件是经过封装的，默认采用了事件委托



## 创建React应用步骤及React哲学

### 第一步：将设计好的 UI 划分为组件层级

### 第二步：用 React 创建一个静态版本

### [第三步：确定 UI state 的最小（且完整）表示](https://react.docschina.org/docs/thinking-in-react.html#step-3-identify-the-minimal-but-complete-representation-of-ui-state)

### 第四步：确定 state 放置的位置

### 第五步：添加反向数据流



## [深入JSX](https://react.docschina.org/docs/jsx-in-depth.html)

### 函数作为子元素

通常，JSX 中的 JavaScript 表达式将会被计算为字符串、React 元素或者是列表。不过，`props.children` 和其他 prop 一样，它可以传递任意类型的数据，而不仅仅是 React 已知的可渲染类型。例如，如果你有一个自定义组件，你可以把回调函数作为 `props.children` 进行传递：

```jsx
// 调用子元素回调 numTimes 次，来重复生成组件
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}    </Repeat>
  );
}
```

你可以将任何东西作为子元素传递给自定义组件，只要确保在该组件渲染之前能够被转换成 React 理解的对象。这种用法并不常见，但可以用于扩展 JSX。



### [在 JSX类型中使用点语法](https://react.docschina.org/docs/jsx-in-depth.html#using-dot-notation-for-jsx-type)

在 JSX 中，你也可以使用点语法来引用一个 React 组件。当你在一个模块中导出许多 React 组件时，这会非常方便

```jsx
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;}
```

## 高阶函数与函数柯里化

### 高阶函数定义

如果一个函数符合下面两个规范之一该函数称为高阶函数

1. 函数接收的参数是一个函数
2. 函数的返回值是一个函数

### 函数柯里化定义

柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数

## 配置代理

`package.json`中配置代理：e.g."proxy": "http://127.0.0.1:8000"



## 项目工程化

### [webpack静态模块打包工具](https://webpack.docschina.org/concepts/)

### 开发模式（环境）和生产模式（环境）

#### npm start

在开发环境下对项目根目录执行`npm start`，可以实时观看代码更新情况

#### npm build

对项目根目录执行`npm build`，会生成文件夹build，打包发布

`npm install -g serve`

`serve build`

## [虚拟滚动](https://cloud.tencent.com/developer/article/1658852)

**虚拟滚动——指的是只渲染可视区域的列表项，非可见区域的**完全不渲染，在滚动条滚动时动态更新列表项。



## axios

### [axios url携带参数问题(params与data的区别)](https://www.cnblogs.com/xing-29391/p/14430039.html)

1、data参数适用于 post、put、patch请求，使用data时url中不会携带参数，data是将参数添加到请求体（body）中

2、params参数适用于get请求，params将参数添加到url的请求字符串中，因此**使用params时url中会携带参数**