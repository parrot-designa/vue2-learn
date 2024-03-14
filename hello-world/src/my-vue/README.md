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
