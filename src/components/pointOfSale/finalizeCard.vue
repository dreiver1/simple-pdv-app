<template>
  <q-btn label="finalizar" @click="finalize = true" text-color="primary"/>
  <q-dialog v-model="finalize" class="container">
    <q-card>
      <q-card-section>
        <q-btn label="dinheiro" @click="conclude('money')"/>
      </q-card-section>
      <q-card-section>
        <q-btn label="cartão" @click="conclude('card')"/>
      </q-card-section>
      <q-card-section>
        <q-btn label="pix" @click="conclude('pix')"/>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="next" class='container'>
    <q-card>
      <q-card-section>
        <q-btn label="Nova compra" @click="newOrder()"/>
      </q-card-section>
      <q-card-section>
        <q-btn label="Finalizar" to="/"/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { orderStore } from 'src/stores/orderStore';
import { itemStore } from 'src/stores/itemStore';

export default defineComponent({
  name: 'finalizeCard',
  setup() {
    const OrderStore = orderStore()
    const ItemStore = itemStore()
    const finalize = ref (false)
    const next = ref(false)
    return {
      next,
      finalize,
      conclude: (paypamentMethod) => {
        const form = {
          paypamentMethod: paypamentMethod,
          status: 'concluded'
        }
        OrderStore.api.put(OrderStore.order.orderId, form)
        finalize.value = false
        ItemStore.$reset()
        OrderStore.$reset()
        next.value = true
      },
      newOrder: () => {
        location.reload()
      }
    }
  }
})
</script>

<style scoped>
.container {
  /* Your styles here */
}
</style>
