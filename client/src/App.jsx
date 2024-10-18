import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { Provider } from "react-redux"
import { store, persistedStore } from './store'
import { PersistGate } from 'redux-persist/integration/react'
 
 function App() {
   return (
     <Provider store={store}>
       <PersistGate loading={null} persistor={persistedStore}>
         <Header />
         <Outlet />
       </PersistGate>
     </Provider>
   );
 }
 
 export default App