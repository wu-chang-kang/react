import { Key, pathToRegexp } from 'path-to-regexp'
/**
 *
 * @param pathname 实际路径
 * @param path 匹配路由路径
 * @returns 包含了路由匹配到的 params 的对象
 */
export function matchPath(pathname: string, path: string) {
  const keys: Key[] = []
  // 根据路由与路径是否匹配成功
  const regexp = pathToRegexp(path, keys)
  // 是否匹配成功
  const match = regexp.exec(pathname)
  // 没有匹配上返回 null
  if (!match) return null
  // 获取值
  const values = match.slice(1)

  return {
    // 获取路由项中的 params
    params: keys.reduce<Record<string, string>>((params, key, index) => {
      params[key.name] = values[index]
      return params
    }, {})
  }
}
