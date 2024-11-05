import React from 'react';
import ReactMarkdown from 'react-markdown';

const ChatResponseDisplay = ({ content }: {content: string}) => {
  return (
    <div className="chat-response bg-white p-3 rounded-lg text-lg text-black max-w-[80%] break-words mb-3 max-h-[300px] overflow-y-auto">
      <ReactMarkdown
        components={{
          ol: ({ children }) => <ol className="list-decimal ml-5">{children}</ol>,
          li: ({ children }) => <li className="mb-2">{children}</li>,
          p: ({ children }) => <p className="my-1">{children}</p>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default ChatResponseDisplay;
