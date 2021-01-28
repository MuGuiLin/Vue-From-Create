import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import('../views/Form.vue')
  },
  {
    path: '/draggable',
    name: 'Draggable',
    component: () => import('../views/Draggable/Index.vue'),
    children: [
      {
        path: '/',
        name: 'Demo',
        component: () => import('../views/Draggable/Demo.vue')
      },
      {
        path: '/draggable/many',
        name: 'Many',
        component: () => import('../views/Draggable/Many.vue')
      },
      {
        path: '/draggable/table',
        name: 'Table',
        component: () => import('../views/Draggable/Table.vue')
      }

    ]
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('../views/Create.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
