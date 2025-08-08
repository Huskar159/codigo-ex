"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ChatSimulator from "@/components/chat-simulator"

export default function HomePage() {
  const [showSimulator, setShowSimulator] = useState(false)

  if (showSimulator) {
    return <ChatSimulator />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Acabou de Terminar?
            <br />
            <span className="text-blue-600">Descubra se Seu Ex Ainda Tem Interesse</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Simule uma conversa real e veja as reações
          </p>

          <Button 
            onClick={() => setShowSimulator(true)}
            className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            INICIAR SIMULAÇÃO AGORA
          </Button>
        </div>

        {/* Features Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
          <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-4">💖</div>
              <h3 className="font-semibold text-gray-900 mb-2">Análise de Receptividade</h3>
              <p className="text-gray-600 text-sm">Descubra o nível de abertura emocional</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-2">Medidor de Conexão</h3>
              <p className="text-gray-600 text-sm">Avalie a força do vínculo emocional</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-4">🔥</div>
              <h3 className="font-semibold text-gray-900 mb-2">Detector de Interesse</h3>
              <p className="text-gray-600 text-sm">Identifique sinais de interesse romântico</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
