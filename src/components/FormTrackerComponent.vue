<template>
    <div class="box form">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Form to create a new tracker">
                <input type="text" class="input" placeholder="What task do you want to start?" v-model="description"/>
            </div>

            <div class="column is-3">
                <div class="select">
                    <select v-model="projectId">
                        <option value="Select a project"></option>
                        <option :value="project.id" v-for="project in projectList" :key="project.id">
                            {{ project.name }}
                        </option>
                    </select>
                </div>
            </div>
            
            <div class="column">
                <Timer @timerFinished="finishTask"/>
            </div>
        </div> 
    </div>
</template>

<script lang="ts">
import { key } from "@/store";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import Timer from "./TimerComponent.vue";

export default defineComponent({
    name: "FormTrackerComponent",

    components: {
        Timer,
    },

    emits: ['saveTask'],

    setup (props, { emit }) {
        const store = useStore(key);

        const projectId = ref("");
        const description = ref("");
        const projectList = computed(() => store.state.project.projectList);

        const finishTask = (elapseTime: number):  void => {
            emit('saveTask', {
                durationInSeconds: elapseTime,
                description: description.value,
                project: projectList.value.find(p => p.id == projectId.value)
            })
            description.value = '';
        }

        return {
            projectId,
            description,
            projectList,
            finishTask,
        }
    }
});
</script>

<style>
    .form {
        color: var(--text-primary);
        background-color: var(--bg-primary);
    }
</style>
