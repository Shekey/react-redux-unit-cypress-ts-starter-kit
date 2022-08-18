it("should load the page", () => {
  cy.visit("/");
  cy.findAllByText(/React, Redux, Typescript Boilerplate/i).should("have.length", 1);
});