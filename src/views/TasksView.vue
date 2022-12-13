<template>
    <FormTracker @saveTask="saveTask"/>
    <div class="list">
        <Box v-if="taskListIsEmpty">
            You aren't productive today!
        </Box>
        <Task v-for="(task, index) in tasks" :key="index" :task="task" />
    </div>
</template>
  
  <script lang="ts">
  import { defineComponent } from "vue";

  import Box from "../components/BoxComponent.vue";
  import FormTracker from "../components/FormTrackerComponent.vue";
  import Task from "../components/TaskComponent.vue";
 
  import ITaks from "../interfaces/ITask";
  
  export default defineComponent({
    name: "TasksView",
  
    components: {
      Box,
      FormTracker,
      Task,
    },
  
    computed: {
      taskListIsEmpty(): boolean {
        return this.tasks.length === 0;
      }
    },
  
    data() {
      return {
        tasks: [] as ITaks[],
      }
    },
  
    methods: {
      saveTask(task: ITaks): void {
        this.tasks.push(task);
      },
    }
  });
  </script>