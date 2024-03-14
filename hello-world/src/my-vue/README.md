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

