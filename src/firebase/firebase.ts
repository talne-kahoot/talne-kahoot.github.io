import {getDatabase} from "firebase/database";
import {initializeApp} from "firebase/app";

// PROD CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyCJ26YTVTBr2AVfB4S4TvZ-eU0ed_Tq9PM",
    authDomain: "kahoot-talne-7dd59.firebaseapp.com",
    projectId: "kahoot-talne-7dd59",
    storageBucket: "kahoot-talne-7dd59.appspot.com",
    messagingSenderId: "109592796972",
    appId: "1:109592796972:web:060b8efb38f3ce8b021689",
    databaseURL: "https://kahoot-talne-7dd59-default-rtdb.firebaseio.com/"
};

// DEV CONFIG
// const firebaseConfig = {
//     apiKey: "AIzaSyCWYFbcsjdLeKj6xU13tZZUn1LvQkiyjYM",
//     authDomain: "talne-kahoot.firebaseapp.com",
//     databaseURL: "https://talne-kahoot-default-rtdb.firebaseio.com",
//     projectId: "talne-kahoot",
//     storageBucket: "talne-kahoot.appspot.com",
//     messagingSenderId: "1012130562346",
//     appId: "1:1012130562346:web:9827727b63218b13ac1e53"
// };

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);


