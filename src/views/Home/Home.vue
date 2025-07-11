<template>
  <div class="home-container">
    <!-- Header de Bienvenida -->
    <div class="welcome-header mb-6">
      <div class="flex align-items-center justify-content-between">
        <div>
          <h1 class="text-4xl font-bold text-primary mb-2">
            <i class="pi pi-home mr-3"></i>
            Sistema de Gestión CRUD
          </h1>
          <p class="text-xl text-600 m-0">
            Bienvenido al panel de administración
          </p>
        </div>
        <div class="text-right">
          <p class="text-sm text-500 m-0">{{ currentDate }}</p>
          <p class="text-sm text-500 m-0">{{ currentTime }}</p>
        </div>
      </div>
    </div>

    <!-- Tarjetas de Estadísticas -->
    <div class="grid mb-6">
      <div class="col-12 md:col-6 lg:col-3">
        <Card class="stats-card bg-blue-50 border-blue-200">
          <template #content>
            <div class="flex align-items-center">
              <div class="stats-icon bg-blue-500">
                <i class="pi pi-users text-white text-3xl"></i>
              </div>
              <div class="ml-3">
                <p class="text-blue-900 text-sm font-medium m-0">Total Usuarios</p>
                <p class="text-blue-900 text-2xl font-bold m-0">{{ stats.users }}</p>
              </div>
            </div>
          </template>
        </Card>
      </div>

      <div class="col-12 md:col-6 lg:col-3">
        <Card class="stats-card bg-green-50 border-green-200">
          <template #content>
            <div class="flex align-items-center">
              <div class="stats-icon bg-green-500">
                <i class="pi pi-building text-white text-3xl"></i>
              </div>
              <div class="ml-3">
                <p class="text-green-900 text-sm font-medium m-0">Instituciones</p>
                <p class="text-green-900 text-2xl font-bold m-0">{{ stats.institutions }}</p>
              </div>
            </div>
          </template>
        </Card>
      </div>

      <div class="col-12 md:col-6 lg:col-3">
        <Card class="stats-card bg-purple-50 border-purple-200">
          <template #content>
            <div class="flex align-items-center">
              <div class="stats-icon bg-purple-500">
                <i class="pi pi-book text-white text-3xl"></i>
              </div>
              <div class="ml-3">
                <p class="text-purple-900 text-sm font-medium m-0">Programas</p>
                <p class="text-purple-900 text-2xl font-bold m-0">{{ stats.programs }}</p>
              </div>
            </div>
          </template>
        </Card>
      </div>

      <div class="col-12 md:col-6 lg:col-3">
        <Card class="stats-card bg-orange-50 border-orange-200">
          <template #content>
            <div class="flex align-items-center">
              <div class="stats-icon bg-orange-500">
                <i class="pi pi-cog text-white text-3xl"></i>
              </div>
              <div class="ml-3">
                <p class="text-orange-900 text-sm font-medium m-0">Configuraciones</p>
                <p class="text-orange-900 text-2xl font-bold m-0">{{ stats.configs }}</p>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <!-- Sección de Módulos de Gestión -->
    <!-- Sección con módulos a la derecha -->
<div class="grid">
  <div class="col-12 lg:col-8">
    <!-- Aquí podrías poner estadísticas u otra cosa -->
  </div>
  <div class="col-12 lg:col-4">
    <Card class="module-dashboard-card">
      <template #title>
        <div class="text-center text-primary font-bold text-xl">
          <i class="pi pi-th-large mr-2"></i> Módulos de Gestión
        </div>
      </template>
      <template #content>
        <div class="grid">
          <!-- Gestión de Usuarios -->
          <div class="col-12">
            <Card class="module-card cursor-pointer" @click="navigateToModule('users')">
              <template #content>
                <div class="text-center p-4">
                  <div class="module-icon bg-blue-500 mb-3">
                    <i class="pi pi-users text-white text-4xl"></i>
                  </div>
                  <h3 class="text-lg font-semibold mb-2">Gestión de Usuarios</h3>
                  <p class="text-600 text-sm">Administra usuarios y tipos de usuario</p>
                  <Button label="Acceder" icon="pi pi-arrow-right" class="mt-3 w-full" severity="info" />
                </div>
              </template>
            </Card>
          </div>

          <!-- Gestión Académica -->
          <div class="col-12">
            <Card class="module-card cursor-pointer" @click="navigateToModule('academic')">
              <template #content>
                <div class="text-center p-4">
                  <div class="module-icon bg-green-500 mb-3">
                    <i class="pi pi-book text-white text-4xl"></i>
                  </div>
                  <h3 class="text-lg font-semibold mb-2">Gestión Académica</h3>
                  <p class="text-600 text-sm">Instituciones y programas académicos</p>
                  <Button label="Acceder" icon="pi pi-arrow-right" class="mt-3 w-full" severity="success" />
                </div>
              </template>
            </Card>
          </div>

          <!-- Configuración -->
          <div class="col-12">
            <Card class="module-card cursor-pointer" @click="navigateToModule('config')">
              <template #content>
                <div class="text-center p-4">
                  <div class="module-icon bg-purple-500 mb-3">
                    <i class="pi pi-cog text-white text-4xl"></i>
                  </div>
                  <h3 class="text-lg font-semibold mb-2">Configuración</h3>
                  <p class="text-600 text-sm">Tipos de documento, géneros y más</p>
                  <Button label="Acceder" icon="pi pi-arrow-right" class="mt-3 w-full" severity="help" />
                </div>
              </template>
            </Card>
          </div>
        </div>
      </template>
    </Card>
  </div>
