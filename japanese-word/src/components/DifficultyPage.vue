<template>
  <div class="difficulty-page">
    <h1 style="margin-top: 0;">Difficulty Page</h1>
    <!-- routing to each quiz page -->
    <div class="selection cursor-pointer blue" v-for="n in [...Array(5)].map((_, i) => 5 - i)"
      @click="goToQuizPage('N' + n)">Go to N{{ n }}
      Quiz Page</div>
  </div>
</template>

<style>
.difficulty-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.selection {
  width: 200px;
  height: 50px;
  background-color: #00a2ed;
  color: #fff;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 5px 5px #dddddd;
}

.flex-column-center-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    // 각 난이도별 퀴즈 페이지로 이동
    goToQuizPage(difficulty) {
      this.$router.push('/quiz/' + difficulty);
    }
  }
}
</script>