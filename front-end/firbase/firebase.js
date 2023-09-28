import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const fireBaseConfig = {
  apiKey: 'AIzaSyCGHKaj-Zx3EwVt6_MqbGvnN_N62DM1lAQ',
  authDomain: 'prep-app-dd760.firebaseapp.com',
  projectId: 'prep-app-dd760',
  storageBucket: 'prep-app-dd760.appspot.com',
  messagingSenderId: '1047103365636',
  appId: '1:1047103365636:web:a44bd28c916dc7ba114b51'
}

const app = initializeApp(fireBaseConfig)
export const auth = getAuth(app)
