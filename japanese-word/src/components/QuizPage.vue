<template>
  <Popup :popupVisible="popupVisible" :wrongAnswerVisible="wrongAnswerVisible" :seed="seed"
    :currentWordSeq="currentWordSeq" :wordsNum="words.length" :wrongAnswerTmp="wrongAnswerTmp"
    :popupButton="popupButton" :wrongAnswerButton="wrongAnswerButton" :successVisible="successVisible" />
  <!-- quiz -->
  <div :class="{ quiz: popupVisible || wrongAnswerVisible || successVisible }">
    <div class="flex-jc-center">[{{ currentWordSeq + 1 }}/{{ numbers.length }}]</div>
    <button  @click="popupShow">popupShow</button>
    <div class="kanji flex-center">{{ words[numbers[currentWordSeq]].kanji.replace(/\[|\]/g, '') }}</div>
    <!-- .split(/·|・|•/g)[0] 넣을지 고민 -->
    <!-- kanji -> kana -->
    <div v-if="false">
      <div>{{ words[numbers[currentWordSeq]].meaning }}</div>
      <div v-for="i in answerIndex" :key="i">
        <div @click="goNextStep" v-if="i === currentWordSeq">{{ words[numbers[currentWordSeq]].kana }} {{ i }}</div>
        <div @click="wrongAnswer" v-if="i === randomWordSeq0">{{ words[numbers[randomWordSeq0]].kana }}</div>
        <div @click="wrongAnswer" v-if="i === randomWordSeq1">{{ words[numbers[randomWordSeq1]].kana }}</div>
      </div>
    </div>
    <!-- kanji -> meaning -->
    <div v-if="true">
      <div class="flex-jc-center" style="font-size: 30px; height: 50px;">{{
        words[numbers[currentWordSeq]].kana
      }}</div>
      <div class="flex-jc-center" v-for="i in answerIndex" :key="i">
        <div class="answerbox" @click="goNextStep" v-if="i === currentWordSeq">{{
          words[numbers[currentWordSeq]].meaning
        }}
          {{ i }}</div>
        <div class="answerbox" @click="wrongAnswer" v-if="i === randomWordSeq0">{{
          words[numbers[randomWordSeq0]].meaning
        }}</div>
        <div class="answerbox" @click="wrongAnswer" v-if="i === randomWordSeq1">{{
          words[numbers[randomWordSeq1]].meaning
        }}</div>
      </div>
    </div>
    <button @click="goNextStep">Next Word</button>
    <!-- <div v-for="number in numbers" :key="number">{{ number }}{{ words[number] }}</div> -->
  </div>
</template>

