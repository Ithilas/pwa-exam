<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="project" class="project-details">

      <!-- project information -->
      <div class="project-info">
          <h2>{{ project.title }}</h2>
          <p>Created by {{ project.userName}}</p>
          <p class="description">{{ project.description }}</p>
          <button v-if="ownerShip" @click="handleDelete">Delete Project</button>
          <!-- TODO! Change to get people from DB to assign to projects! -->
          <p>Add users to project:</p>
          <div class="test">
        <div>
            <input type="checkbox" value="Peter" v-model="names">
            <label class="test">Peter</label>
        </div>
        <div>
            <input type="checkbox" value="Ole" v-model="names">
            <label class="test">Ole</label>
        </div>
        <div>
            <input type="checkbox" value="Hans" v-model="names">
            <label class="test">Hans</label>
        </div>
        <div>
            <input type="checkbox" value="Christan" v-model="names">
            <label class="test">Christian</label>
        </div>
        <p>{{ names }}</p>
          </div>
        <!-- ------------------------------------------ -->
      </div>

    <!-- Assignment list -->
    <div class="assignment-list">
        <div v-if="!project.assignments.length">No assignments have been added to this project yet</div>
        <div v-for="assignment in project.assignments" :key="assignment.id" class="single-assignment">
            <div class="details">
                <h3>{{ assignment.title }}</h3>
                <p>{{ assignment.description }}</p>
                <p>Status: {{ assignment.status}}</p>
            </div>
            <button v-if="ownerShip" @click="handleClick(assignment.id)">Delete</button>
        </div>
        <AddAssignment v-if="ownerShip" :project="project" />
    </div>

  </div>
</template>

<script>
import AddAssignment from '@/components/AddAssignment.vue'
import getDocument from '@/composables/getDocument'
import useDocument from '@/composables/useDocument'
import useStorage from '@/composables/useStorage'
import getUser from '@/composables/getUser'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export default {
    props: ['id'],
    components: { AddAssignment },
    setup(props) {
        const { error, document: project } = getDocument('projects', props.id)
        const { user } = getUser()
        const { deleteDoc, updateDoc } = useDocument('projects', props.id)
        const { deleteImage } = useStorage()
        const router = useRouter()
        const names = ref([])

        const ownerShip = computed(() => {
            return project.value && user.value && user.value.uid == project.value.userId
        })

        const handleDelete = async () => {
            // await deleteImage(project.value.filePath)
            await deleteDoc()
            router.push({ name: 'Home' })
        }

        const handleClick = async (id) => {
            const assignments = project.value.assignments.filter((assignment) => assignment.id != id)
            await updateDoc({ assignments })
        }

        return { error, project, names, ownerShip, handleDelete, handleClick }
    }
}
</script>

<style>
.project-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
}
.cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
}
.cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    max-width: 200%;
    min-height: 100%;
    max-height: 200%;
}
.project-info {
    text-align: center;
}
.project-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
}
.project-info p {
    margin-bottom: 20px;
}
.username {
    color: #999;
}
.description {
    text-align: left;
}
.single-assignment {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
}
.test {
    text-align: left;
}
</style>