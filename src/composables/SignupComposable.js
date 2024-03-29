import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref } from 'vue';

const error = ref(null);

const user = async (email, password, name) => {
    try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        error.value=null
        return userCredential;
    } catch (err) {
        console.error('Kullanıcı oluşturma hatası:', err);
        error.value = err.message;
    }
};

const SignupComposable = () => {
    return { error, user };
};
    
export default SignupComposable;