</div>

    </div>

    <!-- Sección de Accesos Rápidos -->
    <div class="grid mt-4">
      <div class="col-12">
        <Card>
          <template #title>
            <div class="flex align-items-center">
              <i class="pi pi-bolt mr-2 text-primary"></i>
              <span>Accesos Rápidos</span>
            </div>
          </template>
          <template #content>
            <div class="flex flex-wrap gap-2 justify-content-center">
              <Button 
                v-for="quickAccess in quickAccessItems" 
                :key="quickAccess.name"
                :label="quickAccess.label" 
                :icon="quickAccess.icon"
                class="p-button-outlined"
                @click="navigateToQuickAccess(quickAccess.route)"
              />
            </div>
          </template>
        </Card>
      </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'

export default {
  name: 'Home',
  components: {
    Card,
    Button
  },
  setup() {
    const currentDate = ref('')
    const currentTime = ref('')
    const stats = ref({
      users: 150,
      institutions: 25,
      programs: 45,
      configs: 8
    })

    const quickAccessItems = ref([
      { name: 'users', label: 'Nuevo Usuario', icon: 'pi pi-user-plus', route: '/crud/user' },
      { name: 'institution', label: 'Nueva Institución', icon: 'pi pi-building', route: '/crud/institution' },
      { name: 'program', label: 'Nuevo Programa', icon: 'pi pi-book', route: '/crud/academic-program' },
      { name: 'document', label: 'Tipo Documento', icon: 'pi pi-id-card', route: '/crud/document-type' },
      { name: 'gender', label: 'Gestión Géneros', icon: 'pi pi-venus-mars', route: '/crud/gender' },
      { name: 'usertype', label: 'Tipos Usuario', icon: 'pi pi-users', route: '/crud/user-type' }
    ])

    let timeInterval = null

    const updateTime = () => {
      const now = new Date()
      currentDate.value = now.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      currentTime.value = now.toLocaleTimeString('es-ES')
    }

    const navigateToModule = (module) => {
      console.log(`Navegando a módulo: ${module}`)
      // Aquí implementarías la navegación usando Vue Router
      // this.$router.push(`/module/${module}`)
    }

    const navigateToQuickAccess = (route) => {
      console.log(`Navegando a: ${route}`)
      // Aquí implementarías la navegación usando Vue Router
      // this.$router.push(route)
    }

    onMounted(() => {
      updateTime()
      timeInterval = setInterval(updateTime, 1000)
    })

    onUnmounted(() => {
      if (timeInterval) {
        clearInterval(timeInterval)
      }
    })

    return {
      currentDate,
      currentTime,
      stats,
      quickAccessItems,
      navigateToModule,
      navigateToQuickAccess
    }
  }
}
</script>

<style scoped>
.home-container {
  padding: 1rem;
}

.welcome-header {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-color-text));
  color: white;
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
}

.welcome-header h1 {
  color: white !important;
}

.stats-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stats-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.stats-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.module-card {
  transition: all 0.3s ease;
  border: 2px solid transparent;
  height: 100%;
}

.module-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-color);
}

.module-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Animaciones */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stats-card,
.module-card {
  animation: fadeInUp 0.6s ease-out;
}

.stats-card:nth-child(1) { animation-delay: 0.1s; }
.stats-card:nth-child(2) { animation-delay: 0.2s; }
.stats-card:nth-child(3) { animation-delay: 0.3s; }
.stats-card:nth-child(4) { animation-delay: 0.4s; }

/* Responsive Design */
@media (max-width: 768px) {
  .welcome-header {
    padding: 1rem;
    text-align: center;
  }
  
  .welcome-header h1 {
    font-size: 2rem;
  }
  
  .welcome-header .flex {
    flex-direction: column;
    gap: 1rem;
  }
  
  .stats-icon {
    width: 50px;
    height: 50px;
  }
  
  .module-icon {
    width: 60px;
    height: 60px;
  }
}
</style>