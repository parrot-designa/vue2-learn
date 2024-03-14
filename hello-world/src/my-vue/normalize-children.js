import { isPrimitive } from "./util";
import { createTextVNode } from "./vnode";

export function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : undefined;
}
