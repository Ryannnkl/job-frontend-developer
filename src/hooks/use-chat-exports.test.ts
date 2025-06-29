import { useChatStore } from "@/lib/store";
import { downloadFile } from "@/lib/utils";
import { act, renderHook } from "@testing-library/react";
import { useChatExports } from "./use-chat-exports";

import type { Mock } from 'jest-mock';

jest.mock("@/lib/store", () => ({
  useChatStore: jest.fn(),
}));

jest.mock("@/lib/utils", () => ({
  downloadFile: jest.fn(),
}));

describe("useChatExports", () => {
  const mockMessages = [
    { id: "1", text: "Hello", sender: "user" },
    { id: "2", text: "Hi there!", sender: "bot" },
    { id: "3", text: "How are you?", sender: "user" },
  ];

  let mockUseChatStore: Mock;
  let mockDownloadFile: Mock;

  beforeEach(() => {
    mockUseChatStore = useChatStore as unknown as Mock;
    mockDownloadFile = downloadFile as Mock;

    mockUseChatStore.mockImplementation((selector: any) => {
      const mockState = {
        messages: mockMessages,
      };
      return selector(mockState);
    });

    mockDownloadFile.mockClear();
  });

  it("should return an object with exportToJson function", () => {
    const { result } = renderHook(() => useChatExports());
    expect(result.current.exportToJson).toBeInstanceOf(Function);
  });

  it("should export messages to JSON format and trigger file download", () => {
    const { result } = renderHook(() => useChatExports());

    act(() => {
      result.current.exportToJson();
    });

    expect(mockDownloadFile).toHaveBeenCalledTimes(1);

    // CORREÇÃO AQUI: Faça um type assertion para string[] ao desestruturar
    const [jsonContent, mimeType, fileName] = mockDownloadFile.mock.calls[0] as [string, string, string];

    const expectedDataToExport = mockMessages.map((msg) => ({
      id: msg.id,
      text: msg.text,
      sender: msg.sender,
    }));
    expect(JSON.parse(jsonContent)).toEqual(expectedDataToExport);

    expect(mimeType).toBe("application/json");

    const today = new Date().toISOString().split("T")[0];
    expect(fileName).toMatch(new RegExp(`^conversa_dolado_${today}.json$`));
  });

  it("should export an empty array if there are no messages", () => {
    mockUseChatStore.mockImplementation((selector: any) => {
      const mockState = {
        messages: [],
      };
      return selector(mockState);
    });

    const { result } = renderHook(() => useChatExports());

    act(() => {
      result.current.exportToJson();
    });

    expect(mockDownloadFile).toHaveBeenCalledTimes(1);
    // CORREÇÃO AQUI: Faça um type assertion para string[] ao desestruturar
    const [jsonContent] = mockDownloadFile.mock.calls[0] as [string, string, string];
    expect(JSON.parse(jsonContent)).toEqual([]);
  });
});