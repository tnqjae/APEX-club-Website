import { createRouter, createWebHistory } from "vue-router";

const routers = [
    {path : '/', componet: () => import('@/views/Home.vue')}
]