// copied from https://www.codementor.io/vijayst/unit-testing-react-components-jest-or-enzyme-du1087lh8
import React from 'react';

export default class Add extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
      };
      this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd(e) {
        e.preventDefault();
        this.props.onAdd(this.state);
    }

    render() {
      return (
        <form>
          <input
            type="text"
            name="first_name"
            value={this.state.first_name}
            onChange={e => this.setState({ first_name: e.target.value })}
          />

          <input
            type="text"
            name="last_name"
            value={this.state.last_name}
            onChange={e => this.setState({ last_name: e.target.value })}
          />

          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />

          <input
            type="text"
            name="phone"
            value={this.state.phone}
            onChange={e => this.setState({ phone: e.target.value })}
          />

          <button onClick={this.handleAdd}>Add</button>
        </form>
      );
    }
}
