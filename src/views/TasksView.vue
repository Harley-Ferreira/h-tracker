<template>
  <FormTracker @saveTask="saveTask" />
  <div class="list">
    <Box v-if="taskListIsEmpty"> You aren't productive today! </Box>

    <div class="field">
      <p class="control has-icons-left">
        <input
          class="input"
          type="text"
          placeholder="Filter"
          v-model="projectFilter"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>

    <Task
      v-for="(task, index) in taskList"
      :key="index"
      :task="task"
      @theClickedTask="selectTask"
    />

    <Modal :show="selectedTask != null">
      <template v-slot:header>
        <p class="modal-card-title">Edit Task</p>
        <button @click="closeModal" class="delete" aria-label="close"></button>
      </template>

      <template v-slot:body>
        <div class="field">
          <label for="taskDescription" class="label"> Task description </label>
          <input
            type="text"
            class="input"
            v-model="selectedTask.description"
            id="taskDescription"
          />
        </div>
      </template>

      <template v-slot:footer>
        <button @click="editTask" class="button is-success">
          Save changes
        </button>
        <button @click="closeModal" class="button">Cancel</button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import ITask from "@/interfaces/ITask";
import { useStore } from "@/store";
import {GET_PROJECT, GET_TASK, POST_TASK, PUT_TASK} from "@/store/actions-type";
import { computed, defineComponent, ref, watchEffect } from "vue";

import Box from "../components/BoxComponent.vue";
import FormTracker from "../components/FormTrackerComponent.vue";
import Task from "../components/TaskComponent.vue";
import Modal from "../components/ModalComponent.vue";

export default defineComponent({
  name: "TasksView",

  components: {
    Box,
    FormTracker,
    Modal,
    Task,
  },

  computed: {
    taskListIsEmpty(): boolean {
      return this.taskList == null;
    },
  },

  data() {
    return {
      selectedTask: null as ITask | null,
      taskDescription: String,
    };
  },

  methods: {
    closeModal(): void {
      this.selectedTask = null;
    },

    editTask(): void {
      this.store
        .dispatch(PUT_TASK, this.selectedTask)
        .then(() => this.closeModal());
    },

    saveTask(task: ITask): void {
      this.store.dispatch(POST_TASK, task);
    },

    selectTask(task: ITask): void {
      this.selectedTask = task;
    },
  },

  setup() {
    const store = useStore();
    store.dispatch(GET_PROJECT);
    store.dispatch(GET_TASK);

    const projectFilter = ref("");

    watchEffect(() => {
      store.dispatch(GET_TASK, projectFilter.value);
    });

    return {
      taskList: computed(() => store.state.task.taskList),
      store,
      projectFilter,
    };
  },
});
</script>
