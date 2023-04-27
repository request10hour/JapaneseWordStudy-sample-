import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '@/components/MainPage.vue'
import DifficultyPage from '@/components/DifficultyPage.vue'
import QuizPage from '@/components/QuizPage.vue'

import SubPage from '@/components/SubPage.vue'
import ContinuousWord from '@/components/ContinuousWord.vue'
import ContinuousComm from '@/components/ContinuousComm.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: MainPage },
    { path: '/difficulty', component: DifficultyPage },
    { path: '/quiz/:difficulty', component: QuizPage },

    { path: '/continuous', component: SubPage },
    { path: '/continuous/word', component: ContinuousWord },
    { path: '/continuous/Comm', component: ContinuousComm }
  ]
})

export default router