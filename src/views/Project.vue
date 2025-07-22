<template>
  <!-- Section Header -->
  <section class="bg-[#1a2238] py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-[48px] sm:text-[64px] text-white tracking-tight">Projects</h1>
    </div>
  </section>

  <!-- Project Cards Section -->
  <section class="bg-[#0f131c] text-white py-20 px-4">
    <div class="max-w-6xl mx-auto space-y-20">

      <!-- 각 상태별 그룹 렌더링 -->
      <div v-for="(title, statusKey) in statusMap" :key="statusKey">
        <h2 class="text-2xl font-bold mb-6">{{ title }}</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <ProjectCard v-for="project in filteredProjects(statusKey)" :key="project.id" :status="project.status"
            :title="project.title" :description="project.description" :category="project.category"
            :participants="project.participants" :date="project.date" :techStack="project.tech_stack"
            :tags="project.tags" :link="project.link" :supervisor="project.supervisor"
            :isTeamProject="project.is_team_project" />
        </div>
      </div>
    </div>

    <!-- Publication Section -->
    <div class="max-w-6xl mx-auto mt-20">
      <h2 class="text-2xl font-bold mb-6 border-b border-gray-600 pb-2">Publications</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-2">
        <li v-for="pub in publications" :key="pub.id">
          {{ pub.authors }} ({{ pub.year }}).
          <i>"{{ pub.title }}"</i>.
          {{ pub.venue }}
          <a v-if="pub.link" :href="pub.link" target="_blank" class="text-blue-400 underline ml-2">(Link)</a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'

const projects = ref([])
const publications = ref([])

const statusMap = {
  Active: 'Active Projects',
  Planning: 'Upcoming Projects',
  Completed: 'Completed Projects'
}

const filteredProjects = (status) => {
  return projects.value.filter(p => p.status === status)
}

onMounted(async () => {
  try {
    const [projectRes, publicationRes] = await Promise.all([
      fetch(import.meta.env.VITE_PROJECT_API),
      fetch(import.meta.env.VITE_PUBLICATION_API)
    ])
    const projectData = await projectRes.json()
    const publicationData = await publicationRes.json()

    projects.value = projectData
    publications.value = publicationData
  } catch (error) {
    console.error('데이터 불러오기 실패:', error)
  }
})
</script>
