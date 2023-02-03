<template>
  <div>
    <h1>Difficulty Page</h1>
    <!-- routing to each quiz page -->
    <div><router-link :to="'/quiz/N5'">N5</router-link></div>
    <div><router-link :to="'/quiz/N4'">N4</router-link></div>
    <div><router-link :to="'/quiz/N3'">N3</router-link></div>
    <div><router-link :to="'/quiz/N2'">N2</router-link></div>
    <div><router-link :to="'/quiz/N1'">N1</router-link></div>
  </div>
</template>