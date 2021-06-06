import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyB0D0At9Kch0CvbO_NroaKwCMebUsLGifU",
    authDomain: "marvel-quiz-5b1d3.firebaseapp.com",
    projectId: "marvel-quiz-5b1d3",
    storageBucket: "marvel-quiz-5b1d3.appspot.com",
    messagingSenderId: "832734147622",
    appId: "1:832734147622:web:71ffe4a49218d8f38922e7"
  };

export default class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    signupUser = (email, password) => this.auth.createUserWithEmailAndPassword(email,password);

    loginUser = (email,password) => this.auth.signInWithEmailAndPassword(email,password);

    signoutUser = () => this.auth.signOut();

    passwordReset = email => this.auth.sendPasswordResetEmail(email);

    user = uid => this.db.doc(`users/${uid}`);
}