import React, { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";

const ChatBox = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatInfo, setChatInfo] = useState(null);

  const stompClient = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchChatInfo = async () => {
      if(chatId === "candidato" || chatId === "empresa"){return}

      try {
        const res = await fetch(`http://localhost:8080/api/chats/${chatId}/info`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Error al obtener la información del chat");
        const data = await res.json();
        setChatInfo(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchChatInfo();
  }, [chatId]);

  useEffect(() => {
    if (!chatInfo) return;

    const { userId } = chatInfo;

    const client = new Client({
      brokerURL: "ws://localhost:8080/chats",
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ Conectado a WebSocket");

        client.subscribe(`/user/queue/messages`, (msg) => {
          const message = JSON.parse(msg.body);
          setMessages((prev) => [...prev, message]);
        });

        fetch(`http://localhost:8080/api/chats/${chatId}/mensajes`, {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => setMessages(data))
          .catch((error) => console.error("❌ Error al obtener los mensajes:", error));
      },
      onStompError: (frame) => {
        console.error("❌ STOMP error:", frame);
      },
    });

    stompClient.current = client;
    client.activate();

    return () => {
      if (client.active) client.deactivate();
    };
  }, [chatInfo, chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!chatInfo || input.trim() === "") return;

    const { userId, rolPrincipal: role, chatInfo: chatDetails } = chatInfo;
    const { empresaId, candidatoId } = chatDetails;

    const receptorId = role === "EMPRESA" ? candidatoId : empresaId;

    const msg = {
      chatId,
      senderId: userId,
      receiverId: receptorId,
      senderRole: role,
      content: input,
    };

    const client = stompClient.current;

    if (client && client.connected) {
      client.publish({
        destination: "/app/chats.sendMessage",
        body: JSON.stringify(msg),
      });
      setInput("");
    }
  };

  const cambiarEstadoChat = async (chatId, estado) => {
    let mensaje = estado? "Abrir":"Cerrar";
    try {
      const response = await fetch(`http://localhost:8080/api/chats/${chatId}/estado?isActive=${estado}`, {
        method: 'PATCH',
        credentials: 'include', 
      });

      if (response.ok) {
        alert(`Chat ${estado? "Abierto":"Cerrardo"} correctamente`);
        
      } else if (response.status === 403) {
        alert(`No tienes permisos para ${mensaje} este chat`);
      } else {
        alert(`Ocurrió un error al ${mensaje} el chat`);
      }
    } catch (error) {
      console.error(`Error al ${mensaje} el chat:`, error);
      alert(`Error de red o servidor al ${mensaje} el chat`);
    }
  };


  if (!chatInfo) return (
      <div id="emptyChatState" className="empty-chat-state">
        <div className="empty-chat-content">
          <div className="empty-chat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h3>Tus mensajes</h3>
          <p>Selecciona una conversación para ver tus mensajes o inicia una nueva</p>
          
        </div>
      </div>
    );

  return (
    <div className="flex flex-col w-full h-full border-l border-gray-200">
      {/* Header del chat */}
      <div className="p-4 border-b bg-white shadow-sm flex justify-between items-center">
        <h2 className="text-lg font-semibold text-blue-900">
          Conversación con {chatInfo.chatInfo.nombreCandidato || "Usuario"}
        </h2>
        {chatInfo.rolPrincipal === 'EMPRESA' && (
          <button
            onClick={() => cambiarEstadoChat(chatInfo.chatInfo.id, !chatInfo.chatInfo.isActive)} 
            className={`${
              chatInfo.chatInfo.isActive 
                ? "bg-red-100 text-red-600 hover:bg-red-200" 
                : "bg-green-100 text-green-600 hover:bg-green-200"
            } font-medium px-4 py-2 rounded-lg transition duration-200 text-sm`}
          >
            {chatInfo.chatInfo.isActive ? "Cerrar Chat" : "Reabrir Chat"}
          </button>
        )}
      </div>

      {/* Área de mensajes */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-2">
        {messages.map((msg, idx) => {
          const isOwn = msg.senderId === chatInfo.userId;
          return (
            <div
              key={idx}
              className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  isOwn
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input de mensaje */}
      {chatInfo.chatInfo.isActive && (
        <div className="p-4 border-t bg-white">
          <div className="flex items-center gap-2">
            <input
              rows={1}
              className="flex-1 resize-none border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Tab') {
                  e.preventDefault();
                  setInput(e.target.value);
                }
              }}
              placeholder="Escribe tu mensaje..."
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className={`px-4 py-2 rounded-lg font-semibold ${
                input.trim()
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Enviar
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ChatBox;
