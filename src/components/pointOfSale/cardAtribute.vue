<template>
    <q-card class="card " flat bordered>
        <q-card-section class="text-bold card-section q-mt-sm q-mx-sm text-accent">
            Valor: {{ store.product.price }}
        </q-card-section>
        <q-card-section class="text-bold card-section q-mt-sm q-mx-sm text-accent">
            codigo: {{ store.product.barcode }}
        </q-card-section>
        <q-card-section class="text-bold card-section q-my-sm q-mx-sm text-accent">
            descrição: {{ store.product.description }}
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
.card{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
}

.card-section{
  background-color: #ff9800;
  padding: 10%;
  border-radius: 10px;
  color: #333233;
}

@media (max-width: 768px) {
  .card{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: start;
    height: 100%;
    flex-wrap: wrap;
  }
  .card-section{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #ff9800;
    padding: 2%;
    border-radius: 10px;
    border: 1px white;
    min-width: 300px;
    min-height: 50px;
  }
}
</style>
