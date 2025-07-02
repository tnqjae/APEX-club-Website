<template>
  <router-view />
  <AppHeader />
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import router from './router';
</script>