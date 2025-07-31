import { createRouter, createWebHistory } from 'vue-router'

//User areas
import Home       from '@/views/Home.vue'
import Team       from '@/views/user/Team.vue'
import Project    from '@/views/user/Project.vue'
import Gallery    from '@/views/user/Gallery.vue'
import Staff from '@/views/user/Staff.vue'
import Board from '@/views/user/Board.vue'
import Professor from '@/views/user/Professor.vue'
import Login from '@/views/login/UserLogin.vue'
import Register from '@/views/login/SignUp.vue'
//Admin areas
import AdminLogin from '@/views/admin/AdminLogin.vue'
import AdminMain from '@/views/admin/adminMain.vue'
import AdminStaff from '@/views/admin/AdminStaff.vue'
import UserManage from '@/views/admin/UserManage.vue'
import ProjectManage from '@/views/admin/AdminProject.vue'


import KakaoRedirectHandler from '@/views/login/KakaoRedirectHandler.vue'
// Importing views for the router
const routes = [
  // User routes
  { path: '/',            component: Home           },
  { path: '/professor',   component: Professor      },
  { path: '/staff',       component: Staff          },
  { path: '/team',        component: Team           },
  { path: '/project',     component: Project        },
  { path: '/board',       component: Board          },
  { path: '/gallery',     component: Gallery        },
  { path: '/login',       component: Login          },
  { path: '/register',    component: Register       },
  // Admin routes
  { path: '/admin-login', component: AdminLogin     },
  { path: '/adminMain', component: AdminMain        },
  { path: '/adminStaff', component: AdminStaff      },
  { path: '/usermanage',   component: UserManage      },
  { path: '/adminproject',   component: ProjectManage      },

  //router
  { path: '/kakao-callback', component: KakaoRedirectHandler }
]

export default createRouter({
  history: createWebHistory(),
  routes,
})

