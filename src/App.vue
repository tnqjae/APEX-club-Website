<template>
  <div class="header">
    <h1>APEX</h1>
    <ul>
      <li>Home</li>
      <li>Professor</li>
      <li>Team</li>
      <li>Student</li>
      <li>Project</li>
      <li>Contact</li>
    </ul>
  </div>
  <div class="main-page">
    <img src="./assets/MainPage_Img.jpg" alt="APEX 배경 이미지" class="main-image" />
  </div>
  
</template>

<script setup>
import { ref } from 'vue'
</script>

<style scoped>
/* ─── 초기화 ─── */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ─── 헤더 ─── */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  padding: 0 24px;
  background: #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
}

h1 {
  color: #ffffff;
  font-size: 24px;
}

ul {
  list-style: none;
  display: flex;
  gap: 24px;
}

ul li {
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s;
}

ul li:hover {
  color: #42b983;
}

/* ─── 메인 페이지 이미지 ─── */
.main-page {
  margin-top: 60px;       /* 헤더 아래 여백 */
  width: 100vw;           /* 가로폭 브라우저 전체에 맞춤 */
  overflow-x: hidden;     /* 혹시 생기는 가로 스크롤 제거 */
}

.main-image {
  width: 100vw;           /* 좌우를 브라우저에 완전히 맞춤 */
  height: auto;           /* 비율 유지 */
  max-height: 600px;      /* 세로 길이 제한 */
  display: block;
}
</style>
<style>

html, body {
  margin: 0;
  padding: 0;
}
</style>