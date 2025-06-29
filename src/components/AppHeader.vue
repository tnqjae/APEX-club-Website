<template>
  <header
    class="fixed top-0 left-0 w-full h-16 px-8 bg-black flex items-center justify-between z-50"
  >
    <h1 class="text-white text-2xl font-semibold whitespace-nowrap">APEX</h1>
    <nav>
      <ul class="flex gap-8 list-none m-0 p-0">
        <li
          v-for="item in ['Home', 'Professor', 'Team', 'Student', 'Project', 'Contact']"
          :key="item"
          class="text-white text-base cursor-pointer hover:text-emerald-500 transition"
        >
          {{ item }}
        </li>
      </ul>
    </nav>
  </header>
</template>