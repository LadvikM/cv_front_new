import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WorkView from "@/views/WorkView.vue";
import EducationView from "@/views/EducationView.vue";
import InfoView from "@/views/InfoView.vue";
import ProjectsView from "@/views/ProjectsView.vue";
import ContactView from "@/views/ContactView.vue";
import AboutView from "@/views/AboutView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
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
