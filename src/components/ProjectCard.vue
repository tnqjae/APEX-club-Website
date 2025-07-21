<template>
  <div
    class="group p-5 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
  >
    <!-- 상단 상태 -->
    <div class="flex justify-between items-center mb-2">
      <span class="text-xs font-semibold px-2 py-1 rounded bg-blue-600/60 text-white uppercase tracking-wide">
        {{ status }}
      </span>
      <span v-if="isTeamProject" class="text-xs px-2 py-1 rounded bg-green-600/30 text-green-300">
        팀 프로젝트
      </span>
      <span v-else class="text-xs px-2 py-1 rounded bg-yellow-600/30 text-yellow-300">
        개인 프로젝트
      </span>
    </div>

    <!-- 제목 -->
    <h3 class="text-xl font-bold mb-1 group-hover:text-blue-400 transition-colors">{{ title }}</h3>

    <!-- 설명 -->
    <p class="text-sm text-gray-300 line-clamp-3">{{ description }}</p>

    <!-- 날짜 / 인원 -->
    <div class="mt-3 text-xs text-gray-400 italic">
      {{ date }} · {{ participants }}
    </div>

    <!-- 기술 스택 -->
    <div v-if="techStack.length" class="flex flex-wrap gap-2 mt-4">
      <span
        v-for="tech in techStack"
        :key="tech"
        class="bg-blue-700/40 text-blue-200 px-2 py-1 rounded-full text-xs"
      >
        {{ tech }}
      </span>
    </div>

    <!-- 태그 -->
    <div v-if="tags.length" class="flex flex-wrap gap-2 mt-2">
      <span
        v-for="tag in tags"
        :key="tag"
        class="border border-gray-600 px-2 py-1 rounded-full text-xs text-gray-300"
      >
        #{{ tag }}
      </span>
    </div>

    <!-- 링크 버튼 -->
    <div v-if="link" class="mt-auto pt-6">
      <a
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block px-4 py-2 text-sm font-semibold rounded bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        프로젝트 코드 →
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  status: String,
  title: String,
  description: String,
  category: String,
  participants: String,
  date: String,
  techStack: {
    type: Array,
    default: () => [],
  },
  tags: {
    type: Array,
    default: () => [],
  },
  link: String,
  supervisor: String,
  isTeamProject: Boolean,
})
</script>
