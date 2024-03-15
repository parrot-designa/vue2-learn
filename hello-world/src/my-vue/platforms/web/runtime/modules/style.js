
function updateStyle(oldVnode,vnode){
    const data = vnode.data;

    // 样式属性都定义在data上，如果没有data，则不处理（直接return）
    if(isUndef(data)){
        return ;
    }
}

export default {
    create: updateStyle
}