<template>
    <nav v-if="user">
        <div >
    <p>Merhaba {{ user.displayName }}</p>
    <p class="email">{{ user.email }} ile giriş yapıldı</p>
    
        </div >   
        <button class="pointer" @click="handleClick">Çıkış Yap</button>
        <p v-if="error">{{ error }}</p>
   </nav>
</template>

<script>
import LogoutComposable from '../composables/LogoutComposable'
import { useRouter } from 'vue-router';
import GetUser from '../composables/GetUser'
export default {
setup() {
  const router= useRouter()
  const {error,logout}=LogoutComposable();
  const {user}=GetUser()
  

  const handleClick= async()=>{
    await logout()
    if (!error.value) {
      console.log('Logout işlemi başarıyla gerçekleştirildi')
      router.push('/')
    }
  }

  return {error, handleClick, user}
}
}
</script>

<style>
nav {
  padding: 20px;
  padding-left: 80px;
  padding-right: 80px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav p {
  margin: 2px auto;
  font-size: 16px;
  color: #444;
  text-align: left;
}
nav p.email {
  font-size: 14px;
  color: #888;
}
.pointer {
  cursor: pointer;
}
</style>