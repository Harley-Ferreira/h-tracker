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
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { POST_PROJECT, PUT_PROJECT } from "@/store/actions-type";
import { NotificationType } from "@/interfaces/INotification";
import useNotifier from "@/hooks/notifier"
import { useRouter } from "vue-router";

export default defineComponent({
  name: "FormProject",

  props: {
    id: {
      type: String,
    }
  },

  setup (props) {
    const router = useRouter();

    const store = useStore();
    const { notify } = useNotifier()

    const projectName = ref("")

    if (props.id) {
      const project = store.state.project.projectList.find(p => p.id == props.id);
      projectName.value = project?.name || ''
    }

    const save = (): void => {
      if (props.id) {
        store.dispatch(PUT_PROJECT, {
          id: props.id,
          name: projectName.value
        }).then(() => {
          notify(
            NotificationType.SUCCESS, 
            'Project successfuly edited!',
            'Your project is already available.'
          );
        })
      } else {
        store.dispatch(POST_PROJECT, projectName.value)
        .then(() => {
          notify(
            NotificationType.SUCCESS, 
            'Project successfuly created!',
            'Your project is already available.'
          )
        }); 
      }
      projectName.value = "";
      router.push('/projects')
    }

    return {
      projectName,
      save,
    };
  },
});
</script>
