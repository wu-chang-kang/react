import React, { useState, useCallback } from 'react'
import { createBrowserHistory } from 'history'
import Context from './Context'
const history = createBrowserHistory()

const BrowserRouter: React.FC = ({ children }) => {
  // 保存 history.location
  const [location, setLocation] = useState(history.location)
  // 初始化 match 对象
  const computeRootMatch = useCallback((pathname) => {
    return { path: '/', url: '/', params: {}, isExact: pathname === '/' }
  }, [])
  // 监听 location 的变化
  history.listen(({ location }) => {
    setLocation(location)
  })
  // 本质上其实是个 Provider
  return (
    <Context.Provider
      value={{ history, location, match: computeRootMatch(location.pathname) }}
    >
      {children}
    </Context.Provider>
  )
}

export default BrowserRouter
