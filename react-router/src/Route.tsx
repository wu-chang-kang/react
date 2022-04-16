import React, { useContext } from 'react'
import Context, { MatchProps } from './Context'
import { matchPath } from './matchPath'

export interface RouteProps {
  path: string
  computedMatch?: MatchProps
}

const Route: React.FC<RouteProps> = ({ computedMatch, children, path }) => {
  // 获取 Context
  const { location, history } = useContext(Context)
  // props.computedMatch 是包含在 Swtich 在内的时候会传入的一个属性，因此判断该属性是否存在，如果存在，则是使用 Switch 传入进来的 match 对象，如果没有 props.computedMatch，表示 Route 是独立使用，则使用 matchPath 去做匹配，获取到匹配后的结果；
  const match = computedMatch
    ? computedMatch
    : matchPath(location.pathname, path)

  return (
    <Context.Provider value={{ match, location, history }}>
      {/* 匹配成功才渲染 children */}
      {match ? children : null}
    </Context.Provider>
  )
}

export default Route
