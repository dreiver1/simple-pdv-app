<template>
  <q-card class="q-mx-md full-width bg-accent text-secondary" flat bordered>
    <q-card-section class="item">
      SUBTOTAL R$ {{ store.total }}
    </q-card-section>
    <q-card-section class="item">
      <q-btn color="accent" @click="conclude()" label="menu" text-color="primary" class="q-ma-xs"/>
      <FinalizeCard/>
    </q-card-section>
  </q-card>
</template>

<script>

import { defineComponent } from 'vue'
import { itemStore } from 'src/stores/itemStore';
import FinalizeCard from './finalizeCard.vue';
const store = itemStore()

export default defineComponent({
  title: 'cards',
  setup(){
    return{
      conclude(){
        console.log('conclude')
      },
      store
    }
  },
  components: {
    FinalizeCard: FinalizeCard
  }
})

</script>

<style lang="sass" scoped>
$container-width: 100%
$item-width: 50%
$full-width: 100%

.flex-container
  display: flex
  flex-wrap: wrap
  width: $container-width
  justify-content: center
  align-items: center

  .item
    flex: 1 1 $item-width


  .full-width
    flex: 1 1 $full-width
    text-align: center

  .my-card
    max-width: 500px


</style>

