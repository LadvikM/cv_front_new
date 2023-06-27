import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WorkView from "@/views/WorkView.vue";
import EducationView from "@/views/EducationView.vue";
import InfoView from "@/views/InfoView.vue";
import ProjectsView from "@/views/ProjectsView.vue";
import ContactView from "@/views/ContactView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/work',
    name: 'work',
    component: WorkView
  },
  {
    path: '/education',
    name: 'education',
    component: EducationView
  },
  {
    path: '/info',
    name: 'info',
    component: InfoView
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectsView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
