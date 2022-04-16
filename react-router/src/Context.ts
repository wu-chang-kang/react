import { createContext } from 'react'
import { Location, History } from 'history'
export interface MatchProps {
  path?: string
  url?: string
  params?: Record<string, string>
  isExact?: boolean
}

export interface RouteContextProps {
  history: History
  location: Location
  match: MatchProps | null
}

const RouteContext = createContext<RouteContextProps>({} as RouteContextProps)

export default RouteContext
