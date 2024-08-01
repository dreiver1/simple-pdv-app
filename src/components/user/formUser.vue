<template>
  <div>
    <q-btn label="Criar novo" color="primary" @click="dialog = true" />
    <q-dialog v-model="dialog" class="q-pa-md q-ma-md" persistent >
      <q-card class="q-pa-lg">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            input-style="color: #ff9800;"
            filled
            v-model="store.user.name"
            label="Nome"
            hint="Name and surname"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            filled
            type="date"
            v-model="store.user.data"
            label="Data de Nascimento *"
          />

          <q-input
            input-style="color: #ff9800;"
            filled
            v-model="store.user.cpf"
            label="cpf"
            hint="Name and surname"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            input-style="color: #ff9800;"
            filled
            v-model="store.user.email"
            label="email"
            hint="Name and surname"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            input-style="color: #ff9800;"
            filled
            v-model="store.user.password"
            label="senha"
            type="password"
            hint="Name and surname"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-select
                class="q-pa-sm"
                input-style="color: #ff9800;"
                filled
                use-input
                input-debounce="0"
                label="Cargo"
                v-model="store.user.roleName"
                :options="options"
                @filter="filterFn"
                behavior="menu"
                :rules="[(val) => !!val || 'Cargo Name is required']"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      Não encontrado
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

          <q-toggle v-model="accept" label="I accept the license and terms" />

          <div>
            <q-btn label="Submit" type="submit" color="primary" @click="store.post()"/>
            <q-btn label="Cancelar" @click="dialog = false" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, ref } from 'vue';
import { useUserStore } from 'src/stores/userStore';

export default defineComponent({
  title: 'user',
  setup () {
    const store = useUserStore()
    let options = ref()
    onBeforeMount(async ()=>{
      await store.getRoles()
      const stringOptions = Object.values(store.roles.values).map(
        (element) => element.name
      )
      options.value = stringOptions
    })
    return {
      dialog: ref(false),
      options,
      store,
      cargo: ref(''),
      accept: ref(false),

      filterFn(val, update) {
        if (val === '') {
          update(() => {
            options.value = options.value;
          });
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
          options.value = options.value.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });

      },
      onSubmit(){
        console.log('submit')
      },
      onReset(){
        console.log('reset')
      }
    }
  }
})

</script>


