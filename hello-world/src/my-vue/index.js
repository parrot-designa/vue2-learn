import Watcher from "./watch";

function Vue(options) {
    console.log("我是vue实例",options);
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

export default Vue;