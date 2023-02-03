import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/MainPage.vue'
import DifficultyPage from '@/components/DifficultyPage.vue'
import QuizPage from '@/components/QuizPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: MainPage },
    { path: '/difficulty', component: DifficultyPage },
    { path: '/quiz/:difficulty', component: QuizPage }
  ]
})

export default router