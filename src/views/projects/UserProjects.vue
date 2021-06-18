<template>
  <div class="user-projects">
      <h2>My Projects</h2>
      <div v-if="projects">
          <ListView :projects="projects" />
      </div>
      <router-link :to="{ name: 'CreateProject' }" class="btn">Create a new Project</router-link>
  </div>
</template>

<script>
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
import ListView from '@/components/ListView.vue'

export default {
    components: { ListView },
    setup() {
        const { user } = getUser()
        const { documents: projects } = getCollection(
            'projects',
            ['userId', '==', user.value.uid]
        )

        console.log('projects')

        return { projects }
    }
}
</script>

<style>

</style>