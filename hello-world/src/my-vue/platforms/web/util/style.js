import { isArray,toObject } from "@/my-vue/shared/util";

export function normalizeStyleBinding(bindingStyle){
    if (isArray(bindingStyle)) {
        return toObject(bindingStyle)
    }
    if (typeof bindingStyle === 'string') {

    }
    return bindingStyle;
}

export function getStyle(vnode, checkChild){
    const res = {};
    let styleData;


}