import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import SearchView from '../views/SearchView.vue'
import DetailView from '../views/DetailView.vue'
import AdminHomeView from '../views/admin/AdminHomeView.vue';
import UsersView from '../views/admin/UsersView.vue';
import NewsView from '../views/admin/NewsView.vue';
import CategoriesView from '../views/admin/CategoriesView.vue';
import NewsCommentsView from '../views/admin/NewsCommentsView.vue';
import CommentsView from '../views/admin/CommentsView.vue';
import CreateNewsView from '../views/admin/CreateNewsView.vue';

const routes = [
  {
    path : '/',
    name : 'home',
    component : HomeView,
  },

  {
    path : '/login',
    name : 'login',
    component : LoginView,
  },

  {
    path : '/register',
    name : 'register',
    component : RegisterView
  },
  
  {
    path : '/search',
    name : 'searchPage',
    component : SearchView
  },

  {
    path : '/news/:id',
    name : 'detailPage',
    component : DetailView
  },

  // for dashboard
  {
    path : '/admin/',
    name : 'dashboardHome',
    component : AdminHomeView
  },

  {
    path : '/admin/users',
    name : 'dashboardUsers',
    component : UsersView
  },

  {
    path : '/admin/news',
    name : 'dashboardNews',
    component : NewsView
  },

  {
    path : '/admin/categories',
    name : 'dashboardCategoires',
    component : CategoriesView
  },

  {
    path : '/admin/news/comments',
    name : 'dashboardComments',
    component : NewsCommentsView
  },

  {
    path : '/admin/news/:newsId/comments',
    name : 'dashboardNewsComments',
    component : CommentsView
  },

  {
    path : '/admin/createnews',
    name : 'dashboardCreateNews',
    component : CreateNewsView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
