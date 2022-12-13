<template>
  <main class="columns is-gapless is-multiline" :class="{'dark-mode': activatedDarkMode}">
    <div class="column is-one-quarter">
      <SideBar @changedTheme="changeTheme"/>
    </div>
    <div class="column is-three-quarter contents">
      <NotificationComponent/>
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NotificationComponent from "./components/NotificationComponent.vue";
import SideBar from "./components/SideBarComponent.vue";

export default defineComponent({
  name: "App",

  components: {
    SideBar,
    NotificationComponent,
  },

  data() {
    return {
      activatedDarkMode: false,
    }
  },

  methods: {
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
