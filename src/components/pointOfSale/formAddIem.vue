<template>
  <div class="q-pa-md item flex-container">
    <q-btn label="Adicionar" color="primary" @click="addItem = true" />
    <q-dialog v-model="addItem" persistent class="bg-accent flex-container">
      <suspense>
        <addItemByCode class="flex-container"/>
      </suspense>
      <addItemByName class="item"/>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

import addItemByName from 'src/components/pointOfSale/addItemByName.vue'
import addItemByCode from 'src/components/pointOfSale/addItemByCode.vue'


export default defineComponent({
  name: 'formAddItem',
  setup() {
    async function post() {
      console.log('post')
    }
    return {
      post,
      addItem: ref(false),
    };
  },
  components: {
    addItemByName: addItemByName,
    addItemByCode: addItemByCode
  }
});
</script>
