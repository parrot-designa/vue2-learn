import Watcher from "./watch";
import { initRender } from "./render";

function Vue(options) {
    console.log("我是vue实例",options);
    this._init(options);
}

// 获取真实dom节点
function query(el){
    if(typeof el === 'string'){
        const selected = document.querySelector(el);
        return selected;
    } else {
        return el;
    }
}

// 挂载dom节点的方法
function mountComponent(vm, el){
    // 将el挂载在vue实例上,赋值给$el属性上
    vm.$el = el;

    let updateComponent;

    updateComponent = () => {
        console.log("updateComponent")
        vm._update(vm._render());
    }

    new Watcher(
        vm,
        updateComponent
    );

}

Vue.prototype.$mount = function(el){
    el = el ? query(el) : undefined;
    mountComponent(this, el);
} 

function mergeOptions(options){
    return options;
}
 
Vue.prototype._init = function(options){
    const vm = this;
    vm.$options = mergeOptions(
        options || {}
    );
    initRender(vm);
}

Vue.prototype._render = function(){
    const vm = this;
    const { render } = vm.$options;
    let vnode;
    vnode = render.call(vm, vm.$createElement);
    return vnode
} 
 
/**
 * 
 * @param {*} vnode 传入的需要渲染的vnode
 */
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

Vue.prototype.__patch__ = function(oldVnode, vnode){
    console.log("__patch__", oldVnode,vnode);
}

export default Vue;