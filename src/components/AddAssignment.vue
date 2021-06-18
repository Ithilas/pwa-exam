<template>
  <div class="add-assignment">
      <button v-if="!showForm" @click="showForm = true">Add Assignments</button>
      <form v-if="showForm" @submit.prevent="handleSubmit">
          <h4>Add a New Assignment</h4>
          <input type="text" placeholder="Assignment title" required v-model="title">
          <input type="text" placeholder="description" required v-model="description">
          <input type="hidden" v-model="status">
          <button>Add</button>
      </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useDocument from '@/composables/useDocument'

export default {
    props: ['project'],
    setup(props) {
        const title = ref('')
        const description = ref('')
        const status = ref('to-do')
        const showForm = ref(false)
        const { updateDoc } = useDocument('projects', props.project.id)

        const handleSubmit = async () => {
            const newAssignment = {
                title: title.value,
                description: description.value,
                status: status.value,
                id: Math.floor(Math.random() * 1000000)
            }
            await updateDoc({
                assignments: [...props.project.assignments, newAssignment]
            })
            title.value = ''
            description.value = ''
        }

        return { title, description, status, showForm, handleSubmit }
    }
}
</script>

<style scoped>
.add-assignment {
    text-align: center;
    margin-top: 40px;
}
form {
    max-width: 100%;
    text-align: left;
}
</style>