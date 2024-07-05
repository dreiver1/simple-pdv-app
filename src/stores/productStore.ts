import { defineStore } from 'pinia';
import UseApi from 'src/composables/useAPI';
import { ref } from 'vue';
const productAPI = new UseApi('product');

const product = ref({
    categoryName: '',
    productId: '',
    barcode: '',
    sku: '',
    name: '',
    description: '',
    price: null,
    costPrice: null,
    discount: null,
    stockQuantity: null,
    weight: null,
    categoryCategoryId: null,
    img: '',
    imgURL: ''
});

const category = ref({
  categoryId: '',
  name: '',
  parent: ''
})


const allProducts = ref([]);

export const productStore = defineStore('product', {
  state: () => ({
    category: category,
    api: productAPI,
    product: product,
    allProducts: allProducts,
    edting: ref(false)
  }),
  actions: {
    async get() {
      this.allProducts.values = await this.api.get();
    },
    delete() {
      this.api.delete(this.product.productId);
    },
    put() {
      this.api.put(`${this.product.productId}`, product.value);
    },
    async post(form: object): Promise<object> {
      return await this.api.post(form);
    },
    async getByName(name: string): Promise<object> {
      return await this.api.getByName(name);
    },
    resetProduct() {
      this.product = {
          categoryName: '',
          productId: '',
          barcode: '',
          sku: '',
          name: '',
          description: '',
          price: null,
          costPrice: null,
          discount: null,
          stockQuantity: null,
          weight: null,
          categoryCategoryId: null,
          img: '',
          imgURL: ''
      }
    }
  },
});
