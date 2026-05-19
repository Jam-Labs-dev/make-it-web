"use client"
import { useState } from 'react';
import { 
  CardContainer, 
  CardHeader, 
  LeftSection, 
  TaskTitle, 
  StatusCircle, 
  GroupFlag,
  ExpandButton,
  ExpandedContentBox,
  ChecklistContainer, 
  ChecklistRow,      
  CustomCheckbox,
  AttachmentsCarousel, 
  AttachmentSquare,    
  ModalOverlay,        
  ModalContent,        
  CloseButton,
  TimingTag         
} from './styles';

interface TaskCardProps {
  task: any; 
}

export default function TaskCard({ task }: TaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isGroupTask = !!task.grupo;
  const [itensChecklist, setItensChecklist] = useState(task.descricao?.itens || []);
  
  // ESTADO: Controla qual anexo está aberto no Pop-up. Nulo significa fechado.
  const [anexoAberto, setAnexoAberto] = useState<any>(null);

  // NOVO ESTADO: Controla o status global da tarefa
  const [isConcluida, setIsConcluida] = useState(task.concluida);

  const alternarItem = (idDoItemClicado: string) => {
    setItensChecklist((listaAtual: any[]) => 
      listaAtual.map(item => 
        item.id === idDoItemClicado ? { ...item, completado: !item.completado } : item
      )
    );
  };

  // NOVA FUNÇÃO: Inverte o status quando o círculo for clicado
  const alternarStatusTarefa = () => {
    setIsConcluida(!isConcluida);
  };

  // LÓGICA DE MÚLTIPLOS DIAS E URGÊNCIA
  const isMultiDay = !!task.tempo;
  let urgencia: 'v' | 'l' | 'r' = 'v';
  let textoTag = '';

  if (isMultiDay) {
    const inicio = new Date(task.tempo.dataInicio);
    const limite = new Date(task.tempo.dataLimite);
    const hoje = new Date(); // Pega a data e hora do momento

    const tempoTotal = limite.getTime() - inicio.getTime();
    const tempoRestante = limite.getTime() - hoje.getTime();
    const porcentagemRestante = tempoTotal > 0 ? tempoRestante / tempoTotal : 0;

    // Define a cor
    if (porcentagemRestante > 0.5) urgencia = 'v'; // Verde
    else if (porcentagemRestante > 0.2) urgencia = 'l'; // Laranja
    else urgencia = 'r'; // Vermelho

    // Formata a data (Ex: "Até 20/09")
    const dia = limite.getDate().toString().padStart(2, '0');
    const mes = (limite.getMonth() + 1).toString().padStart(2, '0');
    textoTag = `Até ${dia}/${mes}`;

    // Lógica da UX: Se expandido E for grupo, mostra ambos!
    if (isExpanded && isGroupTask) {
      textoTag += ` • ${task.grupo.nomeGrupoOuMembro}`;
    }
  }

  // INSPETOR DE CONTEÚDO EXTRA
  const temTexto = !!task.descricao?.texto;
  const temChecklist = task.descricao?.itens && task.descricao.itens.length > 0;
  const temAnexos = task.descricao?.anexos && task.descricao.anexos.length > 0;
  
  // Se pelo menos um for verdadeiro, a tarefa tem conteúdo extra
  const temConteudoExtra = temTexto || temChecklist || temAnexos;

  return (
    <>
      <CardContainer $urgencia={isMultiDay ? urgencia : undefined}>
        
        {/* RENDERIZAÇÃO CONDICIONAL DA TAG */}
        {isMultiDay ? (
          // Se for múltiplos dias, a TimingTag assume (herdando borda se for grupo)
          <TimingTag $urgencia={urgencia} $isGroup={isGroupTask}>
            {textoTag}
          </TimingTag>
        ) : isGroupTask ? (
          // Se for só grupo sem prazo, mantém a flag roxa padrão
          <GroupFlag>
            {task.grupo.nomeGrupoOuMembro}
          </GroupFlag>
        ) : null}
        
        <CardHeader>
         <LeftSection>
          <StatusCircle 
            $concluido={isConcluida} 
            $isGroup={isGroupTask} 
            onClick={alternarStatusTarefa}
          >
            {/* O desenho do check deve estar AQUI DENTRO */}
            {isConcluida && (
              <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </StatusCircle>
          
          {/* ATUALIZADO: Passando o estado dinâmico 'isConcluida' */}
          <TaskTitle $concluido={isConcluida}>
            {task.titulo}
          </TaskTitle>
        </LeftSection>

          {/* 🔴 A SETA AGORA SÓ APARECE SE HOUVER CONTEÚDO EXTRA */}
          {temConteudoExtra && (
            <ExpandButton onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? (
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 7L7 1L13 7" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L7 7L13 1" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </ExpandButton>
          )}
        </CardHeader>

        {isExpanded && (
          <ExpandedContentBox>
            {task.descricao?.texto && (
              <p style={{ margin: '0 0 15px 0', lineHeight: '1.5' }}>{task.descricao.texto}</p>
            )}

            {task.descricao?.tipo === 'checklist' && (
              <ChecklistContainer>
                {itensChecklist.map((item: any) => (
                  <ChecklistRow key={item.id} $concluido={item.completado}>
                    <CustomCheckbox checked={item.completado} onChange={() => alternarItem(item.id)} />
                    <span>{item.conteudo}</span>
                  </ChecklistRow>
                ))}
              </ChecklistContainer>
            )}

            {task.descricao?.anexos && task.descricao.anexos.length > 0 && (
              <div style={{ marginTop: '15px', borderTop: '1px solid #E0E4EB', paddingTop: '10px' }}>
                <span style={{ fontSize: '11px', color: '#7C7C7C', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                  ANEXOS
                </span>
                
                <AttachmentsCarousel>
                  {task.descricao.anexos.map((anexo: any) => (
                    <AttachmentSquare 
                      key={anexo.id}
                      $bgImage={anexo.formato === 'imagem' ? anexo.url : undefined}
                      onClick={() => setAnexoAberto(anexo)} 
                    >
                      {anexo.formato !== 'imagem' && '📄'}
                    </AttachmentSquare>
                  ))}
                </AttachmentsCarousel>

              </div>
            )}
          </ExpandedContentBox>
        )}
      </CardContainer>

      {anexoAberto && (
        <ModalOverlay onClick={() => setAnexoAberto(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setAnexoAberto(null)}>Fechar Visualização</CloseButton>
            
            {anexoAberto.formato === 'imagem' ? (
              <img src={anexoAberto.url} alt={anexoAberto.nome} />
            ) : (
              <div style={{ padding: '40px', fontFamily: "'Quicksand', sans-serif", textAlign: 'center' }}>
                <h2>📄 {anexoAberto.nome}</h2>
                <p>A visualização de arquivos PDF/Docs ainda será implementada.</p>
              </div>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}