"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import BonusPopup from "./bonus-popup"
import DiagnosticResult from "./diagnostic-result"
import FinalOffer from "./final-offer"

interface Message {
  id: number
  text: string
  sender: 'user' | 'ex'
  timestamp: string
}

interface ScoreState {
  receptividade: number
  conexao: number
  interesse: number
}

const interactions = [
  // Bloco 1
  {
    context: "Vocês terminaram há alguns dias. Você decide quebrar o silêncio. Como começa?",
    options: [
      { text: "Oi... como você está?", scores: { receptividade: 2, conexao: 1, interesse: 0 } },
      { text: "Estava pensando em você hoje", scores: { receptividade: 3, conexao: 2, interesse: 1 } },
      { text: "Podemos conversar um pouco?", scores: { receptividade: 1, conexao: 2, interesse: 0 } }
    ],
    responses: [
      "Oi... estou bem, e você?",
      "Sério? Eu também estava pensando em você...",
      "Claro... o que você quer conversar?"
    ],
    delays: [3000, 4000, 3500]
  },
  {
    context: "A conversa começou. Como você continua?",
    options: [
      { text: "Estou tentando processar tudo que aconteceu", scores: { receptividade: 3, conexao: 3, interesse: 1 } },
      { text: "Bem também, só queria ter certeza que você estava ok", scores: { receptividade: 2, conexao: 2, interesse: 1 } },
      { text: "Melhor agora que você respondeu", scores: { receptividade: 2, conexao: 3, interesse: 2 } }
    ],
    responses: [
      "Eu entendo... também não está sendo fácil",
      "Que bom saber que você se preocupa comigo",
      "Fico feliz em saber disso"
    ],
    delays: [4000, 3000, 3500]
  },
  {
    context: "A conversa está fluindo. É hora de aprofundar um pouco.",
    options: [
      { text: "Às vezes me pergunto se fizemos a coisa certa", scores: { receptividade: 3, conexao: 4, interesse: 2 } },
      { text: "Você sente falta de alguma coisa nossa?", scores: { receptividade: 4, conexao: 3, interesse: 3 } },
      { text: "Talvez devêssemos conversar pessoalmente", scores: { receptividade: 2, conexao: 3, interesse: 4 } }
    ],
    responses: [
      "Eu também me pergunto isso... foi tudo muito rápido",
      "Sinto... sinto falta de várias coisas",
      "Acho que seria bom mesmo... sinto sua falta"
    ],
    delays: [5000, 6000, 4500]
  },
  // Bloco 2
  {
    context: "A conversa está fluindo melhor. É hora de aprofundar.",
    options: [
      { text: "O que você mais sente falta especificamente?", scores: { receptividade: 3, conexao: 4, interesse: 3 } },
      { text: "Eu sinto falta da nossa conexão", scores: { receptividade: 3, conexao: 4, interesse: 4 } },
      { text: "Você acha que ainda somos compatíveis?", scores: { receptividade: 4, conexao: 3, interesse: 4 } }
    ],
    responses: [
      "Sinto falta das nossas conversas... da nossa intimidade",
      "Nossa conexão era especial mesmo... eu sinto isso também",
      "Eu acho que sim... sempre fomos muito compatíveis"
    ],
    delays: [5500, 5000, 6000]
  },
  {
    context: "O clima está mais íntimo. Continue explorando os sentimentos.",
    options: [
      { text: "Então por que terminamos mesmo?", scores: { receptividade: 3, conexao: 4, interesse: 3 } },
      { text: "Você acha que poderíamos tentar de novo?", scores: { receptividade: 4, conexao: 4, interesse: 5 } },
      { text: "Que tal nos encontrarmos para conversar direito?", scores: { receptividade: 4, conexao: 5, interesse: 5 } }
    ],
    responses: [
      "Acho que foi o estresse... as pressões externas",
      "Eu... eu gostaria muito de tentar",
      "Acho que seria bom sim... sinto sua falta"
    ],
    delays: [7000, 8000, 8000]
  },
  {
    context: "A conversa está num ponto crucial. Suas próximas palavras são importantes.",
    options: [
      { text: "Quando você gostaria de nos ver?", scores: { receptividade: 4, conexao: 4, interesse: 5 } },
      { text: "Eu também estava morrendo de saudade", scores: { receptividade: 5, conexao: 4, interesse: 5 } },
      { text: "Vamos com calma, mas quero muito te ver", scores: { receptividade: 4, conexao: 5, interesse: 4 } }
    ],
    responses: [
      "Que tal no fim de semana? Podemos ir naquele lugar que gostávamos",
      "Que bom saber disso... estava com medo de estar sozinho nessa",
      "Eu também quero... vamos ver como as coisas fluem"
    ],
    delays: [6000, 4000, 5500]
  },
  // Bloco 3
  {
    context: "A conversa está num ponto crucial. Suas próximas palavras podem definir tudo.",
    options: [
      { text: "Então... o que fazemos agora?", scores: { receptividade: 4, conexao: 4, interesse: 4 } },
      { text: "Não quero pressionar, mas sinto que ainda temos algo", scores: { receptividade: 5, conexao: 5, interesse: 5 } },
      { text: "Você toparia tentar de novo, mas de forma diferente?", scores: { receptividade: 5, conexao: 5, interesse: 6 } }
    ],
    responses: [
      "Acho que devemos nos encontrar e conversar com calma",
      "Eu também sinto isso... ainda há algo forte entre nós",
      "Eu toparia sim... se você também quiser tentar fazer dar certo"
    ],
    delays: [8000, 7000, 10000]
  },
  {
    context: "O momento decisivo chegou. Como você responde?",
    options: [
      { text: "Eu quero muito tentar... você é importante demais pra mim", scores: { receptividade: 6, conexao: 6, interesse: 6 } },
      { text: "Vamos marcar esse encontro então?", scores: { receptividade: 5, conexao: 5, interesse: 5 } },
      { text: "Que tal começarmos como amigos e ver no que dá?", scores: { receptividade: 4, conexao: 4, interesse: 4 } }
    ],
    responses: [
      "Você também é muito importante pra mim... eu te amo ainda",
      "Sim! Estou ansiosa para nos vermos",
      "Acho uma boa ideia... sem pressão"
    ],
    delays: [6000, 4000, 5000]
  },
  {
    context: "Este é o momento final da conversa. Escolha suas últimas palavras.",
    options: [
      { text: "Eu também te amo... nunca parei de amar", scores: { receptividade: 6, conexao: 6, interesse: 6 } },
      { text: "Então vamos fazer isso funcionar dessa vez", scores: { receptividade: 5, conexao: 6, interesse: 5 } },
      { text: "Que tal começarmos com aquele encontro?", scores: { receptividade: 5, conexao: 5, interesse: 5 } }
    ],
    responses: [
      "Então vamos tentar de novo... mas fazendo diferente",
      "Sim, vamos fazer dar certo dessa vez",
      "Perfeito! Mal posso esperar para te ver"
    ],
    delays: [5000, 4000, 3000]
  }
]

