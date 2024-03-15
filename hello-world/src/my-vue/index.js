import Watcher from "./watch";
import { initRender } from "./render";
import { isDef, isArray } from "./util";
import { emptyNodeAt } from "./vnode";
import { parentNode, createTextNode,nextSibling, appendChild,createElement,insertBefore } from "./nodeOpts";

function Vue(options) {
  console.log("我是vue实例", options);
  this._init(options);
}

// 获取真实dom节点
function query(el) {
  if (typeof el === "string") {
    const selected = document.querySelector(el);
    return selected;
  } else {
    return el;
  }
}

// 挂载dom节点的方法
function mountComponent(vm, el) {
  // 将el挂载在vue实例上,赋值给$el属性上
  vm.$el = el;

  let updateComponent;

  updateComponent = () => {
    console.log("updateComponent");
    vm._update(vm._render());
  };

  new Watcher(vm, updateComponent);
}

Vue.prototype.$mount = function (el) {
  el = el ? query(el) : undefined;
  mountComponent(this, el);
};

function mergeOptions(options) {
  return options;
}

Vue.prototype._init = function (options) {
  const vm = this;
  vm.$options = mergeOptions(options || {});
  initRender(vm);
};

Vue.prototype._render = function () {
  const vm = this;
  const { render } = vm.$options;
  let vnode;
  vnode = render.call(vm, vm.$createElement);
  return vnode;
};

/**
 *
 * @param {*} vnode 传入的需要渲染的vnode
 */
Vue.prototype._update = function (vnode) {
  const vm = this;
  // 上一次vnode 为空表示是第一次渲染
  const prevVnode = vm._vnode;
  vm._vnode = vnode;
  if (!prevVnode) {
    //初次渲染
    vm.$el = vm.__patch__(vm.$el, vnode);
  }
};

/**
 * 
 * @param {*} oldVnode 表示当前已存在于DOM中的虚拟节点（Virtual Node），它是上次渲染时生成的VNode对象，代表了之前的状态或UI结构
 * @param {*} vnode 新的虚拟节点，是本次渲染后生成的VNode对象，代表了应用当前状态应有的UI结构。
 */
Vue.prototype.__patch__ = function (oldVnode, vnode) {
    debugger;
  //初次渲染时oldVnode为div#app
  const isRealElement = isDef(oldVnode.nodeType);

  oldVnode = emptyNodeAt(oldVnode);

  //div#app
  const oldElm = oldVnode.elm;
  //body
  const parentElm = parentNode(oldElm);

  function insert(parent, elm, ref) {
    if (isDef(parent)) {
        //如果有相邻节点
        if(isDef(ref)){
            if (parentNode(ref) === parent) {
                insertBefore(parent, elm, ref)
            }
        }else{
            appendChild(parent, elm);
        } 
    }
  }

  /**
   * 根据vnode的children创建节点
   * @param {} vnode
   * @param {*} children
   */
  function createChildren(vnode, children) {
    // children只有2种情况 一种是各种类型组成的数组 另一种是纯文本类型
    if (isArray(children)) {
      for (let i = 0; i < children.length; ++i) {
        createElm(children[i], [], vnode.elm, null);
      }
    }
  }

  /**
   * 第四个参数 refElm 主要是用来控制新创建的DOM元素在DOM树中的精确位置，特别是在有ref或者其他特殊定位需求的情况下。如果该参数存在，则Vue会确保新创建的元素相对于这个参照元素进行正确的位置插入。例如，在列表渲染中，当新的元素需要插入到某个特定索引处时，就会用到这个参数来指定其在兄弟节点之间的相对位置。
   * @param {*} vnode 当前要创建或更新的真实DOM所对应的虚拟节点
   * @param {*} todoList 这是一个队列，用于收集已插入DOM树的新节点，主要用于组件延迟回调和异步碎片化更新等优化操作。
   * @param {*} parentElm 父级DOM元素的引用，新创建的DOM元素将会被插入到这个父元素下。
   * @param {*} refElm 参考/相邻DOM元素的引用，这通常是指定ref属性时对应的DOM节点，新创建的DOM元素将根据需要按照特定顺序插入到这个参考元素之前或之后
   */
  function createElm(vnode, todoList, parentElm, refElm) {
    const tag = vnode.tag;
    const children = vnode.children;

    // 如果vnode有标签
    if (isDef(tag)) {
        vnode.elm = createElement(tag,vnode);
        createChildren(vnode, children); 
        insert(parentElm, vnode.elm, refElm);
      // 如果没有标签 比如文本类型
    } else {
      vnode.elm = createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  createElm(vnode, [], parentElm, nextSibling(oldElm));
  console.log("__patch__", oldVnode, vnode, oldElm, parentElm);
};

export default Vue;
