const allHiraganaListWithDakuon = [
    'あ', 'い', 'う', 'え', 'お',
    'か', 'き', 'く', 'け', 'こ',
    'さ', 'し', 'す', 'せ', 'そ',
    'た', 'ち', 'つ', 'て', 'と',
    'な', 'に', 'ぬ', 'ね', 'の',
    'は', 'ひ', 'ふ', 'へ', 'ほ',
    'ま', 'み', 'む', 'め', 'も',
    'や', 'ゆ', 'よ',
    'ら', 'り', 'る', 'れ', 'ろ',
    'わ', 'を', 'ん',
    'が', 'ぎ', 'ぐ', 'げ', 'ご',
    'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
    'だ', 'ぢ', 'づ', 'で', 'ど',
    'ば', 'び', 'ぶ', 'べ', 'ぼ',
    'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'
]

export default {
    methods: {
        extractHiragana(str1) {
            let result = [];
            let temp = '';
            for (let i = 0; i < str1.length; i++) {
                if (allHiraganaListWithDakuon.includes(str1[i])) {
                    temp += str1[i];
                }
                else {
                    if (temp != '') {
                        result.push(temp);
                        temp = '';
                    }
                }
            }
            if (temp != '') {
                result.push(temp);
            }
            return result;
        },

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

        extractYomiganaByRegExp(str1, str2) {
            let result = [];
            let extractedHiragana = extractHiragana(str1);
            let regExp = new RegExp(makeRegExpWithExtractedHiragana(extractedHiragana), 'g');
            let match = str2.replace(/-/g, '').match(regExp);
            // console.log(match);
            let hiraganaIndex = 0;
            for (let i = 0; i < match.length; i++) {
                if (match[i] != '') {
                    result.push(match[i]);
                    // 히라가나 일부 변경 알고리즘 추가해라 히라가나 일부 변경 알고리즘 추가해라 히라가나 일부 변경 알고리즘 추가해라
                }
                else {
                    result.push(extractedHiragana[hiraganaIndex]);
                    hiraganaIndex++;
                }
            }
            return result;
        },

        runIfKanjiAndKanaIsDifferent(wordList) {
            wordList.forEach(word => {
                // 한자와 가나가 다르면
                if (word.kanji != word.kana) {
                    // 히라가나 포함 확인
                    let isHiraganaIncluded = false;
                    for (let i = 0; i < word.kanji.length; i++) {
                        if (allHiraganaListWithDakuon.includes(word.kanji[i])) {
                            isHiraganaIncluded = true;
                            break;
                        }
                    }
                    if (isHiraganaIncluded) {
                        console.log(word.kanji);
                        console.log(word.kana);
                        console.log(extractYomiganaByRegExp(word.kanji, word.kana));
                    }
                }
            });
        }
    }
}