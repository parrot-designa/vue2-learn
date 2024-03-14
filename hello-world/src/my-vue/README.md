# 1.新建index.js入口文件编写Vue实例函数

```js
function Vue(options) {
    console.log("我是vue实例",options);
}

export default Vue;
```

# 2.在Vue实例上定义$mount方法

这里需要传入挂载的节点或者节点的选择器，这里编写query方法来根据选择器查询真实DOM

```js
// 获取真实dom节点
function query(el){
    if(typeof el === 'string'){
        const selected = document.querySelector(el);
        return selected;
    } else {
        return el;
    }
}

Vue.prototype.$mount = function(el){
    el = el ? query(el) : undefined;
}
```

#  3.定义mountComponent方法进行节点的挂载

这里的_update和_render方法，是Vue中定义的，分别起挂载DOM喝创建vnode的方法

```js
Vue.prototype.$mount = function(el){
    el = el ? query(el) : undefined;
    mountComponent(this, el);
}

// 挂载dom节点的方法
function mountComponent(vm, el){
    // 将el挂载在vue实例上,赋值给$el属性上
    vm.$el = el;

    let updateComponent;

    updateComponent = () => {
        vm._update(vm._render());
    } 
}
```

# 4.定义Watch类

上节我们说到updateComponent方法是渲染dom的方法，那么updateComponent是什么时候执行的呢？在Vue源码中，初始化渲染时，是通过watch类的回调函数执行，由于这个类代码量较多，我们把他单独抽成一个watch.js文件。

watch类是Vue实现响应式系统的核心类之一，这个类主要负责数据监听和更新视图的功能。

这里只定义了初始化的一些代码逻辑，可以看到在构造函数初始化时将updateComponent方法赋值给getter属性，然后再执行getter方法，也就是执行updateComponent方法。

```js
export default class Watcher {
    vm;
    getter;
    constructor(vm,updateFunc){
        this.vm = vm;
        this.getter = updateFunc

        //执行updateFunc
        this.get();
    }

    get(){
        const vm = this.vm;
        this.getter.call(vm, vm)
    }
}
```

# 5.定义_init方法中赋值$options的逻辑

在实例化Vue时，会调用init方法来初始化一些用户传入的选项，赋值到vue实例上以便调用。

为了简化操作，直接将$option赋值为用户传入的option

```js
function mergeOptions(options){
    return options;
}
 
Vue.prototype._init = function(options){
    const vm = this;
    vm.$options = mergeOptions(
        options || {}
    );
}
```

# 6.编写一些工具函数（在后面章节中可以用到）

新建了一个util.js文件

```js
/**
 * 判断是否是一个数组
 */
export const isArray = Array.isArray;

/**
 * 判断是否是true
 */
export function isTrue(v) {
    return v === true
}

/**
 * 判断是否是原始类型
 */
export function isPrimitive(value) {
    return (
      typeof value === 'string' ||
      typeof value === 'number' ||
      // $flow-disable-line
      typeof value === 'symbol' ||
      typeof value === 'boolean'
    )
}
```

# 7.$createElement方法

vue实例上定义的$createElement方法是在_init方法中定义了，源码中是initRender方法，我们新建一个render.js文件。

```js
Vue.prototype._init = function(options){ 
    initRender(vm);
}

import VNode from "./vnode";

function _createElement(
    context,
    tag,
    data,
    children,
    normalizationType
){
    let vnode;
    //如果tag为 div h1 等
    if(typeof tag === 'string'){
        vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
    return vnode;
}


/**
 * 
 * @param {*} context 当前组件实例（Component）
 * @param {*} tag 即将创建的元素标签名，可以是HTML原生标签名，也可以是组件名称
 * @param {*} data 与该元素相关的数据对象，通常包含props、attrs、事件监听器等信息
 * @param {*} children 子节点列表，可以是字符串、数字、VNode对象或它们组成的数组
 * @param {*} normalizationType 规范化类型，用于指定如何处理和标准化子节点。在Vue中，这是一个内部使用的标志位，用于优化更新过程
 * @param {*} alwaysNormalize 一个布尔值，表示是否始终对子节点进行规范化处理
 */
function createElement(
    context,
    tag,
    data,
    children,
    normalizationType,
    alwaysNormalize
){
    return _createElement(context, tag, data, children, normalizationType);
}

function initRender(vm){
    vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)
}

export {
    initRender
}
```


# 8._render方法

实际上就是调用用户传入的render方法，传入$createElement方法生成vnode

```js
Vue.prototype._render = function(){
    const vm = this;
    const { render } = vm.$options;
    let vnode;
    vnode = render.call(vm, vm.$createElement);
    return vnode
}
```

# 9._update方法

```js
Vue.prototype._update = function(vnode){
    const vm = this;
    // 上一次vnode 为空表示是第一次渲染
    const prevVnode = vm._vnode
    vm._vnode = vnode;
    if(!prevVnode){
        //初次渲染
        vm.$el = vm.__patch__(vm.$el, vnode);
    }
}
```