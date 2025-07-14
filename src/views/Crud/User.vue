<!-- src/views/Crud/User.vue -->
<template>
  <div class="user-crud">
    <div class="header">
      <h2>Gestión de Usuarios</h2>
      <button @click="openCreateModal" class="btn btn-primary">
        Crear Usuario
      </button>
    </div>

    <!-- Filtros -->
    <div class="filters">
      <input 
        v-model="filters.search" 
        @input="debouncedSearch"
        placeholder="Buscar usuarios..."
        class="search-input"
      />
      <select v-model="filters.user_type_id" @change="loadUsers">
        <option value="">Todos los tipos</option>
        <option v-for="type in userTypes" :key="type.id" :value="type.id">
          {{ type.name }}
        </option>
      </select>
      <select v-model="filters.status" @change="loadUsers">
        <option value="">Todos los estados</option>
        <option value="active">Activos</option>
        <option value="inactive">Inactivos</option>
        <option value="pending">Pendientes</option>
      </select>
    </div>

    <!-- Tabla de usuarios -->
    <div class="table-container">
      <table class="users-table">
        <thead>
          <tr>
            <th>
              <input 
                type="checkbox" 
                v-model="selectAll" 
                @change="toggleSelectAll"
              />
            </th>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Documento</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>
              <input 
                type="checkbox" 
                v-model="selectedUsers" 
                :value="user.id"
              />
            </td>
            <td>
              <img 
                :src="user.profile_photo ? getImageUrl(user.profile_photo) : '/default-avatar.png'" 
                :alt="user.first_name"
                class="user-avatar"
              />
            </td>
            <td>{{ user.first_name }} {{ user.last_name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.document_number }}</td>
            <td>{{ user.user_type?.name || 'N/A' }}</td>
            <td>
              <span :class="['status', user.status]">
                {{ getStatusLabel(user.status) }}
              </span>
            </td>
            <td>
              <div class="actions">
                <button @click="viewUser(user)" class="btn btn-info btn-sm">
                  Ver
                </button>
                <button @click="editUser(user)" class="btn btn-warning btn-sm">
                  Editar
                </button>
                <button @click="toggleUserStatus(user)" class="btn btn-secondary btn-sm">
                  {{ user.status === 'active' ? 'Desactivar' : 'Activar' }}
                </button>
                <button @click="deleteUser(user)" class="btn btn-danger btn-sm">
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Paginación -->
    <div class="pagination">
      <button 
        @click="goToPage(pagination.current_page - 1)"
        :disabled="pagination.current_page === 1"
        class="btn btn-secondary"
      >
        Anterior
      </button>
      <span>
        Página {{ pagination.current_page }} de {{ pagination.last_page }}
      </span>
      <button 
        @click="goToPage(pagination.current_page + 1)"
        :disabled="pagination.current_page === pagination.last_page"
        class="btn btn-secondary"
      >
        Siguiente
      </button>
    </div>

    <!-- Acciones masivas -->
    <div v-if="selectedUsers.length > 0" class="bulk-actions">
      <button @click="bulkActivate" class="btn btn-success">
        Activar Seleccionados ({{ selectedUsers.length }})
      </button>
      <button @click="bulkDeactivate" class="btn btn-warning">
        Desactivar Seleccionados ({{ selectedUsers.length }})
      </button>
      <button @click="bulkDelete" class="btn btn-danger">
        Eliminar Seleccionados ({{ selectedUsers.length }})
      </button>
    </div>

    <!-- Modal de creación/edición -->
    <UserModal 
      v-if="showModal"
      :user="currentUser"
      :form-data="formData"
      :is-editing="isEditing"
      @close="closeModal"
      @save="saveUser"
    />

    <!-- Loading -->
    <div v-if="loading" class="loading">
      Cargando...
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, watch } from 'vue';
import { userApi } from '../../Api/Axios.js';
import UserModal from '../Crud/DocumentType.vue'; // Componente del modal

