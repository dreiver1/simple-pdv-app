<template>
  <q-table title="Usuarios" :columns="columns"  :rows="usuarios" row-key="name" class="bg-accent text-white my-sticky-header-column-table item">
    <template v-slot:top>
      <div class="row justify-between col-12 items-center">
        <div class="text-bold q-pa-md">
          Usuarios
        </div>
        <formUser />
      </div>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props" @click="onRowClick(props.row)">
        <q-td key="name" :props="props">
          {{ props.row.name }}
        </q-td>
        <q-td key="userName" :props="props">
          {{ props.row.userName }}
        </q-td>
        <q-td key="cpf" :props="props">
          {{ props.row.cpf }}
        </q-td>
        <q-td key="data" :props="props">
          {{ props.row.data }}
        </q-td>
        <q-td key="role" :props="props">
          {{ props.row.email }}
        </q-td>
        <q-td key="email" :props="props">
          {{ props.row.email }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
  <Suspense class="item">
    <formUpdateProduct v-if="formUpdateVisible"/>
  </Suspense>
</template>
<script>
import { useUserStore } from 'src/stores/userStore';
import formUser from './formUser.vue';
import formUpdateProduct from 'src/components/products/formUpdateProduct.vue'
import { defineComponent } from 'vue';
import { ref } from 'vue';
const store = useUserStore()
const usuarios = ref([])
export default defineComponent({
  setup() {
    const formUpdateVisible = ref(false)
    const onRowClick = async (data) => {
      store.user = data
      store.edting = true
      formUpdateVisible.value = true
    }

    const columns = [
      { name: 'name', label: 'Nome', align: 'left', field: row => row.name, format: val => `${val}`, sortable: true },
      { name: 'userName', label: 'Usuario', align: 'left', field: row => row.userName, format: val => `${val}`, sortable: true },
      { name: 'cpf', label: 'CPF', align: 'left', field: row => row.cpf, format: val => `${val}`, sortable: true },
      { name: 'role', label: 'Cargo', align: 'left', field: row => row.name, format: val => `${val}`, sortable: true },
      { name: 'email', label: 'Email', align: 'left', field: row => row.email, format: val => `${val}`, sortable: true },
    ];
    return {
      store,
      formUpdateVisible,
      onRowClick,
      columns,
      usuarios
    };
  },
  components: {
    formUser: formUser,
    formUpdateProduct: formUpdateProduct
  },
  async beforeCreate() {
    await store.get()
    usuarios.value = store.users.values
  }
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
