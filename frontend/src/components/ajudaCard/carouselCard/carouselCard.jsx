import { ScrollView } from "react-native"

import AjudaCard from "../ajudaCard"

function CarouselCard() {
  const infos = [
    {
      id: 1,
      title: "Consulta e Atualização de Estoque",
      question1: "Como posso consultar o estoque atual?",
      question2: "Como faço para editar a quantidade de um produto?",
      question3: "Como adiciono um novo item ao estoque?",
      description1:
        "Na tela inicial, você verá uma opção de 'Consulta de Estoque'. Ao clicar, você pode visualizar todos os produtos organizados por categoria, estante ou corredor.",
      description2:
        "Localize o produto na consulta de estoque, selecione-o e clique na opção 'Editar Quantidade'. Insira a nova quantidade e confirme.",
      description3:
        "Na tela inicial, clique no ícone de “+” no canto inferior direito e selecione “Adicionar Novo Item”. Preencha as informações do produto e salve para incluí-lo no estoque.",
    },
    {
      id: 2,
      title: "Configurações do Perfil e Conta",
      question1: "Como adiciono uma foto ao meu perfil?",
      question2: "Como altero minha senha?",
      question3: "Como configuro meu status de atividade?",
      description1:
        "Vá até 'Configurações' e selecione 'Perfil'. Clique em 'Alterar Foto' e escolha uma imagem da galeria para atualizar sua foto de perfil.",
      description2:
        "Em 'Configurações', acesse a opção 'Segurança' e selecione 'Alterar Senha'. Insira sua senha atual e depois a nova senha para atualizar.",
      description3:
        "Na tela de perfil, há uma seção de 'Status de Atividade'. Selecione o status desejado, como 'Ativo' ou 'Ausente', para indicar sua disponibilidade.",
    },
    {
      id: 3,
      title: "Notificações e Alertas",
      question1: "Posso personalizar as notificações do aplicativo?",
      question2:
        "Como ajusto as preferências de som e vibração para notificações?",
      question3:
        "Como altero a frequência das notificações de atualização de estoque?",
      description1:
        "Sim! Vá até 'Configurações', selecione 'Notificações' e ajuste os alertas que deseja receber, como notificações de produtos em falta ou itens expirados.",
      description2:
        "Em 'Notificações', você encontrará opções para habilitar ou desabilitar o som e a vibração para cada tipo de alerta.",
      description3:
        "Na seção 'Sincronização' das configurações, escolha o intervalo para atualizações automáticas, como a cada 15 minutos, 1 hora ou 24 horas.",
    },
    {
      id: 4,
      title: "Relatórios e Exportações",
      question1: "Como exporto relatórios do estoque?",
      question2: "Como configuro a impressão de relatórios?",
      question3:
        "Posso programar relatórios para serem gerados automaticamente?",
      description1:
        "Na tela de relatórios, clique na opção 'Exportar'. Escolha o formato desejado, como PDF ou Excel, e confirme para gerar e salvar o arquivo.",
      description2:
        "Em 'Configurações de Impressão', conecte-se à impressora compatível e ajuste o layout de impressão conforme sua preferência.",
      description3:
        "Sim, em 'Configurações de Relatórios', você pode definir uma frequência (diária, semanal ou mensal) para que relatórios sejam gerados automaticamente.",
    },
    {
      id: 5,
      title: "Suporte e Problemas Técnicos",
      question1: "O que fazer se o app não estiver sincronizando?",
      question2: "O que faço se o app travar?",
      question3: "Como verificar o histórico de atualizações do app?",
      description1:
        "Verifique a conexão de internet e, em seguida, vá até 'Configurações' e clique em 'Sincronizar Agora' para forçar a atualização manual.",
      description2:
        "Tente reiniciar o app. Se o problema persistir, vá até 'Configurações' > 'Suporte', e selecione 'Relatar Problema' para que possamos ajudar.",
      description3:
        "Em 'Sobre o App', você verá a seção 'Histórico de Atualizações', onde pode ver as melhorias mais recentes e bugs corrigidos.",
    },
  ]
  
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexDirection: "row", gap: 15, paddingHorizontal: 20 }}
    >
      {infos.map((info) => (
        <AjudaCard
          key={info.id}
          title={info.title}
          question1={info.question1}
          question2={info.question2}
          question3={info.question3}
          description1={info.description1}
          description2={info.description2}
          description3={info.description3}
        />
      ))}
    </ScrollView>
  )
}

export default CarouselCard