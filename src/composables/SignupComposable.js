import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut } from 'firebase/auth';
import { ref } from 'vue';

const error = ref(null);
const OnayMaili = ref(null); // OnayMaili değişkenini dışarıda tanımla

const user = async (email, password, name) => {
    try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        await sendEmailVerification(auth.currentUser);
        signOut(auth);
        OnayMaili.value = 'Onaylama maili gönderilmiştir';
        error.value = null;
        return userCredential;
    } catch (err) {
        console.error('Kullanıcı oluşturma hatası:', err);
        error.value = err.message;
    }
};

const SignupComposable = () => {
    return { error, user, OnayMaili }; // OnayMaili'yi dışarıya dön
};
    
export default SignupComposable;
