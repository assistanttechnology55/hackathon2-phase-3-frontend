'use client';

import React from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatWindowProps {
  messages: Message[];
  loading: boolean;
  onSendMessage: (message: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function ChatWindow({
  messages,
  loading,
  onSendMessage,
  messagesEndRef,
}: ChatWindowProps) {
  const handleSubmit = (message: string) => {
    onSendMessage(message);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-400">
              <div className="text-6xl mb-4">🤖</div>
              <h2 className="text-2xl font-semibold mb-2">Welcome to AI Assistant</h2>
              <p className="text-gray-500">Start a conversation by sending a message</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {loading && (
              <div className="message-assistant flex justify-start">
                <div className="bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                  <div className="loading-dots text-purple-400">
                    <span>•</span><span>•</span><span>•</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <ChatInput onSendMessage={handleSubmit} disabled={loading} />
    </div>
  );
}
