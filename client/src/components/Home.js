import React from 'react'
import Corousel from './Corousel'

function Home() {
  return (
    <div>
      <div>Home</div>
      <Corousel type='Play' />
      <Corousel type='Game'/>
    </div>
  )
}

export default Home