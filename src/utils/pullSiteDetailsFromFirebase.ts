import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3AqpCI59ofAEYfrf109MJl33zxqvpm94",
  authDomain: "jamhack-personal-1661789520207.firebaseapp.com",
  projectId: "jamhack-personal-1661789520207",
  storageBucket: "jamhack-personal-1661789520207.appspot.com",
  messagingSenderId: "829349924213",
  appId: "1:829349924213:web:73086b17f305edecde973c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const url = "https://www.optimizely.com/"; // change this to get a different site data
const urlWithoutSpecialCharactersIsTheDocName = url.replace(/[^\w\s]/gi, "");

const docRef = doc(db, "sites", urlWithoutSpecialCharactersIsTheDocName);
const docSnap = await getDoc(docRef);

const pullData = () => {
  let data = {};

  if (docSnap.exists()) {
    data = docSnap.data() as {
      url: string;
      companyName: string;
      brandColor: string;
      companyLogo: string | undefined;
      techCohort: string;
      cms: string | undefined;
      screenshot: string | undefined;
      performance: number;
      CLS: number;
      FID: number;
      LCP: number;
    };
    const screenshot = data.screenshot;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

  return data;
  
}


export const pullSiteDetailsFromFirebase = async () => {
  const firebaseResponse = pullData();
  return firebaseResponse;
}