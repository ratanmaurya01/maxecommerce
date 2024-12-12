import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/authUser.jsx'
import { Provider } from 'react-redux'
import store from './redux/Store.jsx'

createRoot(document.getElementById('root')).render(
     <Provider store={store}>
       <UserProvider>
    <App />
  </UserProvider>
     </Provider>


)
