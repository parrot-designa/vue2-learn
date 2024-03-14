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