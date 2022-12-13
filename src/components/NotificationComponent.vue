<template>
  <div class="notifications">
      <article class="message" :class="context[notification.type]" v-for="notification of notifications" :key="notification.id">
        <div class="message-header">{{ notification.title}}</div>
        <div class="message-body">
          {{ notification.text }}
        </div>
      </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store';
import { NotificationType } from '@/interfaces/INotification';

export default defineComponent({
  name: 'NotificationComponent',

  data() {
    return {
      context: {
        [NotificationType.SUCCESS]: 'is-success',
        [NotificationType.INFO]: 'is-warning',
        [NotificationType.ERROR]: 'is-danger',
      }
    }
  },

  setup() {
    const store = useStore();
    return {
      notifications: computed(() => store.state.notifications)
    }
  }
  
})
</script>

<style scoped>
  .notifications {
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 105;
  }
</style>
