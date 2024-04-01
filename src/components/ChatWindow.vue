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
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onUpdated } from "vue";
import { projectFirestore } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { formatDistanceToNow } from 'date-fns'
import trLocale from 'date-fns/locale/tr'; 

export default {
  setup() {
    const documents = ref(null);
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

    const getCollection = (collectionName) => {
      const collectionRef = collection(projectFirestore, collectionName);
      const q = query(collectionRef, orderBy("createTime"));

      onSnapshot(q, (snap) => {
        let result = [];
        snap.docs.forEach((doc) => {
          doc.data().createTime && result.push({ ...doc.data(), id: doc.id});
        });
        documents.value = result;
      });
    };

    getCollection('messages');
    const messagebox = ref(null);

    onUpdated(() => {
      messagebox.value.scrollTop = messagebox.value.scrollHeight;
    });

   
    

    return { documents, formatedDocuments, messagebox };
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
