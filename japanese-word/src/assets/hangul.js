const kanaToHangul = {
  'あ': '아',
  'い': '이',
  'う': '우',
  'え': '에',
  'お': '오',
  'か': '카',
  'き': '키',
  'く': '쿠',
  'け': '케',
  'こ': '코',
  'さ': '사',
  'し': '시',
  'す': '스',
  'せ': '세',
  'そ': '소',
  'た': '타',
  'ち': '치',
  'つ': '츠',
  'て': '테',
  'と': '토',
  'な': '나',
  'に': '니',
  'ぬ': '누',
  'ね': '네',
  'の': '노',
  'は': '하',
  'ひ': '히',
  'ふ': '후',
  'へ': '헤',
  'ほ': '호',
  'ま': '마',
  'み': '미',
  'む': '무',
  'め': '메',
  'も': '모',
  'や': '야',
  'ゆ': '유',
  'よ': '요',
  'ら': '라',
  'り': '리',
  'る': '루',
  'れ': '레',
  'ろ': '로',
  'わ': '와',
  'を': '오',
  'が': '가',
  'ぎ': '기',
  'ぐ': '구',
  'げ': '게',
  'ご': '고',
  'ざ': '자',
  'じ': '지',
  'ず': '즈',
  'ぜ': '제',
  'ぞ': '조',
  'だ': '다',
  'ぢ': '지',
  'づ': '즈',
  'で': '데',
  'ど': '도',
  'ば': '바',
  'び': '비',
  'ぶ': '부',
  'べ': '베',
  'ぼ': '보',
  'ぱ': '파',
  'ぴ': '피',
  'ぷ': '푸',
  'ぺ': '페',
  'ぽ': '포',
  'ゐ': '위',
  'ゑ': '웨',
  'ゔ': '부',
  'ア': '아',
  'イ': '이',
  'ウ': '우',
  'エ': '에',
  'オ': '오',
  'カ': '카',
  'キ': '키',
  'ク': '쿠',
  'ケ': '케',
  'コ': '코',
  'サ': '사',
  'シ': '시',
  'ス': '스',
  'セ': '세',
  'ソ': '소',
  'タ': '타',
  'チ': '치',
  'ツ': '츠',
  'テ': '테',
  'ト': '토',
  'ナ': '나',
  'ニ': '니',
  'ヌ': '누',
  'ネ': '네',
  'ノ': '노',
  'ハ': '하',
  'ヒ': '히',
  'フ': '후',
  'ヘ': '헤',
  'ホ': '호',
  'マ': '마',
  'ミ': '미',
  'ム': '무',
  'メ': '메',
  'モ': '모',
  'ヤ': '야',
  'ユ': '유',
  'ヨ': '요',
  'ラ': '라',
  'リ': '리',
  'ル': '루',
  'レ': '레',
  'ロ': '로',
  'ワ': '와',
  'ヲ': '오',
  'ガ': '가',
  'ギ': '기',
  'グ': '구',
  'ゲ': '게',
  'ゴ': '고',
  'ザ': '자',
  'ジ': '지',
  'ズ': '즈',
  'ゼ': '제',
  'ゾ': '조',
  'ダ': '다',
  'ヂ': '지',
  'ヅ': '즈',
  'デ': '데',
  'ド': '도',
  'バ': '바',
  'ビ': '비',
  'ブ': '부',
  'ベ': '베',
  'ボ': '보',
  'パ': '파',
  'ピ': '피',
  'プ': '푸',
  'ペ': '페',
  'ポ': '포',
  'ヰ': '위',
  'ヱ': '웨',
  'ヴ': '부',
  'ー': 'ー',
}

const kanaToHangulVowel = {
  'ゃ': 'ㅑ',
  'ゅ': 'ㅠ',
  'ょ': 'ㅛ',
  'ぁ': 'ㅏ',
  'ぃ': 'ㅣ',
  'ぅ': 'ㅜ',
  'ぇ': 'ㅔ',
  'ぉ': 'ㅗ',
  'ゎ': 'ㅘ',
  'ャ': 'ㅑ',
  'ュ': 'ㅠ',
  'ョ': 'ㅛ',
  'ァ': 'ㅏ',
  'ィ': 'ㅣ',
  'ゥ': 'ㅜ',
  'ェ': 'ㅔ',
  'ォ': 'ㅗ',
  'ヮ': 'ㅘ',
}

const kanaToHangulConsonant = {
  'っ': 'ㅅ',
  'ッ': 'ㅅ',
  'ん': 'ㄴ',
  'ン': 'ㄴ',
}

const initialConsonants = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const middleVowels = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const finalConsonants = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

export function mergeHangul(initial, vowel, final) {
  let initialIndex = initialConsonants.indexOf(initial);
  let vowelIndex = middleVowels.indexOf(vowel);
  let finalIndex = finalConsonants.indexOf(final);
  let unicode = 44032 + (28 * 21 * initialIndex) + (28 * vowelIndex) + finalIndex;
  return String.fromCharCode(unicode);
}

export function separateHangul(character) {
  let unicode = character.charCodeAt(0);
  let finalIndex = unicode - 44032;
  let final = finalConsonants[finalIndex % 28];
  let vowelIndex = Math.floor(finalIndex / 28) % 21;
  let vowel = middleVowels[vowelIndex];
  let initialIndex = Math.floor(finalIndex / 28 / 21);
  let initial = initialConsonants[initialIndex];
  return { initial, vowel, final };
}

export function kanaToHangulFunc(kana = '') {
  let hangul = '';

  for (let i = 0; i < kana.length; i++) {
    if (kana[i] in kanaToHangul) {
      hangul += kanaToHangul[kana[i]];
    }
    else if (kana[i] in kanaToHangulVowel) {
      if (i === 0) {
        hangul += mergeHangul('ㅇ', kanaToHangulVowel[kana[i]], '');
      }
      else if (RegExp('[가-힣]').test(hangul[hangul.length - 1])) {
        const lastHangul = separateHangul(hangul[hangul.length - 1]);
        hangul = hangul.slice(0, hangul.length - 1);
        hangul += mergeHangul(lastHangul.initial, kanaToHangulVowel[kana[i]], '');
      }
      else {
        hangul += mergeHangul('ㅇ', kanaToHangulVowel[kana[i]], '');
      }
    }
    else if (kana[i] in kanaToHangulConsonant) {
      if (i === 0) {
        hangul += mergeHangul('ㅇ', 'ㅡ', kanaToHangulConsonant[kana[i]]);
      }
      else if (RegExp('[가-힣]').test(hangul[hangul.length - 1])) {
        const lastHangul = separateHangul(hangul[hangul.length - 1]);
        hangul = hangul.slice(0, hangul.length - 1);
        hangul += mergeHangul(lastHangul.initial, lastHangul.vowel, kanaToHangulConsonant[kana[i]]);
      }
      else {
        hangul += mergeHangul('ㅇ', 'ㅡ', kanaToHangulConsonant[kana[i]]);
      }
    }
    else {
      hangul += kana[i];
    }
  }
  return hangul;
}