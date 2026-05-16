import * as components from './components'
import './style.css'

const install = (app) => {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component)
  })
}

export default { install }
export * from './components'
