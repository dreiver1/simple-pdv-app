<template>
  <q-table title="Produtos" :rows="store.allProducts" :columns="columns" row-key="name" class="bg-accent text-white my-sticky-header-column-table item">
    <template v-slot:top>
      <div class="row justify-between col-12 items-center">
        <div class="text-bold q-pa-md">
          Produtos
        </div>
        <formCreateProduct />
      </div>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props" @click="onRowClick(props.row)">
        <q-td key="name" :props="props">
          {{ props.row.name }}
        </q-td>
        <q-td key="description" :props="props">
          {{ props.row.description }}
        </q-td>
        <q-td key="price" :props="props">
          {{ props.row.price }}
        </q-td>
        <q-td key="costPrice" :props="props">
          {{ props.row.costPrice }}
        </q-td>
        <q-td key="discount" :props="props">
          {{ props.row.discount }}
        </q-td>
        <q-td key="stockQuantity" :props="props">
          {{ props.row.stockQuantity }}
        </q-td>
        <q-td key="weight" :props="props">
          {{ props.row.weight }}
        </q-td>
      </q-tr>

    </template>
  </q-table>
  <Suspense class="item">
    <formUpdateProduct v-if="formUpdateVisible"/>
  </Suspense>
</template>
<script>
import { productStore } from 'src/stores/productStore';
import formCreateProduct from 'src/components/products/formCreateProduct.vue'
import formUpdateProduct from 'src/components/products/formUpdateProduct.vue'
import { defineComponent, onMounted } from 'vue';
import { ref } from 'vue';
const store = productStore();
export default defineComponent({
  setup() {
    const formUpdateVisible = ref(false)
    const onRowClick = async (data) => {
      store.product = data
      store.edting = true
      formUpdateVisible.value = true
    }
    onMounted(async () => {
      store.allProducts = await store.api.get();
      console.log(store.allProducts)
    });
    const columns = [
      { name: 'name', label: 'Name', align: 'left', field: row => row.name, format: val => `${val}`, sortable: true },
      { name: 'description', label: 'Description', align: 'left', field: row => row.description, format: val => `${val}`, sortable: true },
      { name: 'price', label: 'Price', align: 'left', field: row => row.price, format: val => `${val}`, sortable: true },
      { name: 'costPrice', label: 'Cost Price', align: 'left', field: row => row.costPrice, format: val => `${val}`, sortable: true },
      { name: 'discount', label: 'Discount', align: 'left', field: row => row.discount, format: val => `${val}`, sortable: true },
      { name: 'stockQuantity', label: 'Stock Quantity', align: 'left', field: row => row.stockQuantity, format: val => `${val}`, sortable: true },
      { name: 'weight', label: 'Weight', align: 'left', field: row => row.weight, format: val => `${val}`, sortable: true },
    ];
    return {
      store,
      formUpdateVisible,
      onRowClick,
      columns,
    };
  },
  components: {
    formCreateProduct: formCreateProduct,
    formUpdateProduct: formUpdateProduct
  },
});
</script>

<style lang="sass">
.my-sticky-header-column-table


  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #ff9800

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #ff9800

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
