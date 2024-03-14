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

Vue.prototype.$mount = function(el){
    el = el ? query(el) : undefined;
}

export default Vue;