<template>
  <q-dialog v-model="store.edting" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-input
          filled
          v-model="store.category.name"
          label="Nome"
          style="width: 250px"
        />
      </q-card-section>
      <q-card-section class="row items-center">
        <div>
          <q-select
            filled
            v-model="store.parent.name"
            input-debounce="0"
            use-input
            label="Super - Categoria"
            :options="options"
            @filter="filterFn"
            style="width: 250px"
            behavior="menu"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Não encontrado
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
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
import { categoryStore } from 'src/stores/categoryStore.ts';

let stringOptions;
const store = categoryStore();
export default defineComponent({
  async beforeCreate() {
    await store.get();
    stringOptions = Object.values(store.allCategories.values).map(
      (element) => element.name
    );
  },
  name: 'formUpdateCategory',
  async setup() {
    const options = ref(stringOptions);
    const put = async () => {
      if(store.parent.name.length > 0){
        const parent = await store.getByName(store.parent.name);
        store.category.parentId = parent.categoryId;
      }
      await store.api.put(store.category.categoryId, store.category)
      store.allCategories = await store.api.get()
    }
    const del = async () => {
      if(store.category.categoryId.length > 0) {
        await store.api.delete(store.category.categoryId)
        store.allCategories = await store.api.get()
      }
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