<style>
.quiz {
  filter: blur(4px);
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-jc-center {
  display: flex;
  justify-content: center;
}

.kanji {
  font-size: 100px;
  height: 150px;
}

.answerbox {
  width: 300px;
  height: 100px;
  border: 1px solid #000;
  border-radius: 10px;
  margin: 5px;
  padding: 5px;
  display: flex;
  align-items: center;
}
</style>

<script>
import Popup from './Popup.vue';
import seedrandom from 'seedrandom';
import wordN5 from '@/assets/data/JLPT_N5.json';
import wordN4 from '@/assets/data/JLPT_N4.json';
import wordN3 from '@/assets/data/JLPT_N3.json';
import wordN2 from '@/assets/data/JLPT_N2.json';
import wordN1 from '@/assets/data/JLPT_N1.json';

export default {
  components: {
    Popup
  },
  data() {
    return {
      // 팝업 관련
      popupVisible: false,
      wrongAnswerVisible: false,
      successVisible: false,
      // 단어 관련
      wordsNum: null,
      words: [],
      seed: localStorage.getItem('seed'),
      numbers: [], // ex) N5의 경우 [0, 1, ..., 743] => shuffleNumbers 이후에는 순서가 뒤섞인다.
      // seq는 0부터 시작
      currentWordSeq: 0, // 현재 단어의 인덱스
      randomWordSeq0: 0, // 랜덤으로 선택된 단어의 인덱스 1
      randomWordSeq1: 0, // 랜덤으로 선택된 단어의 인덱스 2
      answerIndex: [], // v-for에서 사용할 인덱스 배열
      wrongAnswerTmp: [], // 임시로 저장할 오답 배열
      // kana 문제 관련
      // hiraganaSeries: ['あ', 'い', 'う', 'え', 'お', 'か', 'が', 'き', 'ぎ', 'く', 'ぐ', 'け', 'げ', 'こ', 'ご', 'さ', 'ざ',
      // 'し', 'じ', 'す', 'ず', 'せ', 'ぜ', 'そ', 'ぞ', 'た', 'だ', 'ち', 'ぢ', 'っ', 'つ', 'づ', 'て', 'で', 'と', 'ど', 'な',
      // 'に', 'ぬ', 'ね', 'の', 'は', 'ば', 'ぱ', 'ひ', 'び', 'ぴ', 'ふ', 'ぶ', 'ぷ', 'へ', 'べ', 'ぺ', 'ほ', 'ぼ', 'ぽ', 'ま',
      // 'み', 'む', 'め', 'も', 'や', 'ゃ', 'ゆ', 'ゅ', 'よ', 'ょ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', ],
    };
  },
  // created()는 Vue 인스턴스가 생성되고 나서 호출된다.
  created() {
    const wordNumMap = { N5: 744, N4: 1037, N3: 1546, N2: 2648, N1: 3246, };
    const wordMap = { N5: wordN5, N4: wordN4, N3: wordN3, N2: wordN2, N1: wordN1, };
    // difficulty 는 URL의 파라미터로 전달된다.
    const difficulty = this.$route.params.difficulty;
    if (difficulty in wordNumMap) {
      this.wordsNum = wordNumMap[difficulty];
      this.words = wordMap[difficulty];
    }
    // Array.from({ length: this.wordsNum }, (_, i) => i)
    // ex) N5의 경우
    // -> Array.from({ length: 744 }, (_, i) => i)
    // -> Array.from({ 0: undefined, 1: undefined, ..., 743: undefined }, (_, i) => i)
    // -> Array.from([undefined, undefined, ..., undefined], (_, i) => i)
    // -> Array.from([0, 1, ..., 743])
    // -> [0, 1, ..., 743]
    // (_: undefined, i: number) 에서 _ 는 배열의 요소를 의미하고 i 는 배열의 인덱스를 의미한다.
    this.numbers = Array.from({ length: this.wordsNum }, (_, i) => i);
    this.shuffleNumbers();
    this.loadSeq(0);
  },
  methods: {
    // 배열의 순서를 랜덤하게 섞는다.
    shuffleNumbers() {
      // seedrandom.js 라이브러리를 사용하여 랜덤한 숫자를 생성한다. (npm install seedrandom)
      // 시드값에 따라 고정된 순서로 랜덤한 숫자를 생성한다.
      const rng = seedrandom(this.seed);
      let currentIndex = this.numbers.length; // ex) N5의 경우 744
      let temporaryValue, randomIndex;

      // 배열의 끝에서부터 시작하여 랜덤한 인덱스와 값을 교환한다.
      while (0 != currentIndex) {
        randomIndex = Math.floor(rng() * currentIndex);
        currentIndex -= 1;
        temporaryValue = this.numbers[currentIndex];
        this.numbers[currentIndex] = this.numbers[randomIndex];
        this.numbers[randomIndex] = temporaryValue;
      }
    },
    // 중복되지 않는 랜덤한 숫자를 생성한다.
    // currentWordSeq, randomWordSeq0, randomWordSeq1 중 중복되는 숫자가 없어야 한다.
    generateRandomNumbers() {
      let randomWordSeq0, randomWordSeq1;
      do {
        randomWordSeq0 = Math.floor(Math.random() * this.wordsNum);
      } while (randomWordSeq0 === this.currentWordSeq);
      do {
        randomWordSeq1 = Math.floor(Math.random() * this.wordsNum);
      } while (randomWordSeq1 === this.currentWordSeq || randomWordSeq1 === randomWordSeq0);
      this.randomWordSeq0 = randomWordSeq0;
      this.randomWordSeq1 = randomWordSeq1;
    },
    // suffleSeqs()는 6가지 경우의 수를 가진다.
    // Math.random()이 0이상 1미만의 실수를 반환하기 때문에
    // 0.166, 0.333, 0.5, 0.666, 0.833, 1.0을 기준으로 6가지 경우의 수를 나눈다.
    suffleSeqs() {
      const randomNum = Math.random()
      if (randomNum <= 0.166) {
        this.answerIndex = [this.currentWordSeq, this.randomWordSeq0, this.randomWordSeq1];
      } else if (randomNum <= 0.333) {
        this.answerIndex = [this.currentWordSeq, this.randomWordSeq1, this.randomWordSeq0];
      } else if (randomNum <= 0.5) {
        this.answerIndex = [this.randomWordSeq0, this.currentWordSeq, this.randomWordSeq1];
      } else if (randomNum <= 0.666) {
        this.answerIndex = [this.randomWordSeq0, this.randomWordSeq1, this.currentWordSeq];
      } else if (randomNum <= 0.833) {
        this.answerIndex = [this.randomWordSeq1, this.currentWordSeq, this.randomWordSeq0];
      } else {
        this.answerIndex = [this.randomWordSeq1, this.randomWordSeq0, this.currentWordSeq];
      }
    },
    goNextStep() {
      // 마지막 단어를 맞췄을 경우 성공 팝업을 띄운다.
      if (this.currentWordSeq == this.wordsNum - 1) {
        this.successVisible = true;
        return;
      }
      this.loadSeq(this.currentWordSeq + 1);
    },
    wrongAnswer() {
      // 오답 팝업을 띄운다. 정답을 함께 보여준다.
      this.wrongAnswerVisible = true;
      const wrongPoint = this.words[this.numbers[this.currentWordSeq]];
      this.wrongAnswerTmp = [wrongPoint.kanji, wrongPoint.kana, wrongPoint.meaning];
      this.loadSeq(0);
    },
    wrongAnswerClose() {
      this.wrongAnswerVisible = false;
    },
    popupShow() {
      this.popupVisible = !this.popupVisible;
    },
    loadSeq(seq) {
      this.currentWordSeq = seq;
      this.generateRandomNumbers();
      this.suffleSeqs();
    },
    // 아래 컴포넌트에서 사용되는 메소드들
    popupButton(stage) {
      this.loadSeq(stage - 1), this.popupVisible = false;
    },
    wrongAnswerButton() {
      this.wrongAnswerVisible = false;
    },

  }
};
</script>