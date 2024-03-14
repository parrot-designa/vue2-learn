/**
 * 获取元素的标签名
 * @param {*} node
 * @returns
 */
export function tagName(node) {
  return node.tagName;
}

/**
 * 获取并返回给定节点 node 的父节点
 * @param {*} node
 * @returns
 */
export function parentNode(node) {
  return node.parentNode;
}

/**
 * 获取并返回给定节点 node 的下一个同级节点
 * @param {*} node
 * @returns
 */
export function nextSibling(node) {
  return node.nextSibling;
}

/**
 * 主要用于动态构建、修改或更新 DOM 结构
 * @param {*} node
 * @param {*} child
 */
export function appendChild(node, child) {
  node.appendChild(child);
}

/**
 *
 * @param {*} text
 * @returns
 */
export function createTextNode(text) {
  return document.createTextNode(text);
}
