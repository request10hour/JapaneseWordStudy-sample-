<template>
    <div class="partition-container">
        <div class="partition"><span>{{ kana }}</span><span>{{ kanaToHangul(kana) }}</span></div>
        <div class="partition" style="background-color: #ddd;">{{ firstKanji(kanji) }}</div>
        <div class="partition">{{ formMeaning(removeWordClass(meaning)) }}</div>
    </div>
</template>

<style>
.partition-container {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    user-select: none;
}

.partition {
    width: 100vw;
    height: 33.3vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 5vh;
}
</style>

<script>
import { kanaToHangulFunc } from '@/assets/hangul.js';
import wordN5 from '@/assets/data/JLPT_N5.json';
import wordN4 from '@/assets/data/JLPT_N4.json';
import wordN3 from '@/assets/data/JLPT_N3.json';
import wordN2 from '@/assets/data/JLPT_N2.json';
import wordN1 from '@/assets/data/JLPT_N1.json';


export default {
    data() {
        return {
            kana: '',
            kanji: '',
            meaning: '',
            wordclass: '',
            n1Length: wordN1.length,
            n2Length: wordN2.length,
            n3Length: wordN3.length,
            n4Length: wordN4.length,
            n5Length: wordN5.length,
        };
    },
    mounted() {
        this.getRandWord();
        onclick = () => {
            this.getRandWord();
        };
    },
    methods: {
        kanaToHangul(kana) {
            return kanaToHangulFunc(kana);
        },
        removeWordClass(meaning) {
            return meaning.replace(this.wordclass, '');
        },
        removeIfFirstIsSpace(meaning) {
            if (meaning[0] === ' ') {
                return meaning.slice(1);
            }
            return meaning;
        },
        randInLength() {
            return Math.floor(Math.random() * (this.n1Length + this.n2Length + this.n3Length + this.n4Length + this.n5Length));
        },
        getRandWord() {
            const rand = this.randInLength();
            if (rand < this.n1Length) {
                this.kana = wordN1[rand].kana;
                this.kanji = wordN1[rand].kanji;
                this.meaning = wordN1[rand].meaning;
                this.wordclass = wordN1[rand].wordclass;
            } else if (rand < this.n1Length + this.n2Length) {
                this.kana = wordN2[rand - this.n1Length].kana;
                this.kanji = wordN2[rand - this.n1Length].kanji;
                this.meaning = wordN2[rand - this.n1Length].meaning;
                this.wordclass = wordN2[rand - this.n1Length].wordclass;
            } else if (rand < this.n1Length + this.n2Length + this.n3Length) {
                this.kana = wordN3[rand - this.n1Length - this.n2Length].kana;
                this.kanji = wordN3[rand - this.n1Length - this.n2Length].kanji;
                this.meaning = wordN3[rand - this.n1Length - this.n2Length].meaning;
                this.wordclass = wordN3[rand - this.n1Length - this.n2Length].wordclass;
            } else if (rand < this.n1Length + this.n2Length + this.n3Length + this.n4Length) {
                this.kana = wordN4[rand - this.n1Length - this.n2Length - this.n3Length].kana;
                this.kanji = wordN4[rand - this.n1Length - this.n2Length - this.n3Length].kanji;
                this.meaning = wordN4[rand - this.n1Length - this.n2Length - this.n3Length].meaning;
                this.wordclass = wordN4[rand - this.n1Length - this.n2Length - this.n3Length].wordclass;
            } else {
                this.kana = wordN5[rand - this.n1Length - this.n2Length - this.n3Length - this.n4Length].kana;
                this.kanji = wordN5[rand - this.n1Length - this.n2Length - this.n3Length - this.n4Length].kanji;
                this.meaning = wordN5[rand - this.n1Length - this.n2Length - this.n3Length - this.n4Length].meaning;
                this.wordclass = wordN5[rand - this.n1Length - this.n2Length - this.n3Length - this.n4Length].wordclass;
            }
        },
        // split by regex
        splitByRegex(meaning) {
            const regex = /[0-9]\.|;/g;
            const result = meaning.split(regex);
            return result;
        },
        removeSpaceFirstOrLast(meaning) {
            if (meaning[0] === ' ') {
                meaning = meaning.slice(1);
            }
            if (meaning[meaning.length - 1] === ' ') {
                meaning = meaning.slice(0, meaning.length - 1);
            }
            return meaning;
        },
        removeNullString(meaning) {
            const result = [];
            for (let i = 0; i < meaning.length; i += 1) {
                if (meaning[i] !== '') {
                    result.push(meaning[i]);
                }
            }
            return result;
        },
        extractRandInArray(array) {
            const rand = Math.floor(Math.random() * array.length);
            return array[rand];
        },
        formMeaning(meaning) {
            meaning = this.removeWordClass(meaning);
            meaning = this.splitByRegex(meaning);
            for (let i = 0; i < meaning.length; i += 1) {
                meaning[i] = this.removeSpaceFirstOrLast(meaning[i]);
            }
            meaning = this.removeNullString(meaning);
            // meaning = this.extractRandInArray(meaning);
            meaning = meaning[0];
            return meaning;
        },
        // extract kanji in '[付く·附く]' -> 付く
        firstKanji(kanji) {
            const regex = /\[|\]|/g;
            const result = kanji.replace(regex, '').split('·');
            return result[0];
        }
    },

}
</script>