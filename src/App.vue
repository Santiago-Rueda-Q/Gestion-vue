<template>
  <div id="app">
    <!-- Navbar principal (ahora fija y a lo ancho) -->
    <Menubar :model="menuItems" class="main-navbar">
      <template #start>
        <div class="flex align-items-center">
          <i class="pi pi-home mr-2 text-2xl text-white"></i>
          <span class="font-bold text-xl text-white">Sistema de Gestión</span>
        </div>
      </template>
    </Menubar>

    <!-- Footer -->
    <footer class="layout-footer">
      <div class="text-center p-3 bg-primary text-white">
        © Gestion CRUD
      </div>
    </footer>
  </div>
</template>


<script>
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import Card from 'primevue/card'
import Menu from 'primevue/menu'
import Avatar from 'primevue/avatar'
import router from './router'

export default {
  name: 'App',
  components: {
    Menubar,
    Card,
    Menu,
    Avatar
  },
  setup() {
    const menuItems = ref([
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        command: () => {
          window.location.href = '@/src/views/Home/Home.vue'
        }
      },
      {
        label: 'Gestión',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Usuarios',
            icon: 'pi pi-users',
            command: () => {
              router.push('/usuarios')
            }
          },
          {
            label: 'Instituciones',
            icon: 'pi pi-building',
            command: () => {
              router.push('/instituciones')
            }
          },
          {
            label: 'Programas Académicos',
            icon: 'pi pi-book',
            command: () => {
              router.push('/programas')
            }
          }
        ]
      },
      {
        label: 'Configuración',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Tipos de Documento',
            icon: 'pi pi-id-card'
          },
          {
            label: 'Géneros',
            icon: 'pi pi-user'
          },
          {
            label: 'Tipos de Usuario',
            icon: 'pi pi-users'
          }
        ]
      }
    ])

    const sidebarItems = ref([
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        command: () => {
          window.location.href = '/'
        }
      },
      {
        separator: true
      },
      {
        label: 'Gestión de Usuarios',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Usuarios',
            icon: 'pi pi-user',
            command: () => {
              // Navegar a usuarios
            }
          },
          {
            label: 'Tipos de Usuario',
            icon: 'pi pi-user-plus',
            command: () => {
              // Navegar a tipos de usuario
            }
          }
        ]
      },
      {
        label: 'Gestión Académica',
        icon: 'pi pi-book',
        items: [
          {
            label: 'Instituciones',
            icon: 'pi pi-building',
            command: () => {
              // Navegar a instituciones
            }
          },
          {
            label: 'Programas Académicos',
            icon: 'pi pi-bookmark',
            command: () => {
              // Navegar a programas
            }
          }
        ]
      },
      {
        label: 'Configuración',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Tipos de Documento',
            icon: 'pi pi-id-card',
            command: () => {
              // Navegar a tipos de documento
            }
          },
          {
            label: 'Géneros',
            icon: 'pi pi-venus-mars',
            command: () => {
              // Navegar a géneros
            }
          }
        ]
      }
    ])

    return {
      menuItems,
      sidebarItems
    }
  }
}
</script>

<style scoped>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-navbar {
  width: 100%;
  border-radius: 0;
  background-color: var(--primary-color);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}

.layout-body {
  display: flex;
  flex: 1;
  margin-top: 64px; /* Altura estimada del Menubar */
  min-height: calc(100vh - 64px - 60px);
}

.layout-sidebar {
  width: 280px;
  background-color: #1e1e1e;
  padding: 1rem;
}

.sidebar-card {
  height: 100%;
  background-color: #1e1e1e;
  color: white;
  border: none;
  box-shadow: none;
}

.layout-content {
  flex: 1;
  padding: 1rem;
  background-color: #f4f4f5;
}

.layout-footer {
  height: 60px;
  margin-top: auto;
  background-color: var(--primary-color);
  color: white;
  text-align: center;
}

/* Personalización del menú */
:deep(.p-menu .p-menuitem-link) {
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
}

:deep(.p-menu .p-menuitem-link:hover) {
  background-color: var(--primary-color);
  color: white;
}

:deep(.p-menu .p-menuitem-icon) {
  margin-right: 0.5rem;
}
</style>
