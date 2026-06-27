import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, Phone, Search, ArrowLeft, CheckCheck, Clock } from 'lucide-react'
import { chatMessages } from '../../data/dashboardData'

export default function Messagerie() {
  const [selectedChat, setSelectedChat] = useState(null)
  const [messageText, setMessageText] = useState('')

  const activeChat = selectedChat
    ? chatMessages.find(c => c.id === selectedChat)
    : null

  return (
    <div className="h-[calc(100vh-8rem)] sm:h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-zyvo-gold" />
        <h1 className="text-xl sm:text-2xl font-extrabold">Mes <span className="gradient-text-brand">messages</span></h1>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row gap-4 min-h-0">
        {/* Chat List */}
        <div className={`sm:w-72 lg:w-80 flex flex-col ${selectedChat ? 'hidden sm:flex' : 'flex'} glass-premium rounded-2xl overflow-hidden`}>
          <div className="p-3 border-b border-white/5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zyvo-muted" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/30 outline-none focus:border-zyvo-gold/40 transition-colors"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            {chatMessages.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full flex items-center gap-3 p-3 sm:p-4 text-left transition-all hover:bg-white/5 ${
                  selectedChat === chat.id ? 'bg-white/5' : ''
                }`}
              >
                <div className="relative shrink-0">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${chat.gradient} flex items-center justify-center text-sm font-bold text-white shadow-lg`}>
                    {chat.avatar}
                  </div>
                  {chat.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-zyvo-dark" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-xs sm:text-sm text-white truncate">{chat.providerName}</p>
                    <span className="text-[9px] sm:text-xs text-zyvo-muted shrink-0">{chat.time}</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-zyvo-muted truncate mt-0.5">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-zyvo-gold text-[8px] sm:text-[9px] font-bold text-zyvo-dark flex items-center justify-center shrink-0 shadow-lg">
                    {chat.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className={`flex-1 flex flex-col ${!selectedChat ? 'hidden sm:flex' : 'flex'} glass-premium rounded-2xl overflow-hidden`}>
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 p-3 sm:p-4 border-b border-white/5">
                <button onClick={() => setSelectedChat(null)} className="sm:hidden p-1.5 rounded-lg text-zyvo-muted hover:text-white hover:bg-white/5 transition-all">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="relative shrink-0">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${activeChat.gradient} flex items-center justify-center text-sm font-bold text-white shadow-lg`}>
                    {activeChat.avatar}
                  </div>
                  {activeChat.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-zyvo-dark" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm sm:text-base text-white">{activeChat.providerName}</p>
                  <p className="text-[10px] sm:text-xs text-emerald-400">{activeChat.online ? 'En ligne' : 'Hors ligne'}</p>
                </div>
                <button className="p-2 rounded-xl bg-white/5 text-zyvo-muted hover:text-white hover:bg-white/10 transition-all">
                  <Phone className="w-4 h-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                <div className="flex justify-start">
                  <div className="max-w-[85%] sm:max-w-[70%] bg-white/10 rounded-2xl rounded-tl-sm px-3 sm:px-4 py-2 sm:py-3">
                    <p className="text-xs sm:text-sm text-white">Bonjour ! Je suis disponible pour votre intervention.</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[9px] sm:text-xs text-zyvo-muted">09:00</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[85%] sm:max-w-[70%] gradient-brand rounded-2xl rounded-tr-sm px-3 sm:px-4 py-2 sm:py-3">
                    <p className="text-xs sm:text-sm text-white">Parfait, à demain 14h alors !</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[9px] sm:text-xs text-white/70">09:05</span>
                      <CheckCheck className="w-3 h-3 text-emerald-400" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[85%] sm:max-w-[70%] bg-white/10 rounded-2xl rounded-tl-sm px-3 sm:px-4 py-2 sm:py-3">
                    <p className="text-xs sm:text-sm text-white">D'accord, je serai là à 14h.</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[9px] sm:text-xs text-zyvo-muted">10:32</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="p-3 sm:p-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Écrivez votre message..."
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-white/30 outline-none focus:border-zyvo-gold/40 transition-colors"
                  />
                  <button
                    disabled={!messageText.trim()}
                    className="gradient-brand text-white font-bold px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all glow-worm"
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 text-zyvo-muted/20 mx-auto mb-4" strokeWidth={1} />
                <p className="font-bold text-white text-lg">Sélectionnez une conversation</p>
                <p className="text-xs sm:text-sm text-zyvo-muted mt-1">Choisissez un prestataire pour discuter</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
