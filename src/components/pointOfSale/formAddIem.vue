<template>
  <div class="q-pa-md item flex-container">
    <q-btn label="Adicionar" color="primary" @click="store.addItem = true" />
    <q-dialog v-model="store.addItem" persistent class="bg-accent flex-container">
      <addItemByCode/>
      <suspense>
        <addItemByName/>
      </suspense>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import addItemByName from 'src/components/pointOfSale/addItemByName.vue'
import addItemByCode from 'src/components/pointOfSale/addItemByCode.vue'
import { itemStore } from 'src/stores/itemStore';


export default defineComponent({
  name: 'formAddItem',
  setup() {
    const store = itemStore()
    async function post() {
      console.log('post')
    }
    return {
      post,
      store,
    };
  },
  components: {
    addItemByName: addItemByName,
    addItemByCode: addItemByCode
  }
});
</script>
