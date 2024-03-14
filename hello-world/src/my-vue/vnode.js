import { tagName } from "./nodeOpts";

export default class VNode {
  tag;
  data;
  children;
  text;
  elm;
  constructor(tag, data, children, text, elm) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
  }
}

/**
 * 是根据给定的实际 DOM 元素生成一个对应且内容为空的虚拟节点
 * @param {*} elm
 * @returns
 */
export function emptyNodeAt(elm) {
  return new VNode(tagName(elm).toLowerCase(), {}, [], undefined, elm);
}

/**
 * 创建一个文本node
 * @param {} val
 * @returns
 */
export function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
}
