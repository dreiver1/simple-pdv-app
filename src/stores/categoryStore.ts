import { defineStore } from 'pinia';
import UseApi from 'src/composables/useAPI';
import { ref } from 'vue';
const categoryAPI = new UseApi('category');

const category = ref({
  categoryId: '',
  name: '',
  parentId: '',
});

const parent = ref({
  categoryId: '',
  name: '',
  parentId: '',
});

const allCategories = ref([]);

export const categoryStore = defineStore('category', {
  state: () => ({
    parent: parent,
    api: categoryAPI,
    category: category,
    allCategories: allCategories,
    edting: ref(false)
  }),
  actions: {
    async get() {
      this.allCategories.values = await this.api.get();
    },
    delete() {
      this.api.delete(this.category.categoryId);
    },
    put() {
      this.api.put(`${this.category.categoryId}`, category.value);
    },
    async post(form: object): Promise<object> {
      return await this.api.post(form);
    },
    async getByName(name: string): Promise<object> {
      return await this.api.getByName(name);
    },
  },
});
