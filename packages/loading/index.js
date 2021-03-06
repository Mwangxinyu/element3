import directive from './directive'
import service from './service'

export function useLoading() {
  return service
}

export default {
  install(app) {
    app.use(directive)
  },
  service
}
