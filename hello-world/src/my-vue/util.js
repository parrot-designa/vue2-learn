

/**
 * 判断是否是true
 */
export function isTrue(v) {
    return v === true
}

/**
 * 判断是否是原始类型
 */
export function isPrimitive(value) {
    return (
      typeof value === 'string' ||
      typeof value === 'number' ||
      // $flow-disable-line
      typeof value === 'symbol' ||
      typeof value === 'boolean'
    )
}

/**
 * 判断是否存在
 */
export function isDef(v) {
  return v !== undefined && v !== null
}