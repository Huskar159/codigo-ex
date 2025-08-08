"use client"

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Clock, Users, Star } from 'lucide-react'

interface FinalOfferProps {
  scores: {
    receptividade: number
    conexao: number
    interesse: number
  }
}

export default function FinalOffer({ scores }: FinalOfferProps) {
  useEffect(() => {
    const handlePurchaseClick = () => {
      // Track Facebook Pixel event
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'InitiateCheckout', {
          value: 10.00,
          currency: 'BRL'
        });
      }
      
      // Redirect to payment link
      window.open('https://o-codigo-do-ex.pay.yampi.com.br/r/6TQA6MD9JW', '_blank');
    };

    // Adiciona o event listener ao botão
    const button = document.getElementById('purchase-button');
    if (button) {
      button.addEventListener('click', handlePurchaseClick);
    }

    // Limpa o event listener quando o componente for desmontado
    return () => {
      if (button) {
        button.removeEventListener('click', handlePurchaseClick);
      }
    };
  }, []); // O array vazio garante que o efeito só é executado uma vez

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        
        {/* Header com Resultado */}
        <Card className="bg-white border-2 border-blue-200 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="mb-4">
              <Badge className="bg-green-500 text-white px-4 py-2 text-lg font-bold">
                ✅ SIMULAÇÃO CONCLUÍDA
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Agora Descubra a <span className="text-blue-600">VERDADE REAL</span> Sobre Seu Ex
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Você acabou de ver uma simulação. Mas e se pudesse descobrir EXATAMENTE o que seu ex está sentindo por você AGORA, baseado no comportamento real dele?
            </p>
          </CardContent>
        </Card>

        {/* Método Científico */}
        <Card className="bg-gradient-to-r from-purple-100 to-blue-100 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="text-4xl mb-4">🧠</div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              MÉTODO CIENTÍFICO DE ANÁLISE COMPORTAMENTAL
            </h2>
            <p className="text-xl mb-4 text-gray-900">
              Descubra com <span className="font-bold text-yellow-500">94% de precisão</span> se seu ex ainda tem interesse romântico
            </p>
            <p className="text-lg text-gray-800">
              Baseado no comportamento real nas redes sociais, mensagens e atitudes do dia a dia
            </p>
          </CardContent>
        </Card>

        {/* O que você vai receber */}
        <Card className="bg-white shadow-xl border-2 border-green-200">
          <CardHeader className="bg-green-50 text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">
              🎁 O QUE VOCÊ VAI RECEBER HOJE
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Módulo 1 */}
              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-500 text-white rounded-full p-2 mr-3">
                    <span className="text-xl">📱</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">ANALISADOR DIGITAL COMPLETO</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Como interpretar cada ação nas redes sociais</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Significado real de curtidas, visualizações e comentários</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">15 padrões de comportamento que revelam interesse</span>
                  </li>
                </ul>
              </div>

              {/* Módulo 2 */}
              <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-500 text-white rounded-full p-2 mr-3">
                    <span className="text-xl">💬</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">BANCO DE 55 SCRIPTS TESTADOS</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Mensagens prontas para diferentes cenários</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Respostas inteligentes para cada tipo de reação</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Como reiniciar conversa após silêncio</span>
                  </li>
                </ul>
              </div>

              {/* Módulo 3 */}
              <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-500 text-white rounded-full p-2 mr-3">
                    <span className="text-xl">📅</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">CRONOGRAMA DE 30 DIAS</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Estratégia dia-a-dia personalizada</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Quando agir e quando recuar (timing perfeito)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Marcos e sinais de progresso para acompanhar</span>
                  </li>
                </ul>
              </div>

              {/* Bônus */}
              <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-500 text-white rounded-full p-2 mr-3">
                    <span className="text-xl">🎁</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">BÔNUS EXCLUSIVOS</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Guia de linguagem corporal no reencontro</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">25 tópicos de conversa que geram conexão</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Checklist de sinais de interesse real</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prova Social */}
        <Card className="bg-gradient-to-r from-green-100 to-emerald-100 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900">RESULTADOS COMPROVADOS</h3>
              <p className="text-xl mb-6 text-gray-800">Mais de 3.247 pessoas já transformaram suas situações:</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center bg-white/80 rounded-xl p-6 backdrop-blur-sm border border-gray-200">
                <div className="text-4xl font-bold text-yellow-300 mb-2">87%</div>
                <div className="text-lg text-gray-800">Conseguiram clareza total sobre a situação</div>
              </div>
              <div className="text-center bg-white/80 rounded-xl p-6 backdrop-blur-sm border border-gray-200">
                <div className="text-4xl font-bold text-yellow-300 mb-2">64%</div>
                <div className="text-lg text-gray-800">Reataram ou iniciaram algo novo</div>
              </div>
              <div className="text-center bg-white/80 rounded-xl p-6 backdrop-blur-sm border border-gray-200">
                <div className="text-4xl font-bold text-yellow-300 mb-2">31%</div>
                <div className="text-lg text-gray-800">Descobriram que era melhor seguir em frente</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção de Urgência */}
        <Card className="bg-red-50 border-2 border-red-200 shadow-xl">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-red-500 mr-2" />
              <h3 className="text-2xl font-bold text-red-700">
                OFERTA POR TEMPO LIMITADO
              </h3>
            </div>
            <p className="text-lg text-gray-700">
              Esta oferta especial é válida apenas para quem completou a simulação.
              <br />
              <span className="font-bold text-red-600">
                Não perca esta oportunidade única!
              </span>
            </p>
          </CardContent>
        </Card>

        {/* Seção de Preço e CTA */}
        <Card className="bg-white shadow-2xl border-4 border-green-400">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="text-lg text-gray-600 mb-2">
                Valor normal do método completo:
              </div>
              <div className="text-2xl text-gray-500 line-through mb-2">
                R$ 297,00
              </div>
              <div className="text-sm text-gray-600 mb-4">
                Oferta especial para quem completou a simulação:
              </div>
              
              <div className="bg-green-100 rounded-2xl p-6 mb-6 border-2 border-green-300">
                <div className="text-5xl font-bold text-green-600 mb-2">
                  R$ 10,00
                </div>
                <Badge className="bg-red-500 text-white text-lg px-4 py-2">
                  DESCONTO DE 97%
                </Badge>
              </div>
            </div>

            <Button 
              id="purchase-button"
              size="lg"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 
                         hover:from-green-600 hover:to-green-700 text-white text-2xl 
                         px-12 py-6 rounded-2xl font-bold shadow-2xl hover:shadow-3xl 
                         transform hover:scale-105 transition-all duration-300 mb-6"
            >
              🚀 QUERO DESCOBRIR A VERDADE - R$ 10,00
            </Button>

            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-500 mr-2" />
                <span>Pagamento 100% Seguro</span>
              </div>
              <div className="flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-500 mr-2" />
                <span>Acesso Imediato</span>
              </div>
              <div className="flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-500 mr-2" />
                <span>Suporte Especializado</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção de Garantia */}
        <Card className="bg-blue-50 border-2 border-blue-200 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-12 h-12 text-blue-500 mr-3" />
              <h3 className="text-2xl font-bold text-blue-700">
                GARANTIA INCONDICIONAL DE 7 DIAS
              </h3>
            </div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Se você não tiver <span className="font-bold">clareza absoluta</span> sobre os 
              sentimentos do seu ex em 7 dias, devolvemos{' '}
              <span className="font-bold text-green-600">
                100% do seu investimento
              </span>.
              <br />
              Sem perguntas, sem complicações.
            </p>
          </CardContent>
        </Card>

        {/* Seção de Resultado da Simulação */}
        <Card className="bg-gray-50 border-2 border-gray-200 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-gray-900">
              📊 SEU RESULTADO NA SIMULAÇÃO
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              {/* Card de Receptividade */}
              <div className="bg-pink-100 rounded-xl p-4 border-2 border-pink-200">
                <div className="text-3xl font-bold text-pink-600">
                  {scores.receptividade}/15
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  💖 Receptividade
                </div>
              </div>
              
              {/* Card de Conexão */}
              <div className="bg-purple-100 rounded-xl p-4 border-2 border-purple-200">
                <div className="text-3xl font-bold text-purple-600">
                  {scores.conexao}/15
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  ⚡ Conexão
                </div>
              </div>
              
              {/* Card de Interesse */}
              <div className="bg-orange-100 rounded-xl p-4 border-2 border-orange-200">
                <div className="text-3xl font-bold text-orange-600">
                  {scores.interesse}/15
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  🔥 Interesse
                </div>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-gray-700">
                <span className="font-bold">
                  Agora descubra o que esses números significam na vida real
                </span>
                <br />
                e como usar essas informações a seu favor!
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
