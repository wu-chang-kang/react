import React from 'react'
import Context from './Context'

export function useParams() {
  return useMatch()?.params
}

export function useMatch() {
  return React.useContext(Context).match
}

export function useHistory() {
  return React.useContext(Context).history
}

export function useLocation() {
  return React.useContext(Context).location
}
