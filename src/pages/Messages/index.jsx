import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Search, Send, Phone, Video, MoreHorizontal, CheckCheck, Clock } from 'lucide-react'
import { useAuth } from '../../context/auth'
import { Link } from 'react-router-dom'

const contacts = [
  {
    id: 1, name: 'Karim B.', service: 'Plombier', avatar: 'K', gradient: 'from-blue-500 to-cyan-400', online: true,
    lastMsg: 'D\'accord, je serai là à 14h.', time: '14:32', unread: 2,
    messages: [
      { id: 1, from: 'them', text: 'Bonjour, je suis disponible demain après-midi.', time: '14:00' },
      { id: 2, from: 'me', text: 'Parfait, à quelle heure pouvez-vous passer ?', time: '14:05' },
      { id: 3, from: 'them', text: 'Je peux être chez vous vers 14h si cela vous convient.', time: '14:10' },
      { id: 4, from: 'me', text: 'Oui, c\'est parfait ! Je vous attends.', time: '14:15' },
      { id: 5, from: 'them', text: 'D\'accord, je serai là à 14h.', time: '14:32' },
      { id: 6, from: 'me', text: 'Super, merci !', time: '14:33' },
    ],
  },
  {
    id: 2, name: 'Amina K.', service: 'Aide à domicile', avatar: 'A', gradient: 'from-purple-500 to-pink-400', online: false,
    lastMsg: 'Merci pour votre confiance !', time: 'Hier', unread: 0,
    messages: [
      { id: 1, from: 'them', text: 'Bonjour, je confirme mon passage demain à 9h.', time: '09:00' },
      { id: 2, from: 'me', text: 'Parfait, à demain !', time: '09:05' },
      { id: 3, from: 'them', text: 'Merci pour votre confiance !', time: '09:10' },
    ],
  },
  {
    id: 3, name: 'Mohamed L.', service: 'Électricien', avatar: 'M', gradient: 'from-amber-500 to-orange-400', online: true,
    lastMsg: 'Le devis est prêt, je vous l\'envoie.', time: 'Lun', unread: 0,
    messages: [
      { id: 1, from: 'them', text: 'J\'ai regardé votre installation. Le devis est prêt, je vous l\'envoie.', time: '10:00' },
      { id: 2, from: 'me', text: 'Parfait, envoyez-le moi par ici.', time: '10:05' },
    ],
  },
  {
    id: 4, name: 'Sara B.', service: 'Coiffeuse', avatar: 'S', gradient: 'from-emerald-500 to-teal-400', online: false,
    lastMsg: 'Je vous confirme pour samedi 10h.', time: 'Mar', unread: 0,
    messages: [
      { id: 1, from: 'them', text: 'Samedi 10h, c\'est noté !', time: '15:00' },
      { id: 2, from: 'me', text: 'À samedi !', time: '15:05' },
    ],
  },
]

