// SignupComp.vue
<template>
  <div>
    <p>Üye Ol</p>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="isim giriniz" required v-model="name">
        <input type="email" v-model="email" placeholder="email giriniz" required>
        <input type="password" v-model="password" placeholder="şifre giriniz" required>
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit">Üye Ol</button>
    </form>
  </div>
</template>

<script>
import SignupComposable from'../composables/SignupComposable'
import { useRouter } from 'vue-router';
import { ref } from "vue";

export default {
  setup() {
    const password = ref('');
    const email = ref('');
    const name = ref('');
    const {error,user}=SignupComposable()
    const router=useRouter()
    const pushchat=()=>{
      router.push('/chat')
    }
    const handleSubmit = async () => {
      await user(email.value,password.value,name.value)
      
      if (!error.value ||error.value==='') {  
        pushchat()
        
      }
    }
   

    return { password, email, name, handleSubmit,error }
  }
}
</script>

<style>
</style>
