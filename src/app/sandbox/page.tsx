"use client"
import TaskCard from "../components/TaskCard/TaskCard";

export default function Sandbox() {
  // Mock: Criamos uma tarefa falsa com o objeto "grupo" 
  // para forçar a borda roxa a aparecer no teste.
 // Array contendo vários cenários de teste para o nosso componente
  const bateriaDeTarefas = [
    {
      // 🔴 Cenário 1: Completa, Grupo, Urgente (Vermelha), Checklist e Anexos
      id: "1",
      titulo: "Desenvolvimento do Make It!",
      concluida: false,
      grupo: { nomeGrupoOuMembro: "Jam Labs", tipo: "Livre", statusMembros: {} },
      tempo: {
        tipo: "Prazo",
        dataInicio: new Date(new Date().setDate(new Date().getDate() - 5)),
        dataLimite: new Date(new Date().setDate(new Date().getDate() + 1)) // Amanhã
      },
      descricao: {
        tipo: "checklist",
        texto: "Desenvolver as telas do aplicativo seguindo o design proposto.",
        itens: [
          { id: "101", conteudo: "Desenvolver tela de login", completado: true },
          { id: "102", conteudo: "Desenvolver tela de cadastro", completado: true },
          { id: "103", conteudo: "Desenvolver dashboard principal", completado: false },
        ],
        anexos: [
          { id: "a1", nome: "Hian.jpg", formato: "imagem", url: "https://avatars.githubusercontent.com/u/228713764?s=130&v=4" },
          { id: "a2", nome: "Augusto.jpg", formato: "imagem", url: "https://avatars.githubusercontent.com/u/114544659?v=4" },
          { id: "a3", nome: "Michael.jpg", formato: "imagem", url: "https://avatars.githubusercontent.com/u/139723370?s=130&v=4"},
          { id: "a4", nome: "Elton.jpg", formato: "imagem", url: "https://avatars.githubusercontent.com/u/238584604?s=130&v=4" },
          { id: "a5", nome: "Joab.jpg", formato: "imagem", url: "https://avatars.githubusercontent.com/u/242846161?s=130&v=4" },
          { id: "a6", nome: "Arthur.jpg", formato: "imagem", url: "https://avatars.githubusercontent.com/u/153288958?s=130&v=4" }
        ]
      }
    },
    {
      // 🟢 Cenário 2: Prazo longo (Verde), Individual (Sem Grupo), Sem anexos
      id: "2",
      titulo: "Adicionar novas categorias ao Em Forca",
      concluida: false,
      tempo: {
        tipo: "Prazo",
        dataInicio: new Date(),
        dataLimite: new Date(new Date().setDate(new Date().getDate() + 20)) // Daqui a 20 dias
      }
    },
    {
      // 🟣 Cenário 3: Tarefa de Grupo sem prazo definido (Tag Roxa padrão), Descrição em texto
      id: "3",
      titulo: "Desenvolver Splash Screen",
      concluida: true, // Já vem concluída para testar o título tachado
      grupo: { nomeGrupoOuMembro: "Jam Labs", tipo: "Livre", statusMembros: {} },
      descricao: {
        tipo: "texto",
        texto: "A tela inicial deve conter a logo e redirecionar para o login após 3 segundos."
      }
    },
    {
      // ⚪ Cenário 4: Tarefa Simples (Sem prazo, Sem grupo, Apenas título)
      id: "4",
      titulo: "Pagar boleto da internet",
      concluida: false
    }
  ];


return (
    <div style={{ 
      padding: '50px', 
      backgroundColor: '#F5F7FA', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{ color: '#7C7C7C', fontFamily: "'Quicksand', sans-serif", marginBottom: '40px' }}>
        Laboratório de Componentes
      </h1>
      
      {/* 🔴 MUDANÇA AQUI: Flexbox em coluna com gap para empilhar os cards */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px', 
        width: '100%', 
        maxWidth: '400px' 
      }}>
        
        {/* O React mapeia a nossa bateria de testes e desenha um card para cada */}
        {bateriaDeTarefas.map((tarefa) => (
          <TaskCard key={tarefa.id} task={tarefa} />
        ))}

      </div>
    </div>
  );
}