export default function Messages() {
  const { user } = useAuth()
  const [selectedContact, setSelectedContact] = useState(null)
  const [messageText, setMessageText] = useState('')
  const [searchContact, setSearchContact] = useState('')
  const [showMobileList, setShowMobileList] = useState(true)
  const messagesEndRef = useRef(null)

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchContact.toLowerCase()) ||
    c.service.toLowerCase().includes(searchContact.toLowerCase())
  )

  const activeContact = contacts.find(c => c.id === selectedContact)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeContact?.messages])

  const sendMessage = () => {
    if (!messageText.trim() || !activeContact) return
    const newMsg = {
      id: Date.now(),
      from: 'me',
      text: messageText,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    }
    activeContact.messages.push(newMsg)
    activeContact.lastMsg = messageText
    setMessageText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!user) {
    return (
      <div className="py-16 text-center">
        <div className="w-16 h-16 rounded-2xl glass-premium flex items-center justify-center mx-auto mb-4">
          <Search className="w-8 h-8 text-zyvo-muted/40" />
        </div>
        <h2 className="text-xl font-extrabold">Connectez-vous</h2>
        <p className="text-sm text-zyvo-muted mt-2">Connectez-vous pour accéder à vos messages.</p>
        <Link to="/auth" className="inline-flex items-center gap-2 mt-6 gradient-brand text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all glow-worm">
          Se connecter
        </Link>
      </div>
    )
  }

  return (
    <div className="py-4 h-[calc(100vh-10rem)]">
      <div className="glass-premium rounded-3xl h-full overflow-hidden flex flex-col sm:flex-row">
        {/* CONTACTS SIDEBAR */}
        <div className={`sm:w-80 border-r border-white/5 flex flex-col ${showMobileList ? 'flex' : 'hidden sm:flex'}`}>
          <div className="p-4 border-b border-white/5">
            <h2 className="font-extrabold text-lg">Messages</h2>
            <div className="flex items-center gap-2 glass-premium-light rounded-xl px-4 h-10 mt-3">
              <Search className="w-4 h-4 text-zyvo-muted shrink-0" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchContact}
                onChange={(e) => setSearchContact(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-white placeholder:text-zyvo-muted"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {filteredContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => { setSelectedContact(contact.id); setShowMobileList(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left ${
                  selectedContact === contact.id ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <div className="relative shrink-0">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${contact.gradient} flex items-center justify-center text-sm font-bold text-white`}>
                    {contact.avatar}
                  </div>
                  {contact.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-zyvo-card" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white truncate">{contact.name}</span>
                    <span className="text-[10px] text-zyvo-muted shrink-0 ml-2">{contact.time}</span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs text-zyvo-muted truncate">{contact.lastMsg}</span>
                    {contact.unread > 0 && (
                      <span className="w-5 h-5 rounded-full bg-zyvo-gold text-[9px] font-bold text-zyvo-dark flex items-center justify-center shrink-0 ml-2">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CHAT AREA */}
        <div className={`flex-1 flex flex-col ${!showMobileList ? 'flex' : 'hidden sm:flex'}`}>
          {activeContact ? (
            <>
              {/* CHAT HEADER */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                <button onClick={() => setShowMobileList(true)} className="sm:hidden p-1 text-zyvo-muted hover:text-white">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${activeContact.gradient} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
                  {activeContact.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-white">{activeContact.name}</div>
                  <div className="text-[10px] text-zyvo-muted">{activeContact.online ? 'En ligne' : 'Hors ligne'}</div>
                </div>
                <button className="p-2 rounded-lg text-zyvo-muted hover:text-white hover:bg-white/5 transition-all">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg text-zyvo-muted hover:text-white hover:bg-white/5 transition-all">
                  <Video className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg text-zyvo-muted hover:text-white hover:bg-white/5 transition-all">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* MESSAGES */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
                {activeContact.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                      msg.from === 'me'
                        ? 'gradient-brand text-white rounded-br-md'
                        : 'glass-premium-light text-zyvo-muted rounded-bl-md'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <div className={`flex items-center gap-1 mt-1 text-[10px] ${
                        msg.from === 'me' ? 'text-white/60 justify-end' : 'text-zyvo-muted/60'
                      }`}>
                        <span>{msg.time}</span>
                        {msg.from === 'me' && <CheckCheck className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* INPUT */}
              <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-2 glass-premium-light rounded-2xl px-4 py-2">
                  <input
                    type="text"
                    placeholder="Écrivez votre message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-zyvo-muted"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!messageText.trim()}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      messageText.trim() ? 'gradient-brand text-white shadow-lg' : 'bg-white/5 text-zyvo-muted'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl glass-premium flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-zyvo-muted/40" />
                </div>
                <h3 className="font-bold text-white">Sélectionnez une conversation</h3>
                <p className="text-sm text-zyvo-muted mt-1">Choisissez un contact pour commencer à discuter</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
