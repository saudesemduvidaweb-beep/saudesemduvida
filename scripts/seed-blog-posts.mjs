// Script pra popular o blog do Sanity com o calendario editorial dos
// proximos 12 meses (3 posts/semana, seg/qua/sex).
//
// Como rodar (na raiz do projeto, com .env.local configurado):
//   node --env-file=.env.local scripts/seed-blog-posts.mjs
//
// Precisa de SANITY_API_WRITE_TOKEN no .env.local (token com permissao
// "Editor", gerado em sanity.io/manage -> seu projeto -> API -> Tokens).
// NUNCA commitar esse token no git.
//
// O script e idempotente: roda de novo sem duplicar (usa _id fixo por
// post e por categoria, com createOrReplace).

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("Falta NEXT_PUBLIC_SANITY_PROJECT_ID no .env.local");
  process.exit(1);
}
if (!token) {
  console.error(
    "Falta SANITY_API_WRITE_TOKEN no .env.local. Gera um token com permissao 'Editor' em sanity.io/manage -> seu projeto -> API -> Tokens."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-11-01",
  token,
  useCdn: false,
});

const categories = {
  individual: "Individual",
  familiar: "Familiar",
  empresarial: "Empresarial (PME)",
  mei: "MEI",
  comparativo: "Comparativo de Operadoras",
  portabilidade: "Carência e Portabilidade",
  custos: "Custos e Reajuste",
  guia: "Guia de Contratação",
};

// Fecho padrao adicionado no fim de todo post - CTA + aviso de compliance.
const CLOSING = `## Quer saber o valor exato pro seu caso?

Tudo que voce leu aqui e informativo, pra te ajudar a entender melhor antes de decidir. O valor final, a rede credenciada disponivel na sua cidade e as condicoes de aprovacao só sao confirmados numa cotação real.

[Peça uma cotação gratuita](/cotacao) com a nossa corretora parceira, registrada na ANS. O Saúde Sem Dúvida não vende plano nem garante preço ou aprovação — quem fecha a contratação é a corretora.`;

