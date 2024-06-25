<template>
  <q-page class="flex-container bg-accent">
    <div class="item q-mt-md ">
        <informationTable class="bg-accent text-white"/>
    </div>
    <div class="item q-mt-md">
        <cardAtribute class="bg-accent text-white"></cardAtribute>
    </div>
    <div class="item q-mt-md">
      <q-card class="flex-container bg-accent flex-center" flat bordered>
        <itemsTable class="bg-accent text-white"/>
        <cardConclude></cardConclude>
      </q-card>
    </div>
  </q-page>
</template>
<script script setup lang="ts">
import itemsTable from 'components/items/itemsTable.vue'
import informationTable from 'components/pointOfSale/informationTable.vue'
import cardConclude from 'components/pointOfSale/cardConclude.vue'
import cardAtribute from 'components/pointOfSale/cardAtribute.vue'
</script>

<style>
</style>
