<template>
 <q-card class="bg-accent">
  <q-card-section class="row items-center">
    <q-select
      class="q-pa-sm"
      input-style="color: #ff9800;"
      filled
      v-model="productName"
      use-input
      input-debounce="0"
      label="Categoria"
      :options="options"
      @filter="filterFn"
      style="width: 250px"
      behavior="menu"
      :rules="[(val) => !!val || 'Category Name is required']"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            Não encontrado
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </q-card-section>
  <q-card-actions align="right">
    <q-btn flat label="Cancelar" color="black" v-close-popup @click="ProductStore.resetProduct()"/>
    <q-btn
      flat
      label="Concluir"
      color="primary"
      v-close-popup
      @click="post()"
    />
  </q-card-actions>
</q-card>"
</template>
<script>
import { defineComponent, ref } from 'vue'
import { productStore } from 'src/stores/productStore'
import { itemStore } from 'src/stores/itemStore'

const ProductStore = productStore()
const ItemStore = itemStore()

let stringOptions
export default defineComponent({
  title: 'addItemByName',
  async beforeCreate() {
    await ProductStore.get();
    stringOptions = Object.values(ProductStore.allProducts.values).map(
      (element) => element.name
    );
    console.log(
      stringOptions
    )
  },
  setup () {
    const post = async () => {
      const product = await ProductStore.getByName(productName.value)
      ItemStore.product = product
      console.log(product)
      await ItemStore.post({
        orderId: ItemStore.order.orderId,
        productId: product.productId,
        quantity: 1
      })

      await ItemStore.get(ItemStore.order.orderId)

      ItemStore.count()
      ItemStore.addItem = false
    }
    const options = ref(stringOptions);
    const productName = ref('')
    return{
      ItemStore,
      ProductStore,
      model: ref(''),
      options,
      productName,
      post,

      filterFn(val, update) {
        if (val === '') {
          update(() => {
            options.value = stringOptions;
          });
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
            options.value = stringOptions.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });

      },
    }
  }
})
</script>
