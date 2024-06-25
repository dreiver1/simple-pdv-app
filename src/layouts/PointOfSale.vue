<template>
  <q-layout view="lHh Lpr lFf ">
    <q-header elevated class="fixed-top text-bold text-dark bg-primary">
      <q-toolbar class="row justify-around">

        <q-toolbar-title style="max-width: 200px; border-radius: 5px; margin-bottom: 5px; align-self: start; justify-self: center;" class="bg-primary q-pa-ls">
          SIM-PDV
        </q-toolbar-title>

        <div>SimplePDV v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container class="outer-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">

defineOptions({
  name: 'MainLayout'
});
</script>

<style>
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
  align-items: center;
  box-sizing: border-box;
}


/* Estilos para o flex container */
.flex-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
}

/* Estilos para os itens dentro do flex container */
.flex-container .item {
  flex: 1 1 30%;
  padding: 10px;
  margin: 5px;
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
    align-items: stretch; /* Garante que os itens ocupem toda a largura */
  }

  .flex-container .item, .flex-container .full-height {
    flex: 1 1 auto; /* Define o tamanho automático para os itens */
    width: 100%; /* Ocupa toda a largura disponível */
  }
}
</style>
