describe("empty spec", () => {
  it("passes", async () => {
    cy.visit("http://localhost:3000");
    cy.findByRole("textbox", { name: /outlined/i }).type("ha");
    cy.findByText(/hanasaari/i).click();
    cy.findByRole("cell", { name: /hanasaari/i });

    cy.visit("http://localhost:3000/journeys");
    cy.findByRole("combobox", { name: /departure station departure station/i })
      .click()
      .type("ha");
    cy.get("#combo-box-demo-option-0").click();
    cy.findByRole("combobox", { name: /return station return station/i }).type(
      "ha"
    );
    cy.get("#combo-box-demo2-option-1").click();
  });
});
