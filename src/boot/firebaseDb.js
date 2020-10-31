// import something here
import VueFirestore from 'vue-firestore'
import firebase from 'firebase'

require('firebase/firestore')

var config = {
  apiKey: 'AIzaSyAmJLCXmfn-BgxbvMMQSDrEuIpFTKQJ-rc',
  authDomain: 'systematize-ee5d8.firebaseapp.com',
  databaseURL: 'https://systematize-ee5d8.firebaseio.com',
  projectId: 'systematize-ee5d8',
  storageBucket: 'systematize-ee5d8.appspot.com',
  messagingSenderId: '823543591291',
  appId: '1:823543591291:web:81596edb0de6e8f9ff0dde'
}

// Initialize Firebase.
firebase.initializeApp(config)
// "async" is optional
export default async ({ router, Vue }) => {
  // something to do
  // firebase.auth().onAuthStateChanged(user => {
  //   if (user === null) {
  //     router.push('/login')
  //   }
  //   console.log(user, 'user auth')
  // })
  Vue.prototype.$firebaseApp = firebase
  Vue.prototype.$firestoreApp = firebase.firestore()
  Vue.use(VueFirestore)
}
