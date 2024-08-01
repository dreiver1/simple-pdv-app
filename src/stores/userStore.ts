import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import UseApi from 'src/composables/useAPI';
import { ref } from 'vue';

const userApi = new UseApi('user');
const roleApi = new UseApi('role')

const user = ref({
  userId: '',
  email: '',
  password: '',
  cpf: '',
  data: '',
  name: '',
  userName: '',
  roleName: '',
  roleId:''
})

const users = ref([]);

export const useUserStore = defineStore('user', {
  state: () => ({
    roles: ref([]),
    users: users,
    api: userApi,
    role: roleApi,
    user: user,
    edting: ref(false)
  }),

  actions: {
    async get() {
      this.users.values = await this.api.get();
    },
    delete() {
      this.api.delete(this.user.userId);
    },
    put() {
      this.api.put(`${this.user.userId}`, user.value);
    },
    async post(){
      const role = await this.role.getByName(this.user.roleName)
      this.user.roleId = role.id
      const user = await this.api.post(this.user)
      console.log(user)
    },
    async getByName(name: string) {
      this.api.getByName(name)
    },
    async getRoles() {
      const res = await api.get('/role')
      this.roles.values = res.data
    }
  },
})
