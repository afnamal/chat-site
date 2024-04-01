<template>
  <div>
      <p>Giriş Yap</p>
      <form @submit.prevent="handleSubmit">
          <input type="email" v-model="email" placeholder="email giriniz" required>
          <input type="password" v-model="password" placeholder="şifre giriniz" >
          <p class="error" v-if="error">{{ error }}</p>
          <button>Giriş Yap</button>
      </form>
  </div>
</template>

<script>
import LoginComposable from '../composables/LoginComposable'
import { ref } from "vue";
import { useRouter } from 'vue-router';

export default {
setup() {
  const password = ref('');
  const email = ref('');
  const name = ref('');
  const { error, login } = LoginComposable();
  const router= useRouter()
  const handleSubmit = async () => {
    await login(email.value, password.value);
    console.log('giriş başarılı');
    if (!error.value) {
      pushChat()
    }
   };
   const pushChat=()=>{
    router.push('/chat')
   }



  return { password, email, name, handleSubmit, error };
}
}
</script>

<style>
/* Stil kuralları */
</style>
