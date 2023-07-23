import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WorkView from "@/views/WorkView.vue";
import EducationView from "@/views/EducationView.vue";
import InfoView from "@/views/InfoView.vue";
import ProjectsView from "@/views/ProjectsView.vue";
import ContactView from "@/views/ContactView.vue";
import AboutView from "@/views/AboutView.vue";
import LoginView from "@/views/LoginView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const routes = [
  {
    path: '/',
    name: 'home-view',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about-view',
    component: AboutView
  },
  {
    path: '/work',
    name: 'work-view',
    component: WorkView
  },
  {
    path: '/education',
    name: 'education-view',
    component: EducationView
  },
  {
    path: '/info',
    name: 'info-view',
    component: InfoView
  },
  {
    path: '/projects',
    name: 'projects-view',
    component: ProjectsView
  },
  {
    path: '/contact',
    name: 'contact-view',
    component: ContactView
  },
  {
    path: '/login',
    name: 'login-view',
    component: LoginView
  },
  {
    path: '/:notFound',
    name: 'notfound-view',
    component: NotFoundView
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
