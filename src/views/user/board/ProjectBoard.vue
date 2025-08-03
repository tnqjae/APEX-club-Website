<template>
  <!-- Section Header -->
  <section class="bg-[#1a2238] py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-[48px] sm:text-[64px] text-white tracking-tight">Board</h1>
    </div>
  </section>

  <!-- 모집 게시판 -->
  <section class="bg-[#0f131c] text-white py-16 px-6 min-h-screen">
    <div class="max-w-6xl mx-auto space-y-12">
      <!-- 제목과 버튼 -->
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold border-b border-gray-600 pb-2">
          프로젝트/대회 팀원 모집
        </h2>
        <button
          class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
         @click="clickCreatePost">
          + 글 쓰기
        </button>
      </div>

      <!-- 게시글 테이블 -->
      <div class="overflow-x-auto rounded-lg border border-gray-700">
        <table class="min-w-full text-sm">
          <thead class="bg-[#1a1f2c] text-gray-300">
            <tr>
              <th class="px-2 py-3 text-center">주제</th>
              <th class="px-4 py-3 text-center">작성자</th>
              <th class="px-4 py-3 text-center">제목</th>
              <th class="px-4 py-3 text-center">모집 인원</th>
              <th class="px-4 py-3 text-center">모집 상태</th>
              <th class="px-4 py-3 text-center">모집 마감(D-day)</th>
              <th class="px-4 py-3 text-center">조회수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-4 py-6 text-center text-gray-400" colspan="6">
                데이터가 없습니다.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

function clickCreatePost(){
    router.push('/createpost')
}

</script>