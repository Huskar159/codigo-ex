"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface DiagnosticResultProps {
  scores: {
    receptividade: number
    conexao: number
    interesse: number
  }
  onContinue: () => void
}

export default function DiagnosticResult({ scores, onContinue }: DiagnosticResultProps) {
  const totalScore = scores.receptividade + scores.conexao + scores.interesse
  
  const getResult = () => {
    if (totalScore >= 35) {
      return {
        level: "EXCEPCIONAL",
        probability: 91,
        color: "green",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        emoji: "🎉",
        signals: [
          "Respondeu rapidamente às suas mensagens",
          "Admitiu sentir saudade e ter sentimentos",
          "Mostrou vulnerabilidade emocional",
          "Demonstrou interesse em reencontro",
          "Disse 'eu te amo' ou equivalente"
        ],
        analysis: "Esta pessoa claramente não superou o relacionamento. As reações indicam interesse genuíno e real possibilidade de reconquista com a estratégia certa."
      }
    } else if (totalScore >= 20) {
      return {
        level: "PROMISSOR",
        probability: 67,
        color: "yellow",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        emoji: "🤔",
        signals: [
          "Manteve a conversa mas com hesitação",
          "Mostrou interesse mas com reservas",
          "Admitiu alguns sentimentos",
          "Precisa de mais tempo para decidir"
        ],
        analysis: "Esta pessoa tem interesse mas está se protegendo. Com paciência e estratégia correta, há chances reais."
      }
    } else {
      return {
        level: "DESAFIADOR",
        probability: 34,
        color: "orange",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        emoji: "😔",
        signals: [
          "Respostas curtas e formais",
          "Evitou tópicos emocionais",
          "Não demonstrou vulnerabilidade",
          "Manteve distância emocional"
        ],
        analysis: "Esta pessoa está tentando seguir em frente ou se protegendo muito. Precisaria de abordagem especial."
      }
    }
  }

  const result = getResult()

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card className={`${result.bgColor} ${result.borderColor} border-2 mb-6`}>
          <CardHeader className="text-center">
            <div className="text-4xl mb-2">{result.emoji}</div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              RESULTADO {result.level}!
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                📈 PROBABILIDADE DE RECONQUISTA: {result.probability}%
              </div>
              <Progress value={result.probability} className="w-full h-3" />
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                {result.level === "EXCEPCIONAL" ? "✅" : result.level === "PROMISSOR" ? "⚠️" : "❌"} 
                SINAIS {result.level === "EXCEPCIONAL" ? "IDENTIFICADOS" : result.level === "PROMISSOR" ? "MISTOS DETECTADOS" : "DE RESISTÊNCIA"}:
              </h3>
              <ul className="space-y-2">
                {result.signals.map((signal, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-700">{signal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                📍 ANÁLISE COMPORTAMENTAL:
              </h3>
              <p className="text-gray-700 leading-relaxed">{result.analysis}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">{scores.receptividade}</div>
                <div className="text-xs text-gray-600">💖 Receptividade</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{scores.conexao}</div>
                <div className="text-xs text-gray-600">⚡ Conexão</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{scores.interesse}</div>
                <div className="text-xs text-gray-600">🔥 Interesse</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-100 border-gray-200">
          <CardContent className="p-6 text-center">
            <h3 className="font-bold text-gray-900 mb-4">
              💭 AGORA VOCÊ SABE COMO SEU EX REAGIRIA...
            </h3>
            <p className="text-gray-700 mb-6">
              Mas isso foi apenas uma simulação baseada em padrões comportamentais gerais.
              <br /><br />
              E se eu te dissesse que existe uma forma de descobrir EXATAMENTE o que essa pessoa específica está sentindo por você AGORA?
            </p>
            
            <Button 
              onClick={onContinue}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold"
            >
              DESCOBRIR MÉTODO CIENTÍFICO
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
