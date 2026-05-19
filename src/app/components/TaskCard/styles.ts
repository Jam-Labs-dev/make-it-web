import styled from 'styled-components';

/* =========================================
   SESSÃO DO CARD CONTAINER
   ========================================= */

export const CardContainer = styled.div<{ $urgencia?: 'v' | 'l' | 'r' }>`
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  cursor: pointer;
  
  /* Essencial para ancorar a Flag no topo direito */
  position: relative; 
  overflow: hidden; 
  transition: all 0.2s ease-in-out;

  /* 🔴 A MÁGICA ACONTECE AQUI */
  /* Define a cor da borda baseada na urgência, ou cinza padrão */
  border: ${(props) => 
    props.$urgencia === 'v' ? '1px solid #27AE60' : 
    props.$urgencia === 'l' ? '1px solid #F39C12' : 
    props.$urgencia === 'r' ? '1px solid #E74C3C' : '1px solid #EBEBEB'};

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    transform: translateY(-2px); /* Pequeno feedback visual ao passar o mouse */
  }
`;

export const GroupFlag = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 18px;
  background-color: #8E94F2;
  color: #FFFFFF;
  font-family: 'Quicksand', sans-serif;
  font-size: 11px;
  font-weight: 600;
  border-radius: 0 0 0 12px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 4px; /* Pequeno empurrão para a seta não encostar na flag */
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const StatusCircle = styled.div<{ $concluido?: boolean; $isGroup?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;

  /* Lógica da Borda: Se concluído, some. Se for grupo, borda roxa. Senão, cinza. */
  border: ${(props) => props.$concluido ? 'none' : (props.$isGroup ? '1px solid #9A9AFF' : '1px solid #C4C4C4')};
  
  /* Lógica do Fundo: Se concluído, roxo de grupo ou verde padrão. */
  background-color: ${(props) => props.$concluido ? (props.$isGroup ? '#9A9AFF' : '#2ECC71') : 'transparent'};
  
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  /* Centraliza o check SVG */
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.05);
  }
`;

/* 🔴 ATUALIZADO: Recebendo a prop genérica <{ $concluido?: boolean }> */
export const TaskTitle = styled.h4<{ $concluido?: boolean }>`
  /* Mudar a cor para cinza se concluído, senão preto/grafite */
  color: ${(props) => (props.$concluido ? '#7C7C7C' : '#333333')}; 
  
  font-size: 15px;
  font-weight: 500;
  margin: 0;
  font-family: 'Quicksand', sans-serif;
  transition: all 0.2s; /* Transição suave para a mudança de cor e risco */

  /* 🔴 A MÁGICA ACONTECE AQUI */
  /* Aplica o risco se concluído, senão nenhum */
  text-decoration: ${(props) => (props.$concluido ? 'line-through' : 'none')};
  
  /* Opcional: Diminuir um pouco a opacidade para dar mais ênfase */
  opacity: ${(props) => (props.$concluido ? 0.8 : 1)};
`;

/* 🔴 NOVO: Botão de seta invisível e alinhado */
export const ExpandButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  color: #333;
  margin-top: 10px; /* Alinha a seta logo abaixo da flag */
`;

/* 🔴 NOVO: A caixa cinza para o conteúdo */
export const ExpandedContentBox = styled.div`
  background-color: #F3F4F6;
  border-radius: 8px;
  padding: 15px 20px;
  font-family: 'Quicksand', sans-serif;
  font-size: 13px;
  color: #333333;
`;

/* 🔴 NOVO: Container para agrupar os itens da checklist */
export const ChecklistContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; /* Espaço entre cada item da lista */
`;

/* 🔴 NOVO: Linha individual clicável */
/* 🔴 CONSERTO: Passamos a interface <{ $concluido?: boolean }> diretamente para a tag label */
export const ChecklistRow = styled.label<{ $concluido?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 13px;
  color: #333333;
  
  /* Agora o TypeScript já sabe que 'props' tem a propriedade $concluido! */
  opacity: ${(props) => props.$concluido ? 0.6 : 1};
  text-decoration: ${(props) => props.$concluido ? 'line-through' : 'none'};
`;

/* 🔴 NOVO: Checkbox customizado nativo */
export const CustomCheckbox = styled.input.attrs({ type: 'checkbox' })`
  accent-color: #2ECC71; /* Pinta o checkbox nativo de verde quando marcado */
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

/* =========================================
   SESSÃO DE ANEXOS E CARROSSEL
   ========================================= */

export const AttachmentsCarousel = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 8px; /* Espaço inferior para a barra de rolagem não cortar a imagem */
  
  /* Estilização elegante da barra de rolagem (compatível com navegadores Webkit) */
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #F3F4F6;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #D1D6E0;
    border-radius: 4px;
  }
`;

/* O Quadrado de prévia. Ele recebe a URL da imagem por uma prop dinâmica ($bgImage) */
export const AttachmentSquare = styled.div<{ $bgImage?: string }>`
  width: 64px;
  height: 64px;
  flex-shrink: 0; /* Impede o esmagamento do quadrado */
  border-radius: 8px;
  background-color: #E0E4EB;
  
  /* Lógica da miniatura: Se tiver imagem, mostra a imagem cobrindo o quadrado */
  background-image: ${(props) => props.$bgImage ? `url(${props.$bgImage})` : 'none'};
  background-size: cover;
  background-position: center;
  
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #D1D6E0;
  font-size: 24px; /* Tamanho do ícone caso não seja imagem */
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05); /* Pequeno efeito de zoom ao passar o mouse */
  }
`;

/* =========================================
   SESSÃO DO MODAL (POP-UP)
   ========================================= */

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7); /* Fundo escurecido transparente */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Garante que fique por cima de tudo no site */
`;

export const ModalContent = styled.div`
  background: #FFFFFF;
  padding: 15px;
  border-radius: 12px;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-end; /* Alinha o botão de fechar à direita */

  /* A imagem expandida dentro do pop-up */
  img {
    max-width: 100%;
    max-height: 75vh;
    border-radius: 8px;
    object-fit: contain;
  }
`;

export const CloseButton = styled.button`
  background-color: #F3F4F6;
  color: #333333;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Quicksand', sans-serif;
  font-weight: 700;
  
  &:hover {
    background-color: #E0E4EB;
  }
`;

/* 🔴 NOVO: A Tag Dinâmica para Tarefas com Prazo */
export const TimingTag = styled.div<{ $urgencia: 'v' | 'l' | 'r'; $isGroup: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 18px;
  
  /* Lógica de Cor Baseada na Urgência */
  background-color: ${(props) => 
    props.$urgencia === 'v' ? '#22C55E' : 
    props.$urgencia === 'l' ? '#CB6600' : '#CB0003'};
    
  color: #FFFFFF;
  font-family: 'Quicksand', sans-serif;
  font-size: 11px;
  font-weight: 600;
  border-radius: 0 0 0 12px;
  
  /* Lógica de Borda: Se também for de grupo, ganha a borda roxa */
  border-left: ${(props) => props.$isGroup ? '4px solid #9A9AFF' : 'none'};
  
  transition: all 0.3s ease;
`;