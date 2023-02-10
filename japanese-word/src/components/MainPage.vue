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

<!-- <template></template>

<script>
// 메모용 : /([一-龠々]+)/g 로 한자를 찾을 수 있다.
// 메모용 : /([ぁ-んァ-ン]+)/g 로 가나를 찾을 수 있다.

// import for test-------------------
import wordN5 from '@/assets/data/JLPT_N5.json';
import wordN4 from '@/assets/data/JLPT_N4.json';
import wordN3 from '@/assets/data/JLPT_N3.json';
import wordN2 from '@/assets/data/JLPT_N2.json';
import wordN1 from '@/assets/data/JLPT_N1.json';
// -------------------import for test
import chouonList from '@/assets/on_variation/chouon.json';
import exchouonList from '@/assets/on_variation/exchouon.json';
import sokuhaneruonList from '@/assets/on_variation/sokuhaneruon.json';
import yoonList from '@/assets/on_variation/yoon.json';
import dakuonList from '@/assets/on_variation/dakuon.json';
import handakuonList from '@/assets/on_variation/handakuon.json';

export default {
  data() {
    return {
      onvarNameKey: [
        [chouonList, 'chouon',],
        [exchouonList, 'exchouon',],
        [sokuhaneruonList, 'sokuon',],
        [sokuhaneruonList, 'haneruon',],
        [yoonList, 'yoon',],
        [dakuonList, 'dakuon',],
        [handakuonList, 'handakuon',],
      ]
    };
  },
  created() {
    this.runIfKanjiAndKanaIsDifferent('[やむを得ない]', 'やむをえない');
    console.log('N1');
    this.testForAll(wordN1);
    console.log('N2');
    this.testForAll(wordN2);
    console.log('N3');
    this.testForAll(wordN3);
    console.log('N4');
    this.testForAll(wordN4);
    console.log('N5');
    this.testForAll(wordN5);
  },
  methods: {
    // 발음이 유사한 히라가나로 변환한다.
    // ex) str = '_さあ_かあ_', onVarList = chouonList, onVarKey = 'chouon'
    // result = ['_さあ_か_', '_さ_かあ_']
    // chouonList를 돌면서, str에 있는 장음을 찾는다.
    // 찾으면, 장음을 제거한 문자열의 배열을 반환한다.
    convertOnVarToOrigin(str, onVarList, onVarKey) {
      let result = [];
      for (let i = 0; i < onVarList.length; i++) {
        const onVar = onVarList[i][onVarKey];
        const onVarRegExp = new RegExp(onVar, 'g');
        const replacedStr = str.replace(onVarRegExp, onVarList[i]['original']);
        if (str !== replacedStr)
          result.push(replacedStr);
      }
      return result;
    },
    // 위의 함수와 반대로, 발음이 유사한 히라가나를 변환한다.
    // ex) str = '_さ_か_', onVarList = chouonList, onVarKey = 'chouon'
    // result = ['_さ_かあ_', '_さあ_か_']
    convertOriginToOnVar(str, onVarList, onVarKey) {
      let result = [];
      for (let i = 0; i < onVarList.length; i++) {
        const onVar = onVarList[i][onVarKey];
        let onVarRegExp = new RegExp(onVarList[i]['original'], 'g');
        // 같은 히라가나가 두 번 이상 나오는 경우에 대한 예외처리
        if (onVarRegExp.test(str)) {
          if (str.match(onVarRegExp).length > 1)
            onVarRegExp = new RegExp(onVarList[i]['original']);
        }
        /*
          여기에 촉음과 하네루온의 예외처리를 추가해야 한다.
          ex) 히라가나 + 'っ' / 히라가나 + 'ん' 의 경우
          촉음과 하네루온을 한번 더 추가하면 이상해진다.
          あっ이 あっっ이나 あんっ/ あん이나 あんん이나 あっん이 되는 것이다.
          위의 경우는 비교적 간단하게 처리할 수 있지만,
          赤ん坊와 같은 경우는 더욱 강력한 예외처리가 필요하다;; 어케하지?
        */
        const replacedStr = str.replace(onVarRegExp, onVar);
        if (str !== replacedStr)
          result.push(replacedStr);
      }
      // 위에서 예외처리를 했기 때문에, 중복된 경우가 생길 수 있다.
      // 중복을 제거한다.
      result = result.filter((item, index) => result.indexOf(item) === index);
      return result;
    },
    // 한자와 히라가나가 혼합된 문자열을 받아서 히라가나만 추출한다.
    // 예를 들어, '追い出された'를 받으면 'いされた'를 반환한다.
    extractHiragana(str1) {
      let result = '';
      for (let i = 0; i < str1.length; i++) {
        if (RegExp(/([ぁ-んァ-ン]+)/g).test(str1[i])) {
          result += str1[i];
        }
      }
      return result;
    },
    // 추출된 히라가나를 이용해서 정규식을 만든다.
    // 예를 들어, 'いされた'를 받으면 '((.*)(?=い))|((.*)(?=さ))|((.*)(?=れ))|((.*)(?=た))'를 반환한다.
    makeRegExpWithExtractedHiragana(extractedHiragana) {
      let result = '';
      for (let i = 0; i < extractedHiragana.length; i++) {
        result = result + '((.*)(?=' + extractedHiragana[i] + '))';
        if (i != extractedHiragana.length - 1) {
          result += '|';
        }
      }
      return result;
    },
    // 한자와 히라가나를 비교해서 한자에 맞는 히라가나를 추출한다.
    // 예를 들어, '追い出された'라는 한자가 있을 때, 'おいだされた'라는 히라가나가 있을 때,
    // match = ['お', '', 'だ', '', '', '']
    // result = ['お', 'い', 'だ', 'さ', 'れ', 'た']
    // return은 [['お', '', 'だ', '', '', ''], ['お', 'い', 'だ', 'さ', 'れ', 'た']]
    extractYomiganaByRegExp(kanji, kana) {
      let result = [];

      // 한자와 히라가나가 혼합된 경우를 찾는다.
      let splittedKanjiWithKana;
      let splittedKanji = kanji.split(/[·|・|•|]/g);
      for (let i = 0; i < splittedKanji.length; i++) {
        if (RegExp(/([ぁ-んァ-ン]+)/g).test(splittedKanji[i]))
          splittedKanjiWithKana = splittedKanji[i];
      }

      let extractedHiragana = this.extractHiragana(splittedKanjiWithKana);
      let regExp = new RegExp(this.makeRegExpWithExtractedHiragana(extractedHiragana), 'g');
      let str2Edited = kana.replace(/-/g, '');
      let match = str2Edited.match(regExp);
      let hiraganaIndex = 0;
      for (let i = 0; i < match.length; i++) {
        if (match[i] != '') {
          result.push(match[i]);
        }
        else {
          result.push(extractedHiragana[hiraganaIndex]);
          hiraganaIndex++;
        }
      }
      let temp = '';
      for (let i = 0; i < result.length; i++) {
        temp += result[i];
      }
      // 마지막에 한자가 오는 경우, 한자에 맞는 히라가나가 오지 않는다.
      // 그런 경우, 마지막에 한자에 맞는 히라가나를 추가해준다.
      if (temp.length < str2Edited.length) {
        match.push(str2Edited.substring(temp.length));
        result.push(str2Edited.substring(temp.length));
      }
      // 여기까지 match와 result생성이 완료된다.
      return [match, result];
    },
    // 가나의 변형을 만든다.
    // 문자열의 배열의 배열을 입력받고, 문자열의 배열의 배열을 반환한다.
    // ex) arrMatchResult = [['お', '', 'だ', '', '', ''], ['お', 'い', 'だ', 'さ', 'れ', 'た']]
    // return은 arrMatchResult[1]의 변형이 여러개 포함된 배열이다.
    makeVariationsOfYomigana(arrMatchResult) {
      let result = [];
      let match = arrMatchResult[0];
      let yomigana = arrMatchResult[1];
      for (let i = 0; i < match.length; i++) {
        if (match[i] != '') {
          // origin to onvar
          for (let j = 0; j < this.onvarNameKey.length; j++) {
            let convertResults = this.convertOriginToOnVar(match[i], this.onvarNameKey[j][0], this.onvarNameKey[j][1]);
            if (convertResults.length != 0) {
              convertResults.forEach((item) => {
                const temp = [...yomigana]
                temp[i] = item;
                result.push(temp.join(''));
              });
            }
          }
          // onvar to origin
          for (let j = 0; j < this.onvarNameKey.length; j++) {
            let convertResults = this.convertOnVarToOrigin(match[i], this.onvarNameKey[j][0], this.onvarNameKey[j][1]);
            if (convertResults.length != 0) {
              convertResults.forEach((item) => {
                const temp = [...yomigana]
                temp[i] = item;
                result.push(temp.join(''));
              });
            }
          }
        }
        else {
        }
      }
      // 특정 문자열을 포함하면 배열에서 제거한다. 특정 문자열 : っっ, っん, んん, んっ
      result = result.filter((item) => {
        return !RegExp(/っっ|っん|んん|んっ/g).test(item);
      });
      return result;
    },
    // 한자와 가나가 다르고, 한자에 히라가나가 포함되어 있는지 확인하여 메소드를 실행한다.
    // 여기에서는 ex) kanji = やむを得ない, kana = やむをえない
    // return은 makeVariationsOfYomigana의 결과를 반환한다.
    runIfKanjiAndKanaIsDifferent(kanji, kana) {
      let result = [];
      // 한자와 가나가 다를 경우에만 실행한다.
      if (kanji != kana) {
        // 한자에 히라가나가 포함되어 있을 경우에만 실행한다.
        let isHiraganaIncluded = false;
        for (let i = 0; i < kanji.length; i++) {
          if (RegExp(/([ぁ-んァ-ン]+)/g).test(kanji[i])) {
            isHiraganaIncluded = true;
            break;
          }
        }
        if (isHiraganaIncluded) {
          console.log(kanji);
          console.log(kana);
          result = this.makeVariationsOfYomigana(this.extractYomiganaByRegExp(kanji, kana));
          console.log(result);
        }
      }
      return result.length;
    },
    // 아래는 테스트용코드
    // 모든 단어를 전부 돌면서 2개보다 적게 생성되는 경우를 찾는다.
    testForAll(wordList) {
      for (let i = 0; i < wordList.length; i++) {
        if (wordList[i].kanji != wordList[i].kana) {
          let isHiraganaIncluded = false;
          for (let j = 0; j < wordList[i].kanji.length; j++) {
            if (RegExp(/([ぁ-んァ-ン]+)/g).test(wordList[i].kanji[j])) {
              isHiraganaIncluded = true;
              break;
            }
          }
          if (isHiraganaIncluded) {
            if (this.makeVariationsOfYomigana(this.extractYomiganaByRegExp(wordList[i].kanji, wordList[i].kana)).length < 2)
              console.log(wordList[i].kanji, wordList[i].kana);
          }
        }
      }
    }
  },
};
</script> -->