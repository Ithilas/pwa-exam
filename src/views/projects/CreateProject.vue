<template>
  <form @submit.prevent="handleSubmit">
      <h4>Create new Project</h4>
      <input type="text" required placeholder="Project title" v-model="title">
      <textarea required placeholder="Project description" v-model="description"></textarea>
      <!-- upload project image -->
      <!-- <label>Upload project cover image</label>
      <input type="file" @change="handleChange">
      <div class="error">{{ fileError }}</div> -->

      <div class="error"></div>
      <button v-if="!isPending">Create</button>
      <button v-else disabled>Saving...</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const { filePath, url, uploadImage } = useStorage()
        const { error, addDoc } = useCollection('projects')
        const { user } = getUser()
        const router = useRouter()

        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)
        const isPending = ref(false)

        const handleSubmit = async () => {
            if (title.value) {
                isPending.value = true
                // await uploadImage(file.value)
                const res = await addDoc({
                    title: title.value,
                    description: description.value,
                    userId: user.value.uid,
                    userName: user.value.displayName,
                    // coverUrl: url.value,
                    // filePath: filePath.value,
                    assignments: [],
                    createdAt: timestamp()
                })
                isPending.value = false
                if (!error.value) {
                    router.push({ name: 'ProjectDetails', params: { id: res.id }})
                }
            }
        }

        // allowed file types
        // const types = ['image/png', 'image/jpeg']

        // const handleChange = (e) => {
        //     const selected = e.target.files[0]
        //     console.log(selected)

        //     if (selected && types.includes(selected.type)) {
        //         file.value = selected
        //         fileError.value = null
        //     } else {
        //         file.value = null
        //         fileError.value = 'Please select an image file (png or jpg)'
        //     }
        // }

        return { title, description, handleSubmit, fileError, isPending }
    }
}
</script>

<style>
form {
    background: white;
}
input[type="file"] {
    border: 0;
    padding: 0;
}
label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
}
button {
    margin-top: 20px;
}
</style>