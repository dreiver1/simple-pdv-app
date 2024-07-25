<template>
  <q-page class="row items-center justify-evenly">
    <dayOrders/>
  </q-page>
</template>

<script>
import dayOrders from 'src/components/dataAnalyses/dayOrders.vue';
export default {
  title: 'main',
  components: {
    dayOrders: dayOrders
  }
}
</script>
