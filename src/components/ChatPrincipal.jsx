import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";

export default function ChatApp({ chatId: initialChatId }) {
  const [chatId, setChatId] = useState(initialChatId);
  const [searchText, setSearchText] = useState("");

  return (
    <div className="h-screen flex">
      <aside className="w-1/4 flex flex-col border-r border-gray-200 bg-white">
        <header className="p-4 border-b">
          <h2 className="text-lg font-semibold text-blue-700">Mensajes</h2>
        </header>

        <div className="p-3">
          <div className="flex items-center gap-2 border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 focus-within:ring-2 focus-within:ring-blue-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="flex-1 bg-blue-50 text-blue-900 placeholder-blue-400 outline-none"
              placeholder="Buscar conversaciones..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <nav className="flex justify-between px-4 py-2 text-sm">
          <button className="text-blue-600 font-semibold hover:underline">Todos</button>
          <button className="text-gray-600 hover:text-blue-600">No leídos</button>
          <button className="text-gray-600 hover:text-blue-600">Archivados</button>
        </nav>

        <div className="flex-1 overflow-y-auto min-h-0 px-2 pb-4">
          <ChatList searchText={searchText} onSelectChat={setChatId} />
        </div>
      </aside>

      <main className="flex flex-col flex-1">
        <ChatBox chatId={chatId} />
      </main>
    </div>
  );
}
