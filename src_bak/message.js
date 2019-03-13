import React, { Component } from 'react'
import './chat.css'
import Emoji from 'react-emojione';
import Linkify from "react-linkify";

class Message extends Component {
  render() {
    return (
      <li className='chatt-message'>
        <p className='chatt-username'>{this.props.username}</p>
        <p className='chatt-timestamp'>{this.props.timestamp}</p>
        <p className='chatt-content'>
          <Linkify>
            <Emoji>{this.props.content}</Emoji>
          </Linkify>
        </p>
      </li>
    )
  }
}

export default Message;
