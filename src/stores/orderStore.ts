import { defineStore } from 'pinia';
import UseApi from 'src/composables/useAPI';
import { ref } from 'vue';
const itemAPI = new UseApi('order');

const order = ref({
  orderId: '',
});

const itemsOfOrder = ref([]);

export const orderStore = defineStore('order', {
  state: () => ({
    api: itemAPI,
    order: order,
    itemsOfOrder: itemsOfOrder,
    edting: ref(false)
  }),
  actions: {
    async get() {
      this.itemsOfOrder.values = await this.api.get();
    },
    delete() {
      this.api.delete(this.order.orderId);
    },
    put() {
      this.api.put(`${this.order.orderId}`, order.value);
    },
    async post(): Promise<object> {
      const form = {}
      const order = await this.api.post(form)
      this.order = order
      return order
    },
    async getByName(name: string): Promise<object> {
      return await this.api.getByName(name);
    },
  },
});
