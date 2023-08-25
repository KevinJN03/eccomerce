import { useState } from 'react'
import './App.css'
// import Layout from './components/Layout/layout'
import Body from './components/Body'
function App() {


  return (
    <div id="App" className='w-full h-full flex flex-col justify-center align-center'>
      <Body/>
      {/* <Layout>
     <Body/>
     </Layout> */}
    </div>
  )
}

export default App
