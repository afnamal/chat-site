<template>
  <div>
      <p>Giriş Yap</p>
      <form @submit.prevent="handleSubmit">
          <input type="email" v-model="email" placeholder="email giriniz" required>
          <input type="password" v-model="password" placeholder="şifre giriniz" >
          <p class="error" v-if="error">{{ error }}</p>
          <p v-if="dogrulanmamis" class="error">{{ dogrulanmamis }}</p>
          <p v-if="OnayMaili" class="error">{{ OnayMaili }}</p>

          <button>Giriş Yap</button>
      </form>
  </div>
</template>

<script>
import LoginComposable from '../composables/LoginComposable'
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { getAuth, sendEmailVerification } from "firebase/auth";
import SignupComposable from'../composables/SignupComposable'


export default {
setup() {
  const {OnayMaili}=SignupComposable()

  const password = ref('');
  const email = ref('');
  const name = ref('');
  const { error, login } = LoginComposable();
  const router= useRouter()
  const dogrulanmamis=ref(null)
  const handleSubmit = async () => {
  try {
    // Kullanıcı girişi yap
    await login(email.value, password.value);
    
    // Aktif kullanıcıyı al
    const user = getAuth().currentUser;
    
    console.log('Giriş başarılı');
    
    // Eğer kullanıcı doğrulanmamışsa
    if (user && !user.emailVerified) {
      // E-posta doğrulama e-postası gönder
      dogrulanmamis.value='lütfen hesabınızı doğrulayınız'
      await sendEmailVerification(user);
    }
    
    // Eğer bir hata yoksa ve kullanıcı doğrulanmışsa, chat sayfasına yönlendir
    if (!error.value && user && user.emailVerified) {
      pushChat();
    }
  } catch (error) {
    // Hata durumunda hatayı konsola yazdır
    console.error('Hata:', error.message);
  }
};

   const pushChat=()=>{
    router.push('/chat')
   }



  return { password, email, name, handleSubmit, error,dogrulanmamis,OnayMaili };
}
}
</script>

<style>
/* Stil kuralları */
</style>
