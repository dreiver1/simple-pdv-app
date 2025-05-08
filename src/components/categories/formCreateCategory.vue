<template>
  <div class="q-pa-md">
    <q-btn label="Criar nova" color="primary" @click="dialog = true" />

    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-input
            filled
            v-model="categoryName"
            label="Nome"
            style="width: 250px"
          />
        </q-card-section>
        <q-card-section class="row items-center">
          <div>
            <q-select
              filled
              v-model="categoryParentName"
              use-input
              input-debounce="0"
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
          <q-btn flat label="Cancelar" color="black" v-close-popup />
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
import { categoryStore } from 'src/stores/categoryStore';

let stringOptions;

const store = categoryStore();
export default defineComponent({
  name: 'formCreateCategory',
  async beforeCreate() {
    await store.get();
    stringOptions = Object.values(store.allCategories.values).map(
      (element) => element.name
    );
  },
  setup() {
    const options = ref(stringOptions);
    const form = ref({
      name: '',
      parentId: '',
    });
    const categoryName = ref('');
    const categoryParentName = ref('');
    const store = categoryStore();

    async function post() {
      let parent = null;
      if(categoryParentName.value != ''){
        parent = await store.getByName(categoryParentName.value);
      }

      form.value.name = categoryName.value;
      if(parent != null){
        form.value.parentId = parent.categoryId;
      } else {
        form.value.parentId = null;
      }

      const data = form.value;
      try {
        await store.api.post(data);
        console.log('Categoria criada com sucesso!');
        emit('category-created');
      } catch (error) {
        console.error('Erro ao criar categoria:', error);
      }

      try {
        const response = await store.api.get();
        if (Array.isArray(response)) {
          store.allCategories = response;
        } else {
          console.error('Unexpected API response structure:', response);
        }

      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
      form.value.name = '';
      form.value.parentId = '';
      categoryName.value = '';
      categoryParentName.value = '';
    }
    return {
      post,
      categoryName,
      categoryParentName,
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
