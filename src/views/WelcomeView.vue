<template>
  <div>
    <NavbarOrg/>
    <div class="welcome container">
      <div v-if="!Login">
        <SingupComp />
        <p>Zaten Hesabım var <span @click="Login=!Login">Giriş Yap</span> </p>
      </div>
      <div v-else>
        <LoginComp ></LoginComp>
        <p>Hesabım Yok <span @click="Login=!Login">Üye Ol</span> </p>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import SingupComp from '../components/SingupComp.vue'
  import LoginComp from '../components/LoginComp.vue'
  import { ref } from 'vue'
  import NavbarOrg from '../components/NavbarOrg.vue'

  
  export default {
    name: 'WelcomeView',
    components: { SingupComp, LoginComp,NavbarOrg },
    setup() {
      const Login = ref(true);
  
      return { Login };
    }
  }
  </script>
  <style>
  .welcome{
    text-align: center;
    padding: 20px auto;
  }
  .welcome label{
  }
  .welcome form{
    width: 300px;
    margin: 20px 0 10px;
  }
  .welcome input{
    
    margin-bottom: 10px;
    border-radius: 15px;
    border: 1px solid #ddd;
    outline: none;
    color: #777;
    margin: 10px auto;
    height: 30px;
    width: 200px;
    
  }
  .welcome button {
    display: block;
    margin-bottom: 10px; 
    margin: 10px auto;
    cursor: pointer;
  }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  span{
    text-decoration: underline;
    text-decoration-color: blue;
    font-size: large;
    font-style: bold;
    cursor: pointer;
  }
  .error{
    color: red;
  }
  
  </style>
  