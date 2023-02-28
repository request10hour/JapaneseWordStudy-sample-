<template>
  <Converter ref="converterComponent" />
  <Popup :popupVisible="popupVisible" :wrongAnswerVisible="wrongAnswerVisible" :seed="seed"
    :currentWordSeq="currentWordSeq" :wordsNum="words.length" :wrongAnswerTmp="wrongAnswerTmp" :popupButton="popupButton"
    :wrongAnswerButton="wrongAnswerButton" :successVisible="successVisible" />
  <!-- quiz -->
  <div class="quiz" :class="{ quizblur: popupVisible || wrongAnswerVisible || successVisible }">
    <div class="progress-container">
      <div ref="progressBar" class="progress-bar"></div>
    </div>
    <div class="progressIndicator" @click="developerMode++">[{{ currentWordSeq + 1 }}/{{ numbers.length }}]</div>
    <div class="progressArea"></div>
    <div class="kanji" style="position: relative;">
      <div>{{ words[numbers[currentWordSeq]].kanji.replace(/\[|\]/g, '').replace(/·|・|•/g, '\n') }}</div>
      <label style="position: absolute; top: 0; left: 0px; border-radius: 0px 0px 5px 0px;"
        class="flex-center-center inButton cursor-pointer" :class="{ yellowBackground: showKorean }" for="showKorean">Show
        Korean</label>
      <input type="checkbox" id="showKorean" v-model="showKorean" style="width: 0; height: 0; margin: 0;" />
      <button style="position: absolute; top: 0; right: 0px; border-radius: 0px 0px 0px 5px;"
        class="inButton cursor-pointer blue" @click="popupShow">&lt; Show Popup</button>
    </div>
    <!-- .split(/·|・|•/g)[0] 넣을지 고민 -->
    <div v-if="true">
      <!-- kanji -> kana (new) -->
      <div class="container">
        <div v-for="i in randomKanaOrder" :key="i">
          <div ref="correctAnswer" :style="{ border: styleBorder, boxShadow: styleBoxShadow }"
            class="answerbox flex-column-center-start cursor-pointer" @click="correctAnswer(0)" v-if="i === 0">{{
              words[numbers[currentWordSeq]].kana.replace('-', '')
            }}<div v-if="showKorean">{{ kanaKorean[0] }}</div>
          </div>
          <div class="answerbox flex-column-center-start cursor-pointer" @click="wrongAnswer"
            v-if="i === 1 && generatedKana[0]">{{
              generatedKana[0]
            }}<div v-if="showKorean">{{ kanaKorean[1] }}</div>
          </div>
          <div class="answerbox flex-column-center-start cursor-pointer" @click="wrongAnswer"
            v-if="i === 2 && generatedKana[1]">{{
              generatedKana[1]
            }}<div v-if="showKorean">{{ kanaKorean[2] }}</div>
          </div>
        </div>
      </div>
      <!-- kanji -> kana (Deprecated) -->
      <!-- <div class="container">
        <div v-for="i in answerIndex[0]" :key="i">
          <div ref="correctAnswer" class="answerbox" @click="correctAnswer(0)" v-if="i === currentWordSeq">{{
            words[numbers[currentWordSeq]].kana
          }}</div>
          <div class="answerbox" @click="wrongAnswer" v-if="i === randomWordSeq0">{{
            words[numbers[randomWordSeq0]].kana
          }}</div>
          <div class="answerbox" @click="wrongAnswer" v-if="i === randomWordSeq1">{{
            words[numbers[randomWordSeq1]].kana
          }}</div>
        </div>
      </div> -->
      <!-- kanji -> meaning -->
      <div class="container" style="border-bottom: #dddddd solid 2px;">
        <div v-for="i in answerIndex[1]" :key="i">
          <div ref="correctAnswer" :style="{ border: styleBorder, boxShadow: styleBoxShadow }"
            class="answerbox cursor-pointer" @click="correctAnswer(1)" v-if="i === currentWordSeq">
            <span v-if="words[numbers[currentWordSeq]].wordclass != '품사없음'">{{ words[numbers[currentWordSeq]].wordclass
            }}</span>
            {{ words[numbers[currentWordSeq]].meaning.replace(words[numbers[currentWordSeq]].wordclass, '') }}
          </div>
          <div class="answerbox cursor-pointer" @click="wrongAnswer" v-if="i === randomWordSeq0">
            <span v-if="words[numbers[randomWordSeq0]].wordclass != '품사없음'">{{ words[numbers[randomWordSeq0]].wordclass
            }}</span>
            {{ words[numbers[randomWordSeq0]].meaning.replace(words[numbers[randomWordSeq0]].wordclass, '') }}
          </div>
          <div class="answerbox cursor-pointer" @click="wrongAnswer" v-if="i === randomWordSeq1">
            <span v-if="words[numbers[randomWordSeq1]].wordclass != '품사없음'">{{ words[numbers[randomWordSeq1]].wordclass
            }}</span>
            {{ words[numbers[randomWordSeq1]].meaning.replace(words[numbers[randomWordSeq1]].wordclass, '') }}
          </div>
        </div>
      </div>
    </div>
    <button v-if="developerMode >= 10" @click="goNextStep">Next Word</button>
    <!-- <div v-for="number in numbers" :key="number">{{ number }}{{ words[number] }}</div> -->
  </div>