export default {
  name: 'UserCrud',
  components: {
    UserModal
  },
  setup() {
    // Estado reactivo
    const users = ref([]);
    const userTypes = ref([]);
    const loading = ref(false);
    const showModal = ref(false);
    const isEditing = ref(false);
    const currentUser = ref(null);
    const selectedUsers = ref([]);
    const selectAll = ref(false);
    
    // Filtros
    const filters = reactive({
      search: '',
      user_type_id: '',
      status: '',
      page: 1,
      per_page: 15
    });

    // Paginación
    const pagination = ref({
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 0
    });

    // Datos del formulario
    const formData = ref({
      document_types: [],
      user_types: [],
      institutions: [],
      academic_programs: [],
      genders: []
    });

    // Métodos
    const loadUsers = async () => {
      loading.value = true;
      try {
        const response = await userApi.getUsers(filters);
        if (response.success) {
          users.value = response.data;
          pagination.value = response.pagination;
        }
      } catch (error) {
        console.error('Error cargando usuarios:', error);
        alert('Error al cargar usuarios');
      } finally {
        loading.value = false;
      }
    };

    const loadFormData = async () => {
      try {
        const response = await userApi.getCreateData();
        if (response.success) {
          formData.value = response.data;
          userTypes.value = response.data.user_types;
        }
      } catch (error) {
        console.error('Error cargando datos del formulario:', error);
      }
    };

    const openCreateModal = () => {
      currentUser.value = null;
      isEditing.value = false;
      showModal.value = true;
    };

    const editUser = async (user) => {
      try {
        const response = await userApi.getEditData(user.id);
        if (response.success) {
          currentUser.value = response.data.user;
          formData.value = response.data;
          isEditing.value = true;
          showModal.value = true;
        }
      } catch (error) {
        console.error('Error cargando datos de edición:', error);
        alert('Error al cargar datos del usuario');
      }
    };

    const saveUser = async (userData) => {
      try {
        let response;
        if (isEditing.value) {
          response = await userApi.updateUser(currentUser.value.id, userData);
        } else {
          response = await userApi.createUser(userData);
        }

        if (response.success) {
          alert(response.message);
          closeModal();
          loadUsers();
        }
      } catch (error) {
        console.error('Error guardando usuario:', error);
        if (error.response?.data?.errors) {
          // Manejar errores de validación
          console.log('Errores de validación:', error.response.data.errors);
        }
        alert('Error al guardar usuario');
      }
    };

    const deleteUser = async (user) => {
      if (confirm(`¿Estás seguro de eliminar a ${user.first_name} ${user.last_name}?`)) {
        try {
          const response = await userApi.deleteUser(user.id);
          if (response.success) {
            alert(response.message);
            loadUsers();
          }
        } catch (error) {
          console.error('Error eliminando usuario:', error);
          alert('Error al eliminar usuario');
        }
      }
    };

    const toggleUserStatus = async (user) => {
      try {
        const response = await userApi.toggleStatus(user.id);
        if (response.success) {
          alert(response.message);
          loadUsers();
        }
      } catch (error) {
        console.error('Error cambiando estado:', error);
        alert('Error al cambiar estado');
      }
    };

    const closeModal = () => {
      showModal.value = false;
      currentUser.value = null;
      isEditing.value = false;
    };

    const viewUser = (user) => {
      // Implementar vista detallada
      console.log('Ver usuario:', user);
    };

    const goToPage = (page) => {
      if (page >= 1 && page <= pagination.value.last_page) {
        filters.page = page;
        loadUsers();
      }
    };

    const toggleSelectAll = () => {
      if (selectAll.value) {
        selectedUsers.value = users.value.map(user => user.id);
      } else {
        selectedUsers.value = [];
      }
    };

    const bulkActivate = async () => {
      if (confirm(`¿Activar ${selectedUsers.value.length} usuarios?`)) {
        try {
          const response = await userApi.bulkAction('activate', selectedUsers.value);
          if (response.success) {
            alert(response.message);
            selectedUsers.value = [];
            selectAll.value = false;
            loadUsers();
          }
        } catch (error) {
          console.error('Error en operación masiva:', error);
          alert('Error en operación masiva');
        }
      }
    };

    const bulkDeactivate = async () => {
      if (confirm(`¿Desactivar ${selectedUsers.value.length} usuarios?`)) {
        try {
          const response = await userApi.bulkAction('deactivate', selectedUsers.value);
          if (response.success) {
            alert(response.message);
            selectedUsers.value = [];
            selectAll.value = false;
            loadUsers();
          }
        } catch (error) {
          console.error('Error en operación masiva:', error);
          alert('Error en operación masiva');
        }
      }
    };

    const bulkDelete = async () => {
      if (confirm(`¿Eliminar ${selectedUsers.value.length} usuarios? Esta acción no se puede deshacer.`)) {
        try {
          const response = await userApi.bulkAction('delete', selectedUsers.value);
          if (response.success) {
            alert(response.message);
            selectedUsers.value = [];
            selectAll.value = false;
            loadUsers();
          }
        } catch (error) {
          console.error('Error en operación masiva:', error);
          alert('Error en operación masiva');
        }
      }
    };

    const getImageUrl = (path) => {
      return `http://localhost:8000/storage/${path}`;
    };

    const getStatusLabel = (status) => {
      const labels = {
        active: 'Activo',
        inactive: 'Inactivo',
        pending: 'Pendiente'
      };
      return labels[status] || status;
    };

    // Búsqueda con debounce
    let searchTimeout;
    const debouncedSearch = () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        loadUsers();
      }, 500);
    };

    // Watchers
    watch(() => filters.user_type_id, loadUsers);
    watch(() => filters.status, loadUsers);

    // Mounted
    onMounted(() => {
      loadUsers();
      loadFormData();
    });

    return {
      users,
      userTypes,
      loading,
      showModal,
      isEditing,
      currentUser,
      selectedUsers,
      selectAll,
      filters,
      pagination,
      formData,
      loadUsers,
      openCreateModal,
      editUser,
      saveUser,
      deleteUser,
      toggleUserStatus,
      closeModal,
      viewUser,
      goToPage,
      toggleSelectAll,
      bulkActivate,
      bulkDeactivate,
      bulkDelete,
      getImageUrl,
      getStatusLabel,
      debouncedSearch
    };
  }
};
</script>

<style scoped>
.user-crud {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.table-container {
  overflow-x: auto;
  margin-bottom: 20px;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.users-table th,
.users-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.users-table th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.status.active {
  background-color: #d4edda;
  color: #155724;
}

.status.inactive {
  background-color: #f8d7da;
  color: #721c24;
}

.status.pending {
  background-color: #fff3cd;
  color: #856404;
}

.actions {
  display: flex;
  gap: 5px;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 12px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-warning {
  background-color: #ffc107;
  color: black;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.bulk-actions {
  display: flex;
  gap: 10px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.loading {
  text-align: center;
  padding: 20px;
  font-size: 16px;
}
</style>