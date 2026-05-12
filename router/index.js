import {createRouter,createWebHistory}
from 'vue-router'

import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Pacientes from '../views/Pacientes.vue'
import Citas from '../views/Citas.vue'

const routes = [
 {path:'/',component:Login},
 {path:'/dashboard',component:Dashboard},
 {path:'/pacientes',component:Pacientes},
 {path:'/citas',component:Citas}
]

export default createRouter({
 history:createWebHistory(),
 routes
})
