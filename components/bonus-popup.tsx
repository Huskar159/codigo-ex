"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BonusPopupProps {
  bonusNumber: number
  onContinue: () => void
}

const bonusContent = {
  1: {
    title: "DECIFRANDO SINAIS DE INTERESSE",
    items: [
      "12 sinais claros de que ainda há interesse",
      "Como interpretar pausas e delays nas respostas",
      "O que significa cada tipo de reação",
      "Quando insistir e quando dar espaço"
    ],
    value: "R$ 67"
  },
  2: {
    title: "ESTRATÉGIAS DE RECONEXÃO",
    items: [
      "15 técnicas de comunicação emocional",
      "Como criar nostalgia positiva nas conversas",
      "Scripts testados para diferentes personalidades",
      "O timing certo para cada tipo de abordagem",
      "Como evitar os erros que afastam definitivamente"
    ],
    value: "R$ 97"
  },
  3: {
    title: "GUIA COMPLETO DE REENCONTRO",
    items: [
      "Como se preparar para o primeiro encontro pós-término",
      "25 tópicos de conversa que fortalecem a reconexão",
      "Linguagem corporal que desperta interesse romântico",
      "Como terminar o encontro deixando ele(a) querendo mais",
      "Estratégias para o período pós-reencontro"
    ],
    value: "R$ 127"
  }
}

export default function BonusPopup({ bonusNumber, onContinue }: BonusPopupProps) {
  const bonus = bonusContent[bonusNumber as keyof typeof bonusContent]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <Card className="max-w-md w-full bg-white rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-center py-6">
          <div className="text-4xl mb-2">🎉</div>
          <CardTitle className="text-white text-xl font-bold">
            PARABÉNS! VOCÊ DESBLOQUEOU SEU {bonusNumber === 1 ? 'PRIMEIRO' : bonusNumber === 2 ? 'SEGUNDO' : 'ÚLTIMO'} BÔNUS!
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">🎁</div>
            <h3 className="font-bold text-lg text-gray-900 mb-4">
              BÔNUS {bonusNumber}: "{bonus.title}"
            </h3>
          </div>

          <div className="space-y-2 mb-6">
            <p className="font-semibold text-gray-900 mb-2">Você acabou de desbloquear:</p>
            {bonus.items.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✅</span>
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center mb-6">
            <p className="text-lg">
              <span className="font-bold">Valor: {bonus.value}</span>
              <span className="text-green-600 font-bold ml-2">- GRÁTIS PARA VOCÊ</span>
            </p>
          </div>

          <Button 
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-full font-semibold"
          >
            {bonusNumber === 3 ? 'VER MEU DIAGNÓSTICO COMPLETO' : 'CONTINUAR CONVERSA'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
