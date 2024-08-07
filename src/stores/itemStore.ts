import { defineStore } from 'pinia';
import itemAPI from 'src/composables/itemAPI';
import { ref } from 'vue';
const api = new itemAPI('item');

interface order {
  orderId: string
  productId: string
  quantity: string
}

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
  barcode: '',
  sku: '',
  name: '',
  description: '',
  price: 0,
  costPrice: null,
  discount: null,
  stockQuantity: null,
  weight: null,
  categoryCategoryId: null,
  imgURL: ''
});

const itemsOfOrder = ref([{
  barcode: 'sadasd',
  discount: 99,
  name: 'Produto novo',
  price: 999,
  quantity: 2
}]);

const total = ref(0)



export const itemStore = defineStore('item', {
  state: () => ({
    addItem: ref(false),
    item: item,
    product: product,
    api: api,
    order: order,
    itemsOfOrder: itemsOfOrder,
    edting: ref(false),
    total: total
  }),
  actions: {
    async get(id: string) {
      this.itemsOfOrder = await this.api.getByOrder(id)
    },
    delete() {
      this.api.delete(this.item.itemId);
    },
    put() {
      this.api.put(`${this.item.itemId}`, item.value);
    },
    async post(form: order): Promise<object> {
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