const posts = [
  {
    slug: "quanto-custa-plano-saude-individual-2026",
    title: "Quanto custa um plano de saúde individual em 2026",
    category: "individual",
    excerpt:
      "O que realmente influencia o preço de um plano individual e por que duas pessoas na mesma cidade pagam valores diferentes.",
    body: `Não existe uma tabela única de preço pra plano de saúde individual — o valor muda conforme idade, cidade, tipo de acomodação (enfermaria ou apartamento) e a abrangência da rede credenciada escolhida.

## O que mais pesa no preço

A idade é o fator com mais peso: a ANS organiza os planos em 10 faixas etárias, e cada faixa pode custar mais que a anterior. Depois vem a cidade — capitais com rede hospitalar mais concorrida tendem a ter mensalidades diferentes de cidades menores. Por fim, o tipo de acomodação (enfermaria costuma sair mais barato que apartamento) e se o plano tem ou não coparticipação.

## Por que duas pessoas pagam valores diferentes

Duas pessoas da mesma idade, na mesma cidade, podem pagar valores diferentes se escolheram operadoras ou tipos de rede diferentes. Um plano com rede mais ampla (mais hospitais e laboratórios credenciados) tende a custar mais que um plano com rede reduzida da mesma operadora.

## Vale a pena começar pelo simulador

Antes de pedir uma cotação, você pode usar o nosso [simulador de faixa de preço](/ferramentas/simulador) pra ter uma noção de ordem de grandeza — é uma estimativa ilustrativa, não um valor fechado.

${CLOSING}`,
  },
  {
    slug: "melhor-plano-saude-mei",
    title: "Como escolher o melhor plano de saúde para MEI",
    category: "mei",
    excerpt:
      "MEI tem acesso a planos no formato empresarial, geralmente mais baratos que o individual. Veja o que checar antes de escolher.",
    body: `Quem é MEI (Microempreendedor Individual) com CNPJ ativo consegue contratar planos no formato empresarial/PME — que costumam ser mais em conta que o plano individual equivalente, já que são negociados como benefício empresarial.

## O que checar antes de decidir

Primeiro, confirma se a operadora aceita CNPJ com um único titular (nem todas aceitam, e as que aceitam podem pedir tempo mínimo de abertura do CNPJ). Segundo, compara a rede credenciada disponível na sua cidade — de nada adianta um plano barato se os hospitais mais próximos não são credenciados. Terceiro, entenda a regra de reajuste: planos empresariais seguem percentual negociado com a operadora, diferente do índice ANS usado nos planos individuais.

## Documentos que costumam ser pedidos

Geralmente pedem CNPJ ativo, documento de identidade do titular e comprovante de residência. Alguns casos pedem também o cartão CNPJ atualizado (emitido há poucos meses).

## MEI x individual: qual compensa mais

Não dá pra generalizar — depende da idade, cidade e do que cada operadora está oferecendo no momento. O jeito mais confiável de comparar é pedir cotação dos dois formatos e ver o que sai melhor pro seu caso.

${CLOSING}`,
  },
  {
    slug: "plano-saude-empresarial-pequenas-empresas",
    title: "Plano de saúde empresarial: guia para pequenas empresas",
    category: "empresarial",
    excerpt:
      "Como funciona a contratação de plano de saúde por uma pequena empresa, do número mínimo de vidas aos documentos exigidos.",
    body: `Oferecer plano de saúde é um dos benefícios mais valorizados por funcionários — e pra pequena empresa, o modelo PME (pequenas e médias empresas) costuma ter mensalidade mais competitiva que planos individuais equivalentes.

## Como funciona a contratação

A empresa (CNPJ) contrata o plano pra cobrir os funcionários e, dependendo da operadora, os dependentes deles também. O contrato é assinado pela pessoa jurídica, não pela pessoa física.

## Número mínimo de vidas

Cada operadora define sua própria regra de número mínimo de vidas (funcionários) pra fechar um plano empresarial — pode variar bastante entre operadoras. Empresas muito pequenas às vezes se enquadram melhor num plano coletivo por adesão, dependendo do caso.

## Documentos geralmente exigidos

Contrato social ou requerimento de empresário, CNPJ ativo, relação nominal dos funcionários a incluir e, em alguns casos, comprovação de vínculo empregatício (como guia do FGTS ou folha de pagamento).

## Reajuste é diferente do plano individual

No plano empresarial, o reajuste anual é negociado diretamente com a operadora — não segue o índice máximo que a ANS define pra planos individuais e familiares.

${CLOSING}`,
  },
  {
    slug: "portabilidade-carencias-como-funciona",
    title: "Portabilidade de carências: como trocar de plano sem perder direitos",
    category: "portabilidade",
    excerpt:
      "Quem já tem plano de saúde há tempo pode ter direito a trocar de operadora sem cumprir carência de novo. Entenda a lógica.",
    body: `Se você já tem plano de saúde e está insatisfeito — seja pelo preço, pela rede credenciada ou pelo atendimento — a portabilidade de carências permite trocar de operadora sem ter que cumprir os prazos de carência de novo, dentro de certas condições.

## O que costuma ser exigido

De forma geral, a portabilidade considera coisas como: tempo mínimo de permanência no plano atual, estar em dia com os pagamentos, e o plano de destino ser compatível em faixa de preço com o plano de origem (dentro da mesma faixa ou uma equivalente).

## Por que isso importa na hora de trocar

Sem portabilidade, trocar de plano significa começar as carências do zero — inclusive a Cobertura Parcial Temporária (CPT) pra quem tem alguma condição preexistente, que pode levar até 24 meses. Com portabilidade elegível, esse período não precisa ser cumprido de novo.

## As regras exatas mudam com o tempo

As condições de elegibilidade da portabilidade são definidas pela ANS e podem ser ajustadas. O mais seguro é confirmar sua situação específica — tempo no plano atual, faixa de preço, documentação — direto com a corretora antes de decidir trocar.

${CLOSING}`,
  },
  {
    slug: "plano-saude-familiar-valor-faixa-etaria",
    title: "Plano de saúde familiar: como o valor muda por faixa etária",
    category: "familiar",
    excerpt:
      "Num plano familiar, cada dependente é cobrado por uma faixa etária própria. Entenda como isso afeta a mensalidade total.",
    body: `Diferente do que muita gente imagina, o plano de saúde familiar não tem um valor único pra família inteira — cada pessoa incluída (titular e dependentes) é cobrada individualmente, de acordo com a própria faixa etária.

## Como funciona na prática

A ANS organiza os planos em 10 faixas etárias, começando em 0-18 anos até 59+ anos. Cada dependente entra numa dessas faixas conforme a idade dele, e a mensalidade final da família é a soma de cada faixa individual — não uma média.

## Por que a mensalidade sobe com o tempo

Conforme os filhos crescem e passam de faixa etária, e conforme os pais envelhecem, a mensalidade da família tende a subir mesmo sem nenhum reajuste anual acontecer — é só o efeito da mudança de faixa.

## Incluir recém-nascido tem regra própria

Bebês recém-nascidos costumam ter uma janela de inclusão sem cumprir carência (normalmente até 30 dias após o nascimento), desde que um dos pais já seja titular ou dependente do plano — mas o prazo exato deve ser confirmado com a operadora.

${CLOSING}`,
  },
  {
    slug: "amil-ou-bradesco-saude-comparar",
    title: "Amil ou Bradesco Saúde: como comparar antes de contratar",
    category: "comparativo",
    excerpt:
      "Duas das maiores operadoras do país, com perfis diferentes de rede e público. Veja o que olhar antes de decidir.",
    body: `Amil e Bradesco Saúde estão entre as operadoras mais conhecidas do Brasil, mas têm perfis diferentes — vale entender isso antes de bater o olho só no preço.

## Perfil geral de cada uma

A Amil tem ampla presença nas principais capitais e é forte tanto em planos individuais quanto empresariais. A Bradesco Saúde é tradicionalmente mais forte em planos empresariais de médio e grande porte, com uma rede referenciada extensa.

## O que realmente compara

Preço isolado não conta a história toda. O que importa é: a rede credenciada de cada uma cobre os hospitais e laboratórios que você usaria na sua cidade? O tipo de acomodação e a abrangência (nacional ou regional) batem com o que você precisa?

## Como decidir na prática

A forma mais confiável de comparar não é pelo nome da marca, mas pela cotação real: mesma idade, mesma cidade, mesmo tipo de plano, nas duas operadoras. Só assim dá pra ver rede, preço e condições lado a lado de verdade.

${CLOSING}`,
  },
  {
    slug: "sulamerica-ou-unimed-o-que-considerar",
    title: "SulAmérica ou Unimed: o que considerar na escolha",
    category: "comparativo",
    excerpt:
      "SulAmérica tem rede nacional centralizada; a Unimed funciona em cooperativas regionais. Isso muda bastante a experiência.",
    body: `SulAmérica e Unimed são duas das operadoras mais procuradas no Brasil, mas funcionam de um jeito bem diferente por trás — e isso afeta diretamente sua experiência como cliente.

## A diferença estrutural entre as duas

A SulAmérica opera como uma empresa nacional única. Já a Unimed funciona como um sistema de cooperativas médicas regionais — ou seja, "Unimed" não é uma operadora só, e sim várias cooperativas independentes que usam a mesma marca. Isso quer dizer que a cobertura, rede e até qualidade do atendimento podem variar bastante dependendo de qual Unimed regional atende sua cidade.

## Por que isso importa na hora de contratar

Se você viaja com frequência ou mora perto da divisa entre regiões, vale confirmar se o seu plano Unimed tem cobertura nacional ou só na sua área. Com a SulAmérica, a rede tende a ser mais uniforme entre cidades, já que é uma operadora só.

## Como comparar de forma justa

Pede a cotação das duas pra sua cidade específica, com o mesmo tipo de plano e faixa etária, e compara rede credenciada real — não só o nome da operadora.

${CLOSING}`,
  },
  {
    slug: "hapvida-notredame-modelo-verticalizado",
    title: "Hapvida ou NotreDame Intermédica: entenda o modelo verticalizado",
    category: "comparativo",
    excerpt:
      "Essas operadoras usam rede própria (hospitais e clínicas da própria empresa). Veja as implicações desse modelo.",
    body: `Hapvida e NotreDame Intermédica (hoje parte do mesmo grupo) adotam o chamado modelo verticalizado: em vez de credenciar hospitais e clínicas de terceiros, a própria operadora é dona da rede de atendimento.

## O que muda no modelo verticalizado

Como a rede é própria, o atendimento tende a ficar concentrado nos hospitais e clínicas da marca — o que pode significar menos opções de escolha de hospital, mas também custos mais controlados (e mensalidades geralmente mais competitivas).

## Onde esse modelo é mais forte

A Hapvida tem presença histórica forte no Norte e Nordeste, e a NotreDame Intermédica é tradicionalmente forte em São Paulo e outras capitais do Sudeste. Depois da fusão dos grupos, a rede combinada ficou mais ampla, mas ainda vale confirmar a cobertura na sua cidade especificamente.

## Pra quem costuma fazer mais sentido

Se você não tem preferência por um hospital específico e prioriza um custo mais baixo, o modelo verticalizado pode compensar. Se você já tem um hospital de referência que usa há anos, vale confirmar se ele está na rede antes de trocar.

${CLOSING}`,
  },
  {
    slug: "quanto-tempo-plano-saude-comeca-valer",
    title: "Quanto tempo demora para o plano de saúde começar a valer",
    category: "guia",
    excerpt:
      "Entre assinar o contrato e poder usar o plano existe um intervalo. Entenda os prazos envolvidos.",
    body: `Contratar um plano de saúde não significa poder usar no dia seguinte — existe um processo de análise e ativação, além dos prazos de carência específicos de cada tipo de atendimento.

## Etapas até o plano ativar

Depois de enviar a documentação, a operadora analisa e emite a proposta. Uma vez aprovada e o primeiro pagamento processado, o plano é ativado — esse processo costuma levar de alguns dias a poucas semanas, dependendo da operadora e da completude da documentação enviada.

## Ativado não é a mesma coisa que sem carência

Mesmo com o plano ativo, você ainda precisa respeitar os prazos de carência pra cada tipo de atendimento — urgência/emergência libera em até 24 horas, mas consultas, exames e internações em geral podem ter carência de até 180 dias, salvo se você tiver direito a portabilidade.

## Como agilizar o processo

Enviar toda a documentação completa e correta de uma vez (sem pendências) é o que mais acelera a aprovação. Erros comuns que atrasam: documento desatualizado, CNPJ com pendência (no caso de PME/MEI) ou dados divergentes entre os documentos enviados.

${CLOSING}`,
  },
  {
    slug: "documentos-para-contratar-plano-saude",
    title: "Documentos necessários para contratar plano de saúde",
    category: "guia",
    excerpt:
      "Uma lista prática do que separar antes de pedir a contratação, pra evitar atraso na aprovação.",
    body: `Ter os documentos certos em mãos antes de iniciar a contratação é o jeito mais simples de evitar atraso na aprovação do seu plano de saúde.

## Documentos básicos, pra qualquer tipo de plano

RG e CPF do titular, comprovante de residência atualizado (últimos 3 meses, geralmente) e Cartão Nacional de Saúde (CNS), se você tiver.

## Se for incluir dependentes

Documento de identidade de cada dependente, certidão de casamento ou declaração de união estável (se for cônjuge/companheiro) e certidão de nascimento dos filhos.

## Se for plano empresarial ou MEI

Além dos documentos pessoais do titular/responsável, é preciso CNPJ ativo, contrato social (ou requerimento de empresário, no caso de MEI) e a relação de funcionários a incluir, quando aplicável.

## Uma dica prática

Confere se o nome está grafado igual em todos os documentos e se nenhum está vencido — essas pequenas inconsistências são a causa mais comum de atraso na análise.

Pra não esquecer nada, dá uma olhada no nosso [checklist completo de contratação](/ferramentas/checklist).

${CLOSING}`,
  },
  {
    slug: "autonomo-pme-ou-individual",
    title: "Plano de saúde para autônomo: PME ou individual, o que compensa mais",
    category: "mei",
    excerpt:
      "Autônomo com CNPJ pode escolher entre plano PME e individual. Veja os critérios pra decidir qual vale mais a pena.",
    body: `Se você é autônomo e tem CNPJ (como MEI, por exemplo), provavelmente pode escolher entre contratar um plano individual ou um plano no formato PME/empresarial — e a diferença de preço entre os dois pode ser significativa.

## Por que o PME costuma sair mais barato

Planos PME são negociados como benefício corporativo, com uma lógica de precificação diferente da usada nos planos individuais — na prática, isso costuma (mas não sempre) resultar numa mensalidade mais baixa pra faixa etária equivalente.

## O que considerar além do preço

Reajuste: planos individuais seguem o índice máximo definido pela ANS; planos PME seguem percentual negociado com a operadora, que pode variar mais de ano pra ano. Isso é importante pensar no longo prazo, não só no primeiro ano.

## Nem toda operadora aceita CNPJ de um titular só

Algumas operadoras exigem tempo mínimo de abertura do CNPJ ou não aceitam MEI com titular único em certas condições — vale confirmar isso antes de decidir pelo formato PME.

## Como decidir

O caminho mais seguro é pedir cotação dos dois formatos, comparar preço inicial e política de reajuste, e decidir com base no que faz mais sentido pro seu momento.

${CLOSING}`,
  },
  {
    slug: "como-funciona-reajuste-faixa-etaria",
    title: "Como funciona o reajuste do plano de saúde por faixa etária",
    category: "custos",
    excerpt:
      "Existem dois tipos de aumento na mensalidade: o reajuste anual e a mudança de faixa etária. Entenda a diferença.",
    body: `Muita gente confunde dois tipos diferentes de aumento na mensalidade do plano de saúde: o reajuste anual e a mudança de faixa etária. São coisas distintas, e entender a diferença ajuda a planejar o orçamento.

## Reajuste anual

É o aumento aplicado uma vez por ano sobre o valor da mensalidade, independente da idade do beneficiário. Pra planos individuais e familiares, a ANS define um percentual máximo permitido anualmente. Pra planos empresariais, o percentual é negociado diretamente entre a empresa contratante e a operadora.

## Mudança de faixa etária

Além do reajuste anual, existe o aumento que acontece quando você muda de faixa etária (a ANS define 10 faixas, de 0-18 anos até 59+ anos). Esse aumento é pontual — acontece só quando você faz aniversário e entra numa faixa nova, não todo ano.

## Por que a mensalidade parece subir mais que o esperado

Em alguns anos, os dois efeitos se somam: o reajuste anual normal mais a mudança de faixa etária, se você fez aniversário numa data de corte de faixa naquele período.

## Onde confirmar o percentual certo

O percentual de reajuste anual vigente pra planos individuais/familiares é divulgado pela ANS todo ano. Você pode simular o efeito na sua mensalidade com a nossa [calculadora de reajuste](/ferramentas/reajuste).

${CLOSING}`,
  },
  {
    slug: "plano-saude-coparticipacao-vale-a-pena",
    title: "Plano de saúde com coparticipação: vale a pena?",
    category: "guia",
    excerpt:
      "Planos com coparticipação têm mensalidade menor, mas você paga uma parte a cada uso. Veja quando isso compensa.",
    body: `Coparticipação é um modelo em que, além da mensalidade fixa, você paga um valor adicional cada vez que usa alguns serviços do plano (como consultas ou exames). Em troca, a mensalidade costuma ser menor que a de um plano sem coparticipação equivalente.

## Como funciona na prática

O valor da coparticipação varia por operadora e por tipo de procedimento — geralmente é uma porcentagem do custo do atendimento ou um valor fixo por evento. Internações costumam ter regras diferentes das consultas e exames simples.

## Quando costuma compensar

Se você e sua família usam o plano com pouca frequência (poucas consultas e exames por ano), a mensalidade menor pode compensar mesmo pagando um pouco a cada uso. Já quem usa o plano com frequência — consultas regulares, acompanhamento contínuo — pode acabar pagando mais no total do que pagaria num plano sem coparticipação.

## O que perguntar antes de contratar

Vale pedir a tabela de coparticipação completa (não só um exemplo) e simular, com base no seu histórico de uso, se a economia na mensalidade compensaria o que você pagaria a mais em coparticipação ao longo do ano.

${CLOSING}`,
  },
  {
    slug: "rede-credenciada-ou-reembolso",
    title: "Rede credenciada ou reembolso: qual modelo escolher",
    category: "comparativo",
    excerpt:
      "Alguns planos permitem escolher médicos fora da rede e pedir reembolso. Entenda como isso funciona e quando vale a pena.",
    body: `A maioria dos planos de saúde funciona com rede credenciada — hospitais, clínicas e laboratórios que têm contrato direto com a operadora. Alguns planos, geralmente mais caros, também oferecem a opção de reembolso pra atendimentos fora dessa rede.

## Como funciona o reembolso

Você paga o atendimento particular (com um médico ou clínica de sua escolha) e depois pede reembolso à operadora, com base numa tabela própria dela. Esse reembolso costuma cobrir só parte do valor pago, não o custo integral.

## Quando o reembolso faz diferença

Faz mais sentido pra quem já tem médicos de confiança fora da rede credenciada e prioriza flexibilidade de escolha, mesmo pagando uma mensalidade mais alta por isso.

## Quando a rede credenciada pura já resolve

Se você não tem uma preferência forte por médicos específicos e prioriza mensalidade mais baixa, um plano só com rede credenciada (sem opção de reembolso) tende a ser mais econômico.

## Como decidir

Vale pedir a tabela de reembolso antes de contratar — em muitos casos o valor reembolsado é bem menor que o custo real de um atendimento particular, então a "flexibilidade" tem um preço real embutido.

${CLOSING}`,
  },
  {
    slug: "plano-mei-sem-carencia-existe",
    title: "Plano de saúde para MEI sem carência: existe?",
    category: "mei",
    excerpt:
      "Ofertas de 'plano sem carência' pedem atenção redobrada. Entenda o que costuma estar por trás dessa promessa.",
    body: `É comum ver anúncios prometendo "plano de saúde sem carência" — mas vale entender o que geralmente está por trás dessa promessa antes de contratar com base só nisso.

## O que a ANS permite

A ANS define prazos máximos de carência que uma operadora pode exigir (24h pra urgência/emergência, até 180 dias pra internações em geral, até 300 dias pra parto, até 24 meses pra CPT em doenças preexistentes). Uma operadora pode praticar prazos menores que esse teto — inclusive zero em alguns casos —, mas não pode ultrapassar o máximo definido.

## Quando "sem carência" é legítimo

Portabilidade de carências elegível é o caminho mais comum e seguro pra não cumprir carência de novo ao trocar de plano. Alguns planos coletivos empresariais também podem ter carência reduzida ou zerada, dependendo de acordo comercial com a operadora — isso é legítimo e vale confirmar.

## Onde vale desconfiar

Promessa de "zero carência garantido" sem nenhuma explicação de como isso é possível (portabilidade, acordo coletivo específico) merece uma pergunta direta: como exatamente isso funciona nesse caso? Uma corretora séria explica o mecanismo, não só repete a promessa.

${CLOSING}`,
  },
  {
    slug: "quanto-custa-incluir-dependente",
    title: "Quanto custa incluir um dependente no plano de saúde",
    category: "familiar",
    excerpt:
      "Adicionar um dependente ao plano não é um valor fixo — depende da idade dele e das regras da operadora.",
    body: `Incluir um dependente — cônjuge, filho, ou outro dependente elegível — no seu plano de saúde adiciona um novo valor à mensalidade, calculado de forma independente com base na faixa etária dessa pessoa.

## Como o valor é calculado

Cada dependente entra numa das 10 faixas etárias definidas pela ANS, de acordo com a idade dele. O valor da mensalidade do dependente é somado ao valor do titular — não existe desconto por "pacote família" na maioria dos planos, é soma direta por pessoa.

## Recém-nascido tem regra especial

Bebês recém-nascidos, filhos de titular ou dependente já no plano, costumam ter direito a inclusão sem cumprir carência dentro de uma janela de tempo após o nascimento (normalmente até 30 dias) — o prazo exato deve ser confirmado com a operadora escolhida.

## Vale simular antes de decidir

Já que cada dependente é cobrado separadamente, vale simular o valor total da família (titular + cada dependente na faixa etária dele) antes de comparar propostas entre operadoras diferentes.

${CLOSING}`,
  },
  {
    slug: "numero-minimo-vidas-plano-empresarial",
    title: "Plano empresarial: quantas vidas a operadora costuma exigir",
    category: "empresarial",
    excerpt:
      "Empresas pequenas às vezes esbarram numa exigência de número mínimo de funcionários. Entenda as alternativas.",
    body: `Uma das primeiras perguntas na hora de contratar plano de saúde empresarial é: quantos funcionários (vidas) a empresa precisa ter pra fechar esse tipo de contrato? A resposta varia bastante conforme a operadora.

## Por que existe um mínimo

Planos empresariais são precificados considerando um grupo de pessoas — quanto maior o grupo, mais previsível fica o risco pra operadora, o que geralmente resulta em condições melhores de preço. Grupos muito pequenos mudam essa lógica de precificação.

## O que fazer se a empresa é muito pequena

Empresas com poucos funcionários (às vezes até MEI com um funcionário só, dependendo do caso) podem se encaixar melhor num plano coletivo por adesão, que costuma ter regras de elegibilidade diferentes do plano empresarial tradicional.

## Como descobrir o mínimo de cada operadora

O número mínimo de vidas não costuma estar público de forma padronizada — o caminho mais direto é perguntar na cotação, informando quantos funcionários a empresa tem, e deixar a corretora indicar quais operadoras aceitam esse porte de empresa.

${CLOSING}`,
  },
  {
    slug: "cancelar-plano-sem-perder-portabilidade",
    title: "Como cancelar um plano de saúde sem perder a portabilidade",
    category: "portabilidade",
    excerpt:
      "A ordem das etapas importa: cancelar antes da hora pode significar perder o direito à portabilidade de carências.",
    body: `Se você está pensando em trocar de plano de saúde usando a portabilidade de carências, a ordem em que você faz as coisas importa — cancelar o plano atual antes da hora pode custar caro.

## Por que a ordem importa

A portabilidade de carências normalmente exige que você esteja com o plano atual ativo (ou tenha acabado de sair dele dentro de um prazo curto) no momento da solicitação. Cancelar o plano antigo com muita antecedência, sem já ter o novo plano formalizado, pode significar perder a elegibilidade pra portabilidade.

## O que fazer na prática

O caminho mais seguro é: confirmar a elegibilidade pra portabilidade primeiro, formalizar a proposta do plano novo, e só cancelar o plano antigo depois que a portabilidade estiver de fato concluída — nunca antes.

## Onde tirar dúvidas específicas

Como as regras de prazo e elegibilidade podem mudar, o mais seguro é confirmar sua situação específica (data de saída do plano atual, tempo de permanência, faixa de preço) direto com a corretora antes de cancelar qualquer coisa.

${CLOSING}`,
  },
  {
    slug: "plano-individual-fechando-vendas-o-que-fazer",
    title: "Plano de saúde individual fechado pra novas vendas: o que fazer",
    category: "individual",
    excerpt:
      "Algumas operadoras pausam a venda de planos individuais em certos momentos. Veja as alternativas nesse cenário.",
    body: `De tempos em tempos, alguma operadora anuncia que parou de vender planos individuais novos — geralmente mantendo os contratos já existentes, mas sem aceitar novos titulares nessa modalidade. Isso pode gerar dúvida em quem está pesquisando.

## Por que isso acontece

A decisão de pausar vendas de plano individual costuma ser uma escolha comercial da operadora, ligada à forma como esse tipo de contrato é precificado e reajustado (o índice de reajuste de planos individuais é definido pela ANS, diferente do que acontece com planos empresariais).

## Alternativas se a operadora que você queria não vende mais individual

Outras operadoras continuam vendendo plano individual normalmente — a pausa não costuma ser do mercado inteiro, só de operadoras específicas em momentos específicos. Outra opção é avaliar o plano PME/empresarial, se você tiver ou puder abrir um CNPJ (como MEI, por exemplo), já que costuma ter mensalidade competitiva.

## Como não perder tempo pesquisando operadora por operadora

Em vez de checar uma por uma, o mais prático é pedir uma cotação informando que busca plano individual — a corretora já sabe quais operadoras estão com vendas abertas nesse formato no momento.

${CLOSING}`,
  },
  {
    slug: "ambulatorial-hospitalar-ou-completo",
    title: "Plano ambulatorial, hospitalar ou completo: qual a diferença",
    category: "guia",
    excerpt:
      "Esses três tipos de segmentação definem o que exatamente o seu plano cobre. Entenda antes de contratar.",
    body: `Plano de saúde não é só "cobre tudo" ou "não cobre nada" — existem segmentações que definem exatamente que tipo de atendimento cada plano inclui, e entender isso evita surpresa na hora de precisar usar.

## Ambulatorial

Cobre consultas, exames e tratamentos que não exigem internação — atendimento em consultório, pronto-socorro (sem internar) e procedimentos ambulatoriais em geral.

## Hospitalar

Cobre internações, cirurgias e procedimentos que exigem estrutura hospitalar. Pode incluir ou não obstetrícia (parto), dependendo do plano contratado.

## Completo (ambulatorial + hospitalar)

Combina os dois segmentos — é a opção mais abrangente, e também costuma ser a mais cara, já que cobre desde consulta simples até internação completa.

## Como escolher

Se você busca cobertura ampla e não quer se preocupar com o que está ou não incluso, o plano completo tende a ser mais seguro. Se o orçamento é mais apertado e você quer entender exatamente o que abrir mão, vale comparar o que cada segmentação cobre em detalhe antes de decidir.

${CLOSING}`,
  },
  {
    slug: "plano-com-ou-sem-obstetricia",
    title: "Plano de saúde com ou sem obstetrícia: como decidir",
    category: "familiar",
    excerpt:
      "A cobertura de obstetrícia (parto) é opcional em muitos planos hospitalares. Veja quando faz sentido incluir.",
    body: `Nem todo plano de saúde hospitalar inclui cobertura obstétrica (acompanhamento de gravidez e parto) por padrão — em muitas operadoras, essa cobertura é um adicional opcional, que também tem seu próprio prazo de carência.

## Por que isso é opcional

Cobertura obstétrica tem uma lógica de custo diferente das internações em geral, então operadoras costumam separar essa cobertura como um módulo à parte — o que também significa uma mensalidade um pouco maior pra quem inclui.

## Carência específica pra parto

Mesmo com a cobertura obstétrica incluída, existe um prazo de carência próprio pra parto (a ANS permite até 300 dias como teto máximo) — diferente da carência de internações em geral.

## Quando faz sentido incluir

Se você e seu parceiro ou parceira estão planejando engravidar nos próximos anos, faz sentido considerar essa cobertura desde já, justamente por causa do prazo de carência — deixar pra incluir só quando a gravidez já estiver em andamento pode significar não conseguir cobertura a tempo.

${CLOSING}`,
  },
  {
    slug: "quanto-custa-plano-saude-acima-60-anos",
    title: "Quanto custa plano de saúde para quem tem mais de 60 anos",
    category: "individual",
    excerpt:
      "A faixa etária 59+ costuma ter a mensalidade mais alta entre as 10 faixas da ANS. Entenda o porquê e as alternativas.",
    body: `A faixa etária de 59 anos ou mais é a última das 10 faixas definidas pela ANS, e costuma concentrar a mensalidade mais alta entre todas — o que gera dúvida em muita gente que está chegando nessa fase ou já passou dela.

## Por que essa faixa custa mais

A lógica de precificação por faixa etária considera o uso médio esperado do plano em cada fase da vida — faixas mais avançadas tendem a ter uso mais frequente de consultas, exames e procedimentos, o que se reflete no valor da mensalidade.

## Existe algum limite pra esse aumento?

A ANS regula a proporção entre a mensalidade da última faixa e a da primeira faixa, pra evitar que o valor suba de forma desproporcional só por causa da idade — mas dentro desse limite, a mensalidade da faixa 59+ ainda costuma ser bem mais alta que as faixas iniciais.

## O que considerar antes de contratar nessa fase

Vale comparar não só o preço, mas a rede credenciada disponível pra especialidades mais usadas nessa faixa etária, e considerar se entrar num plano mais cedo (antes de chegar na última faixa) pode fazer sentido pra evitar o salto de preço mais tarde.

${CLOSING}`,
  },
  {
    slug: "plano-coletivo-por-adesao-como-funciona",
    title: "Plano coletivo por adesão: como funciona e quem pode contratar",
    category: "comparativo",
    excerpt:
      "Esse formato fica entre o plano individual e o empresarial. Veja quem tem acesso e como ele costuma ser precificado.",
    body: `O plano coletivo por adesão é uma modalidade intermediária: você contrata através de uma entidade de classe, sindicato, associação profissional ou conselho — sem precisar ter CNPJ próprio como no plano empresarial.

## Quem pode contratar

Geralmente é preciso ter vínculo com a entidade que oferece o plano — ser filiado a um sindicato, associação de classe ou conselho profissional específico. Cada entidade negocia suas próprias condições com uma ou mais operadoras.

## Como costuma ser o preço

Por reunir um grupo de pessoas (todos os filiados da entidade), a precificação segue uma lógica parecida com a do plano empresarial — muitas vezes com mensalidade mais competitiva que o plano individual equivalente.

## Reajuste também é diferente

Assim como no plano empresarial, o reajuste de planos coletivos por adesão é negociado entre a entidade contratante e a operadora, não segue o índice ANS usado nos planos individuais.

## Vale a pena checar se você já tem acesso

Antes de descartar essa opção, vale checar se você já é filiado a algum sindicato, conselho de classe ou associação profissional que ofereça esse tipo de plano — pode ser uma alternativa mais barata que você nem sabia que tinha.

${CLOSING}`,
  },
  {
    slug: "carencia-zerada-quando-acontece",
    title: "Carência zerada: quando isso realmente acontece",
    category: "portabilidade",
    excerpt:
      "Carência zero não é regra geral — acontece em situações específicas. Veja quais são elas.",
    body: `"Carência zerada" é uma das expressões mais usadas (e mal explicadas) na venda de plano de saúde. Vale entender exatamente em quais situações isso acontece de verdade.

## Portabilidade elegível

O cenário mais comum: se você já tem plano há tempo suficiente e está em dia com os pagamentos, pode ter direito a portabilidade — trocando de operadora sem cumprir os prazos de carência de novo, dentro das regras de elegibilidade vigentes.

## Planos coletivos empresariais ou por adesão

Alguns contratos coletivos negociam carência reduzida ou zerada como parte do acordo comercial entre a entidade/empresa contratante e a operadora — isso é legítimo, mas específico daquele contrato, não uma regra geral do mercado.

## Troca de titularidade sem interrupção

Em alguns casos de portabilidade especial (como filho que sai do plano dos pais pra um plano próprio), também pode haver dispensa de carência, seguindo regras específicas da ANS.

## O que perguntar quando ouvir "carência zero"

Sempre vale perguntar: "carência zero por qual desses motivos?" Uma resposta clara e específica é sinal de que a informação é confiável; uma resposta vaga é motivo pra pesquisar mais antes de fechar.

${CLOSING}`,
  },
  {
    slug: "plano-nacional-ou-regional",
    title: "Plano de saúde nacional ou regional: qual escolher",
    category: "comparativo",
    excerpt:
      "A abrangência geográfica do plano muda o que você pode usar fora da sua cidade. Veja quando cada opção compensa.",
    body: `Além de operadora e tipo de acomodação, os planos de saúde também variam pela abrangência geográfica — nacional, estadual ou regional (um grupo específico de cidades). Essa escolha afeta diretamente onde você pode usar o plano.

## O que muda entre nacional e regional

Um plano regional cobre atendimento só dentro da área definida no contrato — geralmente sua cidade e região próxima. Um plano nacional cobre atendimento em qualquer lugar do país onde a operadora tenha rede credenciada.

## Por que o plano regional costuma ser mais barato

Como a cobertura é mais limitada geograficamente, o plano regional tende a ter mensalidade menor que o plano nacional equivalente da mesma operadora.

## Quando vale a pena pagar mais pelo nacional

Se você viaja com frequência, mora perto da divisa entre regiões, ou tem familiares em outras cidades que podem precisar de atendimento urgente enquanto estão longe de casa, a cobertura nacional pode valer o custo extra.

## Como decidir

Pensa no seu padrão real de deslocamento no último ano — se você raramente sai da sua região, o plano regional já costuma resolver bem, com uma mensalidade mais em conta.

${CLOSING}`,
  },
  {
    slug: "como-comparar-propostas-antes-de-fechar",
    title: "Como comparar propostas de plano de saúde antes de fechar",
    category: "guia",
    excerpt:
      "Comparar só o valor da mensalidade pode levar a uma escolha ruim. Veja um checklist de critérios pra comparar direito.",
    body: `Quando você recebe duas ou três propostas de plano de saúde, é tentador decidir só pelo valor da mensalidade — mas isso pode significar escolher um plano que não atende sua necessidade real.

## Critérios que importam além do preço

Rede credenciada (os hospitais e laboratórios que você usaria de fato estão inclusos?), tipo de acomodação, segmentação (ambulatorial, hospitalar ou completo), abrangência geográfica (regional ou nacional) e se tem coparticipação ou não.

## Reajuste também entra na conta

Um plano com mensalidade inicial mais baixa mas com histórico de reajustes mais altos pode custar mais caro no médio prazo do que um plano com mensalidade inicial um pouco maior, mas reajuste mais estável.

## Monte uma comparação lado a lado

Vale colocar as propostas numa tabela simples, coluna por coluna: operadora, mensalidade, rede, segmentação, abrangência, coparticipação (sim/não), carência aplicável. Isso deixa muito mais claro o que cada valor está de fato comprando.

## Não hesite em pedir mais de uma cotação

Comparar propostas de operadoras diferentes é o jeito mais direto de ver o que faz mais sentido pro seu caso — e não custa nada pedir.

${CLOSING}`,
  },
  {
    slug: "plano-individual-vale-a-pena-2026",
    title: "Plano de saúde individual vale a pena em 2026?",
    category: "individual",
    excerpt:
      "Com menos operadoras vendendo plano individual, vale entender se essa modalidade ainda faz sentido pro seu caso.",
    body: `Nos últimos anos, várias operadoras reduziram ou pausaram a venda de planos individuais, o que fez muita gente se perguntar se essa modalidade ainda vale a pena contratar.

## O que ainda pesa a favor do individual

O plano individual continua sendo a única opção pra quem não tem CNPJ nem vínculo com entidade de classe que ofereça plano coletivo. Ele também dá mais liberdade pra trocar de operadora por conta própria, sem depender de decisão de terceiros (como uma empresa ou associação).

## O que considerar antes de decidir

Vale comparar o preço do individual com o de um plano PME (se você tiver ou puder abrir CNPJ) ou coletivo por adesão (se tiver acesso a algum sindicato ou conselho de classe) — em muitos casos essas alternativas saem mais baratas pra cobertura parecida.

${CLOSING}`,
  },
  {
    slug: "plano-individual-sem-cnpj",
    title: "Como funciona o plano individual pra quem trabalha por conta própria sem CNPJ",
    category: "individual",
    excerpt:
      "Freelancers e autônomos sem CNPJ também podem contratar plano de saúde — veja como funciona nesse caso.",
    body: `Quem trabalha por conta própria mas não tem CNPJ aberto (freelancer, informal, autônomo sem MEI) segue tendo acesso ao plano de saúde individual, contratado diretamente com a operadora, sem precisar de vínculo empregatício ou empresarial.

## O que muda em relação a quem tem CNPJ

Sem CNPJ, a opção de plano PME/empresarial fica fora de alcance — o caminho é mesmo o individual. A análise de aprovação costuma pedir só os documentos pessoais (RG, CPF, comprovante de residência), sem exigência de documentação empresarial.

## Vale considerar abrir um CNPJ?

Se o preço do plano PME compensar significativamente em relação ao individual, pode valer avaliar abrir um MEI — mas essa decisão deve levar em conta também os custos e obrigações de ter um CNPJ, não só o plano de saúde.

${CLOSING}`,
  },
  {
    slug: "individual-x-coletivo-diferencas",
    title: "Plano individual x plano coletivo: diferenças que pesam no bolso",
    category: "individual",
    excerpt:
      "A forma de contratação muda regras de reajuste, cancelamento e até estabilidade do contrato. Entenda antes de escolher.",
    body: `Plano individual e plano coletivo (empresarial ou por adesão) não são só formas diferentes de contratar — as regras que regem cada um também mudam, e isso afeta o bolso no médio prazo.

## Reajuste é a diferença mais sentida

No plano individual, o reajuste anual segue um percentual máximo definido pela ANS. No coletivo, o reajuste é negociado entre a operadora e a empresa (ou entidade) contratante, com base na sinistralidade do grupo — o que pode significar reajustes mais altos ou mais baixos, dependendo do uso do grupo.

## Estabilidade do contrato

O plano individual só pode ser cancelado pela operadora em casos específicos (como inadimplência). Já o plano coletivo empresarial pode ser rescindido pela operadora com aviso prévio, mesmo com o beneficiário em dia — uma diferença importante pra quem valoriza previsibilidade a longo prazo.

${CLOSING}`,
  },
  {
    slug: "quanto-custa-individual-jovem-20-anos",
    title: "Quanto custa plano de saúde individual pra jovem de 20 e poucos anos",
    category: "individual",
    excerpt:
      "A faixa etária mais jovem tende a ter a mensalidade mais baixa entre as 10 faixas da ANS. Entenda por quê.",
    body: `Quem está na faixa dos 19 aos 23 anos costuma pagar a segunda mensalidade mais baixa entre as 10 faixas etárias definidas pela ANS, ficando atrás apenas da faixa de 0 a 18 anos.

## Por que essa faixa é mais barata

A lógica de precificação por faixa etária considera o uso médio esperado do plano — pessoas mais jovens tendem a usar menos consultas, exames e internações, o que se reflete numa mensalidade mais baixa.

## Vale contratar cedo mesmo sem usar muito?

Entrar num plano de saúde ainda jovem pode ser uma forma de garantir carência cumprida e histórico no plano antes de eventuais mudanças de vida (como filhos ou problemas de saúde) — mas cada caso deve considerar o orçamento disponível no momento.

${CLOSING}`,
  },
  {
    slug: "individual-apartamento-vale-o-preco-extra",
    title: "Plano de saúde individual com acomodação em apartamento: vale o preço extra?",
    category: "individual",
    excerpt:
      "A diferença entre enfermaria e apartamento vai além do conforto — entenda o que muda na internação.",
    body: `Um dos fatores que mais influenciam o preço de um plano individual é o tipo de acomodação em internação: enfermaria (quarto coletivo) ou apartamento (quarto individual).

## O que muda na prática

No apartamento, você fica sozinho durante a internação, geralmente com direito a acompanhante. Na enfermaria, o quarto é compartilhado com outros pacientes, sem acomodação garantida pra acompanhante na mesma estrutura.

## Quando o apartamento costuma compensar

Pra quem valoriza privacidade durante a internação ou tem histórico de internações frequentes, o custo extra do apartamento pode compensar. Pra quem raramente precisa internar, a enfermaria mantém a mesma cobertura médica, só muda o conforto da acomodação.

${CLOSING}`,
  },
  {
    slug: "carencia-plano-individual-novo",
    title: "Como funciona a carência num plano individual novo",
    category: "individual",
    excerpt:
      "Cada tipo de atendimento tem um prazo de carência diferente. Veja os prazos máximos que a ANS permite.",
    body: `Ao contratar um plano de saúde individual novo, sem direito a portabilidade, você precisa cumprir prazos de carência antes de usar cada tipo de atendimento.

## Os prazos máximos definidos pela ANS

Urgência e emergência: até 24 horas. Parto: até 300 dias. Consultas, exames e internações em geral: até 180 dias. Doenças ou lesões preexistentes (CPT): até 24 meses. A operadora pode praticar prazos menores, mas não pode ultrapassar esses limites.

## O que fazer nesse período

Durante a carência, vale manter algum tipo de cobertura de urgência (como plano anterior ainda ativo, se possível) ou pelo menos ter reserva financeira pra atendimentos particulares eventuais até o plano novo liberar as coberturas.

${CLOSING}`,
  },
  {
    slug: "individual-doenca-preexistente",
    title: "Plano de saúde individual pra quem tem doença preexistente",
    category: "individual",
    excerpt:
      "Ter uma condição preexistente não impede a contratação, mas muda as regras de carência pra ela especificamente.",
    body: `Ter uma doença ou lesão preexistente não impede a contratação de um plano de saúde individual — mas exige atenção redobrada na declaração de saúde e no entendimento da Cobertura Parcial Temporária (CPT).

## O que é a CPT

A CPT é um período (de até 24 meses) em que procedimentos de alta complexidade, cirurgias e leitos de alta tecnologia relacionados especificamente à doença preexistente declarada podem não ser cobertos. Atendimentos de urgência e emergência continuam garantidos mesmo durante a CPT.

## Por que declarar a doença corretamente importa

Omitir uma doença preexistente na declaração de saúde pode ser considerado fraude e resultar em cancelamento do plano ou negativa de cobertura justamente quando você mais precisar. O caminho mais seguro é declarar tudo e entender as regras de CPT aplicáveis ao seu caso.

${CLOSING}`,
  },
  {
    slug: "atraso-pagamento-plano-individual",
    title: "O que acontece se eu atrasar o pagamento do plano individual",
    category: "individual",
    excerpt:
      "Existe um prazo de tolerância antes do cancelamento por inadimplência. Entenda como funciona.",
    body: `Atrasar o pagamento da mensalidade de um plano de saúde individual tem consequências específicas, mas a operadora não pode cancelar o contrato de forma imediata no primeiro atraso.

## O prazo de tolerância

A regra geral prevê que a operadora só pode cancelar o plano por inadimplência se o atraso ultrapassar 60 dias (consecutivos ou não) dentro de um período de 12 meses, e desde que o beneficiário seja notificado até o 50º dia de atraso.

## Como evitar o cancelamento

Assim que perceber o atraso, o mais seguro é regularizar o pagamento o quanto antes e confirmar com a operadora se o plano segue ativo — esperar o prazo de tolerância se esgotar é um risco desnecessário.

${CLOSING}`,
  },
  {
    slug: "trocar-operadora-plano-individual-quando-quiser",
    title: "Plano individual: posso trocar de operadora quando quiser?",
    category: "individual",
    excerpt:
      "Trocar de operadora é possível a qualquer momento, mas a forma como você troca muda se cumpre carência de novo ou não.",
    body: `Sim, você pode contratar um plano de saúde individual novo em outra operadora a qualquer momento — a questão não é se pode trocar, mas como trocar sem perder o que já conquistou de carência.

## Trocar sem portabilidade

Se você contratar um plano novo sem passar pelo processo formal de portabilidade de carências, vai precisar cumprir os prazos de carência do zero na operadora nova, mesmo já tendo cumprido tudo na anterior.

## Trocar com portabilidade

Se você for elegível (tempo mínimo de permanência, estar em dia com pagamentos, compatibilidade de faixa de preço), a portabilidade permite trocar de operadora sem cumprir as carências de novo — o caminho mais vantajoso pra quem já tem plano há tempo.

${CLOSING}`,
  },
  {
    slug: "cancelamento-plano-individual-como-funciona",
    title: "Como funciona o cancelamento de um plano de saúde individual",
    category: "individual",
    excerpt:
      "O beneficiário pode cancelar quando quiser, mas alguns detalhes práticos evitam dor de cabeça depois.",
    body: `Diferente do que acontece na contratação, cancelar um plano de saúde individual é um processo relativamente simples — o beneficiário tem direito de solicitar o cancelamento a qualquer momento, sem justificativa.

## Como solicitar

O pedido deve ser feito formalmente à operadora (por telefone, aplicativo ou presencialmente, conforme os canais que ela disponibiliza), e a operadora é obrigada a confirmar o cancelamento por escrito.

## Cuidados antes de cancelar

Vale só cancelar depois de já ter o plano novo formalizado (se a ideia é trocar de operadora), especialmente se você pretende usar a portabilidade de carências — cancelar cedo demais pode complicar esse processo.

${CLOSING}`,
  },
  {
    slug: "individual-sem-coparticipacao-quando-compensa",
    title: "Plano de saúde individual sem coparticipação: quando compensa",
    category: "individual",
    excerpt:
      "Pagar uma mensalidade mais alta sem coparticipação pode compensar dependendo de quanto você usa o plano.",
    body: `Entre planos individuais com e sem coparticipação, a escolha certa depende diretamente da frequência com que você e sua família usam consultas, exames e outros atendimentos.

## Quando o sem coparticipação compensa

Se o uso é frequente — acompanhamento contínuo, exames regulares, consultas recorrentes — pagar uma mensalidade fixa mais alta sem coparticipação tende a sair mais barato no total do que pagar menos por mês e mais a cada atendimento.

## Como simular antes de decidir

Vale estimar quantos atendimentos você usaria num ano normal e comparar: mensalidade sem coparticipação x (mensalidade menor + soma da coparticipação estimada). Essa conta simples já ajuda a apontar qual opção compensa mais pro seu perfil de uso.

${CLOSING}`,
  },
  {
    slug: "tempo-aprovacao-plano-individual",
    title: "Quanto tempo leva pra aprovar um plano individual novo",
    category: "individual",
    excerpt:
      "O prazo de aprovação varia conforme a operadora e a completude da documentação enviada.",
    body: `Depois de enviar a proposta de adesão com a documentação completa, a operadora analisa e decide sobre a aprovação do plano individual — um processo que pode levar de poucos dias a algumas semanas.

## O que mais influencia o prazo

Documentação completa e sem inconsistências é o principal fator de agilidade. Declaração de saúde bem preenchida (sem informações incompletas) também evita idas e vindas que atrasam a análise.

## O que fazer enquanto espera

Durante a análise, o plano ainda não está ativo — vale manter alguma forma de cobertura (particular ou plano anterior, se ainda ativo) até receber a confirmação formal de aprovação da operadora.

${CLOSING}`,
  },
  {
    slug: "proposta-plano-individual-recusada",
    title: "Plano de saúde individual: o que fazer se a proposta for recusada",
    category: "individual",
    excerpt:
      "A recusa não é o fim da linha — existem alternativas e formas de entender o motivo.",
    body: `Nem toda proposta de plano de saúde individual é aprovada de primeira. Quando isso acontece, vale entender o motivo antes de desistir da contratação.

## Motivos comuns de recusa

Inconsistência entre documentos, declaração de saúde incompleta, ou políticas internas da operadora pra determinado perfil de risco podem levar à recusa. Em alguns casos, a operadora simplesmente não está com vendas abertas pra plano individual naquele momento.

## Alternativas depois de uma recusa

Vale tentar corrigir e reenviar a documentação se o motivo foi algo simples, ou buscar outra operadora que esteja com vendas abertas pra plano individual — a recusa de uma não significa que todas vão recusar.

${CLOSING}`,
  },
  {
    slug: "diferenca-plano-individual-novo-antigo",
    title: "Diferença entre plano individual novo e planos antigos (antes de 1999)",
    category: "individual",
    excerpt:
      "Contratos anteriores à Lei dos Planos de Saúde seguem regras diferentes das que valem hoje. Entenda o impacto.",
    body: `Planos de saúde contratados antes de janeiro de 1999 (antes da Lei 9.656, que regulamentou o setor) seguem regras diferentes dos planos contratados depois dessa data — os chamados "planos antigos" ou "não regulamentados".

## O que muda nos planos antigos

Planos antigos não são obrigados a seguir o rol mínimo de coberturas definido pela ANS nem os limites de reajuste aplicáveis aos planos novos, salvo se o beneficiário tiver optado formalmente pela adaptação às regras da lei atual.

## Por que isso importa hoje

Quem ainda tem um plano antigo (herdado de contrato de família, por exemplo) deve considerar se vale a pena migrar pra um plano novo regulamentado — a migração tem regras próprias e pode preservar parte da carência já cumprida.

${CLOSING}`,
  },
  {
    slug: "individual-regional-economia-vale-a-pena",
    title: "Plano de saúde individual regional: economia real vale a pena?",
    category: "individual",
    excerpt:
      "A mensalidade mais baixa do plano regional tem uma contrapartida: cobertura limitada geograficamente. Veja quando compensa.",
    body: `Planos individuais com abrangência regional (cobertura limitada a uma cidade ou grupo de cidades) costumam ter mensalidade menor que planos nacionais equivalentes — mas essa economia vem com uma limitação clara.

## O que você abre mão

Fora da área de abrangência definida no contrato, o plano regional não garante atendimento eletivo — só urgência e emergência costumam ter cobertura mínima garantida fora da área, dependendo das regras da operadora.

## Pra quem costuma compensar

Se você não viaja com frequência e não pretende se mudar de cidade tão cedo, a economia do plano regional tende a compensar. Se o seu estilo de vida envolve deslocamento frequente, vale considerar o custo extra do plano nacional.

${CLOSING}`,
  },
  {
    slug: "plano-individual-gestante",
    title: "Plano individual para gestante: o que muda",
    category: "individual",
    excerpt:
      "Contratar plano de saúde já grávida tem uma particularidade importante em relação à carência de parto.",
    body: `Contratar um plano de saúde individual estando grávida é possível, mas exige atenção a um detalhe importante: a carência específica pra parto, que pode chegar a até 300 dias conforme definido pela ANS.

## O que costuma ser coberto mesmo durante a carência

Mesmo cumprindo carência pra parto, urgências e emergências obstétricas continuam com cobertura garantida em até 24 horas após a contratação — a limitação é especificamente sobre o parto em si, não sobre toda a gestação.

## Por que isso importa na hora de contratar

Se a carência de parto não tiver sido cumprida até a data prevista, o parto pode não ser coberto pelo plano novo, sendo necessário considerar isso no planejamento financeiro ou buscar portabilidade, se a gestante já tiver outro plano ativo há tempo suficiente.

${CLOSING}`,
  },
  {
    slug: "familiar-incluir-pais-idosos",
    title: "Plano de saúde familiar: incluir os pais idosos, como funciona",
    category: "familiar",
    excerpt:
      "Incluir os pais como dependentes é possível em muitos planos, mas a faixa etária mais alta pesa no preço.",
    body: `Alguns planos de saúde familiares permitem incluir os pais como dependentes, não só cônjuge e filhos — mas essa possibilidade depende das regras específicas de cada operadora.

## O que verificar antes de incluir

Nem toda operadora aceita pais como dependentes num plano familiar (algumas limitam a cônjuge e filhos). Quando aceitam, os pais entram na faixa etária deles — geralmente a mais cara das 10 faixas — o que eleva bastante a mensalidade total.

## Vale a pena ou compensa mais um plano à parte?

Vale comparar o custo de incluir os pais no plano familiar versus contratar um plano individual só pra eles — dependendo da idade e da operadora, um plano separado pode sair mais em conta.

${CLOSING}`,
  },
  {
    slug: "toda-familia-mesmo-plano-ou-dividir",
    title: "Vale a pena colocar toda a família no mesmo plano ou dividir?",
    category: "familiar",
    excerpt:
      "Reunir todo mundo numa única apólice tem vantagens práticas, mas nem sempre é a opção mais barata.",
    body: `Colocar todos os membros da família no mesmo plano de saúde simplifica a gestão — uma mensalidade só, um boleto só, um app só — mas nem sempre é a opção financeiramente mais vantajosa.

## Vantagens de manter todos juntos

Facilidade de gestão, possibilidade de negociar condições em bloco com a corretora, e um único vencimento de mensalidade pra acompanhar.

## Quando dividir pode compensar

Se membros da família têm perfis de uso muito diferentes (um usa muito, outro quase não usa), pode valer avaliar planos separados com coberturas diferentes — por exemplo, um plano mais completo pra quem precisa de acompanhamento contínuo e um mais simples pra quem raramente usa.

${CLOSING}`,
  },
  {
    slug: "familiar-filhos-pequenos-prioridades",
    title: "Plano de saúde familiar com filhos pequenos: o que priorizar",
    category: "familiar",
    excerpt:
      "Pediatria, vacinas e urgência pesam mais nessa fase. Veja o que checar na hora de escolher o plano.",
    body: `Famílias com filhos pequenos costumam usar o plano de saúde de um jeito bem específico — consultas pediátricas frequentes, atendimentos de urgência e acompanhamento de desenvolvimento — e isso deve pesar na escolha do plano.

## O que checar na rede credenciada

Confirma se a rede inclui pediatras bem avaliados e hospitais com pronto-socorro infantil na sua região — nem toda rede credenciada tem estrutura pediátrica completa.

## Vacinas e exames de rotina

Verifica também se o plano cobre o calendário vacinal e exames de rotina infantil — esses detalhes variam entre operadoras e podem pesar bastante no uso do dia a dia com criança pequena.

${CLOSING}`,
  },
  {
    slug: "inclusao-enteados-plano-saude",
    title: "Como funciona a inclusão de enteados no plano de saúde",
    category: "familiar",
    excerpt:
      "Filhos do cônjuge ou companheiro também podem ser incluídos como dependentes, mas com regras próprias.",
    body: `Enteados — filhos do cônjuge ou companheiro que não são filhos biológicos ou adotivos do titular — também podem ser incluídos como dependentes na maioria dos planos de saúde, seguindo regras específicas de cada operadora.

## Documentos geralmente exigidos

Além da documentação básica do enteado, costuma ser pedida a certidão de casamento ou declaração de união estável entre o titular e o pai/mãe biológico do enteado, comprovando o vínculo familiar.

## Carência se aplica normalmente

Diferente do recém-nascido (que pode ter janela de inclusão sem carência), a inclusão de enteados costuma seguir os prazos de carência normais do plano, salvo regras específicas de cada operadora.

${CLOSING}`,
  },
  {
    slug: "plano-saude-casal-recem-casado",
    title: "Plano de saúde para casal recém-casado: por onde começar",
    category: "familiar",
    excerpt:
      "Unir os planos ou manter separados? Veja os pontos que pesam nessa decisão.",
    body: `Depois do casamento, muitos casais se perguntam se vale a pena unificar os planos de saúde num só ou manter cada um com o seu — a resposta depende do momento de vida e do orçamento de cada um.

## Quando unificar faz sentido

Se os dois já estão pensando em ter filhos ou querem simplificar a gestão financeira da casa, reunir num plano familiar (com um dos dois como titular e o outro como dependente) pode ser mais prático e, dependendo da operadora, mais em conta.

## Quando manter separado pode compensar

Se um dos dois já tem plano empresarial pelo trabalho com boas condições, pode não valer a pena abrir mão dele só pra unificar — vale comparar o custo total das duas situações antes de decidir.

${CLOSING}`,
  },
  {
    slug: "dependente-titular-sai-emprego",
    title: "Plano familiar: o que acontece com o dependente quando o titular sai da empresa",
    category: "familiar",
    excerpt:
      "Se o plano é empresarial, a saída do titular do emprego afeta diretamente os dependentes. Entenda as regras.",
    body: `Quando o plano de saúde da família é vinculado ao emprego do titular (plano empresarial), a saída dele da empresa — seja demissão, seja pedido de desligamento — impacta diretamente a cobertura de todos os dependentes.

## A regra de manutenção após demissão

Em caso de demissão sem justa causa, o ex-funcionário (e seus dependentes) pode ter direito a permanecer no plano por um período determinado, desde que assuma o pagamento integral da mensalidade — as condições exatas variam conforme o tempo de contribuição.

## O que fazer depois desse período

Passado o prazo de manutenção, a família precisa migrar pra outro plano — seja um novo plano empresarial (se o titular conseguir novo emprego com esse benefício), seja um plano individual/familiar contratado diretamente, avaliando a portabilidade de carências se aplicável.

${CLOSING}`,
  },
  {
    slug: "plano-saude-adolescentes-faixa-etaria",
    title: "Plano de saúde para adolescentes: o que mudou na faixa etária",
    category: "familiar",
    excerpt:
      "A faixa de 0 a 18 anos é a mais barata das 10 definidas pela ANS — mas isso muda assim que o filho completa 19.",
    body: `Dentro das 10 faixas etárias definidas pela ANS, crianças e adolescentes de 0 a 18 anos ficam na primeira faixa, geralmente a mais barata — mas isso muda de forma perceptível assim que o filho completa 19 anos.

## A mudança de faixa aos 19 anos

Ao entrar na segunda faixa (19 a 23 anos), o valor da mensalidade do dependente sobe, mesmo sem nenhum reajuste anual ter acontecido — é só o efeito da mudança de faixa etária, previsto desde a contratação.

## Como se planejar pra essa mudança

Vale já considerar esse aumento no orçamento familiar conforme os filhos se aproximam dos 19 anos, pra que a mudança de faixa não pegue de surpresa no planejamento financeiro da casa.

${CLOSING}`,
  },
  {
    slug: "plano-familiar-separacao-divorcio",
    title: "Plano de saúde familiar: como funciona em caso de separação/divórcio",
    category: "familiar",
    excerpt:
      "A saída de um dos titulares do plano conjunto levanta dúvidas sobre dependentes, carência e continuidade.",
    body: `Uma separação ou divórcio traz decisões práticas também sobre o plano de saúde da família — principalmente quando os filhos estão como dependentes do plano de um dos dois.

## O que costuma acontecer com os filhos

Os filhos geralmente permanecem como dependentes do titular original do plano, mas isso pode ser renegociado entre os pais — inclusive migrando os filhos pra um plano contratado pelo outro genitor, se fizer mais sentido pro arranjo familiar.

## E o cônjuge que sai do plano?

Quem deixa de ser dependente (ex-cônjuge) perde a cobertura daquele plano e precisa contratar um novo — vale avaliar direito à portabilidade de carências, já que o tempo de plano anterior pode ser aproveitado dependendo da situação.

${CLOSING}`,
  },
  {
    slug: "filho-universitario-fora-de-casa-plano",
    title: "Filho universitário fora de casa: dá pra manter no plano da família?",
    category: "familiar",
    excerpt:
      "Morar em outra cidade não impede continuar como dependente, mas a rede credenciada local merece atenção.",
    body: `Filho que sai de casa pra estudar em outra cidade continua podendo ser dependente do plano de saúde da família — a mudança de endereço não retira, por si só, o direito à cobertura.

## O que precisa ser checado

Vale confirmar se a rede credenciada do plano cobre a cidade onde o filho vai morar, especialmente se o plano tiver abrangência regional — nesse caso, pode ser necessário considerar um plano com abrangência nacional.

## Alternativa: plano próprio na cidade nova

Se a rede não cobrir bem a cidade nova, outra opção é avaliar um plano individual pro filho, contratado especificamente considerando a rede credenciada disponível na cidade onde ele vai morar durante a faculdade.

${CLOSING}`,
  },
  {
    slug: "familiar-acomodacao-diferente-por-pessoa",
    title: "Plano de saúde familiar: vale contratar acomodação diferente por pessoa?",
    category: "familiar",
    excerpt:
      "Em alguns planos é possível ter tipos de acomodação diferentes dentro da mesma família. Veja quando faz sentido.",
    body: `Dependendo da operadora, é possível contratar tipos de acomodação diferentes pra cada membro da família dentro do mesmo plano — por exemplo, apartamento pros pais e enfermaria pros filhos, ou vice-versa.

## Por que alguém optaria por isso

Famílias com orçamento apertado às vezes preferem concentrar o investimento em apartamento pros membros que mais usam o plano (como idosos ou quem tem alguma condição de saúde) e manter enfermaria pros demais, reduzindo o custo total.

## Nem toda operadora oferece essa flexibilidade

Vale confirmar diretamente se a operadora permite essa mistura de acomodações dentro de um mesmo plano familiar — algumas exigem que todos os membros tenham o mesmo tipo de acomodação.

${CLOSING}`,
  },
  {
    slug: "incluir-pais-plano-depois-60-anos",
    title: "Como incluir pais no plano de saúde depois dos 60 anos",
    category: "familiar",
    excerpt:
      "A faixa etária mais avançada tem regras próprias de precificação e, em alguns casos, restrições de idade máxima.",
    body: `Incluir pais com mais de 60 anos como dependentes no plano de saúde é possível na maioria dos casos, mas exige atenção a dois pontos: o custo (faixa etária mais cara) e eventuais restrições de idade máxima pra inclusão.

## Idade máxima pra inclusão como dependente

Algumas operadoras estabelecem um limite de idade pra inclusão de um novo dependente que não seja cônjuge ou filho — vale confirmar esse detalhe antes de iniciar o processo, já que a regra varia bastante entre operadoras.

## Carência ainda se aplica

Mesmo sendo incluído num plano familiar já existente, um novo dependente precisa cumprir os prazos de carência normalmente, salvo se tiver direito a portabilidade de um plano anterior próprio.

${CLOSING}`,
  },
  {
    slug: "desconto-familias-grandes-plano-saude",
    title: "Plano de saúde para famílias grandes: existe desconto por quantidade?",
    category: "familiar",
    excerpt:
      "Não existe uma regra padrão de desconto por número de dependentes — mas algumas operadoras negociam condições especiais.",
    body: `Famílias com muitos dependentes (três, quatro filhos ou mais) costumam se perguntar se existe algum desconto por quantidade na hora de contratar plano de saúde — a resposta não é padronizada no mercado.

## Como normalmente funciona a cobrança

Na maioria dos planos, cada dependente é cobrado individualmente pela faixa etária dele, sem desconto automático por quantidade de pessoas incluídas — o valor final é a soma direta de cada mensalidade individual.

## Onde pode haver condição especial

Algumas operadoras ou corretoras oferecem condições comerciais específicas pra famílias grandes dentro de campanhas pontuais — vale perguntar diretamente na cotação se existe alguma condição desse tipo disponível no momento.

${CLOSING}`,
  },
  {
    slug: "dependente-desempregado-plano-familiar",
    title: "O que fazer quando um dependente do plano familiar fica desempregado",
    category: "familiar",
    excerpt:
      "Perder o emprego não afeta diretamente quem já é dependente de um plano familiar contratado por outra pessoa.",
    body: `Se um dependente do plano familiar perde o emprego, isso não afeta, por si só, a cobertura dele dentro do plano — a questão do desemprego só se torna relevante se o próprio dependente for o titular de outro plano vinculado ao trabalho.

## Quando a preocupação é real

O cenário que exige atenção é quando o desemprego é do titular do plano familiar — nesse caso, sim, é preciso considerar se ele consegue manter o pagamento da mensalidade de toda a família ou se precisa reavaliar o plano contratado.

## Uma alternativa pra reduzir custo temporariamente

Em momentos de aperto financeiro, vale considerar reduzir a cobertura (por exemplo, migrar pra um plano com coparticipação ou acomodação em enfermaria) em vez de cancelar o plano por completo, preservando a carência já cumprida.

${CLOSING}`,
  },
  {
    slug: "familiar-coparticipacao-dividir-custo",
    title: "Plano de saúde familiar com coparticipação: como dividir o custo entre todos",
    category: "familiar",
    excerpt:
      "Cada uso individual gera coparticipação — entenda como isso se distribui entre os membros da família.",
    body: `Num plano de saúde familiar com coparticipação, cada consulta, exame ou procedimento gera um valor adicional cobrado especificamente de quem usou aquele atendimento — não é uma divisão igual entre todos os membros da família.

## Como a cobrança costuma aparecer

A fatura mensal normalmente detalha, por pessoa, os atendimentos que geraram coparticipação naquele mês — o que ajuda a família a acompanhar quem está usando mais o plano e quanto isso está pesando no total.

## Como planejar o orçamento familiar

Vale simular, com base no histórico de uso de cada membro, quanto a coparticipação tende a somar por mês, além da mensalidade fixa, pra não ter surpresa na hora de fechar as contas.

${CLOSING}`,
  },
  {
    slug: "plano-saude-bebes-antes-nascimento",
    title: "Plano de saúde para bebês: o que verificar antes do nascimento",
    category: "familiar",
    excerpt:
      "A inclusão do recém-nascido tem uma janela de carência zero — mas alguns detalhes precisam ser resolvidos antes do parto.",
    body: `Planejar a inclusão do bebê no plano de saúde da família antes mesmo do nascimento evita correria no período pós-parto, quando o foco naturalmente está em outras prioridades.

## A janela de inclusão sem carência

Recém-nascidos, filhos de titular ou dependente já no plano, costumam ter direito a inclusão sem cumprir carência dentro de uma janela específica após o nascimento (normalmente até 30 dias) — o prazo exato deve ser confirmado com a operadora escolhida antes do parto.

## O que deixar organizado antes do nascimento

Vale confirmar com a operadora qual documentação vai ser exigida (certidão de nascimento, entre outros) e o prazo exato pra solicitar a inclusão, deixando tudo pronto pra agir assim que o bebê nascer.

${CLOSING}`,
  },
  {
    slug: "plano-familiar-exclusao-dependente",
    title: "Plano familiar: como funciona a exclusão de um dependente",
    category: "familiar",
    excerpt:
      "Retirar alguém do plano é possível a qualquer momento, mas envolve alguns cuidados práticos.",
    body: `Excluir um dependente de um plano de saúde familiar — seja por maioridade, separação ou qualquer outro motivo — é um processo relativamente simples, solicitado formalmente à operadora pelo titular do plano.

## Como o pedido costuma ser feito

O titular solicita a exclusão pelos canais da operadora (aplicativo, telefone ou presencialmente), e a mensalidade da família é ajustada a partir do próximo ciclo de cobrança, descontando o valor daquele dependente.

## O que o dependente excluído perde

Ao ser excluído, a pessoa perde a cobertura e, na maioria dos casos, o tempo de plano cumprido até ali — a menos que solicite um plano próprio logo em seguida e tenha direito a portabilidade de carências, aproveitando o tempo já cumprido no plano familiar.

${CLOSING}`,
  },
  {
    slug: "plano-saude-beneficio-vale-mais-aumento",
    title: "Plano de saúde como benefício: vale mais que aumento de salário?",
    category: "empresarial",
    excerpt:
      "Comparar o valor real de um plano de saúde como benefício ajuda a entender seu peso na remuneração total.",
    body: `Quando uma empresa oferece plano de saúde como benefício, na prática está entregando um valor que, se fosse convertido em salário, sofreria desconto de impostos — o que faz o benefício valer, na prática, mais do que o mesmo valor em dinheiro.

## Por que o benefício "rende" mais

O valor do plano de saúde pago pela empresa não sofre a mesma tributação que incidiria sobre um aumento de salário equivalente — isso significa que o funcionário recebe o valor cheio da cobertura, sem desconto proporcional.

## O que considerar além do valor

Vale também considerar a qualidade da rede credenciada oferecida — um plano de saúde com rede limitada pode valer menos na prática do que um valor em dinheiro, dependendo da necessidade de cada funcionário.

${CLOSING}`,
  },
  {
    slug: "plano-empresarial-quem-paga",
    title: "Plano de saúde empresarial: quem paga, empresa ou funcionário?",
    category: "empresarial",
    excerpt:
      "A divisão do custo varia bastante entre empresas — veja os modelos mais comuns.",
    body: `Não existe uma regra única sobre quem paga o plano de saúde empresarial — cada empresa define seu próprio modelo de custeio, dentro do que negocia com a operadora.

## Modelos mais comuns

Em alguns casos, a empresa arca com 100% do custo do titular (funcionário) e cobra uma parte ou o valor integral dos dependentes incluídos. Em outros, existe uma divisão percentual entre empresa e funcionário mesmo pro titular.

## Como isso costuma ser definido

Essa divisão normalmente consta na política interna de benefícios da empresa, negociada junto com a contratação do plano — vale sempre confirmar as regras específicas antes de incluir dependentes, já que isso pode gerar custo adicional pro funcionário.

${CLOSING}`,
  },
  {
    slug: "coparticipacao-plano-empresarial",
    title: "Como funciona a coparticipação em plano de saúde empresarial",
    category: "empresarial",
    excerpt:
      "Muitas empresas adotam coparticipação pra equilibrar custo do benefício com uso consciente do plano.",
    body: `Coparticipação em plano de saúde empresarial funciona de forma parecida com a de planos individuais: além da mensalidade (geralmente paga total ou parcialmente pela empresa), o funcionário paga um valor adicional a cada uso de determinados serviços.

## Por que empresas adotam esse modelo

A coparticipação ajuda a controlar o custo total do plano pra empresa, já que reduz o uso desnecessário de consultas e exames, mantendo a mensalidade coletiva mais estável ao longo do tempo.

## O que o funcionário deve saber

Vale entender a tabela de coparticipação da empresa antes de usar o plano com frequência, já que o valor pode ser descontado direto em folha de pagamento, dependendo da política adotada.

${CLOSING}`,
  },
  {
    slug: "pme-funcionario-demitido-o-que-acontece",
    title: "Plano de saúde PME: o que acontece quando um funcionário é demitido",
    category: "empresarial",
    excerpt:
      "A saída do funcionário não encerra automaticamente o direito à cobertura — existem regras de manutenção temporária.",
    body: `Quando um funcionário é demitido, o vínculo dele com o plano de saúde empresarial não termina imediatamente em todos os casos — existem regras específicas de manutenção temporária previstas em lei.

## Demissão sem justa causa

Nesse caso, o ex-funcionário pode ter direito a permanecer no plano por um período determinado, pagando a mensalidade integral (já que a empresa deixa de contribuir), desde que tenha contribuído para o plano durante o vínculo empregatício.

## Demissão por justa causa ou pedido de demissão

Nesses casos, em geral, o direito à manutenção não se aplica automaticamente — o mais seguro é confirmar a situação específica diretamente com o RH da empresa e com a operadora.

${CLOSING}`,
  },
  {
    slug: "empresa-plano-so-alguns-cargos",
    title: "Empresa pode oferecer plano de saúde só pra alguns cargos?",
    category: "empresarial",
    excerpt:
      "É uma prática comum, mas precisa seguir critérios objetivos pra não configurar discriminação.",
    body: `É comum empresas oferecerem plano de saúde só pra determinados cargos ou níveis hierárquicos, geralmente como parte de uma política de benefícios escalonada — mas essa diferenciação precisa seguir critérios objetivos e transparentes.

## O que costuma ser aceitável

Diferenciar benefícios por tempo de casa, nível hierárquico ou tipo de contrato (CLT x estagiário, por exemplo) é uma prática comum e geralmente aceita, desde que aplicada de forma consistente e sem critérios discriminatórios.

## O que vale a pena formalizar

Empresas que adotam esse modelo costumam deixar os critérios claros na política interna de benefícios, evitando ambiguidade sobre quem tem direito ao plano e em que condições.

${CLOSING}`,
  },
  {
    slug: "negociar-reajuste-plano-empresarial",
    title: "Como negociar reajuste de plano de saúde empresarial com a operadora",
    category: "empresarial",
    excerpt:
      "Diferente do plano individual, o reajuste empresarial é negociável — veja o que pesa nessa conversa.",
    body: `Ao contrário do plano individual, em que o reajuste segue um índice máximo definido pela ANS, o reajuste do plano empresarial é negociado diretamente entre a empresa e a operadora — o que abre espaço real pra negociação.

## O que a operadora considera

A sinistralidade do grupo (quanto foi usado em relação ao que foi pago em mensalidades) é o principal fator que a operadora considera ao propor o reajuste anual — grupos com uso muito acima da média tendem a receber propostas de reajuste mais altas.

## Como se preparar pra negociar

Ter o histórico de sinistralidade em mãos, comparar propostas de outras operadoras e, se possível, contar com apoio de uma corretora especializada em negociação de contratos coletivos ajuda a chegar num reajuste mais razoável.

${CLOSING}`,
  },
  {
    slug: "incluir-dependentes-funcionarios-empresarial",
    title: "Plano de saúde empresarial: vale incluir dependentes dos funcionários?",
    category: "empresarial",
    excerpt:
      "Estender o benefício aos dependentes tem custo, mas pode fazer diferença na retenção de talentos.",
    body: `Muitas empresas que oferecem plano de saúde permitem que o funcionário inclua dependentes (cônjuge, filhos), geralmente com custo adicional total ou parcialmente pago pelo próprio funcionário.

## O impacto na retenção de funcionários

Permitir a inclusão de dependentes costuma ser bem avaliado pelos funcionários, já que amplia o valor percebido do benefício pra além de quem trabalha na empresa — pode pesar positivamente em decisões de permanência no emprego.

## Como estruturar o custo

A forma mais comum é a empresa arcar com o plano do titular e o funcionário pagar (via desconto em folha) pela inclusão dos dependentes, no todo ou em parte — cada empresa define essa política conforme seu orçamento de benefícios.

${CLOSING}`,
  },
  {
    slug: "rescisao-contrato-plano-empresarial",
    title: "O que é rescisão do contrato de plano de saúde empresarial",
    category: "empresarial",
    excerpt:
      "A operadora pode encerrar o contrato coletivo mesmo com os funcionários em dia. Entenda as regras.",
    body: `Diferente do plano individual, em que o cancelamento pela operadora só pode acontecer em situações bem específicas, o plano empresarial pode ser rescindido pela operadora mediante aviso prévio, mesmo com a empresa em dia com os pagamentos.

## O prazo de aviso prévio

A rescisão geralmente exige aviso prévio de pelo menos 60 dias, dando tempo pra empresa buscar uma nova operadora antes de deixar os funcionários sem cobertura.

## Como a empresa deve se preparar

Diante de um aviso de rescisão, o mais indicado é já iniciar a busca por uma operadora nova imediatamente, avaliando a portabilidade especial de carências pros funcionários, que costuma se aplicar nesses casos.

${CLOSING}`,
  },
  {
    slug: "plano-saude-startups-comecar-pequeno",
    title: "Plano de saúde para startups: como começar pequeno e crescer",
    category: "empresarial",
    excerpt:
      "Empresas em fase inicial podem estruturar o benefício aos poucos, sem comprometer o caixa.",
    body: `Startups e empresas em fase inicial de crescimento costumam ter caixa mais apertado, o que exige uma abordagem cuidadosa na hora de estruturar o benefício de plano de saúde pro time.

## Começar com o essencial

Uma abordagem comum é começar oferecendo o plano só pro titular (funcionário), sem incluir dependentes automaticamente, e reavaliar a expansão do benefício conforme a empresa cresce e o orçamento permite.

## Vale considerar coparticipação no início

Planos com coparticipação costumam ter mensalidade inicial mais baixa, o que pode ser uma forma de oferecer o benefício desde já sem pesar tanto no caixa da empresa em fase inicial.

${CLOSING}`,
  },
  {
    slug: "passo-a-passo-trocar-operadora-empresarial",
    title: "Passo a passo pra trocar de operadora no plano empresarial",
    category: "empresarial",
    excerpt:
      "Migrar o plano de toda a empresa exige planejamento pra não deixar ninguém sem cobertura no meio do caminho.",
    body: `Trocar de operadora no plano de saúde empresarial é um processo que envolve mais etapas do que uma troca individual, já que afeta todo o time de uma vez — vale planejar com antecedência.

## As etapas principais

Cotar e comparar propostas de novas operadoras, confirmar a elegibilidade pra portabilidade especial de carências dos funcionários, formalizar o novo contrato e só então encerrar o contrato com a operadora atual, evitando qualquer período sem cobertura.

## O que comunicar ao time

Avisar os funcionários com antecedência sobre a mudança, incluindo a data de transição e como fica o cartão/aplicativo do plano nesse período, ajuda a evitar dúvidas e uso incorreto durante a troca.

${CLOSING}`,
  },
  {
    slug: "portabilidade-especial-demitido-empresarial",
    title: "Plano de saúde empresarial: como funciona a portabilidade especial de demitido",
    category: "empresarial",
    excerpt:
      "Quem sai da empresa e perde o plano tem um caminho específico pra não perder carência.",
    body: `Quando um funcionário é desligado e não opta (ou não tem direito) pela manutenção do plano empresarial, existe a chamada portabilidade especial de carências — um caminho pensado justamente pra esse cenário.

## O que diferencia da portabilidade comum

A portabilidade especial dispensa alguns dos requisitos exigidos na portabilidade comum (como tempo mínimo de permanência), justamente porque a saída do plano não foi uma escolha do beneficiário.

## O prazo pra usar esse direito

Existe um prazo determinado após o desligamento pra solicitar a portabilidade especial — passado esse prazo, as regras de portabilidade comum voltam a valer, com seus requisitos normais.

${CLOSING}`,
  },
  {
    slug: "quanto-tempo-ex-funcionario-fica-plano",
    title: "Quanto tempo o ex-funcionário pode ficar no plano após demissão (regra de manutenção)",
    category: "empresarial",
    excerpt:
      "A regra de manutenção tem prazo limitado, proporcional ao tempo de contribuição do funcionário.",
    body: `A regra de manutenção do plano de saúde após demissão sem justa causa não é vitalícia — o prazo em que o ex-funcionário pode permanecer, pagando a mensalidade integral, é limitado e costuma ser proporcional ao tempo de contribuição durante o vínculo empregatício.

## Como o prazo costuma ser definido

Quanto mais tempo o funcionário contribuiu pro plano durante o emprego, maior tende a ser o prazo de manutenção disponível após a demissão, dentro de limites máximos definidos em lei.

## O que fazer quando o prazo se esgota

Antes do prazo de manutenção acabar, vale já pesquisar as próximas opções — seja um plano individual, seja o plano de um novo emprego — pra não ficar sem cobertura no meio do caminho.

${CLOSING}`,
  },
  {
    slug: "por-que-mensalidade-varia-empresas-mesmo-porte",
    title: "Plano de saúde empresarial: por que a mensalidade varia entre empresas do mesmo porte",
    category: "empresarial",
    excerpt:
      "Número de funcionários não é o único fator — perfil etário do grupo e histórico de uso também pesam.",
    body: `Duas empresas do mesmo porte, com número parecido de funcionários, podem receber propostas de mensalidade bem diferentes pra um plano de saúde empresarial — e isso tem explicação na forma como a operadora avalia o risco do grupo.

## Perfil etário do grupo

Uma empresa com funcionários mais jovens tende a receber propostas com mensalidade menor do que uma empresa com funcionários em faixas etárias mais avançadas, já que o uso médio esperado é diferente.

## Histórico de sinistralidade

Empresas que já têm plano de saúde há tempo e usam muito o benefício podem receber propostas de reajuste ou de troca de operadora com valores mais altos, refletindo o histórico de uso do grupo.

${CLOSING}`,
  },
  {
    slug: "plano-saude-com-seguro-vida-junto",
    title: "Vale contratar plano de saúde com seguro de vida junto?",
    category: "empresarial",
    excerpt:
      "Alguns pacotes empresariais combinam os dois benefícios. Veja quando essa combinação faz sentido.",
    body: `Algumas operadoras e corretoras oferecem pacotes que combinam plano de saúde e seguro de vida num único contrato empresarial — o que pode simplificar a gestão de benefícios, mas nem sempre é a opção mais econômica.

## Vantagens da combinação

Um único fornecedor, um único boleto e, em alguns casos, condições comerciais mais competitivas do que contratar os dois serviços separadamente com fornecedores diferentes.

## Quando vale comparar separado

Se a empresa já tem um seguro de vida com boas condições, pode valer mais a pena manter os contratos separados e escolher a melhor operadora de plano de saúde de forma independente, sem se prender ao pacote combinado.

${CLOSING}`,
  },
  {
    slug: "plano-empresarial-nacional-regional-filiais",
    title: "Como escolher entre plano empresarial nacional ou regional pra empresa com filiais",
    category: "empresarial",
    excerpt:
      "Empresas com operação em mais de uma cidade precisam pensar na abrangência da rede credenciada com cuidado.",
    body: `Empresas com filiais em cidades diferentes enfrentam uma decisão específica na hora de contratar plano de saúde: abrangência nacional (cobrindo todas as unidades) ou planos regionais separados por localidade.

## Vantagens do plano nacional único

Um único contrato, uma única política de benefícios e a mesma cobertura pra todos os funcionários, independente da filial onde trabalham — o que simplifica a gestão de RH.

## Quando planos regionais separados fazem mais sentido

Se as filiais têm portes muito diferentes ou se a rede credenciada de uma operadora nacional não é tão forte em alguma das cidades, pode valer avaliar contratos regionais separados, otimizados pra rede local de cada unidade.

${CLOSING}`,
  },
  {
    slug: "perguntas-antes-trocar-operadora-empresarial",
    title: "Plano de saúde empresarial: o que perguntar antes de trocar de operadora",
    category: "empresarial",
    excerpt:
      "Antes de assinar com uma operadora nova, algumas perguntas evitam surpresa desagradável pro time.",
    body: `Trocar de operadora no plano de saúde empresarial impacta todo o time de uma vez, então vale fazer algumas perguntas certas antes de fechar com uma operadora nova.

## Sobre a rede credenciada

A rede nova cobre os hospitais e clínicas que os funcionários já usam? Existe alguma lacuna na rede em relação à operadora atual, especialmente em cidades onde a empresa tem filiais?

## Sobre carência e portabilidade

Os funcionários vão precisar cumprir carência de novo, ou existe portabilidade especial aplicável nesse tipo de troca coletiva? Essa é uma das perguntas mais importantes, já que afeta diretamente o uso do plano logo após a transição.

${CLOSING}`,
  },
  {
    slug: "mei-recem-aberto-quanto-tempo-esperar",
    title: "Plano de saúde pra MEI recém aberto: quanto tempo esperar pra contratar",
    category: "mei",
    excerpt:
      "Algumas operadoras pedem tempo mínimo de CNPJ aberto pra aceitar o plano PME. Veja o que considerar.",
    body: `Quem acabou de abrir o MEI e já quer contratar plano de saúde no formato PME/empresarial pode esbarrar numa exigência comum: tempo mínimo de CNPJ ativo, definido por cada operadora.

## Por que essa exigência existe

Operadoras usam o tempo mínimo de CNPJ como uma forma de reduzir o risco de contratações feitas só pra conseguir um plano mais barato, sem intenção real de manter a atividade empresarial.

## O que fazer enquanto o CNPJ é recente

Se o MEI foi aberto há pouco tempo e a operadora desejada exige um prazo mínimo, vale considerar o plano individual como opção temporária, migrando pro PME assim que o CNPJ completar o tempo exigido.

${CLOSING}`,
  },
  {
    slug: "mei-incluir-familia-empresarial",
    title: "MEI pode incluir a família no plano de saúde empresarial?",
    category: "mei",
    excerpt:
      "Sim, na maioria dos casos — mas as regras de inclusão de dependentes seguem a mesma lógica dos planos PME comuns.",
    body: `Quem é MEI e contrata um plano de saúde no formato PME geralmente pode incluir dependentes (cônjuge, filhos) da mesma forma que qualquer outro plano empresarial permite, seguindo as regras específicas de cada operadora.

## Como funciona na prática

O MEI, como titular do CNPJ, entra como beneficiário titular do plano, e os dependentes são incluídos seguindo a mesma lógica de custo por faixa etária de qualquer plano familiar — cada um pagando conforme a própria idade.

## Vale comparar com o plano individual pra família

Como o MEI tem acesso tanto ao plano PME quanto ao individual, vale comparar os dois formatos incluindo os dependentes em cada simulação, já que a diferença de preço pode ser significativa.

${CLOSING}`,
  },
  {
    slug: "quanto-custa-em-media-plano-mei",
    title: "Quanto custa em média um plano de saúde pra MEI (o que considerar)",
    category: "mei",
    excerpt:
      "Não existe um valor fixo — mas alguns fatores ajudam a entender a faixa de preço esperada.",
    body: `Não existe uma tabela única de preço pra plano de saúde de MEI — o valor final depende da idade do titular, da cidade, da operadora escolhida e do tipo de acomodação e rede desejados.

## O que costuma pesar mais no preço

Assim como em qualquer plano, a idade é o fator com mais peso, seguido pela cidade (rede credenciada mais concorrida costuma custar mais) e pela abrangência escolhida (regional ou nacional).

## Como ter uma estimativa real

O jeito mais confiável de saber quanto vai custar é pedir uma cotação real informando idade, cidade e CNPJ — usar valores de terceiros como referência pode enganar, já que cada situação é única.

${CLOSING}`,
  },
  {
    slug: "mei-fatura-pouco-orcamento-plano",
    title: "MEI que fatura pouco: como caber o plano de saúde no orçamento",
    category: "mei",
    excerpt:
      "Faturamento baixo não impede o acesso ao plano PME, mas exige planejamento pra caber no orçamento.",
    body: `Ter faturamento baixo como MEI não impede a contratação de um plano de saúde PME — as operadoras avaliam o CNPJ pela documentação e tempo de abertura, não diretamente pelo faturamento declarado.

## Como planejar o orçamento

Vale simular o valor do plano dentro do orçamento mensal real do negócio, considerando também que planos com coparticipação costumam ter mensalidade inicial mais baixa, o que pode ajudar a caber melhor no início.

## Vale considerar o plano individual como alternativa

Se o valor do PME ainda pesar muito no orçamento, comparar com o plano individual pode revelar uma opção mais em conta, dependendo da idade e da operadora escolhida.

${CLOSING}`,
  },
  {
    slug: "mei-outro-emprego-clt-tambem",
    title: "Plano de saúde pra MEI: o que muda se eu tiver outro emprego CLT também",
    category: "mei",
    excerpt:
      "Quem acumula MEI com CLT pode ter acesso a dois planos possíveis — veja como decidir entre eles.",
    body: `É comum ter MEI como atividade extra além de um emprego CLT — e nesse caso, a pessoa pode ter acesso tanto ao plano de saúde oferecido pela empresa CLT quanto ao plano PME através do próprio MEI.

## Como decidir entre os dois

Vale comparar a rede credenciada e as condições de cada plano — às vezes o plano do emprego CLT tem melhores condições por ser negociado com um grupo maior de funcionários, mas isso não é uma regra geral.

## Dá pra ter os dois ao mesmo tempo?

Tecnicamente é possível ter mais de um plano de saúde ativo, mas isso significa pagar duas mensalidades — geralmente só compensa se cada plano cobrir uma necessidade diferente (por exemplo, redes credenciadas complementares em cidades diferentes).

${CLOSING}`,
  },
  {
    slug: "vale-abrir-mei-so-plano-mais-barato",
    title: "Vale abrir MEI só pra ter acesso a plano de saúde mais barato?",
    category: "mei",
    excerpt:
      "A diferença de preço pode ser real, mas abrir CNPJ traz outras obrigações que também entram na conta.",
    body: `Como o plano PME costuma sair mais em conta que o individual equivalente, algumas pessoas consideram abrir um MEI só com esse objetivo — mas vale pesar outros fatores antes de decidir só pelo plano de saúde.

## O que abrir MEI implica além do plano

Abrir CNPJ como MEI traz obrigações próprias, como a guia mensal (DAS), declaração anual de faturamento e a necessidade de manter uma atividade formalmente registrada — não é só um "cadastro" pra acessar benefícios.

## Como pesar a decisão

Se você já pretendia ter uma atividade formalizada de qualquer forma, a economia no plano de saúde é um bônus real. Se a única motivação é o plano, vale calcular se a economia mensal compensa as obrigações extras de manter um CNPJ ativo.

${CLOSING}`,
  },
  {
    slug: "mei-portabilidade-tempo-anterior",
    title: "MEI e portabilidade: dá pra levar o tempo de plano anterior?",
    category: "mei",
    excerpt:
      "Trocar de um plano individual pra um PME de MEI também pode usar portabilidade de carências.",
    body: `Sim — a portabilidade de carências não é exclusiva de trocas entre planos do mesmo tipo. Quem tem plano individual e quer migrar pra um PME contratado como MEI pode ter direito à portabilidade, seguindo as regras normais de elegibilidade.

## O que continua sendo exigido

Tempo mínimo de permanência no plano de origem, estar em dia com os pagamentos e compatibilidade de faixa de preço entre os planos — as mesmas regras que valem pra qualquer portabilidade continuam se aplicando nesse tipo de troca.

## Por que vale considerar essa opção

Se o plano PME sair mais em conta e você já tem tempo suficiente no plano individual atual, a portabilidade evita ter que cumprir os prazos de carência de novo, tornando a troca ainda mais vantajosa.

${CLOSING}`,
  },
  {
    slug: "mei-documentos-cnpj-operadora",
    title: "Plano de saúde MEI: quais documentos a operadora costuma exigir do CNPJ",
    category: "mei",
    excerpt:
      "Além dos documentos pessoais, a operadora pede comprovação da atividade formal do MEI.",
    body: `Contratar um plano de saúde como MEI exige, além dos documentos pessoais de sempre, uma documentação específica que comprove a formalização da atividade empresarial.

## Documentos geralmente pedidos

Cartão CNPJ atualizado (emitido recentemente), Certificado de Condição de Microempreendedor Individual (CCMEI) e, em alguns casos, comprovante de atividade recente, como a última declaração anual do MEI (DASN-SIMEI).

## Por que a atualização importa

Documentos desatualizados (como um cartão CNPJ antigo) são uma das causas mais comuns de atraso na análise — vale emitir a documentação atualizada direto no site do MEI antes de iniciar a contratação.

${CLOSING}`,
  },
  {
    slug: "cnpj-mei-baixado-plano-ativo",
    title: "O que fazer se o CNPJ do MEI for baixado com o plano ativo",
    category: "mei",
    excerpt:
      "Encerrar o CNPJ afeta a continuidade do plano PME. Veja o que considerar antes de dar baixa.",
    body: `Dar baixa no CNPJ do MEI enquanto o plano de saúde PME está ativo tem consequência direta: o vínculo que justificava o plano nesse formato deixa de existir, o que pode levar ao cancelamento da modalidade.

## O que costuma acontecer

Sem CNPJ ativo, a operadora pode encerrar o plano PME ou oferecer a migração pra um plano individual equivalente — as regras exatas variam conforme a operadora e o contrato assinado.

## Como se planejar antes de baixar o CNPJ

Antes de encerrar o MEI, vale confirmar com a operadora o que acontece com o plano e já organizar a migração pra outro formato, evitando ficar sem cobertura no meio do processo.

${CLOSING}`,
  },
  {
    slug: "mei-individual-ou-pme-2026",
    title: "MEI: plano de saúde individual ou PME, o que sai mais em conta em 2026",
    category: "mei",
    excerpt:
      "A resposta muda de operadora pra operadora — o caminho mais seguro é comparar cotações reais.",
    body: `Não existe uma resposta única sobre se o plano individual ou o PME sai mais em conta pra quem é MEI — a diferença de preço varia conforme a operadora, a cidade e a idade do titular.

## Por que o PME costuma (mas nem sempre) ser mais barato

Planos PME são precificados considerando uma lógica de benefício corporativo, o que costuma resultar em mensalidade menor — mas essa vantagem não é garantida em todas as operadoras e faixas etárias.

## O caminho mais confiável

Pedir cotação dos dois formatos, com a mesma idade e cidade, é a única forma realmente confiável de saber qual compensa mais no seu caso específico em 2026.

${CLOSING}`,
  },
  {
    slug: "plano-saude-motorista-app-entregador-mei",
    title: "Plano de saúde pra motorista de aplicativo e entregador MEI",
    category: "mei",
    excerpt:
      "Quem trabalha por aplicativo e tem MEI também tem acesso ao plano PME. Veja o que considerar nessa rotina.",
    body: `Motoristas de aplicativo e entregadores que atuam como MEI têm acesso ao plano de saúde no formato PME, da mesma forma que qualquer outro microempreendedor individual com CNPJ ativo.

## O que pesa mais nessa rotina de trabalho

Quem passa muitas horas na rua está mais exposto a acidentes e imprevistos, o que torna a cobertura de urgência e emergência (com carência de apenas 24 horas) um ponto de atenção especial ao escolher o plano.

## Vale considerar a rede de pronto-socorro

Verificar se a rede credenciada tem boa cobertura de pronto-socorro nas regiões onde você mais trabalha ajuda a garantir atendimento rápido em caso de imprevisto durante a rotina.

${CLOSING}`,
  },
  {
    slug: "mei-dependentes-inclusao-pme",
    title: "MEI com dependentes: como funciona a inclusão no plano PME",
    category: "mei",
    excerpt:
      "Incluir cônjuge e filhos no plano PME de MEI segue a mesma lógica de qualquer plano familiar.",
    body: `MEI que quer incluir dependentes no plano PME segue a mesma lógica de qualquer outro plano empresarial: cada dependente é cobrado individualmente, conforme a própria faixa etária, somado ao valor do titular.

## O que verificar antes de incluir

Confirma com a operadora se ela aceita a inclusão de dependentes em planos PME de MEI especificamente — algumas têm regras um pouco diferentes das aplicadas a empresas com múltiplos funcionários.

## Vale comparar com o plano individual pra família

Assim como pro titular, vale simular o custo total da família no PME e comparar com o custo de cada um contratando planos individuais separados, pra ver qual formato compensa mais no total.

${CLOSING}`,
  },
  {
    slug: "plano-saude-profissional-liberal-cnpj",
    title: "Plano de saúde pra profissional liberal com CNPJ: o que muda",
    category: "mei",
    excerpt:
      "Profissionais liberais com CNPJ próprio (não MEI) também têm acesso ao formato PME, com regras específicas.",
    body: `Profissionais liberais que atuam com CNPJ próprio — não necessariamente como MEI, mas como sociedade unipessoal ou outro formato — também têm acesso a planos de saúde no formato PME, seguindo regras que variam conforme o porte da empresa.

## O que pode mudar em relação ao MEI

Dependendo do formato jurídico do CNPJ, a documentação exigida e as condições de contratação podem ser um pouco diferentes das aplicadas a um MEI simples — vale confirmar diretamente com a operadora qual documentação é necessária pro seu tipo específico de CNPJ.

## Vantagem de ter CNPJ próprio

Profissionais liberais com CNPJ costumam ter mais flexibilidade pra negociar condições de plano de saúde do que quem depende só do formato MEI, especialmente se o faturamento for mais alto.

${CLOSING}`,
  },
  {
    slug: "vantagens-riscos-plano-mei-sem-consultoria",
    title: "Vantagens e riscos de contratar plano de saúde MEI sem consultoria",
    category: "mei",
    excerpt:
      "Contratar direto pode parecer mais rápido, mas alguns detalhes passam despercebido sem orientação especializada.",
    body: `Contratar um plano de saúde MEI diretamente com a operadora, sem passar por uma corretora, pode parecer mais simples — mas alguns detalhes importantes costumam passar despercebidos sem uma orientação mais próxima.

## O que se ganha contratando direto

Em teoria, um processo mais rápido e sem intermediários — mas isso só é vantagem real se você já souber exatamente o que está comparando entre as opções disponíveis.

## O que se perde sem orientação

Uma corretora especializada ajuda a comparar operadoras, entender letras miúdas do contrato e identificar a melhor condição pro seu perfil específico de MEI — algo que fica mais difícil de fazer sozinho, direto no site de uma única operadora.

${CLOSING}`,
  },
  {
    slug: "porto-seguro-saude-como-funciona",
    title: "Porto Seguro Saúde: como funciona e quando compensa",
    category: "comparativo",
    excerpt:
      "Tradicionalmente forte em seguros, a Porto Seguro também atua no mercado de planos de saúde. Veja o perfil da operadora.",
    body: `A Porto Seguro, conhecida principalmente pelo mercado de seguros, também atua no setor de planos de saúde, com presença relevante em algumas regiões do país.

## Perfil da operadora

Costuma ser bem avaliada em atendimento e processos digitais (aplicativo, autorização de exames), refletindo a experiência da empresa em serviços de seguro de forma mais ampla.

## Quando vale considerar

Se você já tem outros produtos com a Porto Seguro (como seguro de carro ou de vida) e valoriza centralizar serviços com uma mesma empresa, pode valer incluir essa operadora na comparação — mas o critério decisivo continua sendo rede credenciada e preço pra sua cidade específica.

${CLOSING}`,
  },
  {
    slug: "golden-cross-situacao-atual",
    title: "Golden Cross ainda vende plano de saúde? Situação atual",
    category: "comparativo",
    excerpt:
      "A operadora, que já foi uma das maiores do país, passou por mudanças relevantes ao longo dos anos.",
    body: `A Golden Cross foi, em outras décadas, uma das maiores operadoras de plano de saúde do Brasil — mas passou por mudanças significativas de porte e presença de mercado ao longo do tempo.

## O que considerar antes de avaliar essa operadora

Antes de considerar qualquer operadora com histórico de mudanças relevantes, vale checar a situação atual dela diretamente no site da ANS, que mantém informações sobre registro e situação cadastral de cada operadora.

## Como isso se aplica a qualquer operadora, não só essa

De forma geral, é sempre uma boa prática verificar a situação regulatória de qualquer operadora antes de contratar — isso vale tanto pra marcas mais tradicionais quanto pra operadoras menos conhecidas.

${CLOSING}`,
  },
  {
    slug: "operadora-regional-x-nacional-pros-contras",
    title: "Plano de saúde de operadora regional x operadora nacional: prós e contras",
    category: "comparativo",
    excerpt:
      "O tamanho da operadora não define sozinho a qualidade do plano — mas muda alguns aspectos práticos.",
    body: `Operadoras regionais (que atuam numa área geográfica específica) e operadoras nacionais (presentes em várias regiões do país) têm perfis diferentes que vale considerar na hora de comparar.

## Vantagens de uma operadora regional

Costuma ter conhecimento mais profundo da rede local e, em alguns casos, negociação mais forte com hospitais e clínicas da própria região, o que pode significar preço mais competitivo.

## Vantagens de uma operadora nacional

Cobertura mais ampla caso você viaje ou se mude de cidade, além de, em geral, mais recursos investidos em aplicativo e processos digitais — mas isso não é uma regra absoluta e vale comparar caso a caso.

${CLOSING}`,
  },
  {
    slug: "como-saber-operadora-confiavel-antes-contratar",
    title: "Como saber se uma operadora de plano de saúde é confiável antes de contratar",
    category: "comparativo",
    excerpt:
      "Alguns sinais objetivos ajudam a avaliar a solidez de uma operadora antes de assinar o contrato.",
    body: `Antes de contratar um plano de saúde, vale fazer uma checagem básica sobre a operadora, além de só comparar preço e rede credenciada.

## O que checar na ANS

A ANS disponibiliza informações públicas sobre a situação cadastral de cada operadora, incluindo se ela está ativa, em liquidação ou com alguma restrição — essa consulta é gratuita e rápida.

## Outros sinais que valem a atenção

Tempo de mercado, índice de reclamações divulgado pela ANS e a clareza das informações que a operadora ou a corretora oferecem durante a cotação — respostas vagas costumam ser um sinal de alerta.

${CLOSING}`,
  },
  {
    slug: "plano-com-ou-sem-home-care",
    title: "Plano de saúde com ou sem home care: o que considerar",
    category: "comparativo",
    excerpt:
      "A cobertura domiciliar não é padrão em todos os planos e depende de indicação médica específica.",
    body: `Home care — atendimento médico e de enfermagem realizado na casa do paciente — não é uma cobertura padrão em todos os planos de saúde, e quando existe, costuma depender de indicação médica específica pra ser autorizada.

## Quando o home care costuma ser indicado

Geralmente é indicado como alternativa à internação hospitalar prolongada, em casos que permitem cuidado domiciliar com segurança, mediante avaliação da equipe médica responsável.

## O que verificar antes de contratar pensando nisso

Se você tem algum familiar com histórico de necessidade de cuidados contínuos, vale confirmar diretamente com a operadora as condições e limites da cobertura de home care antes de contratar, já que os critérios variam bastante entre operadoras.

${CLOSING}`,
  },
  {
    slug: "telemedicina-plano-saude-o-que-inclui",
    title: "Telemedicina no plano de saúde: o que costuma estar incluso",
    category: "comparativo",
    excerpt:
      "Consultas remotas se tornaram comuns na maioria dos planos, mas o alcance da cobertura varia.",
    body: `A telemedicina se consolidou como parte da rotina de muitos planos de saúde, oferecendo consultas remotas por vídeo ou chat, geralmente através do aplicativo da operadora.

## O que costuma estar incluído

Consultas de triagem, orientação médica geral e, em muitas operadoras, acompanhamento de condições crônicas já diagnosticadas — tudo sem precisar sair de casa, o que agiliza atendimentos que não exigem exame físico presencial.

## O que a telemedicina normalmente não substitui

Exames físicos detalhados, procedimentos que exigem presença e emergências que precisam de atendimento hospitalar imediato continuam exigindo atendimento presencial — a telemedicina complementa, mas não substitui totalmente a rede física.

${CLOSING}`,
  },
  {
    slug: "comparar-rede-hospitalar-duas-operadoras",
    title: "Como comparar a rede hospitalar de duas operadoras na prática",
    category: "comparativo",
    excerpt:
      "Olhar só o número de hospitais credenciados não conta a história toda. Veja o que realmente importa.",
    body: `Comparar rede hospitalar entre operadoras só pelo número total de hospitais credenciados pode enganar — o que realmente importa é se os hospitais mais próximos e mais relevantes pra você estão incluídos.

## O que checar de verdade

Confirma se os hospitais que você usaria de fato (os mais próximos de casa e do trabalho, ou os de referência pra alguma especialidade que você já acompanha) estão na rede credenciada de cada operadora, não só o total geral.

## Como fazer essa checagem na prática

A maioria das operadoras disponibiliza um buscador de rede credenciada no site ou aplicativo — vale usar essa ferramenta com os hospitais específicos que importam pra você antes de decidir entre duas propostas.

${CLOSING}`,
  },
  {
    slug: "plano-odontologia-incluida-vale-a-pena",
    title: "Plano de saúde com odontologia incluída: vale a pena ou é melhor separado",
    category: "comparativo",
    excerpt:
      "Alguns planos combinam saúde e odontologia num único contrato. Veja quando isso faz sentido financeiramente.",
    body: `Alguns planos oferecem a opção de incluir cobertura odontológica junto com o plano de saúde médico, num único contrato — uma alternativa a contratar um plano odontológico separado.

## Vantagens da combinação

Um único boleto, uma única operadora pra lidar em caso de dúvidas ou problemas, e às vezes um preço combinado mais competitivo do que contratar os dois serviços separadamente.

## Quando vale considerar separar

Se você já tem um plano odontológico com boas condições e rede de dentistas de confiança, pode não valer a pena trocar só pra unificar — vale comparar o custo total das duas abordagens antes de decidir.

${CLOSING}`,
  },
  {
    slug: "operadoras-verticalizadas-x-rede-credenciada-estabilidade",
    title: "Operadoras verticalizadas x operadoras com rede credenciada: qual rede é mais estável",
    category: "comparativo",
    excerpt:
      "O modelo de rede própria e o modelo de rede credenciada têm riscos e vantagens diferentes de estabilidade.",
    body: `Operadoras verticalizadas (com rede própria de hospitais e clínicas) e operadoras com rede credenciada de terceiros têm dinâmicas diferentes quando o assunto é estabilidade da rede ao longo do tempo.

## O risco do modelo credenciado

Hospitais e clínicas credenciados podem, em teoria, descredenciar-se de uma operadora ao longo do tempo, o que exige atenção contínua se você tem um hospital de referência específico.

## O risco do modelo verticalizado

Como a rede é própria, você depende inteiramente das unidades daquela operadora — se ela não tiver presença forte na sua região ou passar por dificuldades financeiras, a rede toda pode ser afetada.

${CLOSING}`,
  },
  {
    slug: "consultar-indice-reclamacoes-operadora-ans",
    title: "Como consultar o índice de reclamações de uma operadora na ANS",
    category: "comparativo",
    excerpt:
      "A ANS divulga publicamente dados de reclamações por operadora — um recurso útil antes de contratar.",
    body: `A ANS mantém e divulga publicamente indicadores de desempenho das operadoras, incluindo índice de reclamações registradas por beneficiários — uma informação útil pra quem está comparando opções antes de contratar.

## Onde encontrar essa informação

Esses dados costumam estar disponíveis no site da ANS, na seção de informações sobre operadoras, permitindo comparar o volume de reclamações proporcional ao número de beneficiários de cada empresa.

## Como interpretar esse número com cuidado

Operadoras maiores tendem a ter mais reclamações em número absoluto simplesmente por terem mais beneficiários — o mais útil é olhar a proporção (reclamações por beneficiário), não o número bruto isolado.

${CLOSING}`,
  },
  {
    slug: "plano-aplicativo-proprio-muda-experiencia",
    title: "Plano de saúde com aplicativo próprio: isso muda a experiência de uso",
    category: "comparativo",
    excerpt:
      "Recursos digitais como agendamento e telemedicina pelo app pesam cada vez mais na escolha da operadora.",
    body: `A qualidade do aplicativo de uma operadora deixou de ser um detalhe secundário — hoje ele costuma ser o canal principal pra agendar consultas, pedir autorização de exames, acessar a carteirinha digital e usar telemedicina.

## O que vale testar antes de contratar

Se possível, vale conferir avaliações do aplicativo da operadora nas lojas de aplicativo (App Store, Google Play) antes de contratar — problemas recorrentes relatados por usuários são um bom indicador da experiência real.

## Por que isso pesa no dia a dia

Um aplicativo instável ou confuso pode transformar tarefas simples (como marcar uma consulta) em um processo frustrante — vale considerar isso com o mesmo peso que preço e rede credenciada.

${CLOSING}`,
  },
  {
    slug: "comparar-plano-preco-por-m2-nao-funciona",
    title: "Comparar plano de saúde por preço por m² de rede não funciona: veja o que olhar",
    category: "comparativo",
    excerpt:
      "Não existe uma métrica simples de \"preço por cobertura\" — a comparação precisa ser qualitativa, não só numérica.",
    body: `Não existe uma fórmula simples (como "preço por m² de rede") pra comparar planos de saúde de forma objetiva — a comparação de verdade exige olhar critérios qualitativos, não só números isolados.

## Por que comparações simplistas enganam

Um plano com "mais hospitais" na rede não é necessariamente melhor se esses hospitais não forem relevantes pra você — o que importa é a sobreposição entre a rede oferecida e os lugares que você de fato usaria.

## O que realmente vale comparar

Rede relevante pra sua rotina, segmentação (ambulatorial, hospitalar, completo), tipo de acomodação, abrangência geográfica e coparticipação — tudo isso junto, não isolado, é o que forma uma comparação de verdade.

${CLOSING}`,
  },
  {
    slug: "bradesco-saude-ou-porto-seguro",
    title: "Bradesco Saúde ou Porto Seguro: como decidir",
    category: "comparativo",
    excerpt:
      "Duas operadoras com origem no mercado de seguros, mas com perfis de atuação diferentes no plano de saúde.",
    body: `Bradesco Saúde e Porto Seguro têm origem no mercado financeiro e de seguros, mas construíram perfis diferentes na operação de planos de saúde ao longo dos anos.

## Perfil de cada uma

A Bradesco Saúde é tradicionalmente mais forte em planos empresariais de médio e grande porte, com rede referenciada ampla. A Porto Seguro tem presença mais recente e crescente no setor, com investimento forte em experiência digital.

## Como decidir de verdade

A comparação mais confiável não é pela reputação da marca, mas pela cotação real pro seu perfil — mesma cidade, mesma idade, mesmo tipo de plano — comparando rede credenciada e preço lado a lado.

${CLOSING}`,
  },
  {
    slug: "unimed-nacional-ou-regional-diferenca",
    title: "Unimed nacional ou Unimed regional: entenda a diferença na prática",
    category: "comparativo",
    excerpt:
      "\"Unimed\" é uma marca usada por várias cooperativas independentes — entenda o que isso significa pro seu plano.",
    body: `"Unimed" não é uma operadora única — é uma marca usada por um sistema de cooperativas médicas regionais independentes, cada uma com sua própria gestão, rede e condições comerciais.

## O que muda entre a Unimed da sua cidade e de outra

Duas Unimeds regionais podem ter redes credenciadas, preços e até qualidade de atendimento diferentes, mesmo usando a mesma marca — porque, na prática, são empresas distintas.

## Como saber se seu plano cobre outras cidades

Existe o Sistema Unimed Nacional, que permite atendimento em outras regiões dentro de certas regras — mas vale confirmar diretamente com a Unimed que vai emitir seu plano se essa cobertura nacional está incluída ou é um adicional à parte.

${CLOSING}`,
  },
  {
    slug: "amil-one-ou-amil-tradicional",
    title: "Amil One ou plano Amil tradicional: o que muda",
    category: "comparativo",
    excerpt:
      "A Amil oferece diferentes linhas de produto, com redes e propostas de valor distintas. Entenda antes de escolher.",
    body: `A Amil oferece diferentes linhas de plano dentro do seu portfólio, com propostas de rede e preço distintas — vale entender as diferenças antes de decidir qual faz mais sentido.

## O que costuma diferenciar as linhas

Linhas de produto diferentes geralmente têm redes credenciadas distintas (mais amplas ou mais reduzidas) e, consequentemente, faixas de preço diferentes dentro da mesma operadora.

## Como confirmar a rede de cada linha

Antes de decidir com base só no nome do produto, vale pedir a lista específica de rede credenciada de cada linha pra sua cidade — o nome comercial sozinho não garante a mesma cobertura em todo lugar.

${CLOSING}`,
  },
  {
    slug: "comparar-exames-alta-complexidade-operadoras",
    title: "Como comparar cobertura de exames de alta complexidade entre operadoras",
    category: "comparativo",
    excerpt:
      "Exames de alta complexidade costumam ter autorização prévia e rede específica — vale conferir com atenção.",
    body: `Exames de alta complexidade (como ressonância magnética, tomografia e alguns exames genéticos) costumam ter regras próprias de autorização e uma rede de laboratórios credenciados mais restrita do que consultas e exames simples.

## O que verificar na comparação

Confirma se os laboratórios credenciados pra esse tipo de exame ficam próximos de onde você mora, e qual o prazo médio de autorização — alguns exames exigem aprovação prévia da operadora antes de serem realizados.

## Por que isso importa mais do que parece

Um plano com mensalidade competitiva mas rede reduzida pra exames de alta complexidade pode significar deslocamento maior ou espera mais longa justamente nos momentos em que a agilidade mais importa.

${CLOSING}`,
  },
  {
    slug: "prazo-solicitar-portabilidade-apos-sair-plano",
    title: "Portabilidade de carências: prazo pra solicitar depois de sair do plano antigo",
    category: "portabilidade",
    excerpt:
      "Existe uma janela de tempo específica pra usar a portabilidade depois de deixar o plano anterior.",
    body: `Depois de sair de um plano de saúde, existe um prazo específico dentro do qual você ainda pode solicitar a portabilidade de carências pra um plano novo, aproveitando o tempo já cumprido no plano anterior.

## Por que esse prazo existe

A regra existe justamente pra dar um período de transição organizado, sem deixar o beneficiário sem cobertura por muito tempo nem permitir que a portabilidade seja usada de forma indefinida após a saída do plano original.

## O que fazer se o prazo estiver se aproximando

Se você já saiu (ou está pensando em sair) do plano atual, vale correr atrás da portabilidade o quanto antes — deixar pra última hora aumenta o risco de perder o prazo e ter que cumprir carência do zero.

${CLOSING}`,
  },
  {
    slug: "guia-ans-planos-portabilidade",
    title: "O que é o Guia ANS de Planos e pra que ele serve na portabilidade",
    category: "portabilidade",
    excerpt:
      "Essa ferramenta oficial ajuda a verificar a compatibilidade de faixa de preço entre planos na hora da portabilidade.",
    body: `O Guia ANS de Planos é uma ferramenta oficial disponibilizada pela ANS que ajuda a verificar se um plano de destino é compatível, em faixa de preço, com o plano de origem — um dos requisitos pra portabilidade de carências.

## Como ele funciona na prática

A ferramenta classifica os planos em faixas de preço, permitindo consultar quais planos são considerados equivalentes ou de valor igual/inferior ao seu plano atual, requisito comum pra portabilidade sem restrições adicionais.

## Por que vale consultar antes de escolher o plano novo

Consultar o Guia ANS antes de fechar com uma operadora nova evita a frustração de descobrir, só depois, que o plano escolhido não é compatível pra portabilidade — a corretora também pode ajudar nessa checagem.

${CLOSING}`,
  },
  {
    slug: "portabilidade-especial-operadora-encerra-plano",
    title: "Portabilidade especial: quando a operadora encerra o plano antigo",
    category: "portabilidade",
    excerpt:
      "Se a operadora cancela a comercialização do seu plano, existe um caminho de portabilidade com regras mais flexíveis.",
    body: `Quando uma operadora encerra a comercialização de um determinado plano (ou sai do mercado), os beneficiários afetados têm direito a uma portabilidade especial, com regras mais flexíveis do que a portabilidade comum.

## O que muda na portabilidade especial

Alguns dos requisitos normais (como tempo mínimo de permanência) podem ser dispensados nesse cenário, já que a saída do plano não foi uma escolha do beneficiário, mas uma decisão da operadora.

## Como saber se você tem direito

A operadora que está encerrando o plano é obrigada a comunicar os beneficiários com antecedência sobre a situação e as opções de portabilidade disponíveis — vale ficar atento a essas comunicações oficiais.

${CLOSING}`,
  },
  {
    slug: "portabilidade-empresarial-para-individual",
    title: "Posso fazer portabilidade de um plano empresarial pra um individual?",
    category: "portabilidade",
    excerpt:
      "Sim, é possível migrar entre modalidades diferentes, desde que os requisitos de elegibilidade sejam atendidos.",
    body: `A portabilidade de carências não exige que o plano de origem e o plano de destino sejam da mesma modalidade — é possível, por exemplo, migrar de um plano empresarial pra um individual, desde que os requisitos normais sejam cumpridos.

## Quando essa situação costuma acontecer

É comum acontecer quando alguém perde o vínculo empregatício que dava acesso ao plano empresarial e decide contratar um plano individual, aproveitando o tempo de carência já cumprido através da portabilidade.

## O que verificar antes de migrar

Tempo mínimo de permanência no plano empresarial, estar em dia com os pagamentos até a saída, e compatibilidade de faixa de preço com o plano individual de destino — os mesmos critérios gerais de qualquer portabilidade.

${CLOSING}`,
  },
  {
    slug: "portabilidade-carencias-cpt-o-que-acontece",
    title: "Portabilidade de carências: o que acontece com o CPT (cobertura parcial temporária)",
    category: "portabilidade",
    excerpt:
      "Quem já cumpriu o prazo de CPT no plano antigo não precisa recomeçar esse período no plano novo.",
    body: `Um dos benefícios mais importantes da portabilidade de carências é justamente relacionado ao CPT (Cobertura Parcial Temporária) — o período em que procedimentos de alta complexidade ligados a doenças preexistentes podem ficar sem cobertura.

## Como a portabilidade ajuda nesse caso

Se você já cumpriu o prazo de CPT (até 24 meses) no plano de origem, a portabilidade elegível evita ter que cumprir esse prazo de novo no plano de destino, mesmo com a mesma doença preexistente declarada.

## Por que isso é especialmente valioso

Pra quem tem uma condição preexistente, cumprir CPT de novo pode significar até dois anos sem acesso a procedimentos de alta complexidade relacionados à condição — a portabilidade evita repetir esse período já vencido.

${CLOSING}`,
  },
  {
    slug: "tempo-minimo-plano-atual-portabilidade",
    title: "Quanto tempo mínimo preciso estar no plano atual pra ter direito à portabilidade",
    category: "portabilidade",
    excerpt:
      "Existe um prazo mínimo de permanência, que pode ser menor se você já usou portabilidade antes.",
    body: `A portabilidade de carências exige um tempo mínimo de permanência no plano atual — uma forma de a ANS evitar o uso da portabilidade como uma troca constante e sem compromisso real com nenhuma operadora.

## O prazo pra primeira portabilidade

Pra quem está solicitando portabilidade pela primeira vez naquele plano, o tempo mínimo de permanência costuma ser maior do que pra quem já usou a portabilidade antes e está solicitando de novo.

## Vale confirmar seu tempo exato de plano

O tempo de permanência é contado a partir da data de início da vigência do seu contrato atual — vale confirmar essa data exata com a operadora antes de calcular se você já é elegível.

${CLOSING}`,
  },
  {
    slug: "avisar-operadora-atual-antes-portabilidade",
    title: "Portabilidade de carências: preciso avisar a operadora atual antes?",
    category: "portabilidade",
    excerpt:
      "O processo de solicitação acontece formalmente com a operadora de destino, mas alguns cuidados evitam problemas.",
    body: `Formalmente, a solicitação de portabilidade é feita junto à operadora de destino (a nova), não exigindo um aviso prévio formal à operadora atual antes de iniciar o processo.

## O que acontece com o plano atual durante o processo

O plano atual continua ativo normalmente durante a análise da portabilidade — o cancelamento do plano antigo só deve acontecer depois que a portabilidade for de fato concluída e confirmada.

## Por que não vale cancelar o plano atual antes da hora

Cancelar o plano de origem antes da portabilidade ser concluída pode comprometer a elegibilidade pro processo, já que alguns requisitos consideram a situação do plano de origem até o momento da solicitação.

${CLOSING}`,
  },
  {
    slug: "portabilidade-negada-o-que-fazer",
    title: "O que fazer se a portabilidade for negada pela operadora de destino",
    category: "portabilidade",
    excerpt:
      "Uma negativa pode ter explicação simples de resolver, ou pode ser questionada junto à ANS.",
    body: `Uma solicitação de portabilidade de carências pode ser negada pela operadora de destino — e quando isso acontece, vale entender o motivo antes de desistir ou aceitar a negativa sem questionar.

## Motivos comuns de negativa

Inconsistência entre os dados informados, plano de destino incompatível em faixa de preço com o de origem, ou não cumprimento do tempo mínimo de permanência são as causas mais frequentes.

## Como contestar uma negativa indevida

Se você acredita que atende a todos os requisitos e mesmo assim teve a portabilidade negada, é possível registrar reclamação formal junto à ANS, que pode intervir e reavaliar a situação.

${CLOSING}`,
  },
  {
    slug: "portabilidade-faixas-preco-diferentes",
    title: "Portabilidade entre planos de faixas de preço diferentes: é possível?",
    category: "portabilidade",
    excerpt:
      "A regra geral exige compatibilidade de faixa, mas existem exceções em situações específicas.",
    body: `A regra geral da portabilidade de carências exige que o plano de destino esteja na mesma faixa de preço do plano de origem, ou numa faixa inferior — mas existem situações específicas com regras diferentes.

## Portabilidade pra plano de faixa superior

Em alguns casos específicos definidos pela ANS, é possível portar pra um plano de faixa de preço superior, mas as condições pra isso são mais restritas e devem ser confirmadas caso a caso.

## Como confirmar a compatibilidade do seu caso

O Guia ANS de Planos é a ferramenta oficial pra consultar a faixa de preço do seu plano atual e comparar com os planos de destino disponíveis, evitando surpresas na hora da solicitação.

${CLOSING}`,
  },
  {
    slug: "portabilidade-dependente-como-funciona",
    title: "Portabilidade de carências pra dependente: como funciona",
    category: "portabilidade",
    excerpt:
      "Cada dependente pode ter seu próprio direito de portabilidade, com regras equivalentes às do titular.",
    body: `A portabilidade de carências não é um direito exclusivo do titular do plano — cada dependente também pode solicitar portabilidade, individualmente, seguindo as mesmas regras gerais aplicadas ao titular.

## O que muda em relação ao titular

Na prática, pouca coisa muda — o dependente precisa ter cumprido o tempo mínimo de permanência no plano, estar em dia com os pagamentos (considerando o plano como um todo) e escolher um plano de destino compatível em faixa de preço.

## Situações comuns de portabilidade de dependente

É comum acontecer quando um dependente decide contratar um plano próprio, separado da família — por exemplo, um filho que sai do plano dos pais pra iniciar um plano individual ou empresarial próprio.

${CLOSING}`,
  },
  {
    slug: "plano-antigo-antes-1999-direito-portabilidade",
    title: "Plano de saúde antigo (anterior a 1999): tenho direito à portabilidade?",
    category: "portabilidade",
    excerpt:
      "Beneficiários de planos não regulamentados têm um caminho específico pra usar a portabilidade.",
    body: `Quem tem um plano de saúde contratado antes de 1999 (anterior à Lei 9.656, que regulamentou o setor) pode se perguntar se tem direito à portabilidade de carências, já que esses planos seguem regras diferentes dos planos atuais.

## O caminho pra quem tem plano antigo

Beneficiários de planos antigos podem ter direito à portabilidade especial pra migrar diretamente pra um plano novo regulamentado, sem precisar primeiro migrar internamente dentro da mesma operadora.

## Por que vale considerar essa migração

Planos antigos não seguem necessariamente o rol mínimo de coberturas da ANS nem os limites de reajuste vigentes hoje — migrar pra um plano regulamentado pode significar mais proteção e previsibilidade, mesmo que o processo exija atenção aos detalhes.

${CLOSING}`,
  },
  {
    slug: "documentos-operadora-destino-portabilidade",
    title: "Portabilidade de carências: quais documentos a operadora de destino pode pedir",
    category: "portabilidade",
    excerpt:
      "Além dos documentos pessoais, a operadora nova costuma pedir comprovantes do plano atual.",
    body: `Ao solicitar portabilidade de carências, além da documentação pessoal básica, a operadora de destino costuma pedir comprovantes relacionados ao plano de origem, pra confirmar a elegibilidade ao processo.

## Documentos geralmente exigidos

Comprovante de pagamento em dia das últimas mensalidades do plano atual, e às vezes uma declaração ou comprovante do tempo de permanência no plano de origem, emitido pela operadora atual.

## Por que ter tudo organizado antecipadamente ajuda

Reunir esses documentos antes de iniciar o processo de portabilidade acelera a análise — pedir esses comprovantes à operadora atual pode levar alguns dias, então vale começar essa etapa com antecedência.

${CLOSING}`,
  },
  {
    slug: "erros-comuns-atrasam-portabilidade",
    title: "Erros comuns que atrasam ou travam um pedido de portabilidade",
    category: "portabilidade",
    excerpt:
      "Pequenos deslizes na documentação ou no timing do pedido costumam ser a causa mais frequente de atraso.",
    body: `Um pedido de portabilidade de carências pode travar ou atrasar por motivos que, na maioria das vezes, são simples de evitar com um pouco de planejamento.

## Erros mais comuns

Solicitar a portabilidade fora do prazo permitido após sair do plano antigo, escolher um plano de destino incompatível em faixa de preço, ou enviar documentação incompleta são as causas mais frequentes de atraso ou negativa.

## Como evitar cair nessas armadilhas

Confirmar a elegibilidade pelo Guia ANS de Planos antes de escolher o plano novo, reunir toda a documentação com antecedência e, se possível, contar com o apoio de uma corretora que já conhece o processo ajuda a evitar a maioria desses erros.

${CLOSING}`,
  },
  {
    slug: "portabilidade-cpt-diferenca-prazo",
    title: "Portabilidade de carências e CPT: existe diferença de prazo",
    category: "portabilidade",
    excerpt:
      "O prazo de portabilidade para carências comuns pode ser diferente do prazo aplicado especificamente ao CPT.",
    body: `Nem sempre o prazo de permanência mínima exigido pra portabilidade de carências comuns é igual ao exigido especificamente pra portabilidade da CPT (Cobertura Parcial Temporária) — vale entender essa diferença antes de contar com um ou outro benefício.

## Por que essa diferenciação existe

A CPT trata especificamente de doenças e lesões preexistentes, então a ANS pode estabelecer critérios um pouco diferentes pra esse tipo específico de portabilidade em relação às carências gerais.

## Como confirmar seu caso específico

Como essas regras podem ser técnicas e específicas, o mais seguro é confirmar diretamente com a operadora de destino ou com a corretora qual prazo se aplica exatamente à sua situação, considerando também eventuais condições preexistentes declaradas.

${CLOSING}`,
  },
  {
    slug: "reajuste-plano-saude-2026-o-que-esperar",
    title: "Reajuste de plano de saúde 2026: o que esperar pro próximo ano",
    category: "custos",
    excerpt:
      "O índice de reajuste pra planos individuais é definido anualmente pela ANS — veja onde acompanhar.",
    body: `Todo ano, a ANS define e divulga o percentual máximo de reajuste permitido pra planos de saúde individuais e familiares — um índice que costuma ser acompanhado de perto por quem tem esse tipo de plano.

## Onde acompanhar o índice oficial

O percentual definido pela ANS é divulgado publicamente no site da agência, geralmente entre o meio e o fim do ano, valendo pro período de reajuste seguinte de cada contrato individual ou familiar.

## Planos empresariais seguem outra lógica

Vale lembrar que esse índice divulgado pela ANS vale só pra planos individuais e familiares — planos empresariais e coletivos por adesão têm reajuste negociado diretamente entre a empresa/entidade contratante e a operadora, com base na sinistralidade do grupo.

${CLOSING}`,
  },
  {
    slug: "como-calculado-indice-reajuste-ans",
    title: "Como é calculado o índice de reajuste da ANS pra planos individuais",
    category: "custos",
    excerpt:
      "O cálculo considera a variação de custos do setor de saúde, não apenas a inflação geral.",
    body: `O índice de reajuste definido pela ANS pra planos individuais e familiares não segue diretamente a inflação geral (como o IPCA) — ele é calculado considerando especificamente a variação de custos do setor de saúde suplementar.

## O que entra nesse cálculo

Fatores como aumento de custos com procedimentos médicos, exames, materiais hospitalares e a frequência de uso dos planos ao longo do ano anterior fazem parte da metodologia usada pela ANS pra chegar no percentual final.

## Por que costuma ser diferente da inflação geral

Como o setor de saúde tem uma dinâmica de custos própria (muitas vezes chamada de inflação médica, que costuma superar a inflação geral), o índice de reajuste de plano de saúde tende a ser mais alto que índices como o IPCA na maioria dos anos.

${CLOSING}`,
  },
  {
    slug: "plano-caro-negociar-trocar-reduzir",
    title: "Plano de saúde ficou caro: negociar, trocar ou reduzir cobertura?",
    category: "custos",
    excerpt:
      "Antes de cancelar direto, existem alternativas intermediárias que valem ser consideradas.",
    body: `Quando a mensalidade do plano de saúde começa a pesar demais no orçamento, cancelar de vez não é a única opção — existem alternativas intermediárias que valem ser avaliadas antes.

## Reduzir a cobertura mantendo o plano

Migrar pra um plano com coparticipação, acomodação em enfermaria em vez de apartamento, ou abrangência regional em vez de nacional pode reduzir a mensalidade sem perder totalmente a cobertura.

## Trocar de operadora com portabilidade

Se você tem tempo suficiente no plano atual, buscar uma operadora com preço mais competitivo através da portabilidade de carências evita cumprir os prazos de novo, tornando a troca menos arriscada financeiramente.

${CLOSING}`,
  },
  {
    slug: "reajuste-acima-esperado-o-que-fazer",
    title: "O que fazer se o reajuste do plano de saúde vier acima do esperado",
    category: "custos",
    excerpt:
      "Vale conferir se o percentual aplicado está dentro do limite permitido antes de aceitar o valor.",
    body: `Se o reajuste aplicado ao seu plano veio bem acima do que você esperava, o primeiro passo é conferir se o percentual está dentro do limite permitido pra modalidade do seu contrato.

## Como conferir se o reajuste está correto

Pra planos individuais e familiares, compare o percentual aplicado com o índice máximo divulgado pela ANS pro período — se estiver acima desse limite, você tem direito a contestar formalmente junto à operadora e, se necessário, à ANS.

## Se o reajuste está correto mas pesa no orçamento

Nesse caso, mesmo com o reajuste dentro da regra, vale considerar as alternativas de redução de cobertura ou troca de operadora via portabilidade, já discutidas em outros artigos aqui do blog.

${CLOSING}`,
  },
  {
    slug: "reajuste-sinistralidade-planos-coletivos",
    title: "Reajuste por sinistralidade: como funciona nos planos coletivos",
    category: "custos",
    excerpt:
      "Nos planos empresariais, o reajuste depende diretamente de quanto o grupo usou o plano no ano anterior.",
    body: `Nos planos coletivos (empresariais e por adesão), o reajuste anual costuma ser calculado com base na sinistralidade — a relação entre o quanto foi gasto em atendimentos do grupo e o quanto foi pago em mensalidades no período.

## Como o cálculo costuma funcionar

Se o grupo usou muito o plano (sinistralidade alta), a operadora tende a propor um reajuste maior pra reequilibrar a conta. Se o uso foi baixo, o reajuste tende a ser mais moderado.

## Por que isso é diferente do plano individual

Diferente do índice único definido pela ANS pra planos individuais, cada contrato coletivo pode ter um reajuste diferente, dependendo exclusivamente do comportamento de uso daquele grupo específico — não existe uma tabela nacional única pra esse cálculo.

${CLOSING}`,
  },
  {
    slug: "por-que-preco-plano-varia-tanto-cidades",
    title: "Plano de saúde: por que o preço varia tanto entre cidades",
    category: "custos",
    excerpt:
      "A rede hospitalar disponível e o custo local de atendimento influenciam diretamente a mensalidade.",
    body: `É comum ver a mesma operadora, o mesmo tipo de plano, com preços diferentes dependendo da cidade — e isso tem explicação na forma como o custo de atendimento médico varia geograficamente.

## O que influencia essa diferença

Cidades com rede hospitalar mais concorrida e custo de vida mais alto tendem a ter mensalidades mais altas, refletindo o custo real de manter aquela rede credenciada disponível pros beneficiários.

## Por que isso importa na hora de comparar

Comparar o preço de um plano na sua cidade com o preço do mesmo plano em outra cidade não faz muito sentido — a comparação relevante é sempre dentro da sua própria região, entre operadoras diferentes.

${CLOSING}`,
  },
  {
    slug: "custo-plano-faixa-etaria-tabela-explicada",
    title: "Custo de plano de saúde por faixa etária: tabela comparativa explicada",
    category: "custos",
    excerpt:
      "Entenda como as 10 faixas etárias da ANS funcionam na prática e como isso afeta seu planejamento.",
    body: `A ANS organiza os planos de saúde em 10 faixas etárias, cada uma com seu próprio valor de mensalidade dentro do mesmo plano — entender essa lógica ajuda a planejar o custo ao longo dos anos.

## Como as faixas são organizadas

As faixas vão de 0-18 anos até 59 anos ou mais, com faixas intermediárias a cada 4 ou 5 anos. Cada operadora define o valor específico de cada faixa dentro dos limites regulatórios estabelecidos pela ANS.

## Como usar isso no seu planejamento

Ao contratar um plano, vale pedir a tabela completa de todas as 10 faixas, não só o valor da sua faixa atual — isso ajuda a visualizar como a mensalidade tende a evoluir conforme você (ou seus dependentes) envelhecem.

${CLOSING}`,
  },
  {
    slug: "dolar-inflacao-medica-preco-plano",
    title: "Como o dólar e a inflação médica afetam o preço do plano de saúde",
    category: "custos",
    excerpt:
      "Insumos médicos importados fazem parte da conta que influencia o custo geral do setor de saúde.",
    body: `Boa parte dos equipamentos, materiais e insumos usados em hospitais e clínicas no Brasil é importada ou tem componentes atrelados ao dólar — o que faz a variação cambial impactar indiretamente o custo do setor de saúde como um todo.

## Como isso chega até a mensalidade

Quando o custo de materiais hospitalares, próteses e equipamentos sobe (seja por câmbio, seja por outros fatores), esse aumento tende a se refletir no custo geral de atendimento, que por sua vez influencia o cálculo do índice de reajuste anual dos planos.

## Por que isso explica parte da "inflação médica"

O termo inflação médica se refere justamente a esse fenômeno: o custo do setor de saúde subir mais rápido que a inflação geral da economia, em boa parte por causa dessa dependência de insumos com preço atrelado ao câmbio e à tecnologia importada.

${CLOSING}`,
  },
  {
    slug: "vale-trocar-plano-por-causa-reajuste-anual",
    title: "Vale trocar de plano só por causa do reajuste anual?",
    category: "custos",
    excerpt:
      "A decisão exige comparar o custo da troca com a economia real que ela traria no médio prazo.",
    body: `Receber um reajuste anual alto pode gerar a vontade imediata de trocar de operadora — mas vale fazer uma conta mais completa antes de decidir só com base nesse único fator.

## O que considerar além do reajuste isolado

Vale comparar não só a mensalidade atual de outra operadora, mas também o histórico de reajustes dela nos últimos anos — uma mensalidade inicial mais baixa não garante reajustes mais estáveis no futuro.

## O custo "invisível" de trocar de plano

Trocar de plano pode significar se adaptar a uma rede credenciada diferente, um aplicativo diferente e, se não usar portabilidade corretamente, cumprir carência de novo — fatores que também têm um custo, mesmo que não apareçam na mensalidade.

${CLOSING}`,
  },
  {
    slug: "nota-tecnica-registro-produto-ntrp",
    title: "O que é a nota técnica de registro de produto (NTRP) e por que ela importa",
    category: "custos",
    excerpt:
      "Esse documento técnico define as regras de precificação do plano registradas junto à ANS.",
    body: `A Nota Técnica de Registro de Produto (NTRP) é um documento técnico que toda operadora deve apresentar à ANS ao registrar um novo plano de saúde, detalhando a metodologia de precificação usada, incluindo os valores por faixa etária.

## Por que essa nota existe

Ela garante que a forma como a operadora calcula o preço do plano — incluindo a variação entre as 10 faixas etárias — segue critérios técnicos e está dentro dos limites regulatórios definidos pela ANS.

## Por que isso importa pro consumidor

Embora seja um documento técnico que a maioria das pessoas nunca vai ler diretamente, a existência da NTRP é o que garante que o valor cobrado por faixa etária não seja definido de forma arbitrária pela operadora.

${CLOSING}`,
  },
  {
    slug: "plano-caro-compensa-custo-beneficio",
    title: "Plano de saúde caro compensa? Como calcular o custo-benefício real",
    category: "custos",
    excerpt:
      "Preço alto não significa automaticamente melhor cobertura — vale olhar o que está incluído de fato.",
    body: `Um plano de saúde mais caro não é automaticamente "melhor" — o custo-benefício real depende de comparar o que está incluído na cobertura com o que você e sua família realmente precisam usar.

## O que pode justificar um preço mais alto

Rede credenciada mais ampla e relevante pra sua região, acomodação em apartamento, abrangência nacional e ausência de coparticipação são fatores que legitimamente encarecem um plano — mas só valem a pena se você de fato for usar essas vantagens.

## Como calcular na prática

Liste o que você realmente usaria do plano (tipo de acomodação, especialidades médicas, frequência de uso) e compare propostas considerando só esses critérios — pagar por recursos que você nunca vai usar não é bom custo-benefício, mesmo que pareça um plano "completo".

${CLOSING}`,
  },
  {
    slug: "reduzir-mensalidade-sem-perder-cobertura-essencial",
    title: "Como reduzir o valor da mensalidade sem perder cobertura essencial",
    category: "custos",
    excerpt:
      "Alguns ajustes no plano reduzem custo sem abrir mão do que realmente importa pro seu caso.",
    body: `Reduzir a mensalidade do plano de saúde não precisa significar abrir mão de cobertura essencial — alguns ajustes pontuais podem baixar o custo mantendo o que realmente importa pro seu caso.

## Ajustes que costumam reduzir custo

Migrar de apartamento pra enfermaria (se você não tem forte preferência por acomodação individual), considerar coparticipação (se o uso do plano é baixo) ou avaliar abrangência regional em vez de nacional (se você não viaja com frequência).

## O que não vale a pena cortar

Reduzir a segmentação de completo pra só ambulatorial, por exemplo, elimina cobertura de internação — um corte que pode parecer economia no curto prazo mas representa um risco financeiro grande em caso de necessidade real de internação.

${CLOSING}`,
  },
  {
    slug: "onde-reclamar-reajuste-abusivo",
    title: "Reajuste de plano de saúde: onde reclamar se achar abusivo",
    category: "custos",
    excerpt:
      "Existem canais oficiais pra contestar um reajuste que pareça estar fora das regras.",
    body: `Se você recebeu um reajuste de plano de saúde que parece estar fora do índice permitido, existem canais oficiais pra questionar isso formalmente, além de simplesmente reclamar diretamente com a operadora.

## Primeiro passo: a operadora

O primeiro canal é sempre a própria operadora — solicitar por escrito a justificativa do percentual aplicado e comparar com o índice oficial vigente pra sua modalidade de plano.

## Segundo passo: a ANS

Se a resposta da operadora não for satisfatória, é possível registrar uma reclamação formal junto à ANS, pelo site ou pelo telefone de atendimento da agência — ela tem poder de fiscalizar e intervir em casos de reajuste fora das regras.

${CLOSING}`,
  },
  {
    slug: "diferenca-custo-com-sem-coparticipacao-um-ano",
    title: "Diferença de custo entre plano com e sem coparticipação ao longo de 1 ano",
    category: "custos",
    excerpt:
      "Simular um ano de uso ajuda a visualizar de forma concreta qual opção realmente compensa mais.",
    body: `Comparar plano com e sem coparticipação só pela mensalidade mensal não mostra o quadro completo — o jeito mais claro de decidir é simular o custo total ao longo de um ano inteiro de uso.

## Como montar essa simulação

Multiplique a mensalidade de cada opção por 12 meses, e some ao valor sem coparticipação a estimativa de quanto você gastaria em coparticipação, com base no seu histórico real de consultas e exames no último ano.

## Por que essa conta muda a decisão

Em muitos casos, quem usa o plano com pouca frequência descobre que a coparticipação sai mais barata no total anual, enquanto quem usa com frequência regular percebe que o plano sem coparticipação compensa mais, mesmo com a mensalidade mais alta.

${CLOSING}`,
  },
  {
    slug: "primeiro-plano-saude-guia-quem-nunca-contratou",
    title: "Primeiro plano de saúde da vida: guia para quem nunca contratou",
    category: "guia",
    excerpt:
      "Contratar o primeiro plano de saúde levanta dúvidas básicas que valem esclarecer antes de começar.",
    body: `Contratar o primeiro plano de saúde da vida costuma vir acompanhado de dúvidas básicas — desde o que perguntar até como funciona o processo do início ao fim.

## Por onde começar

Definir o orçamento disponível, entender que tipo de acomodação e segmentação faz sentido (ambulatorial, hospitalar ou completo) e reunir os documentos pessoais básicos são os primeiros passos antes de pedir qualquer cotação.

## O que esperar do processo

Depois de escolher o plano, existe uma etapa de análise da proposta e, uma vez aprovada, os prazos de carência começam a contar — vale já entender que o plano não libera todas as coberturas no primeiro dia.

${CLOSING}`,
  },
  {
    slug: "erros-comuns-contratar-plano-saude",
    title: "Erros comuns na hora de contratar plano de saúde",
    category: "guia",
    excerpt:
      "Alguns deslizes simples geram dor de cabeça depois — veja o que evitar desde o início.",
    body: `Contratar plano de saúde sem alguns cuidados básicos pode gerar problemas que só aparecem meses depois, justamente quando você mais precisa usar a cobertura.

## Erros mais comuns

Não declarar corretamente uma condição de saúde preexistente, não conferir a rede credenciada na própria cidade antes de assinar, e escolher só pelo preço mais baixo sem entender a cobertura envolvida.

## Como evitar esses deslizes

Ler o contrato com atenção (ou pedir explicação sobre pontos que não ficaram claros), confirmar a rede credenciada real pra sua região e ser transparente na declaração de saúde são passos simples que evitam a maioria dos problemas comuns.

${CLOSING}`,
  },
  {
    slug: "analise-proposta-antes-aprovacao-plano",
    title: "Como funciona a análise de proposta antes da aprovação do plano",
    category: "guia",
    excerpt:
      "Entre enviar a documentação e o plano ficar ativo existe uma etapa de avaliação pela operadora.",
    body: `Depois de escolher o plano e enviar a documentação, a operadora passa por uma etapa de análise da proposta antes de confirmar a aprovação — um processo que costuma levar de poucos dias a algumas semanas.

## O que a operadora avalia

Consistência dos documentos enviados, completude da declaração de saúde e, em alguns casos, verificação adicional de informações antes de liberar a aprovação final do contrato.

## O que pode atrasar essa análise

Documentos desatualizados, informações divergentes entre diferentes documentos enviados, ou declaração de saúde incompleta são as causas mais comuns de atraso ou pedido de complementação de informação pela operadora.

${CLOSING}`,
  },
  {
    slug: "declaracao-saude-o-que-e-por-que-importa",
    title: "Plano de saúde: o que é declaração de saúde e por que ela importa",
    category: "guia",
    excerpt:
      "Esse formulário registra seu histórico de saúde no momento da contratação — e precisa ser preenchido com honestidade.",
    body: `A declaração de saúde é um formulário preenchido no momento da contratação, em que o beneficiário informa condições de saúde já diagnosticadas — um documento que tem peso legal importante no contrato.

## Por que ela existe

A declaração de saúde permite que a operadora identifique doenças ou lesões preexistentes, o que define se e como a Cobertura Parcial Temporária (CPT) vai se aplicar durante os primeiros meses do plano.

## Por que preencher com honestidade é essencial

Omitir informações na declaração de saúde pode ser considerado fraude e resultar em cancelamento do contrato ou negativa de cobertura justamente num momento crítico — o mais seguro é sempre declarar tudo que já foi diagnosticado até aquele momento.

${CLOSING}`,
  },
  {
    slug: "omitir-doenca-declaracao-saude-consequencias",
    title: "O que acontece se eu omitir uma doença na declaração de saúde",
    category: "guia",
    excerpt:
      "A omissão pode ser tratada como fraude contratual, com consequências sérias no momento em que você mais precisa do plano.",
    body: `Omitir uma doença ou condição já diagnosticada na declaração de saúde, no momento da contratação do plano, é considerado uma fraude contratual — e as consequências costumam aparecer justamente quando o beneficiário mais precisa usar o plano.

## O que a operadora pode fazer

Se a operadora identificar que uma condição foi omitida de forma intencional, pode negar cobertura relacionada a essa condição específica ou, em casos mais graves, cancelar o contrato — um processo que costuma envolver perícia médica pra comprovar a omissão.

## O caminho mais seguro

Declarar tudo o que já foi diagnosticado, mesmo que isso implique cumprir CPT por um período, é sempre mais seguro do que correr o risco de ficar sem cobertura justamente numa situação de saúde mais séria.

${CLOSING}`,
  },
  {
    slug: "cartao-plano-saude-como-funciona",
    title: "Como funciona o cartão do plano de saúde depois da aprovação",
    category: "guia",
    excerpt:
      "Depois da aprovação, o beneficiário recebe um cartão (físico ou digital) usado pra se identificar na rede credenciada.",
    body: `Depois que o plano de saúde é aprovado, a operadora emite o cartão do beneficiário — hoje, na maioria dos casos, disponível em versão digital direto no aplicativo, além da versão física em alguns casos.

## Pra que serve o cartão

É o documento que identifica você como beneficiário ativo daquela operadora na hora de usar a rede credenciada — apresentado junto com um documento de identidade em consultas, exames e internações.

## O que fazer se o cartão não chegar ou tiver problema

Se o cartão físico atrasar ou a versão digital apresentar algum erro no aplicativo, vale contatar a central de atendimento da operadora — em geral, é possível confirmar que o plano está ativo mesmo sem o cartão físico em mãos.

${CLOSING}`,
  },
  {
    slug: "primeiro-atendimento-depois-aprovado",
    title: "Plano de saúde: o que fazer no primeiro atendimento depois de aprovado",
    category: "guia",
    excerpt:
      "O primeiro uso do plano costuma ter dúvidas práticas sobre agendamento e documentação necessária.",
    body: `Usar o plano de saúde pela primeira vez depois da aprovação costuma levantar dúvidas simples, mas que fazem diferença pra evitar contratempo no dia do atendimento.

## O que levar no primeiro atendimento

Documento de identidade com foto e o cartão do plano (físico ou digital, conforme a operadora) são o básico exigido na maioria das clínicas e hospitais da rede credenciada.

## Como confirmar se o atendimento está dentro da carência

Antes de agendar, vale confirmar no aplicativo ou com a central de atendimento se aquele tipo específico de procedimento já está liberado, considerando os prazos de carência que ainda podem estar em vigor logo no início do plano.

${CLOSING}`,
  },
  {
    slug: "passo-a-passo-pedido-reembolso",
    title: "Passo a passo pra dar entrada num pedido de reembolso",
    category: "guia",
    excerpt:
      "Quem tem plano com opção de reembolso precisa seguir alguns passos formais pra receber o valor de volta.",
    body: `Pra quem tem plano de saúde com opção de reembolso, dar entrada no pedido corretamente é o que garante receber o valor de volta dentro do prazo esperado, sem atraso desnecessário.

## Documentos geralmente necessários

Nota fiscal ou recibo do atendimento particular, laudo ou relatório médico (dependendo do procedimento) e o formulário de solicitação de reembolso, disponibilizado pela operadora no aplicativo ou site.

## Prazo pra solicitar

Cada operadora define um prazo máximo pra solicitação de reembolso a partir da data do atendimento — vale não deixar acumular os recibos e já solicitar o reembolso logo depois de cada atendimento particular.

${CLOSING}`,
  },
  {
    slug: "autorizacao-previa-exames-cirurgias",
    title: "Como funciona a autorização prévia pra exames e cirurgias",
    category: "guia",
    excerpt:
      "Alguns procedimentos exigem aprovação da operadora antes de serem realizados. Entenda o processo.",
    body: `Exames de maior complexidade e cirurgias costumam exigir autorização prévia da operadora antes de serem realizados — uma etapa que garante que o procedimento está dentro da cobertura contratada.

## Como o processo costuma funcionar

O médico ou o hospital solicita a autorização diretamente à operadora, geralmente por sistema eletrônico, informando o procedimento indicado e a justificativa clínica — a operadora tem um prazo regulatório pra responder.

## O que fazer se a autorização demorar

Se o prazo de resposta da operadora se esgotar sem retorno, existem canais de reclamação junto à própria operadora e, se necessário, à ANS — o prazo de resposta é definido em regulamentação e deve ser respeitado.

${CLOSING}`,
  },
  {
    slug: "carteirinha-digital-como-usar",
    title: "O que é carteirinha digital e como usar no dia a dia",
    category: "guia",
    excerpt:
      "A versão digital do cartão do plano simplifica o uso, mas vale saber como acessá-la em caso de imprevisto.",
    body: `A carteirinha digital é a versão do cartão do beneficiário disponível diretamente no aplicativo da operadora, permitindo apresentar a identificação do plano sem precisar do cartão físico.

## Vantagens da versão digital

Sempre disponível no celular, sem risco de esquecer em casa, e geralmente atualizada automaticamente caso haja alguma mudança no plano ou nos dados do beneficiário.

## O que fazer se não tiver acesso ao aplicativo no momento

Vale manter uma captura de tela da carteirinha salva no celular como backup, ou anotar o número de identificação do plano em algum lugar acessível, pra casos em que o aplicativo não abrir no momento do atendimento.

${CLOSING}`,
  },
  {
    slug: "atendimento-urgencia-emergencia-plano-saude",
    title: "Plano de saúde: como funciona o atendimento de urgência e emergência",
    category: "guia",
    excerpt:
      "Esse tipo de atendimento tem a menor carência entre todas — até 24 horas após a contratação.",
    body: `Atendimentos de urgência e emergência têm o prazo de carência mais curto entre todos os tipos de cobertura de um plano de saúde: no máximo 24 horas após a contratação, conforme definido pela ANS.

## Diferença entre urgência e emergência

Emergência envolve risco imediato de vida ou de lesão irreparável. Urgência envolve situações que precisam de atendimento rápido, mas sem risco imediato de vida, como um acidente ou uma complicação súbita de saúde.

## O que verificar na rede credenciada

Vale saber de antemão quais hospitais da rede credenciada têm pronto-socorro disponível 24 horas perto de casa e do trabalho — essa informação faz diferença justamente nos momentos em que a rapidez importa mais.

${CLOSING}`,
  },
  {
    slug: "direitos-beneficiario-plano-saude-desconhecidos",
    title: "Direitos do beneficiário de plano de saúde que você talvez não conheça",
    category: "guia",
    excerpt:
      "Além da cobertura básica, existem direitos específicos garantidos por lei que poucos beneficiários conhecem.",
    body: `Além da cobertura médica contratada, o beneficiário de plano de saúde tem uma série de direitos garantidos por lei e por regulamentação da ANS que vale a pena conhecer.

## Alguns direitos menos conhecidos

Direito à segunda via da carteirinha sem custo, direito a receber resposta em prazo determinado sobre autorizações prévias, e direito a reajuste dentro do índice máximo definido pela ANS (pra planos individuais e familiares).

## Onde buscar mais informação

O site da ANS reúne, de forma organizada, os principais direitos do consumidor de plano de saúde — vale consultar sempre que surgir uma dúvida sobre o que a operadora pode ou não fazer numa determinada situação.

${CLOSING}`,
  },
  {
    slug: "como-cancelar-plano-saude-passo-a-passo",
    title: "Como cancelar um plano de saúde: passo a passo",
    category: "guia",
    excerpt:
      "O cancelamento é um direito do beneficiário, mas seguir a ordem certa evita problemas.",
    body: `Cancelar um plano de saúde é um direito do beneficiário, que pode ser exercido a qualquer momento — mas seguir os passos certos evita problemas, principalmente se a intenção é migrar pra outro plano.

## Passo a passo recomendado

Primeiro, garanta que o plano novo (se houver) já está formalizado. Depois, solicite o cancelamento formalmente pelos canais da operadora (aplicativo, telefone ou presencial). Por fim, guarde a confirmação por escrito do cancelamento.

## Um cuidado importante

Nunca cancele o plano atual antes de ter o plano novo confirmado, especialmente se você pretende usar a portabilidade de carências — a ordem errada pode significar ficar sem cobertura ou perder o direito à portabilidade.

${CLOSING}`,
  },
  {
    slug: "operadora-negar-cobertura-devida-o-que-fazer",
    title: "O que fazer se a operadora negar uma cobertura que deveria ser garantida",
    category: "guia",
    excerpt:
      "Existem canais formais de contestação quando uma negativa parece estar fora do que o plano deveria cobrir.",
    body: `Se a operadora negar um procedimento que, pela sua avaliação, deveria estar coberto pelo plano contratado, existem canais formais pra contestar essa decisão antes de aceitar a negativa.

## Primeiro passo

Pedir a negativa por escrito, com a justificativa detalhada da operadora — esse documento é o ponto de partida pra qualquer contestação posterior, seja com a própria operadora, seja com órgãos externos.

## Onde buscar ajuda externa

Se a negativa persistir e parecer indevida, é possível registrar reclamação na ANS, buscar orientação num Procon, ou, em casos mais complexos, buscar orientação jurídica especializada em direito à saúde.

${CLOSING}`,
  },
  {
    slug: "plano-saude-ans-pra-que-serve-quando-acionar",
    title: "Plano de saúde e ANS: pra que serve e quando acionar",
    category: "guia",
    excerpt:
      "A ANS é o órgão regulador do setor — entenda seu papel e quando vale a pena procurá-la diretamente.",
    body: `A ANS (Agência Nacional de Saúde Suplementar) é o órgão do governo responsável por regular e fiscalizar as operadoras de plano de saúde no Brasil, definindo regras que valem pra todo o setor.

## O que a ANS regula

Prazos máximos de carência, índice de reajuste de planos individuais e familiares, rol mínimo de coberturas obrigatórias e regras de portabilidade de carências, entre outras normas que toda operadora deve seguir.

## Quando vale acionar a ANS diretamente

Se uma tentativa de resolver um problema diretamente com a operadora não funcionar — seja negativa de cobertura indevida, reajuste fora do índice permitido, ou demora excessiva em autorização — a ANS é o canal oficial pra registrar reclamação formal.

${CLOSING}`,
  },
  {
    slug: "checklist-final-antes-assinar-contrato",
    title: "Checklist final antes de assinar o contrato do plano de saúde",
    category: "guia",
    excerpt:
      "Uma última conferência antes de assinar evita arrependimento depois que o plano já está ativo.",
    body: `Antes de assinar o contrato de um plano de saúde, vale fazer uma última conferência de alguns pontos essenciais — um cuidado simples que evita arrependimento depois.

## O que conferir por último

Rede credenciada confirmada pra sua cidade, tipo de acomodação e segmentação corretos conforme o que foi cotado, valor da mensalidade batendo com o combinado, e declaração de saúde preenchida de forma completa e honesta.

## Um último detalhe que vale a pena

Guardar uma cópia de toda a proposta e do contrato assinado — esse material serve de referência caso surja alguma dúvida ou divergência mais adiante durante o uso do plano.

${CLOSING}`,
  },
  {
    slug: "aplicativo-operadora-dia-a-dia",
    title: "Como funciona o aplicativo da operadora no dia a dia do plano",
    category: "guia",
    excerpt:
      "A maioria das tarefas do plano hoje passa pelo aplicativo — vale se familiarizar com ele desde o início.",
    body: `Depois que o plano de saúde é aprovado, o aplicativo da operadora se torna a ferramenta principal pro dia a dia — desde consultar a carteirinha até agendar consultas e acompanhar pedidos de autorização.

## O que costuma estar disponível no app

Carteirinha digital, busca de rede credenciada, agendamento de consultas (em algumas operadoras), telemedicina, acompanhamento de pedidos de autorização e, em muitos casos, solicitação de reembolso direto pelo aplicativo.

## Por que vale se familiarizar desde já

Conhecer o aplicativo antes de precisar dele numa situação de urgência facilita bastante — vale baixar e configurar a conta assim que o plano for aprovado, sem esperar o primeiro uso real acontecer.

${CLOSING}`,
  },
  {
    slug: "perguntas-cotacao-maioria-esquece",
    title: "Plano de saúde: o que perguntar na cotação que a maioria esquece",
    category: "guia",
    excerpt:
      "Além de preço e rede, algumas perguntas específicas evitam surpresa depois da contratação.",
    body: `Na hora de pedir uma cotação de plano de saúde, a maioria das pessoas foca só em preço e rede credenciada — mas algumas perguntas adicionais ajudam a evitar surpresas depois que o plano já está ativo.

## Perguntas que vale fazer

Qual o histórico de reajuste da operadora nos últimos anos? Existe coparticipação, e qual a tabela completa dela? Qual o prazo médio de autorização pra exames de maior complexidade? A rede credenciada informada está atualizada?

## Por que essas perguntas fazem diferença

Respostas claras e específicas pra essas perguntas são um bom sinal de transparência da corretora ou da operadora — e ajudam a evitar decisões baseadas só no valor da mensalidade, sem entender o que realmente vem junto com aquele preço.

${CLOSING}`,
  },
];

