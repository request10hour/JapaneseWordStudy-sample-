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