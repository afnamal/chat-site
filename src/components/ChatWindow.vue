<template>
  <div class="chat-window">
    <div class="messages" ref="messagebox">
      <div v-for="doc in formatedDocuments" :key="doc.id" class="single">
        <span class="created-at">{{ doc.createTime }}</span>
        <span class="name">
          <img v-if="doc.photoURL" :src="doc.photoURL" alt="Profil Fotoğrafı" class="minifoto">
          <span>{{ doc.displayName }}</span>
        </span>
        <span class="message">{{ doc.message }}</span>
        <span v-if="error">{{ error }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onUpdated } from "vue";

import { formatDistanceToNow } from 'date-fns'
import trLocale from 'date-fns/locale/tr'; 
import GetCollectionDemo from '../composables/GetCollectionDemo'

export default {
  setup() {
    const {documents, error}= GetCollectionDemo('messages')
    const formatedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.map((doc) => {
          let time = formatDistanceToNow(doc.createTime.toDate(), { locale: trLocale });
          return { ...doc, createTime: time };
        });
      } else {
        return null;
      }
    });

    

    const messagebox = ref(null);

    onUpdated(() => {
      messagebox.value.scrollTop = messagebox.value.scrollHeight;
    });

   
    

    return { documents, formatedDocuments, messagebox,error };
  },
};
</script>

<style>
.chat-window {
  background: #fafafa;
  padding: 30px 20px;
  text-align: left;
}
.single {
  margin: 18px 0;
}
.created-at {
  display: block;
  color: #999;
  font-size: 12px;
  margin-bottom: 5px;
}
.name {
  font-weight: bold;
  margin-right: 7px;
}
.messages {
  max-height: 400px;
  overflow: auto;
}
.minifoto{
  max-height: 25px;
  margin-right: 10px;
  border-radius: 30%;
}
</style>
../composables/GetCollectionDemo