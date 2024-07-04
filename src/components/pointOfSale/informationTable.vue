<template>
    <q-card class="flex-container" flat bordered>
      <q-card-section class="full-width row flex-center">
        <q-card-section >
          <div class="text-bold ">
            Nome: {{ store.product.name }}
          </div>
        </q-card-section>
        <q-card-section class="full-width">
            <q-img :src="store.product.img"/>
        </q-card-section>
      </q-card-section>
    </q-card>
</template>
<script>
import { defineComponent } from 'vue'
import { itemStore } from 'src/stores/itemStore'
const store = itemStore()

export default defineComponent({
  name: 'informationTable',
  setup(){

    return {
      store
    }
  }
})
</script>

<style>



</style>
