import React from 'react';
import { Paper, TextField, List, Avatar } from 'material-ui';
import FriendsList from '../misc/friendsList.jsx'
import ListItem from 'material-ui/List/ListItem';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(localStorage.userInfo),
      messages: [],
      message: '',
      currentChatReceiver: null,
    }

    this.handleChatWindow = this.handleChatWindow.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
  }

  componentWillMount(){
    if (this.props.location.state) {
      this.setState({ currentChatReceiver: this.props.location.state });
    }
  }
  
  handleChatWindow(friend) {
    this.setState({ currentChatReceiver: friend })
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  renderMessages(messageList) {
    return messageList.map(message => (
      <ListItem
        disabled={true}
        primaryText={`${message.user.username}: `}
        secondaryText={message.message}
        leftAvatar={<Avatar src={message.user.profile_picture} />}
        key={Math.floor(Math.random() * 10000)}
      />
    ));
  }

  sendMessage(e) {
    if (e.key === 'Enter') {
      const messageList = this.state.messages;
      messageList.push({ 
        message: this.state.message,
        user: this.state.user,
      });

      this.setState({ messages: messageList, message: '' });
    }
  }

  render() {
    return (
      <Paper
        style={{ padding: '5px' }}
        zDepth={1}>
        <h1>Chat View</h1>
        <FriendsList
          handleChatWindow={this.handleChatWindow} />
        <div className='chat-window'>
        <Paper
          depth={-1}
          style={{ minHeight: '30em', maxHeight: '100em' }}
        >
        {
          this.state.currentChatReceiver ? `Chatting with ${this.state.currentChatReceiver.username}`:
          'Select a friend to start chatting'
        }
        <List style={{ height: '25em', overflow: 'scroll'}}>
          {this.renderMessages(this.state.messages)}
        </List>
        <TextField
          hintText={this.state.currentChatReceiver ? "Say something..." : "Select a receipient first..."}
          disabled={!!!this.state.currentChatReceiver}
          style={{ overflow: 'scroll'}}
          name='message'
          value={this.state.message}
          onChange={this.handleInput.bind(this)}
          onKeyDown={this.sendMessage.bind(this)}
        />
        </Paper>
        </div>
      </Paper>
    )
  }
}

export default Chat;