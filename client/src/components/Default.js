import React from 'react'

function Default(props) {
  const {message} = props;
  const mystyle={
    display:"flex",
    width:'100%',
    justifyContent:'center',
    height:'calc(100vh - 60px)',
    alignItems:'center',
    fontSize:'24px',
    flexDirection:'column',
    fontWeight:'500'
  }

  return (
    <div style={mystyle}>
      <h1>404</h1>
      <div>{message}</div>
    </div>
  )
}

export default Default