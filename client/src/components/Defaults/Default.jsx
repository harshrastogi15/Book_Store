import React, {Component} from 'react';

class Default extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message,
      mystyle: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        height: 'calc(100vh - 60px)',
        alignItems: 'center',
        fontSize: '24px',
        flexDirection: 'column',
        fontWeight: '500',
      },
    };
  }


  render() {
    const {mystyle, message} = this.state;
    return <div style={mystyle}>
      <h1>404</h1>
      <div>{message}</div>
    </div>;
  }
}

export default Default;
