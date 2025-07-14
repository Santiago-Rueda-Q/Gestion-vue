// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home/Home.vue'
import User from '../views/Crud/User.vue'
import Institution from '../views/Crud/Institution.vue'
import AcademicProgram from '../views/Crud/AcademicProgram.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/usuarios', name: 'Usuarios', component: User },
  { path: '/instituciones', name: 'Instituciones', component: Institution },
  { path: '/programas', name: 'Programas', component: AcademicProgram }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
