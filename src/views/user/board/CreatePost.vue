<template>
  <!-- Section Header -->
  <section class="bg-gradient-to-br from-[#1a2238] to-[#1a2338] py-20">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-[36px] sm:text-[56px] font-bold text-white">
        게시글 작성
      </h1>
      <p class="text-gray-400 mt-2"></p>
    </div>
  </section>

  <!-- 작성 폼 -->
  <section class="bg-[#0f131c] min-h-screen py-16 px-4 text-white">
    <div class="max-w-2xl mx-auto space-y-6 bg-[#1a1f2c] p-8 rounded-2xl shadow-lg border border-white/10">

      <!-- 게시판 유형 -->
      <div>
        <label class="block mb-2 font-semibold text-gray-300">📌 게시판 유형</label>
        <select v-model="form.post_type"
                class="w-full bg-[#141a2a] border border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
          <option value="" disabled>게시판을 선택하세요</option>
          <option value="Team Project">Team Project</option>
          <option value="Competition">Competition</option>
          <option value="Talk">Talk</option>
          <option value="Question">Question</option>
        </select>
      </div>

      <!-- 제목 -->
      <div>
        <label class="block mb-2 font-semibold text-gray-300">📝 제목</label>
        <input v-model="form.title" type="text"
               class="w-full bg-[#141a2a] border border-gray-700 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
               placeholder="제목을 입력하세요" />
      </div>

      <!-- 내용 -->
      <div>
        <label class="block mb-2 font-semibold text-gray-300">📄 내용</label>
        <textarea v-model="form.contents" rows="8"
                  class="w-full bg-[#141a2a] border border-gray-700 p-3 rounded-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="내용을 입력하세요 (마크다운도 사용 가능해요)"></textarea>
      </div>

      <!-- 모집글 전용 -->
      <div v-if="form.post_type === 'Team Project' || form.post_type === 'Competition'" class="grid sm:grid-cols-2 gap-4">
        <div>
          <label class="block mb-2 font-semibold text-gray-300">👥 모집 인원</label>
          <input v-model.number="form.recruit_count" type="number"
                 class="w-full bg-[#141a2a] border border-gray-700 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                 placeholder="예: 3명" />
        </div>
        <div>
          <label class="block mb-2 font-semibold text-gray-300">⏰ 마감일</label>
          <input v-model="form.final_day" type="date"
                 class="w-full bg-[#141a2a] border border-gray-700 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <!-- 버튼 -->
      <div class="text-right pt-4">
        <button @click="submitPost"
                class="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition duration-200">
          작성 완료 🚀
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  post_type: '',
  title: '',
  contents: '',
  recruit_count: null,
  final_day: ''
})

const submitPost = async () => {
  const token = sessionStorage.getItem('userToken')
  if (!token) {
    alert('로그인이 필요합니다.')
    router.push('/login')
    return
  }

  try {
    const payload: any = {
      title: form.value.title,
      contents: form.value.contents,
      post_type: form.value.post_type,
    }

    if (form.value.post_type === 'Team Project' || form.value.post_type === 'Competition') {
      payload.recruit = {
        recruit_count: form.value.recruit_count,
        final_day: form.value.final_day
      }
    }

    const response = await axios.post(import.meta.env.VITE_POST_CREATE_API, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    alert('게시글이 등록되었습니다.')
    router.push('/projectboard')
  } catch (err) {
    console.error(err)
    alert('작성에 실패했습니다.')
  }
}
</script>
