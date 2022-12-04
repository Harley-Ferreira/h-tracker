<template>
    <Box>
        <div class="columns">
            <div class="column is-7">
                {{task.description || 'Task without description'}}
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
    
    props: {
        task: {
            type: Object as PropType<ITask>,
            required: true,
        },
    },

    components: {
        StopWatch,
        Box,
    }
});
</script>