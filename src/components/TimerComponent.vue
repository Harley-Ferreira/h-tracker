<template>
    <div class="columns">
        <div class="is-flex is-align-items-center is-justify-content-space-between">
            <StopWatch :timeInSeconds="timeInSeconds"/>
            <Button :iconBuntton="'fas fa-play'" @click="initialize" :textButton="'Play'" :disabledButton="chronometerRunning"></Button>
            <Button :iconBuntton="'fas fa-stop'" @click="finalize" :textButton="'Stop'" :disabledButton="!chronometerRunning"></Button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "./ButtonComponent.vue";
import StopWatch from "./StopWatchComponent.vue";

export default defineComponent({
    name: 'TimerComponent',
    
    components: {
        StopWatch,
        Button,
    },

    data() {
        return {
            timeInSeconds: 0,
            chronometer: 0,
            chronometerRunning: false
        }
    },

    emits:['timerFinished'],

    methods: {
        initialize(): void {
            this.chronometerRunning = true;
            this.chronometer = setInterval(() => {
                this.timeInSeconds += 1;
            }, 1000)
        },


        finalize(): void {
            this.chronometerRunning = false;
            clearInterval(this.chronometer);
            this.$emit('timerFinished', this.timeInSeconds)
            this.timeInSeconds = 0;
        }
    }
});
</script>

<style>
    button {
        margin: 5px;
    }

    section {
        margin: 5px;
    }
</style>