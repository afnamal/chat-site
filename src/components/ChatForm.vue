<template>
  <form>
    <div class="input-container">
      <textarea 
          @keypress.enter.prevent="handleSubmit" 
          placeholder="Mesajınızı Buraya Yazınız..."
          v-model="message"
      ></textarea>
      <span class="material-icons" @click="handleSubmit">send</span>

    </div>
    <div v-if="error">{{ error }}</div>
  </form>
</template>

<script>
import GetUser from '../composables/GetUser'
import { ref } from 'vue';
import { serverTimestamp } from '../firebase'
import UseCollection from '../composables/UseCollection'
import { getAuth } from 'firebase/auth';
export default {
  setup() {
    const { user } = GetUser();
    const message = ref('');
    const error = ref(null); // Hata referansını tanımlayın
    const { addDocuman } = UseCollection('messages');
    
    const GetUserPhoto = async () => {
    const auth = getAuth();
    try {
      const userCredential = auth.currentUser;
      if (userCredential) {
        const photoURL = userCredential.photoURL;
        return photoURL; // Kullanıcının fotoğraf URL'sini döndürün
      } else {
        console.error('Kullanıcı bulunamadı.');
        return null;
      }
    } catch (error) {
      console.error('Kullanıcı belgesi alınırken bir hata oluştu:', error);
      return null;
    }
  };

    

  const handleSubmit = async () => {
  try {
    const photoURL = await GetUserPhoto(); // GetUserPhoto fonksiyonunu çağırarak photoURL değerini alın

    const chat = {
      displayName: user.value.displayName,
      message: message.value,
      createTime: serverTimestamp(),
      photoURL: photoURL // photoURL değerini kullanarak chat objesini oluşturun
    };

    if (chat.message) {
      addDocuman(chat);
    }

    message.value = ''; // Gönderimden sonra mesajı temizleyin
    error.value = null; // Önceki hataları temizleyin
    console.log(chat);
  } catch (err) {
    console.error('Error adding document: ', err);
    error.value = 'Failed to send message. Please try again.'; // Hata mesajını ayarlayın
  }
};


    return { handleSubmit, message, error };
  }
}
</script>

<style scoped>
form {
  margin: 10px;
}
.input-container {
  display: flex;
  align-items: center;
}
textarea {
  flex: 1; /* textarea'nın genişliği esnek olacak şekilde ayarlanır */
  margin-left: 10px; /* ikon ile textarea arasına boşluk ekler */
  width: 100%;
  max-width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  font-family: inherit;
  outline: none;
}
.material-icons {
  cursor: pointer;
  margin-bottom: 10px;
  margin-left: 10px
}
</style>