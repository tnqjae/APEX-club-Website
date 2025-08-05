<template>
  <div class="text-white text-center py-20">카카오 로그인 처리 중...</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CryptoJS from 'crypto-js'

const REST_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY as string
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI as string
const LOGIN_API = import.meta.env.VITE_USERLOGIN_API as string
const AES_KEY = import.meta.env.VITE_ENCRYPTION_KEY
const AES_IV = import.meta.env.VITE_ENCRYPTION_IV

const route = useRoute()
const router = useRouter()

function encrypt(text: string): string {
  const key = CryptoJS.enc.Utf8.parse(AES_KEY)
  const iv = CryptoJS.enc.Utf8.parse(AES_IV)
  const encrypted = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

onMounted(async () => {
  const code = route.query.code as string | undefined
  const state = route.query.state as string | undefined

  const savedState = sessionStorage.getItem('kakao_state')
  if (!code || (savedState && state !== savedState)) {
    alert('잘못된 요청입니다.')
    return
  }

  try {
    const token = await exchangeToken(code)
    const me = await fetchMe(token.access_token)

    const kakaoId = me.id.toString()
    const nickname = me.kakao_account?.profile?.nickname ?? 'Unknown'

    const encryptedId = encrypt(kakaoId)

    const response = await fetch(LOGIN_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: encryptedId }),
    })
    const result = await response.json()

    console.log('서버 응답:', result)

    if (response.ok && result.exists && result.state === 'ACCEPTED') {
      alert(`환영합니다, ${nickname}님!`)
      sessionStorage.setItem('userToken', result.token ?? '')
      router.replace('/')
    } else if (response.ok && result.exists && result.state === 'PENDING') {
      alert('가입 승인 대기 중입니다.')
      router.replace('/')
    } else if (response.ok && result.exists && result.state === 'DENIED') {
      alert('동아리 회원만 가입가능합니다.')
      router.replace('/')
    } else if (response.ok && result.exists === false) {
      alert('회원 정보가 없습니다. 회원가입으로 이동합니다.')
      router.replace({
        path: '/register',
        query: {
          kakaoId: encryptedId,
          name: nickname,
        },
      })
    } else {
      console.error('응답 상태 및 내용 확인:', response.status, result)
      alert('알 수 없는 오류가 발생했습니다.')
    }

  } catch (err) {
    console.error('에러:', err)
    alert('로그인 처리 중 오류가 발생했습니다.')
  }
})

async function exchangeToken(code: string) {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: REST_KEY,
    redirect_uri: REDIRECT_URI,
    code,
  })

  const res = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: body.toString(),
  })

  const data = await res.json()
  if (!res.ok || data.error) {
    throw new Error(data.error_description || data.error || 'token error')
  }
  return data
}

async function fetchMe(accessToken: string) {
  const res = await fetch('https://kapi.kakao.com/v2/user/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) throw new Error('me api error')
  return res.json()
}
</script>
