<template>
    <q-dialog v-model="store.edting" persistent >
      <q-card class="bg-accent text-white">
        <q-card-section class="row items-center justify-evenly text-white">
          <q-input
            input-style="color: #ff9800;"
            filled
            v-model="store.product.name"
            label="Name"
            style="width: 250px; color: white;"
            type="text"
            :rules="[(val) => !!val || 'Name is required']"
            class="text-white"
            bg-color="accent"
          />

          <q-input
            input-style="color: #ff9800;"
            filled
            v-model="store.product.barcode"
            label="Barcode"
            style="width: 250px"
            type="text"
            :rules="[(val) => !!val || 'Barcode is required']"
          />

          <q-input
            input-style="color: #ff9800;"
            filled
            v-model="store.product.sku"
            label="SKU"
            style="width: 250px"
            type="text"
            :rules="[(val) => !!val || 'SKU is required']"
          />

          <q-input
            input-style="color: #ff9800;"
            filled
            v-model="store.product.description"
            label="Description"
            style="width: 250px"
            type="text"
          />

          <q-input
            input-style="color: #ff9800;"
            filled
            v-model.number="store.product.price"
            label="Price"
            style="width: 250px"
            type="number"
            :rules="[(val) => val !== null || 'Price is required']"
          />

          <q-input
            input-style="color: #ff9800;"
            filled
            v-model.number="store.product.costPrice"
            label="Cost Price"
            style="width: 250px"
            type="number"
            :rules="[(val) => val !== null || 'Cost Price is required']"
          />

          <q-input
            input-style="color: #ff9800;"
            filled
            v-model.number="store.product.discount"
            label="Discount"
            style="width: 250px"
            type="number"
          />

          <q-input
            input-style="color: #ff9800;"
            filled
            v-model.number="store.product.stockQuantity"
            label="Stock Quantity"
            style="width: 250px"
            type="number"
          />

          <q-input
            input-style="color: #ff9800;"
            filled
            v-model.number="store.product.weight"
            label="Weight"
            style="width: 250px"
            type="number"
          />

          <q-select
            filled
            v-model="store.product.categoryName"
            use-input
            input-debounce="0"
            label="Categoria"
            :options="options"
            @filter="filterFn"
            style="width: 250px"
            behavior="menu"
            class="q-my-md"
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
        <q-btn flat label="Excluir" color="red" v-close-popup @click="del()"/>
        <q-btn flat label="Cancelar" color="black" v-close-popup />
        <q-btn
          flat
          label="Atualizar"
          color="primary"
          v-close-popup
          @click="put()"
        />
      </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { productStore } from 'src/stores/productStore';

let stringOptions;
const store = productStore();
export default defineComponent({
  async beforeCreate() {
    await store.get();
    stringOptions = Object.values(store.allProducts.values).map(
      (element) => element.name
    );
  },
  name: 'formUpdateCategory',
  async setup() {
    const options = ref(stringOptions);
    const put = async () => {
      await store.api.put(store.product.productId, store.product)
      await store.get()
    }
    const del = async () => {
      await store.api.delete(store.product.productId)
      await store.get()
    }
    return {
      del,
      put,
      options,
      store,
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
    };
  },
});
</script>
