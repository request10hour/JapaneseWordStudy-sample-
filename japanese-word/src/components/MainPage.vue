<template>
  <div>
    <h1>Main Page</h1>
    <div>
      <div>Please enter Seed</div>
      <button @click="seed = Math.round(Math.random() * 1000000)">Create Randomly Seed</button>
      <input v-model="seed" placeholder="Enter Seed">
    </div>
    <router-link :to="'/difficulty'">Go to Difficulty Page</router-link>
  </div>
</template>

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
  }
};
</script>