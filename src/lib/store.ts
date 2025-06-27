import { conversationMocks } from "@/lib/mocks";
import { create } from "zustand";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

interface BotMessageWithId extends Message {
  options?: string[];
  followUp?: {
    message: string;
    options: string[];
  };
  originalMockIndex: number;
  isFollowUp?: boolean;
}

interface ChatState {
  messages: Message[];
  currentBotMessage: BotMessageWithId | null;
  addMessage: (message: Message) => void;
  processUserResponse: (userResponse: string) => void;
  startChat: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  currentBotMessage: null,

  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message],
  })),

  startChat: () => {
    const firstStep = conversationMocks[0];
    if (firstStep) {
      setTimeout(() => {
        get().addMessage({ id: Date.now().toString() + '-bot', text: firstStep.message, sender: 'bot' });
        set({
          currentBotMessage: {
            id: Date.now().toString() + '-bot',
            text: firstStep.message,
            sender: 'bot',
            options: firstStep.options,
            followUp: firstStep.followUp,
            originalMockIndex: 0,
            isFollowUp: false,
          },
        });
      }, 500);
    }
  },

  processUserResponse: (userResponse) => {
    const { addMessage, currentBotMessage } = get();

    if (!currentBotMessage) return;

    addMessage({ id: Date.now().toString() + '-user', text: userResponse, sender: 'user' });

    set((state) => ({
      currentBotMessage: null, // Remove as opções após a escolha do usuário
    }));


    // Simula tempo de digitação do bot
    setTimeout(() => {
      if (currentBotMessage.followUp && !currentBotMessage.isFollowUp) {
        addMessage({
          id: Date.now().toString() + '-bot-followup',
          text: currentBotMessage.followUp.message,
          sender: 'bot',
        });
        set({
          currentBotMessage: {
            id: Date.now().toString() + '-bot-followup',
            text: currentBotMessage.followUp.message,
            sender: 'bot',
            options: currentBotMessage.followUp.options,
            originalMockIndex: currentBotMessage.originalMockIndex,
            isFollowUp: true,
          },
        });
      } else {
        const nextStepIndex = currentBotMessage.originalMockIndex + 1;
        const nextStep = conversationMocks[nextStepIndex];

        if (nextStep) {
          addMessage({ id: Date.now().toString() + '-bot', text: nextStep.message, sender: 'bot' });
          set({
            currentBotMessage: {
              id: Date.now().toString() + '-bot',
              text: nextStep.message,
              sender: 'bot',
              options: nextStep.options,
              followUp: nextStep.followUp,
              originalMockIndex: nextStepIndex,
              isFollowUp: false,
            },
          });
        } else {
          const resultStep = conversationMocks.find(mock => mock.type === 'result');
          if (resultStep) {
            addMessage({ id: Date.now().toString() + '-bot-result', text: resultStep.message, sender: 'bot' });
            set({ currentBotMessage: null });
          }
        }
      }
    }, 500); // Tempo de digitação simulado
  },
}));