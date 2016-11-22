import React, { PropTypes, Component } from 'react'
import Immutable from 'immutable'
import TodoTextInput from './TodoTextInput'

export default class Header extends Component {
  static propTypes = {
    create: PropTypes.func.isRequired
  }

  handleSave = text => {
    if (text.length !== 0) {
      this.props.create('todos', Immutable.fromJS({
        id: new Date().getTime(),
        completed: false,
        text
      }))
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput newTodo
                       onSave={this.handleSave}
                       placeholder="What needs to be done?" />
      </header>
    )
  }
}