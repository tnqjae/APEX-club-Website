import { createRouter, createWebHistory } from 'vue-router'

//User areas
import Home       from '@/views/Home.vue'
import Team       from '@/views/user/Team.vue'
import Project    from '@/views/user/Project.vue'
import Gallery    from '@/views/user/Gallery.vue'
import Staff from '@/views/user/Staff.vue'
import Board from '@/views/user/Board.vue'
import Professor from '@/views/user/Professor.vue'
import Login from '@/views/user/UserLogin.vue'

//Admin areas
import AdminLogin from '@/views/admin/AdminLogin.vue'
import AdminMain from '@/views/admin/adminMain.vue'
import AdminStaff from '@/views/admin/AdminStaff.vue'

// Importing views for the router
const routes = [
  // User routes
  { path: '/',           component: Home       },
  { path: '/professor', component: Professor },
  { path: '/staff',       component: Staff     },
  { path: '/team',       component: Team       },
  { path: '/project',    component: Project    },
  { path: '/board',       component: Board     },
  { path: '/gallery',    component: Gallery    },
  { path: '/login',      component: Login},
  // Admin routes
  { path: '/admin-login', component: AdminLogin },
  { path: '/adminMain', component: AdminMain  },
  { path: '/adminStaff', component: AdminStaff  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})