export default function ChatSimulator() {
  const [currentInteraction, setCurrentInteraction] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])
  const [scores, setScores] = useState<ScoreState>({ receptividade: 0, conexao: 0, interesse: 0 })
  const [isTyping, setIsTyping] = useState(false)
  const [showOptions, setShowOptions] = useState(true)
  const [showBonus, setShowBonus] = useState<number | null>(null)
  const [showDiagnostic, setShowDiagnostic] = useState(false)
  const [showOffer, setShowOffer] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleOptionSelect = async (optionIndex: number) => {
    const interaction = interactions[currentInteraction]
    const selectedOption = interaction.options[optionIndex]
    
    // Add user message
    const userMessage: Message = {
      id: messages.length,
      text: selectedOption.text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    setMessages(prev => [...prev, userMessage])
    setShowOptions(false)
    setIsTyping(true)

    // Update scores
    setScores(prev => ({
      receptividade: prev.receptividade + selectedOption.scores.receptividade,
      conexao: prev.conexao + selectedOption.scores.conexao,
      interesse: prev.interesse + selectedOption.scores.interesse
    }))

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, interaction.delays[optionIndex]))
    
    setIsTyping(false)

    // Add ex response
    const exMessage: Message = {
      id: messages.length + 1,
      text: interaction.responses[optionIndex],
      sender: 'ex',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    setMessages(prev => [...prev, exMessage])

    // Wait for reading pause - REDUZIDO
    const readingPause = Math.min(2000 + (currentInteraction * 400), 6000)
    await new Promise(resolve => setTimeout(resolve, readingPause))

    // Check for bonus popups
    if (currentInteraction === 2 || currentInteraction === 5 || currentInteraction === 8) {
      const bonusNumber = currentInteraction === 2 ? 1 : currentInteraction === 5 ? 2 : 3
      setShowBonus(bonusNumber)
      return
    }

    // Move to next interaction or finish
    if (currentInteraction < interactions.length - 1) {
      setCurrentInteraction(prev => prev + 1)
      setShowOptions(true)
    } else {
      // Show diagnostic
      setTimeout(() => setShowDiagnostic(true), 2000)
    }
  }

  const handleBonusContinue = () => {
    setShowBonus(null)
    
    if (currentInteraction < interactions.length - 1) {
      setCurrentInteraction(prev => prev + 1)
      setShowOptions(true)
    } else {
      setTimeout(() => setShowDiagnostic(true), 1000)
    }
  }

  const handleDiagnosticContinue = () => {
    setShowDiagnostic(false)
    setShowOffer(true)
  }

  if (showOffer) {
    return <FinalOffer scores={scores} />
  }

  if (showDiagnostic) {
    return <DiagnosticResult scores={scores} onContinue={handleDiagnosticContinue} />
  }

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      {/* Phone Container */}
      <div className="relative w-full max-w-sm mx-auto">
        {/* Phone Frame */}
        <div className="bg-black rounded-[3rem] p-2 shadow-2xl">
          <div className="bg-white rounded-[2.5rem] overflow-hidden h-[850px] relative flex flex-col">
            
            {/* Status Bar */}
            <div className="bg-gray-900 text-white text-xs px-6 py-2 flex justify-between items-center flex-shrink-0">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-2 border border-white rounded-sm">
                  <div className="w-3 h-1 bg-white rounded-sm"></div>
                </div>
                <span>100%</span>
              </div>
            </div>

            {/* WhatsApp Header */}
            <div className="bg-green-600 text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <button className="text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-lg">💕</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">Seu Ex</div>
                  <div className="text-xs text-green-200">online</div>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>
                <button className="text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Score Indicators - Subtle */}
            <div className="bg-green-500 px-4 py-2 flex justify-center gap-4 flex-shrink-0">
              <div className="flex items-center gap-1 text-white text-xs">
                <span>💖</span>
                <span>{scores.receptividade}</span>
              </div>
              <div className="flex items-center gap-1 text-white text-xs">
                <span>⚡</span>
                <span>{scores.conexao}</span>
              </div>
              <div className="flex items-center gap-1 text-white text-xs">
                <span>🔥</span>
                <span>{scores.interesse}</span>
              </div>
            </div>

            {/* Chat Background - Now with guaranteed minimum height */}
            <div 
              className="bg-green-50 relative overflow-hidden flex-shrink-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23dcf8c6' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                height: showOptions ? '400px' : '500px'
              }}
            >
              {/* Messages Container with Auto Scroll */}
              <div 
                ref={messagesEndRef}
                className="h-full overflow-y-auto px-4 py-4 space-y-3"
                style={{ scrollBehavior: 'smooth' }}
              >
                {messages.slice(-6).map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                  >
                    <div
                      className={`max-w-[280px] px-3 py-2 rounded-lg shadow-sm ${
                        message.sender === 'user'
                          ? 'bg-green-500 text-white rounded-br-none'
                          : 'bg-white text-gray-900 rounded-bl-none border'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <div className={`flex items-center justify-end gap-1 mt-1 ${
                        message.sender === 'user' ? 'text-green-100' : 'text-gray-400'
                      }`}>
                        <span className="text-xs">{message.timestamp}</span>
                        {message.sender === 'user' && (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start animate-fadeIn">
                    <div className="bg-white text-gray-900 rounded-lg rounded-bl-none px-4 py-3 shadow-sm border">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Spacer to ensure messages don't get hidden behind options */}
                {showOptions && <div className="h-4"></div>}
              </div>
            </div>

            {/* Clear separator between chat and options */}
            {showOptions && (
              <div className="h-1 bg-gradient-to-b from-green-50 to-gray-100 flex-shrink-0"></div>
            )}

            {/* Options Area - Now clearly separated */}
            {showOptions && currentInteraction < interactions.length && (
              <div className="bg-gray-50 border-t-2 border-gray-200 p-4 flex-shrink-0" style={{ minHeight: '220px' }}>
                <div className="mb-3">
                  <p className="text-sm text-gray-700 text-center leading-relaxed font-medium bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                    {interactions[currentInteraction].context}
                  </p>
                </div>
                <div className="space-y-3">
                  {interactions[currentInteraction].options.map((option, index) => (
                    <button
                      key={index}
                      className="w-full text-left bg-white hover:bg-blue-50 active:bg-blue-100 border border-gray-300 hover:border-blue-300 rounded-xl px-4 py-3 text-sm transition-all duration-200 shadow-sm hover:shadow-md"
                      onClick={() => handleOptionSelect(index)}
                    >
                      <span className="leading-relaxed text-gray-800">{option.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Área de entrada do WhatsApp (quando não há opções) */}
            {!showOptions && !isTyping && currentInteraction < interactions.length && (
              <div className="bg-gray-100 px-4 py-3 flex items-center gap-3 flex-shrink-0">
                <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center gap-3">
                  {/* Botão de menu */}
                  <button 
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Mais opções"
                  >
                    <svg 
                      className="w-5 h-5" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm3-1a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </button>
                  
                  {/* Texto de aguardando resposta */}
                  <span className="text-gray-400 text-sm flex-1">
                    Aguardando resposta...
                  </span>
                  
                  {/* Botão de anexo */}
                  <button 
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Anexar arquivo"
                  >
                    <svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" 
                      />
                    </svg>
                  </button>
                </div>
                
                {/* Botão de enviar */}
                <button 
                  className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 transition-colors"
                  aria-label="Enviar mensagem"
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" 
                    />
                  </svg>
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Bonus Popup */}
      {showBonus && (
        <BonusPopup bonusNumber={showBonus} onContinue={handleBonusContinue} />
      )}
    </div>
  )
}
