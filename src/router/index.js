import { createRouter, createWebHistory } from 'vue-router'

import Home       from '@/views/Home.vue'
import Professor  from '@/views/Professor.vue'
//import Team       from '@/views/Team.vue'
//import Student    from '@/views/Student.vue'
//import Project    from '@/views/Project.vue'
//import Gallery    from '@/views/Gallery.vue'

const routes = [
  { path: '/',           component: Home       },
  { path: '/professor',  component: Professor  },
  //{ path: '/team',       component: Team       },
  //{ path: '/student',    component: Student    },
  //{ path: '/project',    component: Project    },
  //{ path: '/gallery',    component: Gallery    },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})

