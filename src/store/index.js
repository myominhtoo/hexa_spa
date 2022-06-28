import { createStore } from 'vuex'
import News from './modules/News'
import Users from './modules/Users'
import Comments from './modules/Comments'
import Categories from './modules/Categories'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Users,
    News,
    Comments,
    Categories
  }
})
