<template>
    <div class="box form">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Form to create a new tracker">
                <input type="text" class="input" placeholder="What task do you want to start?" v-model="description"/>
            </div>
            <Timer @timerFinished="fisishTask"/>
        </div> 
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Timer from "./TimerComponent.vue";

export default defineComponent({
    name: "FormTrackerComponent",

    components: {
        Timer,
    },

    data() {
        return {
            description: '',
        }
    },

    emits: ['saveTask'],

    methods: {
        fisishTask(elapseTime: number): void {
            this.$emit('saveTask', {
                durationInSeconds: elapseTime,
                description: this.description,
            })
            this.description = '';
        }, 
    },
});
</script>

<style>
    .form {
        color: var(--text-primary);
        background-color: var(--bg-primary);
    }
</style>
