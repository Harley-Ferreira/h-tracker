<template>
  <main class="columns is-gapless is-multiline" :class="{'dark-mode': activatedDarkMode}">
    <div class="column is-one-quarter">
      <SideBar @changedTheme="changeTheme"/>
    </div>
    <div class="column is-three-quarter contents">
      <FormTracker @saveTask="saveTask"/>
      <div class="list">
        <Task v-for="(task, index) in tasks" :key="index" :task="task" />
      </div>
      <Box v-if="taskListIsEmpty">
        You aren't productive today!
      </Box>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "./components/SideBarComponent.vue";
import FormTracker from "./components/FormTrackerComponent.vue";
import Task from "./components/TaskComponent.vue";
import ITaks from "./interfaces/ITask";
import Box from "./components/BoxComponent.vue";


export default defineComponent({
  name: "App",

  components: {
    SideBar,
    FormTracker,
    Task,
    Box,
  },

  computed: {
    taskListIsEmpty(): boolean {
      return this.tasks.length === 0;
    }
  },

  data() {
    return {
      tasks: [] as ITaks[],
      activatedDarkMode: false,
    }
  },

  methods: {
    saveTask(task: ITaks): void {
      this.tasks.push(task);
    },

    changeTheme(activatedDarkMode: boolean): void {
      this.activatedDarkMode = activatedDarkMode;
    },
  }
});
</script>

<style>
  .list {
      padding: 1.25rem;
  }

  main {
    --bg-primary: #fff;
    --text-primary: #000;
  }

  main.dark-mode {
    --bg-primary: #2b2d42;
    --text-primary: #ddd;
  }

  .contents {
    background-color: var(--bg-primary);
  }
</style>
