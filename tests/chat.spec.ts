import { expect, test } from "@playwright/test";

test.describe("Chat Application End-to-End Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText("Oi! Eu sou Sofia, consultora digital da Dolado.")
    ).toBeVisible({ timeout: 10000 });
  });

  test("should load the chat interface correctly", async ({ page }) => {
    await expect(page).toHaveTitle(/Chatbot/);

    await expect(page.getByText("Dolado Chatbot")).toBeVisible();
    await expect(
      page.getByText(
        "A Solução para transformar sua empresa em uma potência digital."
      )
    ).toBeVisible();

    await expect(
      page.getByText("Oi! Eu sou Sofia, consultora digital da Dolado.")
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Claro, vamos lá!" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Primeiro quero entender melhor" })
    ).toBeVisible();
  });

  test("should allow selecting an initial option and display new bot message", async ({
    page,
  }) => {
    const initialOptionButton = page.getByRole("button", {
      name: "Claro, vamos lá!",
    });
    const expectedBotResponseAfterClick =
      "Perfeito! Deixa eu te conhecer melhor. Conta aí, que tipo de operação vocês têm? Quero entender a complexidade do negócio para dar as orientações mais assertivas."; // Ajuste esta mensagem para a resposta real do seu bot

    await initialOptionButton.click();

    await expect(page.getByText(expectedBotResponseAfterClick)).toBeVisible();

    await expect(initialOptionButton).not.toBeVisible();
  });

  test("should allow exporting chat conversation as JSON", async ({ page }) => {
    await page.getByRole("button", { name: "Claro, vamos lá!" }).click();
    await expect(
      page.getByText(
        "Perfeito! Deixa eu te conhecer melhor. Conta aí, que tipo de operação vocês têm? Quero entender a complexidade do negócio para dar as orientações mais assertivas."
      )
    ).toBeVisible();
    await page.getByRole("button", { name: "Grupo empresaria" }).click();

    const optionsButton = page.getByRole("button", {
      name: "Opções de conversa",
    });
    await optionsButton.click();

    const dropdownMenu = page.getByRole("menu");
    await expect(dropdownMenu).toBeVisible();

    const exportMenuItem = dropdownMenu.getByText("Exportar como JSON");
    await expect(exportMenuItem).toBeVisible();

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      exportMenuItem.click(),
    ]);

    expect(download.suggestedFilename()).toMatch(
      /conversa_dolado_\d{4}-\d{2}-\d{2}\.json/
    );
  });
});
