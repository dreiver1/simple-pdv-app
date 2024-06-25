<template>
  <div class="q-px-md cover">
    <q-table
      title="items"
      :rows="ItemStore.itemsOfOrder"
      :columns="columns" hide-bottom
      class="bg-accent text-white"

    >
    <template v-slot:top>
      <div class="row justify-around items-center full-width">
        <div class="text-bold">
          CUPOM
        </div>
        <formAddItem/>
      </div>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
          <q-td key="name" :props="props" class="">
            {{ props.row.name }}
          </q-td>
          <q-td key="discount" :props="props">
            {{ props.row.discount }}
          </q-td>
          <q-td key="quantity" :props="props">
            {{ props.row.quantity }}
          </q-td>
          <q-td key="price" :props="props">
            {{ props.row.price }}
          </q-td>
      </q-tr>
    </template>
  </q-table>
  </div>
</template>
<script>
import { itemStore } from 'src/stores/itemStore.ts'
import { orderStore } from 'src/stores/orderStore.ts'
import { defineComponent, onBeforeMount } from 'vue';
import formAddItem from '../pointOfSale/formAddIem.vue'
const ItemStore = itemStore()
const OrderStore = orderStore()
export default defineComponent({
  setup() {
    onBeforeMount(async()=>{
      const order = await OrderStore.post()
      ItemStore.order.orderId = await order.orderId
      await ItemStore.get()
      console.log(ItemStore.itemsOfOrder)
    })
    const columns = [
      { name: 'name', label: 'Nome', align: 'left', field: row => row.name, format: val => `${val}` },
      { name: 'price', label: 'Preço', field: row => row.price, format: val => `${val}` },
      { name: 'quantity', label: 'Quantidade', field: row => row.costPrice, format: val => `${val}` },
      { name: 'discount', label: 'Desconto', field: row => row.discount, format: val => `${val}` },
    ];

    return {
      ItemStore,
      columns
    }
  },
  components: {
    formAddItem: formAddItem
  }
})
</script>
