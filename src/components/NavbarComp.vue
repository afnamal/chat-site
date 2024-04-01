<template>
  <nav v-if="user">
    <input type="file" accept="image/*" @change="handleFileChange" v-if="!user.photoURL">
    <div>
      <p>Merhaba {{ user.displayName }}</p>
      <p class="email">{{ user.email }} ile giriş yapıldı</p>
    </div>   
    <button class="pointer" @click="handleClick">Çıkış Yap</button>
    <p v-if="error">{{ error }}</p>
  </nav>
</template>

<script>
import LogoutComposable from '../composables/LogoutComposable'
import { useRouter } from 'vue-router';
import GetUser from '../composables/GetUser'
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default {
  setup() {
    const router = useRouter();
    const { error, logout } = LogoutComposable();
    const { user } = GetUser();

    const handleClick = async () => {
      await logout();
      if (!error.value) {
        console.log('Logout işlemi başarıyla gerçekleştirildi');
        router.push('/');
      }
    }

    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      
      const storage = getStorage();
      const storageRef = ref(storage, 'profile_photos/' + file.name);
      
      try {
        // Dosyayı yükle
        await uploadBytes(storageRef, file);
        
        // Dosyanın URL'sini al
        const photoURL = await getDownloadURL(storageRef);
        
        // Firebase Authentication'daki kullanıcı profilini güncelle
        const auth = getAuth();
        await updateProfile(auth.currentUser, { photoURL });
        
        console.log('Profil fotoğrafı başarıyla güncellendi');
      } catch (error) {
        console.error('Profil fotoğrafı güncellenirken bir hata oluştu:', error);
      }
    }

    return { error, handleClick, user, handleFileChange };
  }
}
</script>

<style>
nav {
  width: 80%;
  padding: 20px;
  padding-left: 40px;
  padding-right: 40px;
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
.profil {
  max-width: 50px;
  
}

</style>
