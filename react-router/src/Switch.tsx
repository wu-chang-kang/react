import React, { useContext } from 'react'
import Context, { MatchProps } from './Context'
import { matchPath } from './matchPath'

export interface SwitchProps {}

const Switch: React.FC<SwitchProps> = ({ children }) => {
  const { location, match: originMatch } = useContext(Context)

  let element: React.ReactElement = <></>
  let match: MatchProps | null = null
  // 循环 children
  const childrenArr = React.Children.toArray(children)
  for (let i = 0; i < childrenArr.length; i++) {
    const child = childrenArr[i]
    // 有了 Switch 只会匹配第一个，有了第一个就不管了
    if (match === null && React.isValidElement(child)) {
      element = child
      // 判断下面是否有 Route，这儿简单判断 props 里面有没有 path 了
      const path = child.props.path
      // 有就换区新的，没有就用上一个 Route 或者 已经匹配到了的
      match = path
        ? matchPath(location.pathname, child.props.path)
        : originMatch
    } else {
      break
    }
  }

  // Switch 组件会为 Route 传入专门的 computedMatch 属性
  return match
    ? React.cloneElement(element, { location, computedMatch: match })
    : null
}

export default Switch
