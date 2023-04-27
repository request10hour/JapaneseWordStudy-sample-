<template>
    <button class="selection cursor-pointer blue" @click="goWord">N1 ~ N5 단어</button>
    <button class="selection cursor-pointer blue" @click="goComm">상용한자</button>
</template>

<script>
export default {
    methods: {
        goWord() {
            this.$router.push('/continuous/word');
        },
        goComm() {
            this.$router.push('/continuous/comm');
        },
    },
}
</script>