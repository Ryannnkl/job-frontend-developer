import { conversationMocks } from "@/lib/mocks";
import { create } from "zustand";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
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
  isBotTyping: boolean;
  addMessage: (message: Message) => void;
  processUserResponse: (userResponse: string) => void;
  startChat: () => void;
  setBotTyping: (isTyping: boolean) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  currentBotMessage: null,
  isBotTyping: false,

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  setBotTyping: (isTyping) => set({ isBotTyping: isTyping }),

  startChat: () => {
    const [firstStep] = conversationMocks;
    if (firstStep) {
      get().setBotTyping(true);
      setTimeout(() => {
        const timestamp = Date.now().toString();
        const id = `${timestamp}-bot`;

        get().addMessage({
          id,
          text: firstStep.message,
          sender: "bot",
        });

        set({
          currentBotMessage: {
            id,
            text: firstStep.message,
            sender: "bot",
            options: firstStep.options,
            followUp: firstStep.followUp,
            originalMockIndex: 0,
            isFollowUp: false,
          },
        });

        get().setBotTyping(false);
      }, 1500);
    }
  },

  processUserResponse: (userResponse) => {
    const { addMessage, currentBotMessage, setBotTyping } = get();

    if (!currentBotMessage) return;

    const userId = `${Date.now().toString()}-user`;
    addMessage({
      id: userId,
      text: userResponse,
      sender: "user",
    });

    set({ currentBotMessage: null });

    setBotTyping(true);

    setTimeout(() => {
      if (currentBotMessage.followUp && !currentBotMessage.isFollowUp) {
        const followUpId = `${Date.now().toString()}-bot-followup`;
        addMessage({
          id: followUpId,
          text: currentBotMessage.followUp.message,
          sender: "bot",
        });
        set({
          currentBotMessage: {
            id: followUpId,
            text: currentBotMessage.followUp.message,
            sender: "bot",
            options: currentBotMessage.followUp.options,
            originalMockIndex: currentBotMessage.originalMockIndex,
            isFollowUp: true,
          },
        });
      } else {
        const nextStepIndex = currentBotMessage.originalMockIndex + 1;
        const nextStep = conversationMocks[nextStepIndex];

        if (nextStep) {
          const nextId = `${Date.now().toString()}-bot`;
          addMessage({
            id: nextId,
            text: nextStep.message,
            sender: "bot",
          });
          set({
            currentBotMessage: {
              id: nextId,
              text: nextStep.message,
              sender: "bot",
              options: nextStep.options,
              followUp: nextStep.followUp,
              originalMockIndex: nextStepIndex,
              isFollowUp: false,
            },
          });
        } else {
          const resultStep = conversationMocks.find(
            (mock) => mock.type === "result"
          );
          if (resultStep) {
            const resultId = `${Date.now().toString()}-bot-result`;
            addMessage({
              id: resultId,
              text: resultStep.message,
              sender: "bot",
            });
            set({ currentBotMessage: null });
          }
        }
      }
      setBotTyping(false);
    }, 1500);
  },
}));
