  <template>
    <form>
      <textarea 
          @keypress.enter.prevent="handleSubmit" 
          placeholder="Mesajınızı Buraya Yazınız..."
          v-model="message"
      ></textarea>
      <div v-if="error">{{ error }}</div>
      
    </form>
  </template>

  <script>
import GetUser from '../composables/GetUser'
import { ref } from 'vue';
import { serverTimestamp } from '../firebase'
import UseCollection from '../composables/UseCollection'
export default {
    setup() {
        const { user } = GetUser();
        const message = ref('');
        const {error, addDocuman} = UseCollection('messages')        
        const handleSubmit = async () => {
            try {
                const chat = {
                    displayName: user.value.displayName,
                    message: message.value,
                    createTime: serverTimestamp()
                };
                if(chat.value)
                  addDocuman(chat)
                
                message.value = ''; // Clear message after submission
                error.value = null; // Clear any previous errors
                console.log(chat);
            } catch (err) {
                console.error('Error adding document: ', err);
                error.value = 'Failed to send message. Please try again.'; // Set error message
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
  textarea {
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
  </style>