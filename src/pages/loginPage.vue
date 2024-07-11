<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="form.email"
          label="Email"
          type="email"
          :rules="[(val) => !!val || 'Email is required']"
          autofocus
        />
        <q-input
          v-model="form.password"
          label="Password"
          type="password"
          :rules="[(val) => !!val || 'Password is required']"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Login" color="primary" @click="handleLogin" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { api } from 'src/boot/axios'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginPage',
  setup() {
    const router = useRouter()
    const form = ref( {
        email: '',
        password: '',
      })

    const handleLogin = async () => {
        const res = await api.post('/login', form.value)
        const { accessToken, refreshToken } = res.data
        window.localStorage.setItem('accessToken', accessToken)
        window.localStorage.setItem('refreshToken', refreshToken)
        router.push('/main')
    }

    return {
      form,
      handleLogin,
    };
  },
};
</script>

<style scoped>
.q-page {
  max-width: 400px;
  margin: 0 auto;
}
</style>
