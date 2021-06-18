import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import CreateProject from '../views/projects/CreateProject.vue'
import ProjectDetails from '../views/projects/ProjectDetails.vue'
import UserProjects from '../views/projects/UserProjects.vue'

// route guard
import { projectAuth } from '../firebase/config'

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (!user) {
    next({ name: 'Login' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/projects/create',
    name: 'CreateProject',
    component: CreateProject,
    beforeEnter: requireAuth
  },
  {
    path: '/projects/:id',
    name: 'ProjectDetails',
    component: ProjectDetails,
    beforeEnter: requireAuth,
    props: true
  },
  {
    path: '/projects/user',
    name: 'UserProjects',
    component: UserProjects,
    beforeEnter: requireAuth
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
