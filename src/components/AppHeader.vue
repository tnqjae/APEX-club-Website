<template>
  <header class="fixed top-0 left-0 w-full h-16 px-6 bg-transparent
           flex items-center justify-between z-50">
    <h1 class="text-white text-2xl font-semibold whitespace-nowrap">APEX</h1>

    <!-- 햄버거 -->
    <button class="md:hidden text-white text-3xl" @click="isOpen = !isOpen">
      ☰
    </button>

    <!-- 데스크톱 메뉴 -->
    <nav class="hidden md:flex">
      <ul class="flex gap-10 pr-6">
        <li v-for="m in baseMenu" :key="m.path">
          <RouterLink :to="m.path" class="text-base whitespace-nowrap transition-colors duration-200"
            :class="route.path === m.path ? 'text-[#4174D9]' : 'text-white hover:text-[#4174D9]'">
            {{ m.label }}
          </RouterLink>
        </li>

        <!--로그인 or 로그아웃 메뉴 -->
        <li>
          <template v-if="isLoggedIn">
            <button @click="handleLogout" class="text-white hover:text-[#4174D9] transition-colors duration-200">
              Logout
            </button>
          </template>
          <template v-else>
            <RouterLink to="/login" class="text-white hover:text-[#4174D9] transition-colors duration-200">
              Login
            </RouterLink>
          </template>
        </li>
      </ul>
    </nav>
  </header>

  <!-- 모바일 드롭다운 -->
  <transition name="fade">
    <nav v-if="isOpen" class="md:hidden fixed top-16 left-0 w-full bg-black/90 p-6 space-y-4 z-40">
      <ul>
        <li v-for="m in baseMenu" :key="m.path">
          <RouterLink :to="m.path" class="block text-lg py-1 border-b border-white/10"
            :class="route.path === m.path ? 'text-[#4174D9]' : 'text-white hover:text-[#4174D9]'"
            @click="isOpen = false">
            {{ m.label }}
          </RouterLink>
        </li>

        <!-- ✅ 모바일용 로그인/로그아웃 -->
        <li class="border-t border-white/10 pt-4 mt-4">
          <template v-if="isLoggedIn">
            <button @click="handleLogout" class="text-white hover:text-[#4174D9] block text-lg">
              Logout
            </button>
          </template>
          <template v-else>
            <RouterLink to="/login" class="text-white hover:text-[#4174D9] block text-lg"
              @click="isOpen = false">
              Login
            </RouterLink>
          </template>
        </li>
      </ul>
    </nav>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const isOpen = ref(false)
const route = useRoute()
const router = useRouter()

const userToken = ref(sessionStorage.getItem('userToken'))

const isLoggedIn = computed(() => !!userToken.value)


const baseMenu = [
  { label: 'Home', path: '/' },
  { label: 'Professor', path: '/professor' },
  { label: 'Staff', path: '/staff' },
  { label: 'Team', path: '/team' },
  { label: 'Project', path: '/project' },
  { label: 'Board', path: '/board' },
  { label: 'Gallery', path: '/gallery' },
]

function handleLogout() {
  sessionStorage.removeItem('userToken')
  userToken.value = null
  location.reload() // 새로고침으로 상태 반영
}
</script>