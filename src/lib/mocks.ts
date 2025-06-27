export const conversationMocks = [
  {
    "message": "Oi! Eu sou Sofia, consultora digital da Dolado. 😊 Sei que falar sobre vendas online pode parecer complicado, mas prometo que vamos tornar isso bem simples. Em 5 minutos, vou te mostrar exatamente como sua empresa pode crescer nos marketplaces. Pode ser?",
    "type": "welcome",
    "options": ["Claro, vamos lá!", "Primeiro quero entender melhor"],
    "personality": "Consultiva, acolhedora, confiante mas não pressiona"
  },
  {
    "message": "Perfeito! Deixa eu te conhecer melhor. Conta aí, que tipo de operação vocês têm? Quero entender a complexidade do negócio para dar as orientações mais assertivas.",
    "type": "qualification",
    "options": ["Somos indústria/fabricantes", "Distribuidores atacadistas", "Operação mista (fabricamos e distribuímos)", "Grupo empresarial"],
    "followUp": {
      "message": "Que legal! E em termos de estrutura, vocês são uma operação de que porte?",
      "options": ["Média empresa (R$ 10-50mi/ano)", "Grande empresa (R$ 50-200mi/ano)", "Corporação (R$ 200mi+/ano)", "Grupo/Holding"],
      "tone": "Entende que está falando com tomadores de decisão sérios, com operações complexas"
    }
  },
  {
    "message": "Entendi perfeitamente o perfil! Agora, uma pergunta estratégica: como vocês enxergam os marketplaces? Sei que muitas indústrias têm receios sobre canibalizarização dos canais tradicionais.",
    "type": "marketplace",
    "options": ["Vemos como oportunidade adicional", "Temos receio de conflito com distribuidores", "Ainda estamos avaliando", "Concorrentes já estão lá, precisamos reagir"],
    "followUp": {
      "message": "Faz sentido! E se fossem testar, qual canal seria mais estratégico para o porte de vocês?",
      "options": ["Mercado Livre (maior alcance)", "Amazon (perfil mais premium)", "Shopee (crescimento rápido)", "B2B marketplaces", "Marketplace próprio"],
      "insight": "Mostra que entende estratégias de canal para grandes empresas"
    }
  },
  {
    "message": "Perfeito! Agora vamos falar do portfólio. Com o volume que vocês devem ter, imagino que seja um catálogo robusto. Quantas SKUs vocês gerenciam?",
    "type": "products",
    "options": ["Catálogo focado (até 500 SKUs)", "Portfólio amplo (500-2000 SKUs)", "Mega catálogo (2000+ SKUs)", "Multiple categorias/divisões"],
    "followUp": {
      "message": "E me conta, qual segmento representa o core do negócio de vocês?",
      "options": ["Bens de consumo duráveis", "Componentes/Insumos industriais", "Produtos de marca própria", "Linha completa multi-categoria", "B2B especializado"],
      "tone": "Reconhece a complexidade de grandes operações e múltiplas linhas"
    }
  },
  {
    "message": "Seus produtos têm potencial gigantesco online! Agora, para entender melhor a maturidade operacional: como vocês gerenciam a operação hoje? ERP, WMS, integração?",
    "type": "diagnosis",
    "options": ["ERP robusto (SAP, Oracle, etc)", "Sistema próprio bem estruturado", "Mix de sistemas integrados", "Operação ainda manual em partes"],
    "followUp": {
      "message": "E em termos de marketing/branding digital, como vocês se posicionam no mercado?",
      "options": ["Marca consolidada offline, zero digital", "Presença básica (site institucional)", "Marketing B2B estruturado", "Estratégia digital em desenvolvimento", "Focamos só no relacionamento direto"],
      "tone": "Entende que grandes empresas têm operações complexas e decisões estruturadas"
    }
  },
  {
    "message": "Roberto, conversando com você fica claro uma coisa: vocês estão numa posição PRIVILEGIADA. Têm produto consolidado, operação estruturada, marca respeitada - só falta usar isso no digital. Empresas do porte de vocês que entraram nos marketplaces cresceram 40-60% sem canibalizarizar os canais tradicionais.",
    "type": "result",
    "diagnosis": {
      "stage": "Gigante Adormecido Digital",
      "potential": "Potencial de R$ 10-30mi adicionais em 18 meses via marketplaces",
      "specificInsights": "Indústrias com faturamento similar à de vocês criaram novos canais de receita representando 15-25% do faturamento total",
      "recommendations": [
        "Estratégia de canal complementar (não concorrente)",
        "Pricing diferenciado para não conflitar com distribuidores",
        "Teste controlado em marketplace premium primeiro",
        "Estrutura dedicada para e-commerce (não impacta operação atual)"
      ]
    },
    "nextSteps": {
      "message": "Que tal uma conversa estratégica com nosso especialista em grandes contas? Ele já ajudou indústrias similares a criar canais digitais de R$ 20-50mi sem nenhum conflito. Posso agendar?",
      "options": ["Sim, quero conversa estratégica", "Manda um case similar primeiro"],
      "urgency": "Seus concorrentes já estão se movimentando - quem sair na frente vai dominar o digital no seu segmento"
    }
  }
];

export type MessageMock = typeof conversationMocks[number];
