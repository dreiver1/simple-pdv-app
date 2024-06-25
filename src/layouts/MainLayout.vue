<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="bg-accent"
    >
      <q-list class="menu-item">
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container class="bg-dark outer-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';

defineOptions({
  name: 'MainLayout'
});

const linksList: EssentialLinkProps[] = [
{
    title: 'Inicio',
    caption: '',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Ponto de vendas',
    caption: '',
    icon: 'point_of_sale',
    link: '/pdv'
  },
  {
    title: 'Produtos',
    caption: 'Gerencie produtos',
    icon: 'inventory_2',
    link: '/product'
  },
  {
    title: 'Categorias',
    caption: 'Gerencie Categorias',
    icon: 'app_registration',
    link: '/category'
  }
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>


<style>
.menu-item{
  margin-top: 30px;
  transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), opacity 0.4s cubic-bezier(0.25, 0.8, 0.5, 1)
}

.fixed-top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  color: white;
  padding: 10px;
  text-align: center;
  z-index: 1000;
  box-sizing: border-box;
  flex-wrap: wrap;
}

/* Estilos para o container externo */
.outer-container {
  display: flex;
  justify-content: center;
  align-items: start;
  box-sizing: border-box;
}


/* Estilos para o flex container */
.flex-container {
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  width: 90%;
  height: 100%;
}

/* Estilos para os itens dentro do flex container */
.flex-container .item {
  flex: 1 1 30%;
  padding: 10px;
  text-align: center;
  box-sizing: border-box;
  flex-wrap: wrap;
}

/* Estilos para o div full-height */
.flex-container .full-height {
  flex: 1 1 100%;
  padding: 10px;
  margin: 5px;
  text-align: center;
  height: 100%;
  box-sizing: border-box;
}

/* Media queries para dispositivos móveis e tablets */
@media (max-width: 768px) {
  .outer-container{
    flex-direction: column;
  }
  .flex-container {
    width: 100%;
    align-items: stretch; /* Garante que os itens ocupem toda a largura */
  }

  .flex-container .item, .flex-container .full-height {
    flex: 1 1 auto; /* Define o tamanho automático para os itens */
    width: 100%; /* Ocupa toda a largura disponível */
  }
}
</style>
