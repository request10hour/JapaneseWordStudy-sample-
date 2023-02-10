<template>
    <!-- load & save popup -->
    <div class="popup" v-if="popupVisible">
        <div>
            <form class="flex-column-center-center" @submit.prevent="popupButton(stage)">
                <div>
                    <label for="stage">Input Stage </label>
                    <input v-model="stage" type="number" @input="stage > wordsNum ? stage = wordsNum : _,
                    stage % 1 != 0 ? stage -= stage % 1 : _" style="text-align: center; width: 70px;"
                        placeholder="Enter stage" />
                </div>
                <button class="selection cursor-pointer blue">loadStage</button>
            </form>
            <div>Seed: {{ seed }}</div>
            <div>currentStage: {{ currentWordSeq + 1 }}</div>
        </div>
    </div>
    <!-- wrong alert popup -->
    <div class="popup" v-if="wrongAnswerVisible">
        <div>
            <div>Wrong Answer</div>
            <div>stage : {{ stage }}</div>
            <div>{{ wrongAnswerTmp[0].replace(/\[|\]/g, '') }}</div>
            <div>{{ wrongAnswerTmp[1] }}</div>
            <div>{{ wrongAnswerTmp[2] }}</div>
            <button class="selection cursor-pointer blue" @click="wrongAnswerButton">Back to the First stage</button>
            <router-link :to="'/'">Go to Main Page</router-link>
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

<style>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.popup>div {
    background-color: #fff;
    width: 75vw;
    max-width: 600px;
    min-width: 400px;
    height: 300px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.popup>div>* {
    margin: 10px;
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
}

/* input-number 버튼 없애기 */
input::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
}
</style>

<script>
export default {
    props: [
        'popupVisible',
        'wrongAnswerVisible',
        'seed',
        'currentWordSeq',
        'wordsNum',
        'wrongAnswerTmp',
        'popupButton',
        'wrongAnswerButton',
        'successVisible',
    ],
    watch: {
        currentWordSeq(newValue) {
            this.stage = newValue + 1;
        }
    },
    data() {
        return {
            stage: 1,
        }
    }
}
</script>