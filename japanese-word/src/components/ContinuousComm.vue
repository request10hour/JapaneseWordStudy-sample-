<template>
    <div class="partition-container">
        <div class="partition1" style="background-color: #ddd; font-size: 15vh;" @click="openUrl">
            {{ kanji }}</div>
        <div class="partition2" @click="getRandComm">
            <div v-for="a in pronunciationCount"><span>{{ pronunciationList[a - 1] }}</span>
                <span>{{ pronunciationHangulList[a - 1] }}</span>
            </div>
        </div>
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

.partition1 {
    width: 100vw;
    height: 33.3vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 3vh;
}

.partition2 {
    width: 100vw;
    height: 66.6vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 3vh;
}

.partition2>div {
    margin-top: 1vh;
}

.partition2>div>span {
    margin-right: 1vh;
}
</style>

<script>
import { kanaToHangulFunc } from '@/assets/hangul.js';
import Comm from '@/assets/data/Comm.json';
// import hanja_definitions2 from '@/assets/data/hanja_definitions2.json';

export default {
    data() {
        return {
            kanji: '',
            radical: '',
            pronunciationList: [],
            pronunciationHangulList: [],
            pronunciationCount: 1,
            // hanja: '',
            url: '',
        };
    },
    mounted() {
        this.getRandComm();
    },
    methods: {
        getRandComm() {
            const rand = Math.floor(Math.random() * Comm.length);
            this.kanji = Comm[rand].通用字体;
            this.radical = Comm[rand].部首;
            this.pronunciationList = Comm[rand].音訓.split('、');
            this.pronunciationList = this.pronunciationList.map((item) => item.replace(' ', ''));
            this.pronunciationHangulList = this.pronunciationList.map((item) => kanaToHangulFunc(item));
            this.pronunciationCount = Comm[rand].音訓.split('、').length;
            this.setUrl();
        },
        // getDefinition(kanji) {
        //     const hanja = hanja_definitions2.find((item) => item.hanja === kanji);
        //     if (hanja) {
        //         this.hanja = hanja.hunum;
        //     } else {
        //         this.hanja = '';
        //     }
        // },
        // retu
        setUrl() {
            this.url = `https://hanja.dict.naver.com/#/search?query=${this.kanji}`;
        },
        openUrl() {
            window.open(this.url);
        }
    },
}
</script>