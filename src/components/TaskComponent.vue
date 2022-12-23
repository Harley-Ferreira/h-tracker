<template>
    <Box>
        <div class="columns selectable" @click="clickedTask">
            <div class="column is-4">
                {{ task.description || 'Task without description' }}
            </div>
            <div class="column is-3">
                {{ task.project?.name || 'N/D' }}
            </div>
            <div class="column">
                <StopWatch :timeInSeconds="task.durationInSeconds"/>
            </div>
        </div>
    </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import StopWatch from "./StopWatchComponent.vue";
import ITask from "../interfaces/ITask"
import Box from "./BoxComponent.vue";

export default defineComponent({
    name: 'TaskComponent',

    components: {
        StopWatch,
        Box,
    },

    emits: ['theClickedTask'],

    methods: {
        clickedTask(): void {
            this.$emit('theClickedTask', this.task);
        }
    },

    props: {
        task: {
            type: Object as PropType<ITask>,
            required: true,
        },
    },

});
</script>

<style scoped>
    .selectable {
        cursor: pointer;
    }
</style>