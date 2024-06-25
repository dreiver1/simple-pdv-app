import { defineStore } from 'pinia';
import itemAPI from 'src/composables/itemAPI';
import { ref } from 'vue';
const api = new itemAPI('item');

const item = ref({
  itemId: '',
  quantity: null,
  proudctId: '',
  orderId: ''
})

const order = ref({
  orderId: ''
});

const product = ref({
  categoryName: '',
    productId: '',
    barcode: 'ALSKDJLKASJDKLASJ',
    sku: 'ALSKDJLKASJDKLASJ',
    name: 'Nome do produto',
    description: 'ALSKDJLKASJDKLASJ',
    price: 190,
    costPrice: null,
    discount: null,
    stockQuantity: null,
    weight: null,
    categoryCategoryId: null
});

const itemsOfOrder = ref([{
  barcode: 'sadasd',
  discount: 99,
  name:'Produto novo',
  price:999,
  quantity:2
}]);

const total = ref(0)



export const itemStore = defineStore('item', {
  state: () => ({
    item: item,
    product: product,
    api: api,
    order: order,
    itemsOfOrder: itemsOfOrder,
    edting: ref(false),
    total: total
  }),
  actions: {
    async get() {
      this.itemsOfOrder = await this.api.getByOrder('b8667995-d2c4-4908-a35a-5379b6b47eb9');
      this.count()
    },
    delete() {
      this.api.delete(this.item.itemId);
    },
    put() {
      this.api.put(`${this.item.itemId}`, item.value);
    },
    async post(form: object): Promise<object> {
      return await this.api.post(form);
    },
    async getByName(name: string): Promise<object> {
      return await this.api.getByName(name);
    },
    count(): void {
      this.itemsOfOrder.forEach(item => {
        total.value += item.price
      })
    }
  },
});