</template>

<style>
.quiz {
  width: 100vw;
  max-width: 500px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.quizblur {
  filter: blur(4px);
}

.progress-container {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 10px;
  background-color: #dddddd;
}

.progress-bar {
  height: 10px;
  background-color: #00a2ed;
  width: 0vw;
}

.progressIndicator {
  position: fixed;
  top: 0;
  margin-top: 10px;
  height: 20px;
}

.progressArea {
  height: 30px;
}

.inButton {
  color: #fff;
  background-color: #00a2ed;
  padding: 7px;
  box-shadow: 0px 5px 5px #dddddd;
  font-size: 2vh;
  border: none;
}

.yellowBackground {
  background-color: #edc200;
}

.kanji {
  width: 100vw;
  height: 35vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: #dddddd solid 2px;
  font-size: 7vh;
  white-space: pre;
  line-height: 1.1;
}

.container {
  width: 100vw;
  height: 27vh;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: #dddddd solid 2px;
}

.answerbox {
  width: 30vw;
  height: 25vh;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  box-shadow: 0 0 5px #dddddd;
  margin: 5px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.answerbox span {
  color: #00a2ed;
}

.flex-center-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-column-center-start {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start
}
</style>

<script>
import { kanaToHangulFunc } from '@/assets/hangul.js';
import Converter from './Converter.vue';
import Popup from './Popup.vue';
import seedrandom from 'seedrandom';
import wordN5 from '@/assets/data/JLPT_N5.json';
import wordN4 from '@/assets/data/JLPT_N4.json';
import wordN3 from '@/assets/data/JLPT_N3.json';
import wordN2 from '@/assets/data/JLPT_N2.json';
import wordN1 from '@/assets/data/JLPT_N1.json';

export default {
  components: {
    Converter,
    Popup
  },
  data() {
    return {
      developerMode: 0,
      showKorean: false,
      correctAnswerArray: [],
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
      randomKanaOrder: [0, 1, 2],
      generatedKana: [],
      kanaKorean: ['', '', ''],
      styleBorder: '1px solid #dddddd',
      styleBoxShadow: '0 0 5px #dddddd',
      // hiraganaSeries: ['あ', 'い', 'う', 'え', 'お', 'か', 'が', 'き', 'ぎ', 'く', 'ぐ', 'け', 'げ', 'こ', 'ご', 'さ', 'ざ',
      // 'し', 'じ', 'す', 'ず', 'せ', 'ぜ', 'そ', 'ぞ', 'た', 'だ', 'ち', 'ぢ', 'っ', 'つ', 'づ', 'て', 'で', 'と', 'ど', 'な',
      // 'に', 'ぬ', 'ね', 'の', 'は', 'ば', 'ぱ', 'ひ', 'び', 'ぴ', 'ふ', 'ぶ', 'ぷ', 'へ', 'べ', 'ぺ', 'ほ', 'ぼ', 'ぽ', 'ま',
      // 'み', 'む', 'め', 'も', 'や', 'ゃ', 'ゆ', 'ゅ', 'よ', 'ょ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', ],
    };
  },
  watch: {
    currentWordSeq() {
      this.$refs.progressBar.style.width = `${(this.currentWordSeq / this.wordsNum) * 100}vw`;
    },
    correctAnswerArray: {
      deep: true,
      handler() {
        if (this.correctAnswerArray[0] && this.correctAnswerArray[1]) {
          this.goNextStep();
        }
      }
    },
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
    // kanaSeries를 랜덤한 순서로 배열한다.
    generateRandomNumbersForKana() {
      const randArrList = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
      this.randomKanaOrder = randArrList[Math.floor(Math.random() * randArrList.length)];
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
      for (let i = 0; i < 2; i++) {
        const randomNum = Math.random()
        if (randomNum <= 0.166) {
          this.answerIndex[i] = [this.currentWordSeq, this.randomWordSeq0, this.randomWordSeq1];
        } else if (randomNum <= 0.333) {
          this.answerIndex[i] = [this.currentWordSeq, this.randomWordSeq1, this.randomWordSeq0];
        } else if (randomNum <= 0.5) {
          this.answerIndex[i] = [this.randomWordSeq0, this.currentWordSeq, this.randomWordSeq1];
        } else if (randomNum <= 0.666) {
          this.answerIndex[i] = [this.randomWordSeq0, this.randomWordSeq1, this.currentWordSeq];
        } else if (randomNum <= 0.833) {
          this.answerIndex[i] = [this.randomWordSeq1, this.currentWordSeq, this.randomWordSeq0];
        } else {
          this.answerIndex[i] = [this.randomWordSeq1, this.randomWordSeq0, this.currentWordSeq];
        }
      }

    },
    correctAnswer(correctAnswerNum) {
      const target = this.$refs['correctAnswer'][correctAnswerNum];
      target.style.border = '1px solid #00a2ed';
      target.style.boxShadow = '0 0 5px #00a2ed';
      this.correctAnswerArray[correctAnswerNum] = true;
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
    },
    wrongAnswerClose() {
      this.wrongAnswerVisible = false;
    },
    popupShow() {
      this.popupVisible = !this.popupVisible;
    },
    loadSeq(seq) {
      this.styleBorder = '1px solid #dddddd';
      this.styleBoxShadow = '0 0 5px #dddddd';

      this.currentWordSeq = seq;
      this.generateRandomNumbersForKana();
      this.generateRandomNumbers();
      this.suffleSeqs();
      this.correctAnswerArray = [false, false];
      this.$nextTick(() => {
        const kanji = this.words[this.numbers[this.currentWordSeq]].kanji;
        const kana = this.words[this.numbers[this.currentWordSeq]].kana;
        let onceResult = this.$refs.converterComponent.runIfKanjiAndKanaIsDifferent(kanji, kana);
        let twiceResult = [];
        for (let i = 0; i < onceResult.length; i++) {
          twiceResult = twiceResult.concat(this.$refs.converterComponent.runIfKanjiAndKanaIsDifferent(kanji, onceResult[i]));
        }
        this.generatedKana = onceResult.concat(twiceResult);
        // 중복 제거
        this.generatedKana = this.generatedKana.filter((x, i, self) => self.indexOf(x) === i);
        // generatedKana에서 문자열 처음에 '-'가 있는 경우 제거한다. (N4 枚 -> -まい에서 오류 발견)
        for (let i = 0; i < this.generatedKana.length; i++) {
          this.generatedKana[i] = this.generatedKana[i].replace('-', '');
        }
        this.generatedKana = this.generatedKana.filter((x) => x !== kana.replace('-', ''));
        // generatedKana 배열의 요소의 순서를 섞는다.
        for (let i = this.generatedKana.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.generatedKana[i], this.generatedKana[j]] = [this.generatedKana[j], this.generatedKana[i]];
        }
        this.kanaKorean[0] = kanaToHangulFunc(kana.replace('-', ''));
        this.kanaKorean[1] = kanaToHangulFunc(this.generatedKana[0]);
        this.kanaKorean[2] = kanaToHangulFunc(this.generatedKana[1]);
      });
    },
    // 아래 컴포넌트에서 사용되는 메소드들
    popupButton(stage) {
      if (stage < 1) {
        this.loadSeq(0);
        this.popupVisible = false;
        return;
      }
      this.loadSeq(stage - 1), this.popupVisible = false;
    },
    wrongAnswerButton() {
      this.wrongAnswerVisible = false;
      this.loadSeq(0);
    },
  }
};
</script>