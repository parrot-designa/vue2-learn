import { normalizeChildren } from "./normalize-children";
import { isTrue } from "./util";
import VNode from "./vnode";
/*
 **这个常量通常用于指示在某些条件下进行简化或基本的规范化处理。
 **在 VNode 的创建和更新过程中，规范化是确保新旧节点结构一致性和正确性的一个步骤，例如转换文本内容为字符串、确保子节点列表是一致的数据类型等。当设置为 SIMPLE_NORMALIZE 时，可能仅执行基本的规范化操作，比如当确定节点结构相对简单不需要深度处理时。
 */
const SIMPLE_NORMALIZE = 1;
/**
 **该常量意味着不论节点结构如何，每次都会执行完整的规范化流程。
 **这涵盖了更复杂的场景，包括但不限于组件树更新、Slot 内容合并、Suspense 等高级功能的支持。
 **在需要确保所有节点都被完全规范化以准备渲染或对比更新时，会使用 ALWAYS_NORMALIZE。
 */
const ALWAYS_NORMALIZE = 2;

function _createElement(context, tag, data, children, normalizationType) {
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  }
  let vnode;
  if (typeof tag === "string") {
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
) {
  //如果确认需要对子节点进行深度操作时，将type变成always类型
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType);
}

function initRender(vm) {
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true);
}

export { initRender };
