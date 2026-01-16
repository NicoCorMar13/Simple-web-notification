import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBwQcaAapmWWkWOu9JUohogrCTSweulpvI",
    authDomain: "mi-app-7e8c8.firebaseapp.com",
    projectId: "mi-app-7e8c8",
    storageBucket: "mi-app-7e8c8.firebasestorage.app",
    messagingSenderId: "433105229571",
    appId: "1:433105229571:web:25680aeb69369670ba7b36",
    measurementId: "G-LW4DKY90GM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// documento compartido
const docRef = doc(db, "shared", "text");

// notificaciones
if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

//Nos muestra una notificacion emergente que nos dira el estado de la notificacion
console.log("Permiso: ", Notification.permission);

// guardar texto
document.getElementById("send").addEventListener("click", async () => {
  const text = document.getElementById("text").value;

  await setDoc(docRef, {
    text,
    updatedAt: Date.now()
  });
});

// escuchar cambios en tiempo real
let lastUpdate = 0;

onSnapshot(docRef, async (docSnap) => {
  if (!docSnap.exists()) return;

  const data = docSnap.data();
  document.getElementById("text").value = data.text;

  // evitar notificar al cargar por primera vez
  if (lastUpdate !== 0 && data.updatedAt !== lastUpdate) {

    //Comprobamos que la notificacion esta permitida
    if (Notification.permission !== "granted") return;

    //Mostramos la notificacion
    if ("serviceWorker" in navigator) {
        const reg = await navigator.serviceWorker.ready;
        await reg.showNotification("🔔 Texto actualizado", {
          body: "Alguien ha modificado el texto",
          data: { url: "https://nicocormar13.github.io/Simple-web-notification/"}
        });
    } else {
        new Notification("🔔 Alguien ha modificado el texto", {
          body: "Alguien ha modificado el texto",
          data: { url: "https://nicocormar13.github.io/Simple-web-notification/"}
        });
    }

    /*Vamo a probar con otro tipo de notificacion, comentamos esta
    if (Notification.permission === "granted") {
      new Notification("🔔 Alguien ha modificado el texto");
    }*/
  }

    
    

  lastUpdate = data.updatedAt;
});