const startDate = new Date("2026-08-03T09:00:00-03:00");
const publishDates = [];
let cursor = new Date(startDate);
while (publishDates.length < posts.length) {
  const day = cursor.getDay(); // 0=dom, 1=seg, 3=qua, 5=sex
  if (day === 1 || day === 3 || day === 5) {
    publishDates.push(new Date(cursor));
  }
  cursor.setDate(cursor.getDate() + 1);
}

function textToBlocks(text) {
  return text
    .trim()
    .split(/\n\n+/)
    .map((chunk) => {
      const isHeading = chunk.startsWith("## ");
      const plain = isHeading ? chunk.slice(3) : chunk;
      return {
        _type: "block",
        style: isHeading ? "h2" : "normal",
        children: [{ _type: "span", text: plain, marks: [] }],
        markDefs: [],
      };
    });
}

async function run() {
  console.log(`Publicando em ${projectId}/${dataset}...`);

  // 1. Garante que as categorias existem
  for (const [key, title] of Object.entries(categories)) {
    await client.createIfNotExists({
      _id: `category-${key}`,
      _type: "category",
      title,
    });
  }
  console.log(`${Object.keys(categories).length} categorias garantidas.`);

  // 2. Cria/atualiza os posts, um por data do calendario
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const publishedAt = publishDates[i].toISOString();

    await client.createOrReplace({
      _id: `post-${post.slug}`,
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      excerpt: post.excerpt,
      category: { _type: "reference", _ref: `category-${post.category}` },
      body: textToBlocks(post.body),
      publishedAt,
      seoDescription: post.excerpt.slice(0, 160),
    });

    console.log(
      `[${i + 1}/${posts.length}] ${post.title} -> ${publishedAt.slice(0, 10)}`
    );
  }

  console.log("\nPronto! Calendario de 12 meses criado no Sanity.");
  console.log(
    "Os posts so aparecem no site conforme a data de publicacao chega (o blog respeita o campo publishedAt)."
  );
}

run().catch((err) => {
  console.error("Erro ao publicar posts:", err);
  process.exit(1);
});
