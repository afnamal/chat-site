import { ref } from "vue";
import { projectFirestore } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const getCollection = (collectionName) => {
  const documents = ref(null);
  const error = ref(null);

  let collectionRef = collection(projectFirestore, collectionName);

  // collectionRef üzerinde onSnapshot fonksiyonunu kullanarak verileri dinleyin
  onSnapshot(collectionRef, (snap) => {
    let result = [];
    snap.docs.forEach((doc) => {
      doc.data().createdAt && result.push({ ...doc.data(), id: doc.id });
    });
    documents.value = result;
    error.value = null;
  }, (err) => {
    console.log(err.message);
    documents.value = null;
    error.value = "Veriler getirilemedi.";
  });

  return { documents, error };
};

export default getCollection;
