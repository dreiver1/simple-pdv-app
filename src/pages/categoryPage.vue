<template>
  <q-page class="row items-center justify-evenly">
    <Suspense><categoryTable></categoryTable></Suspense>
  </q-page>
</template>
<script script setup lang="ts">
import categoryTable from '../components/Categories/categoryTable.vue'
</script>
