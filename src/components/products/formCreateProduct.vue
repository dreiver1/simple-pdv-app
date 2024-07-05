<template>
  <div class="q-pa-md">
    <q-btn label="Criar novo" color="primary" @click="dialog = true" />

    <q-dialog v-model="dialog" persistent>
      <q-card class="bg-accent">
        <q-card-section class="row items-center">
          <q-input
            class="q-pa-sm"
            input-style="color: #ff9800;"
            filled
            v-model="store.product.name"
            label="Name"
            style="width: 250px"
            type="text"
            :rules="[(val) => !!val || 'Name is required']"
          />

          <q-input
            class="q-pa-sm"
            input-style="color: #ff9800;"
            filled
            v-model="store.product.barcode"
            label="Barcode"
            style="width: 250px"
            type="text"
            :rules="[(val) => !!val || 'Barcode is required']"
          />

          <q-input
            class="q-pa-sm"
            input-style="color: #ff9800;"
            filled
            v-model="store.product.sku"
            label="SKU"
            style="width: 250px"
            type="text"
            :rules="[(val) => !!val || 'SKU is required']"
          />

          <q-input
            class="q-pa-sm"
            input-style="color: #ff9800;"
            filled
            v-model="store.product.description"
            label="Description"
            style="width: 250px"
            type="text"
          />

          <q-input
            class="q-pa-sm"
            input-style="color: #ff9800;"
            filled
            v-model.number="store.product.price"
            label="Price"
            style="width: 250px"
            type="number"
            :rules="[(val) => val !== null || 'Price is required']"
          />

          <q-input
            class="q-pa-sm"
            input-style="color: #ff9800;"
            filled
            v-model.number="store.product.costPrice"
            label="Cost Price"
            style="width: 250px"
            type="number"
            :rules="[(val) => val !== null || 'Cost Price is required']"
          />

          <q-input
            class="q-pa-sm"
            input-style="color: #ff9800;"
            filled
            v-model.number="store.product.discount"
            label="Discount"
            style="width: 250px"
            type="number"
          />

          <q-input
            class="q-pa-sm"
            input-style="color: #ff9800;"
            filled
            v-model.number="store.product.stockQuantity"
            label="Stock Quantity"
            style="width: 250px"
            type="number"
          />

          <q-file outlined v-model="store.product.img" label="imagem" @update:model-value="postImage()"/>

          <q-input
            class="q-pa-sm"
            input-style="color: #ff9800;"
            filled
            v-model.number="store.product.weight"
            label="Weight"
            style="width: 250px"
            type="number"
          />

            <q-select
              class="q-pa-sm"
              input-style="color: #ff9800;"
              filled
              v-model="store.product.categoryName"
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
          <q-btn flat label="Cancelar" color="black" v-close-popup @click="store.resetProduct()"/>
          <q-btn
            flat
            label="Concluir"
            color="primary"
            v-close-popup
            @click="post()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { productStore } from 'src/stores/productStore';
import { categoryStore } from 'src/stores/categoryStore';

let stringOptions;

const store = productStore();
const CategoryStore = categoryStore();
export default defineComponent({
  name: 'formCreateproduct',
  async beforeCreate() {
    await store.get();
    await CategoryStore.get();
    stringOptions = Object.values(CategoryStore.allCategories.values).map(
      (element) => element.name
    );
  },
  setup() {
    const options = ref(stringOptions);
    const productName = ref('');
    const productParentName = ref('');
    const store = productStore();

    async function post() {
      store.category = await CategoryStore.api.getByName(
        store.product.categoryName
      );
      store.product.categoryCategoryId = store.category.categoryId;
      await store.api.post(store.product);
      store.allProducts = await store.api.get();
    }

    async function postImage() {
    const imgName = await store.api.uploadImage(store.product.img)
    store.product.imgURL = `/files/${imgName}`
    }

    return {
      postImage,
      store,
      post,
      productName,
      productParentName,
      stringOptions,
      options,
      dialog: ref(false),

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
