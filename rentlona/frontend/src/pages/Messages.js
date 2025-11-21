import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { messagesAPI } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import './Messages.css';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchConversations();
  }, [user, navigate]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation._id);
    }
  }, [selectedConversation]);

  const fetchConversations = async () => {
    try {
      const response = await messagesAPI.getConversations();
      setConversations(response.data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const response = await messagesAPI.getByConversation(conversationId);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      await messagesAPI.send({
        recipientId: selectedConversation.participants.find(p => p._id !== user._id)._id,
        content: newMessage
      });

      setNewMessage('');
      fetchMessages(selectedConversation._id);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading messages...</div>;
  }

  return (
    <div className="messages-container">
      <div className="messages-header">
        <h1>Messages</h1>
      </div>

      <div className="messages-content">
        <div className="conversations-list">
          <h2>Conversations</h2>
          {conversations.length === 0 ? (
            <div className="no-conversations">
              <p>No conversations yet</p>
              <small>Start a conversation by contacting a listing owner</small>
            </div>
          ) : (
            conversations.map(conversation => (
              <div
                key={conversation._id}
                className={`conversation-item ${selectedConversation?._id === conversation._id ? 'active' : ''}`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="conversation-avatar">
                  {conversation.participants[0]?.name?.charAt(0) || 'U'}
                </div>
                <div className="conversation-info">
                  <h4>{conversation.participants[0]?.name || 'Unknown User'}</h4>
                  <p>{conversation.lastMessage?.content?.substring(0, 50) || 'No messages yet'}</p>
                  <small>
                    {conversation.lastMessage ?
                      new Date(conversation.lastMessage.createdAt).toLocaleDateString() :
                      'No messages'
                    }
                  </small>
                </div>
                {conversation.unreadCount > 0 && (
                  <div className="unread-badge">{conversation.unreadCount}</div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="messages-chat">
          {selectedConversation ? (
            <>
              <div className="chat-header">
                <h3>Chat with {selectedConversation.participants[0]?.name || 'Unknown User'}</h3>
              </div>

              <div className="messages-list">
                {messages.length === 0 ? (
                  <div className="no-messages">
                    <p>No messages in this conversation yet</p>
                  </div>
                ) : (
                  messages.map(message => (
                    <div
                      key={message._id}
                      className={`message ${message.sender._id === user._id ? 'sent' : 'received'}`}
                    >
                      <div className="message-content">
                        <p>{message.content}</p>
                        <small>{new Date(message.createdAt).toLocaleString()}</small>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={sendMessage} className="message-form">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  required
                />
                <button type="submit">Send</button>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <h3>Select a conversation to start chatting</h3>
              <p>Choose a conversation from the list to view messages</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
