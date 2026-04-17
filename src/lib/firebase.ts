import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3SjMSXxEOpA-l7jO1b_ar2p4F7G1kV3c",
  authDomain: "ai-project-eeb92.firebaseapp.com",
  projectId: "ai-project-eeb92",
  storageBucket: "ai-project-eeb92.firebasestorage.app",
  messagingSenderId: "413743350353",
  appId: "1:413743350353:web:94398da09f7c49c271ee70",
  measurementId: "G-CFL8B2WQMY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
