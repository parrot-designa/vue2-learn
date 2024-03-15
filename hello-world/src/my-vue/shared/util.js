/**
 * 判断值是否是undefined或者null
 * @param {*} v 
 * @returns 
 */
export function isUndef(v) {
    return v === undefined || v === null
}

/**
 * 作用是将一个对象的所有可枚举属性复制到另一个对象
 * @param {*} to 
 * @param {*} _from 
 * @returns 
 */
export function extend(to, _from){
    // 遍历_from对象的所有可枚举属性（包括自有属性和继承属性）
    for(const key in _from){
        // 将_from对象当前迭代到的属性名及其对应的值复制到to对象中
        to[key] = _from[key];
    }
    // 函数执行完后返回被修改过的to对象
    return to;
}

/**
 * 合并一个对象数组为单个对象。
 * @param {*} arr 
 * @returns 
 */
export function toObject(arr){
    // 创建一个空对象用于存储合并后的结果
    const res = {}

    // 遍历传入的对象数组
    for (let i = 0; i < arr.length; i++) {
        // 检查当前元素是否非空（避免合并undefined或null）
        if (arr[i]) {
            // 使用extend函数将当前数组元素的所有属性复制到结果对象res中
            extend(res, arr[i])
        }
    }
    return res
}

/**
 * 判断是否是一个数组
 */
export const isArray = Array.isArray;


/**
 * 定义了一个名为 cached 的高阶函数，它接收一个参数 fn（通常是一个计算密集型或资源消耗型的函数），并返回一个新的函数 cachedFn。新函数的作用是对传入的相同参数执行一次 fn 并缓存结果，后续对同一参数的调用将直接返回缓存的结果，从而提高性能
 * @param {*} fn 
 * @returns 
 */
export function cached(fn){
    // 创建一个空对象用于存储缓存结果
    const cache = Object.create(null);

    // 返回一个新的函数cachedFn
    return function cachedFn(str){

        // 检查cache中是否存在对应str的缓存结果
        const hit = cache[str];

        // 1.如果存在缓存结果，则直接返回缓存结果
        // 2.如果不存在缓存结果，则执行原函数fn并将结果缓存到cache中，然后返回结果
        return hit || (cache[str] = fn(str))
    }
}