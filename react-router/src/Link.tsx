import React, { useContext, useCallback } from 'react'
import Context from './Context'

export interface LinkProps {
  to: string
  replace?: boolean
}

const Link: React.FC<LinkProps> = ({ to, replace, children }) => {
  const { history } = useContext(Context)

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      if (replace) {
        history.replace(to)
      } else {
        history.push(to)
      }
    },
    [history, to, replace]
  )

  // 虽然是 a 标签，但是不能用原生的跳转事件
  return (
    <a href={to} onClick={onClick}>
      {children}
    </a>
  )
}

export default Link
