<template>
  <div>
    <Toast />
    <DataTable :value="users" v-model:selection="selectedUser" selectionMode="single">
      <Column field="first_name" header="Nombre" />
      <Column field="email" header="Correo" />
      <Column header="Acciones" :body="actionTemplate" />
    </DataTable>

    <Dialog header="Editar Usuario" v-model:visible="showDialog">
      <!-- Formulario aquí -->
      <InputText v-model="form.first_name" />
      <Button label="Guardar" @click="saveUser" />
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'

const users = ref([])
const selectedUser = ref(null)
const showDialog = ref(false)
const form = ref({})
const toast = useToast()

const loadUsers = async () => {
  const res = await axios.get('/api/users')
  users.value = res.data.data
}

const saveUser = async () => {
  try {
    await axios.put(`/api/users/${form.value.id}`, form.value)
    toast.add({ severity: 'success', summary: 'Actualizado', detail: 'Usuario actualizado' })
    showDialog.value = false
    loadUsers()
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar' })
  }
}

onMounted(loadUsers)
</script>
