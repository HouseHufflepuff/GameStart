import {initializeApp} from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
// import Constants from 'expo-constants';


// const firebaseConfig = {
//   apiKey: Constants.manifest?.extra?.firebaseApiKey,
//   authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
//   projectId: Constants.manifest?.extra?.firebaseProjectId,
//   storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
//   messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
//   appId: Constants.manifest?.extra?.firebaseAppId,
// };




// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)


export { app, auth };



// signup function
// const handleSignUp =  (email, password) => {
//     createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//     })
//     .catch((error) => {
//       alert(error.message);
//     });
// };

// const handleLogin = () => {
//   signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     const user = userCredential.user;
//     console.log(user)
//   })
//   .catch((error) => {
//     alert(error.message)
//   })
// }

//signout
// const handleSignout =  () => {
//   signOut(auth)
//     .then(() => {
//       ;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };


// //context provider
// export const AuthenticatedUserContext = createContext({});

// export const AuthenticatedUserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   return (
//     <AuthenticatedUserContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthenticatedUserContext.Provider>
//   );
// };