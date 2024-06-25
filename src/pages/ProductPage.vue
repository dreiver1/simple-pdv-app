<template>
  <q-page class="row items-center justify-evenly flex-container">
    <Suspense>
      <productTable class="full-widht flex-container"/>
    </Suspense>
  </q-page>
</template>
<script script setup lang="ts">
import productTable from 'src/components/products/productTable.vue';
</script>
