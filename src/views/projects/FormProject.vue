<template>
  <section>
    <form @submit.prevent="save">
      <div class="field">
        <label for="projectName" class="label"> Project Name </label>
        <input type="text" class="input" v-model="projectName" id="projectName">
      </div>
      <div class="field">
        <button class="button" type="submit">Save</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { ADD_PROJECT, EDIT_PROJECT } from "@/store/mutatios-type";
import { NotificationType } from "@/interfaces/INotification";
import useNotifier from "@/hooks/notifier"

export default defineComponent({
  name: "FormProject",

  data () {
    return {
      projectName: '',
    }
  },

  mounted() {
    if (this.id) {
      const project = this.store.state.projectList.find(p => p.id == this.id)
      this.projectName = project?.name || ''
    }
  },

  methods: {
    save (): void {
      if (this.id) {
        this.store.commit(EDIT_PROJECT, {
          id: this.id,
          name: this.projectName
        })

        this.notify(
          NotificationType.SUCCESS, 
          'Project successfuly edited!',
          'Your project is already available.'
        )
      } else {
        this.store.commit(ADD_PROJECT, this.projectName)
        
        this.notify(
          NotificationType.SUCCESS, 
          'Project successfuly created!',
          'Your project is already available.'
        )
      }
      this.projectName = '';
      this.$router.push('/projects')
    },

    
  },

  props: {
    id: {
      type: String,
    }
  },

  setup () {
    const store = useStore();
    const { notify } = useNotifier()
    return {
      store,
      notify,
    }
  }
});
</script>
