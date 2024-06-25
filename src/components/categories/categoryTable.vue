<template>
  <q-table title="Treats" :rows="store.allCategories" :columns="columns" row-key="name" class="bg-accent text-white item">
    <template v-slot:top>
      <div class="row justify-between col-12 items-center">
        <div class="text-bold q-pa-md">
          CATEGORIAS
        </div>
        <formCreateCategory />
      </div>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props" @click="onRowClick(props.row)">
        <q-td key="name" :props="props">
          {{ props.row.name }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
  <Suspense>
    <formUpdateCategory v-if="formUpdateVisible" />
  </Suspense>
</template>
<script>
import { categoryStore } from 'src/stores/categoryStore';
import formCreateCategory from 'src/components/categories/formCreateCategory.vue'
import formUpdateCategory from 'src/components/categories/formUpdateCategory.vue'
import { defineComponent, onMounted } from 'vue';
import { ref } from 'vue';
const store = categoryStore();
export default defineComponent({
  setup() {
    const formUpdateVisible = ref(false)
    const onRowClick = async (category) => {
      store.category = category
      if(category.parentId){
        store.parent = await store.api.getByID(category.parentId)
      }else{
        store.parent.name = ''
        store.parent.categoryId = ''
        store.parent.parentId = ''
      }
      formUpdateVisible.value = true
      store.edting = true
    }
    onMounted(async () => {
      store.allCategories = await store.api.get();
    });
    const columns = [
      { name: 'name', label: 'nome', align: 'left', field: (row) => row.name, format: (val) => `${val}`, sortable: true },
    ];
    return {
      store,
      formUpdateVisible,
      onRowClick,
      columns,
    };
  },
  components: {
    formCreateCategory: formCreateCategory,
    formUpdateCategory: formUpdateCategory
  },
});
</script>
