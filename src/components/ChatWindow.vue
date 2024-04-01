<template>
    <div class="chat-window">
      <div class="messages" ref="messagebox">
        <div v-for="doc in formatedDocuments" :key="doc.id" class="single" >
          <span class="created-at">{{ doc.createTime }}</span>
          <span class="name">{{ doc.displayName }}</span>
          <span class="message">{{ doc.message }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { ref,onUpdated } from "vue";
import { projectFirestore } from "../firebase";
import { collection, onSnapshot, orderBy } from "firebase/firestore"; // onSnapshot ve orderBy fonksiyonlarını import ediyoruz
import { formatDistanceToNow } from 'date-fns'
import { computed } from "vue";
import { query } from "firebase/firestore";

export default {
  setup() {
  const documents = ref(null);
  const formatedDocuments = computed(() => {
    if (documents.value) {
      return documents.value.map((doc) => {
        let time = formatDistanceToNow(doc.createTime.toDate());
        return { ...doc, createTime: time };
      });
    } else {
      return null;
    }
  });

  // Koleksiyon verilerini alma fonksiyonu
  // Koleksiyon verilerini alma fonksiyonu
  // Koleksiyon verilerini alma fonksiyonu
const getCollection = (collectionName) => {
  const collectionRef = collection(projectFirestore, collectionName);
  const q = query(collectionRef, orderBy("createTime"));

  // Sorguyu sırala ve snapshot için kullan
  // eslint-disable-next-line no-unused-vars
  onSnapshot(q, (snap) => {
        let result = [];
        snap.docs.forEach((doc) => {
          doc.data().createTime && result.push({ ...doc.data(), id: doc.id });
        });

        console.log(result[1]);
        documents.value = result;
  });
};



  // Koleksiyon verilerini alma işlemini başlat
  getCollection('messages');
  const messagebox = ref(null);
  // eslint-disable-next-line no-unused-vars
    onUpdated(() => {
      messagebox.value.scrollTop = messagebox.value.scrollHeight;
    });

  return { documents, formatedDocuments,messagebox };
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
  </style>
  