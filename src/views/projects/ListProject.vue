<template>
    <section>
      <router-link to="/projects/new" class="button">
        <span class="icon is-small">
          <i class="fas fa-plus"></i>
        </span>
        <span>New proejct</span>
      </router-link>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="project in projectList" :key="project.id">
            <td>{{ project.id }}</td>
            <td>{{ project.name }}</td>
            <td>
            <router-link :to="`/projects/${project.id}`" class="button" style="margin: 5px;">
                <span class="icon is-small">
                  <i class="fas fa-pencil-alt"></i>
                </span>
            </router-link>
            <button class="button m1-2 is-danger" @click="exclude(project.id)">
                <span class="icon is-small">
                  <i class="fas fa-trash"></i>
                </span>
            </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </template>
  
  <script lang="ts">
  import { computed, defineComponent } from "vue";
  import { useStore } from "@/store";
  import { DELETE_PROJECT, GET_PROJECT } from "@/store/actions-type";
  
  export default defineComponent({
    
    name: "ProjectsView",
    
    methods: {
      exclude(id: string): void {
        this.store.dispatch(DELETE_PROJECT, id)
      }
    },

    setup () {
      const store = useStore();
      store.dispatch(GET_PROJECT);
      return {
        projectList: computed(() => store.state.project.projectList),
        store,
      }
    }
  });
  </script>
  
