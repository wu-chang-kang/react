// 简易的 history 库
function parsePath(path?: string) {
  let partialPath = {
    hash: '',
    search: '',
    pathname: ''
  }

  if (path) {
    // 判断 hash
    let hashIndex = path.indexOf('#')
    if (hashIndex >= 0) {
      partialPath.hash = path.substr(hashIndex)
      path = path.substr(0, hashIndex)
    }

    // 判断 query
    let searchIndex = path.indexOf('?')
    if (searchIndex >= 0) {
      partialPath.search = path.substr(searchIndex)
      path = path.substr(0, searchIndex)
    }

    // pathname，此时的 path 只剩原始的 pathname
    if (path) {
      partialPath.pathname = path
    }
  }

  return partialPath
}
interface Location {
  pathname: string
  search: string
  hash: string
  state: Record<string, any> | null
}

interface Update {
  location: Location
}

function getLocation(): Location {
  const { pathname, search, hash } = window.location
  return Object.freeze({
    pathname,
    search,
    hash,
    state: null
  })
}

function getNextLocation(to: string, state: null | Record<string, any> = null) {
  return Object.freeze({
    ...parsePath(to),
    state
  })
}

let location = getLocation()
let listeners: ((update: Update) => void)[] = []

function push(to: string, state: null | Record<string, any>) {
  // 推送操作，同时执行 listens
  location = getNextLocation(to, state)
  window.history.pushState(state, '', to)
  listeners.forEach((fn) => fn({ location }))
}

function listen(fn: (update: Update) => void) {
  listeners.push(fn)
  // unlisten
  return function () {
    listeners = listeners.filter((listener) => listener !== fn)
  }
}

// 做浏览器操作时候的监听，比如回退按钮，history.back()或者history.forward()
window.addEventListener('popstate', () => {
  location = getLocation()
  listeners.forEach((fn) => fn({ location }))
})

export const history = {
  get location() {
    return location
  },
  push,
  listen
}
