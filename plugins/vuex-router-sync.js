//store.state.route.path   current path (string)
//store.state.route.params current params (object)
//store.state.route.query  current query (object)
import { sync } from 'vuex-router-sync'
export default ({ app: { store, router } }) => {
    sync(store, router)
}
