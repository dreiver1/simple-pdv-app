<template>
  <q-page class="row items-center justify-evenly flex-container">
    <Suspense><categoryTable class="flex-container"/></Suspense>
  </q-page>
</template>
<script script setup lang="ts">
import categoryTable from '../components/categories/categoryTable.vue'
</script>
