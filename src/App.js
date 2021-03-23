import React from 'react';
import Print from './New';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0
    }
  }

  shouldComponentUpdate() {
    if (false) {
      return false;
    }
    else {
      return true;
    }
  }


  Increment = () => {
    this.setState({ value: this.state.value + 1 });
  }

  Decrement = () => {
    this.setState({ value: this.state.value - 1 });
  }

  render() {
    return (
      <div>
        Parent Component
        <Print text="Child Component" value={this.state.value} />
        <button onClick={this.Increment}>Increment</button>
        <button onClick={this.Decrement}>Decrement</button>
      </div>
    )
  }
}

export default App;

