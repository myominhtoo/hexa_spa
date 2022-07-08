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
import FilterNewsView from '../views/FilterNewsView.vue';

import getRouteGuard from '@/router/helper/getRouteGuard.js'

const { forAdmin , forAdminAndReporter } = getRouteGuard();

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
    path : '/news/:id',
    name : 'detailPage',
    component : DetailView
  },

  {
    path : '/news',
    name : 'newsByCategoryPage',
    component : FilterNewsView
  },

  // for dashboard
  {
    path : '/admin/',
    name : 'dashboardHome',
    component : AdminHomeView,
    beforeEnter : [ forAdmin ]
  },

  {
    path : '/admin/users',
    name : 'dashboardUsers',
    component : UsersView,
    beforeEnter : [forAdmin]
  },

  {
    path : '/admin/news',
    name : 'dashboardNews',
    component : NewsView,
    beforeEnter : [ forAdminAndReporter ]
  },

  {
    path : '/admin/categories',
    name : 'dashboardCategoires',
    component : CategoriesView,
    beforeEnter : [ forAdminAndReporter ],
  },

  {
    path : '/admin/news/comments',
    name : 'dashboardComments',
    component : NewsCommentsView,
    beforeEnter : [ forAdminAndReporter ]
  },

  {
    path : '/admin/news/:newsId/comments',
    name : 'dashboardNewsComments',
    component : CommentsView,
    beforeEnter : [ forAdminAndReporter ]
  },

  {
    path : '/admin/createnews',
    name : 'dashboardCreateNews',
    component : CreateNewsView,
    beforeEnter : [ forAdminAndReporter ],
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
