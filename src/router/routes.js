
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', meta: { requiredAuth: true }, component: () => import('pages/Index.vue') },
      { path: '/todos', meta: { requiredAuth: true }, name: 'todos', component: () => import('pages/todos.vue') },
      { path: '/table', meta: { requiredAuth: true }, component: () => import('pages/table.vue') },
      { path: '/carousel', meta: { requiredAuth: true }, component: () => import('pages/carousel.vue') }
    ]
  },
  { path: '/login', component: () => import('pages/Login.vue') },
  { path: '/register', component: () => import('pages/Register.vue') }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
