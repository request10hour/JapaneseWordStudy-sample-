<template>
    <!-- load & save popup -->
    <div class="popup" v-if="popupVisible">
      <div>
        <div>Input Stage</div>
        <input v-model="stage" type="number" @input="stage < 1 ? stage = 1 : _, stage > wordsNum ? stage = wordsNum : _"
          placeholder="Enter stage" />
        <button @click="loadSeq(stage - 1), popupVisible = false">loadStage</button>
        <div>Seed: {{ seed }}</div>
        <div>currentStage: {{ currentWordSeq + 1 }}</div>
      </div>
    </div>
    <!-- wrong alert popup -->
    <div class="popup" v-if="wrongAnswerVisible">
      <div>
        <div>Wrong Answer</div>
        <div>{{ wrongAnswerTmp[0] }}</div>
        <div>{{ wrongAnswerTmp[1] }}</div>
        <div>{{ wrongAnswerTmp[2] }}</div>
        <button @click="wrongAnswerVisible = false">OK</button>
        <div><router-link :to="'/'">Go to Main Page</router-link></div>
      </div>
    </div>
    <!-- success popup -->
    <div class="popup" v-if="successVisible">
      <div>
        <div>Congraturations!</div>
        <div><router-link :to="'/'">Go to Main Page</router-link></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: [
      'popupVisible',
      'seed',
      'currentWordSeq',
      'wordsNum',
      'wrongAnswerTmp',
      'loadSeq',
      'successVisible'
    ],
    data() {
      return {
        stage: ''
      }
    }
  }
  </script>
  
  <style>
  /* popup css */
  </style>
  