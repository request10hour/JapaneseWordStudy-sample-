<template>
  <div class="main flex-column-center-center">
    <div style="flex-grow: 2;"></div>
    <div class="flex-column-center-center" style="flex-grow: 2;">
      <h1 style="margin-top: 0;">Main Page</h1>
      <div>Please enter Seed</div>
      <div style="color: #666; text-align: center;">"Order of the questions depends on Seed value"</div>
      <button class="random-seed cursor-pointer yellow" @click="createRandomSeed">Random Seed</button>
      <form class="flex-column-center-center" @submit.prevent="goDifficultyPage">
        <div>
          <label for="seed">Seed </label>
          <input style="text-align: center; width: 70px;" v-model="seed" placeholder="Enter Seed">
        </div>
        <button class="selection cursor-pointer blue" type="submit">Go to Difficulty Page</button>
      </form>
    </div>
    <div style="flex-grow: 2;"></div>
  </div>
</template>

<style>
.main {
  width: 100vw;
  height: 100vh;
}

.flex-column-center-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.random-seed {
  width: 160px;
  height: 40px;
  background-color: #edc200;
  color: #fff;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 5px 5px #dddddd;
  border: none;
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
  border: none;
}
</style>

<script>
export default {
  data() {
    return {
      seed: ''
    };
  },
  // watch는 Vue 인스턴스가 생성되고 나서 호출된다.
  // v-model로 seed를 바인딩했기 때문에 seed가 변경되면 localStorage에 저장한다.
  // localStorage에 저장된 seed는 다음에 페이지를 새로고침해도 유지된다.
  watch: {
    seed() {
      localStorage.setItem('seed', this.seed);
    }
  },
  created() {
    // 암묵적 규칙으로 getItem()이 실패하면 null을 반환한다.
    this.seed = localStorage.getItem('seed');
  },
  methods: {
    // seed를 랜덤으로 생성한다.
    createRandomSeed() {
      this.seed = Math.round(Math.random() * 1000000);
    },
    // /difficulty로 이동한다.
    goDifficultyPage() {
      this.$router.push('/difficulty');
    }
  }
};
</script>