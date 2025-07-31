<template>
    <!-- Section Header -->
    <section class="bg-[#1a2238] py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div class="container mx-auto px-4 text-center">
            <h1 class="text-[48px] sm:text-[64px] text-white tracking-tight">
                Board
            </h1>
        </div>
    </section>

    <section class="bg-[#0f131c] text-white py-16 px-6 min-h-screen">
        <div class="max-w-6xl mx-auto ,y space-y-30">

            <!-- 프로젝트/대회 팀원 모집 -->
            <div>
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold border-b border-gray-600 pb-2">프로젝트 관리</h2>
                    <button @click="openProjectModal"
                        class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold">
                        + 프로젝트 추가
                    </button>
                </div>

                <div class="overflow-x-auto rounded-lg border border-gray-700">
                    <table class="min-w-full text-sm">
                        <thead class="bg-[#1a1f2c] text-gray-300">
                            <tr>
                                <th class="px-2 py-3 text-center">프로젝트 명</th>
                                <th class="px-2 py-3 text-center">개인/팀 프로젝트</th>
                                <th class="px-4 py-3 text-center">진행 상태</th>
                                <th class="px-4 py-3 text-center">시작일</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="project_loading">
                                <td colspan="4" class="text-center py-6 text-blue-400">불러오는 중...</td>
                            </tr>
                            <tr v-else-if="Projects.length === 0">
                                <td colspan="4" class="text-center py-6 text-gray-400">데이터가 없습니다.</td>
                            </tr>
                            <tr v-for="(project, i) in Projects" :key="i">
                                <td class="px-2 py-3 text-center">{{ project.title }}</td>
                                <td class="px-2 py-3 text-center">
                                    {{ project.is_team_project == '1' ? '팀 프로젝트' : '개인 프로젝트' }}
                                </td>
                                <td class="px-4 py-3 text-center">{{ project.status }}</td>
                                <td class="px-4 py-3 text-center">{{ project.project_date }}</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>


            <!-- 잡담 게시판 -->
            <div class="pt-20">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold border-b border-gray-600 pb-2">논문 관리</h2>
                    <button @click="openPublicationModal"
                        class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold">
                        + 프로젝트 추가
                    </button>
                </div>

                <div class="overflow-x-auto rounded-lg border border-gray-700">
                    <table class="min-w-full text-sm">
                        <thead class="bg-[#1a1f2c] text-gray-300">
                            <tr>
                                <th class="px-4 py-3 text-center">작성자(1~n저자)</th>
                                <th class="px-4 py-3 text-center">제목</th>
                                <th class="px-4 py-3 text-center">게재지</th>
                                <th class="px-4 py-3 text-center">유형</th>
                                <th class="px-4 py-3 text-center">출판 연도</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="publication_loading">
                                <td colspan="4" class="text-center py-6 text-blue-400">불러오는 중...</td>
                            </tr>
                            <tr v-else-if="Publication.length === 0">
                                <td colspan="4" class="text-center py-6 text-gray-400">데이터가 없습니다.</td>
                            </tr>
                            <tr v-for="(paper, i) in Publication" :key="i">
                                <td class="px-4 py-3 text-center">{{ paper.authors }}</td>
                                <td class="px-4 py-3 text-center">{{ paper.title }}</td>
                                <td class="px-4 py-3 text-center">{{ paper.venue }}</td>
                                <td class="px-4 py-3 text-center">{{ paper.type }}</td>
                                <td class="px-4 py-3 text-center">{{ paper.year }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>


    <!-- 프로젝트 추가 모달 -->
    <teleport to="body">
        <div v-if="showProjectModal" class="fixed inset-0 z-50 flex items-center justify-center">
            <div class="absolute inset-0 bg-black/60" @click="closeProjectModal"></div>
            <div class="relative bg-[#1a1f2c] w-full max-w-xl rounded-lg p-6 shadow-xl text-white">
                <h3 class="text-xl font-bold mb-4">프로젝트 추가</h3>

                <div class="space-y-4">
                    <input v-model="projectForm.title" type="text" placeholder="제목"
                        class="w-full bg-gray-800 px-3 py-2 rounded border border-gray-700" />
                    <input v-model="projectForm.description" type="text" placeholder="프로젝트 설명"
                        class="w-full bg-gray-800 px-3 py-2 rounded border border-gray-700" />
                    <input v-model="projectForm.category" type="text" placeholder="카테고리"
                        class="w-full bg-gray-800 px-3 py-2 rounded border border-gray-700" />
                    <select v-model="projectForm.is_team_project"
                        class="w-full bg-gray-800 px-3 py-2 rounded border border-gray-700">
                        <option value="1">팀 프로젝트</option>
                        <option value="0">개인 프로젝트</option>
                    </select>
                    <input v-model="projectForm.participants" type="text" placeholder="참여자"
                        class="w-full bg-gray-800 px-3 py-2 rounded border border-gray-700" />
                    <input v-model="projectForm.techStack" type="text" placeholder="기술 스택(초기 작성 시 대범주의 기술 스택만 작성)"
                        class="w-full bg-gray-800 px-3 py-2 rounded border border-gray-700" />
                    <select v-model="projectForm.status"
                        class="w-full bg-gray-800 px-3 py-2 rounded border border-gray-700">
                        <option value="Planning">진행 예정</option>
                        <option value="Active">진행 중</option>
                        <option value="Completed">완료</option>
                    </select>
                    <input v-model="projectForm.tags" type="text" placeholder="프로젝트 키워드(태그)"
                        class="w-full bg-gray-800 px-3 py-2 rounded border border-gray-700" />
                    <input v-model="projectForm.participants" type="text" placeholder="프로젝트 리더(개인 프로젝트의 경우 진행자 이름 작성)"
                        class="w-full bg-gray-800 px-3 py-2 rounded border border-gray-700" />
                    <input v-model="projectForm.project_date" type="date"
                        class="w-full bg-gray-800 px-3 py-2 rounded border border-gray-700" />
                </div>

                <div class="flex justify-end mt-6 space-x-2">
                    <button @click="closeProjectModal"
                        class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded">취소</button>
                    <button @click="saveProject" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">저장</button>
                </div>
            </div>
        </div>
    </teleport>

    <!-- 논문 추가 모달 -->
    <teleport to="body">
        <div v-if="showPublicationModal" class="fixed inset-0 z-50 flex items-center justify-center">
            <div class="absolute inset-0 bg-black/60" @click="closePublicationModal"></div>
            <div class="relative bg-[#1a1f2c] w-full max-w-xl rounded-lg p-6 shadow-xl text-white">
                <h3 class="text-xl font-bold mb-4">논문 추가</h3>

                <div class="space-y-4">
                    <input v-model="publicationForm.authors" type="text" placeholder="작성자"
                        class="w-full bg-gray-800 px-3 py-2 rounded border border-gray-700" />
                    <input v-model="publicationForm.title" type="text" placeholder="제목"
                        class="w-full bg-gray-800 px-3 py-2 rounded border border-gray-700" />
                    <input v-model="publicationForm.venue" type="text" placeholder="게재지"
                        class="w-full bg-gray-800 px-3 py-2 rounded border border-gray-700" />
                    <select v-model="publicationForm.type" placeholder="유형" class="w-full bg-gray-800 px-3 py-2 rounded border border-gray-700">
                        <option value="Journal">Journal</option>
                        <option value="Conference">Conference</option>
                        <option value="Poster">Poster</option>
                        <option value="Demo">Demo</option>
                        <option value="Thesis">Thesis</option>
                    </select>
                    <input v-model="publicationForm.year" type="number" placeholder="출판 연도"
                        class="w-full bg-gray-800 px-3 py-2 rounded border border-gray-700" />
                </div>

                <div class="flex justify-end mt-6 space-x-2">
                    <button @click="closePublicationModal"
                        class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded">취소</button>
                    <button @click="savePublication" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">저장</button>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const Projects = ref<any[]>([])
const Publication = ref<any[]>([])

const project_loading = ref(false)
const publication_loading = ref(false)

const project_error = ref('')
const publication_error = ref('')

const router = useRouter()

//토큰 인증
function authHeaders() {
    const token = sessionStorage.getItem('adminToken')
    return token
        ? { Authorization: `Bearer ${token}` }
        : {}
}


async function verifyToken() {
    const token = sessionStorage.getItem('adminToken')
    if (!token) {
        alert('관리자 권한이 없습니다.')
        router.replace('/')
        return false
    }

    try {
        const res = await fetch(import.meta.env.VITE_AUTH_API, {
            method: 'GET',
            headers: authHeaders()
        })

        if (!res.ok) throw new Error('토큰 유효성 검사 실패')

        return true
    } catch (err) {
        console.error('토큰 인증 실패:', err)
        alert('토큰이 만료되었거나 유효하지 않습니다.')
        router.replace('/admin-login')
        return false
    }
}
/////////////////////////////


/////////////프로젝트, 논문 조회//////////////////
async function fetchProjects() {
    project_loading.value = true
    try {
        const res = await fetch(import.meta.env.VITE_PROJECT_API)
        if (!res.ok) throw new Error('프로젝트 조회 실패')

        const data = await res.json()
        Projects.value = data
    } catch (err: any) {
        project_error.value = err.message || '프로젝트 조회 중 오류 발생'
    } finally {
        project_loading.value = false
    }
}

async function fetchPublications() {
    publication_loading.value = true
    try {
        const res = await fetch(import.meta.env.VITE_PUBLICATION_API)
        if (!res.ok) throw new Error('논문 조회 실패')

        const data = await res.json()
        Publication.value = data
    } catch (err: any) {
        publication_error.value = err.message || '논문 조회 중 오류 발생'
    } finally {
        publication_loading.value = false
    }
}


///////////모달 창 관련 함수들//////////////////
const showProjectModal = ref(false)
const showPublicationModal = ref(false)

// 폼 기본값
const projectForm = ref({
    title: '',
    is_team_project: '1',
    status: '',
    description: '',
    category: '',
    participants: '',
    techStack: '',
    project_date: ''
})

const publicationForm = ref({
    authors: '',
    title: '',
    venue: '',
    type: '',
    year: new Date().getFullYear()
})

// 모달 열기/닫기
function openProjectModal() {
    showProjectModal.value = true
}
function closeProjectModal() {
    showProjectModal.value = false
}

function openPublicationModal() {
    showPublicationModal.value = true
}
function closePublicationModal() {
    showPublicationModal.value = false
}

// 저장 함수 (실제 API 연동 전 디버깅용)
function saveProject() {
    console.log('프로젝트 저장:', projectForm.value)
    closeProjectModal()
}

async function savePublication() {
    try {
        const payload = { ...publicationForm.value }

        const res = await fetch(import.meta.env.VITE_ADD_PUBLICATION_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('adminToken')}`,
            },
            body: JSON.stringify(payload),
        })

        if (!res.ok) {
            const err = await res.json().catch(() => ({}))
            throw new Error(err.error || '논문 추가 실패')
        }

        // 저장 성공 후
        console.log('논문 저장 완료')
        closePublicationModal()
        await fetchPublications()
    } catch (e) {
        console.error('논문 저장 에러:', e)
        alert('논문 저장에 실패했습니다.')
    }
}

onMounted(async () => {
    const ok = await verifyToken()
    if (!ok) return // 인증 실패 시 조기 종료

    await fetchProjects()
    await fetchPublications()
})

</script>