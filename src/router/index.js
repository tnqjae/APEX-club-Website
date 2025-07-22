import { createRouter, createWebHistory } from 'vue-router'

import Home       from '@/views/Home.vue'
import Professor  from '@/views/Professor.vue'
import Team       from '@/views/Team.vue'
import Project    from '@/views/Project.vue'
import Gallery    from '@/views/Gallery.vue'
import Staff from '@/views/Staff.vue'
import Board from '@/views/Board.vue'

const routes = [
  { path: '/',           component: Home       },
  { path: '/professor',  component: Professor  },
  { path: '/staff',       component: Staff     },
  { path: '/team',       component: Team       },
  { path: '/project',    component: Project    },
  { path: '/board',       component: Board     },
  { path: '/gallery',    component: Gallery    },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})

