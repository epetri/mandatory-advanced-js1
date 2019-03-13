import React, { Component } from 'react';
import Message from './message';
import './chat.css';

const io = require('socket.io-client');

function time(ts){
    return new Date(ts).toLocaleString("sv-SE");
}

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            message: '',
            messages: [],  
        }  
    this.onChange = this.onChange.bind(this);
    this.sendButton = this.sendButton.bind(this);

    }

    componentDidMount(){
        this.setState({username: this.props.username})

        this.socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');

        this.socket.on('connect', function(){
            console.log('Connected');
        });

        this.socket.on('messages', (messageArray) => {
            this.setState({messages: messageArray})
        });
        
        this.socket.on("new_message", (messageData) =>  {            
            this.setState({messages: [...this.state.messages, messageData]})
        });
    }

    componentWillUnmount(){
        this.socket.disconnect();
        this.socket = null;
    }

    onChange(e){
        this.setState({message: e.target.value});
    }

    sendButton(){ 
        this.socket.emit('message', {
            username: this.props.username,
            content: this.state.message,
        }, (response) => { 
            this.setState({ messages: [...this.state.messages, response.data.newMessage]});
    });
    this.inputTitle.value = "";
    }
    
    
    render() {   
        return (

            <div className='chat-container'>

                <header className='chat-header'>
                    <h1 className= 'chat-header-title'>Chat-Up</h1>
                    <div className='chat-logOutButton'>
                    <button onClick={this.props.logOut}>Log out</button>
                    </div>
                </header>
                <div className='chat-window'>
                    <ul className='chat-messages'>
                    {this.state.messages.map(message => {
                    return <Message username={message.username} content={message.content} timestamp={time(message.timestamp)} key={message.id} />
                    })}
                    </ul>
                </div>
                <div className='answer-div'>
                    <textarea maxLength= '200' className='answer-input' type='text' onChange={this.onChange} ref={el => this.inputTitle = el}></textarea>
                    <button type='submit' className='answer-sendbutton' onClick={this.sendButton}>Send</button>
                </div>
            </div>
        );
    }

  }


 
export default Chat;