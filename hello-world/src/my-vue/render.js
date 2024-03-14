import VNode from "./vnode";

function _createElement(
    context,
    tag,
    data,
    children,
    normalizationType
){
    let vnode;
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