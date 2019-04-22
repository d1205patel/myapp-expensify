import {firebase, googleAuthProvider} from '../firebase/firebase';

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    }
}


export const startLoginWithEmail = (emailElement,passwordElement) => {
    return () => {

        const email = emailElement.value;
        const password = passwordElement.value;
        
        return firebase.auth().signInWithEmailAndPassword(email, password);
          
    }
}

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const startRegisterUser = (emailElement,passwordElement) => {
    return () => {

        const email = emailElement.value;
        const password = passwordElement.value;
        
        return firebase.auth().createUserWithEmailAndPassword(email, password)
          
    }
}

export const startLogOut = () => {
    return() => {
        return firebase.auth().signOut();
    }
}

export const logout = () => ({
    type: 'LOGOUT'
})