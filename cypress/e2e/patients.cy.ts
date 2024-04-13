import user from "../fixtures/users/test-user.json";

describe("test patients actions", () => {
  beforeEach(() => {
    cy.clearUserData(user.email, user.password);
    cy.login(user.email, user.password);
    cy.visit("profile");
  });

  it("create a new patient", () => {
    cy.getByCy("add-patient-button").click();

    cy.getByCy("patient-page").should("exist");
  });
});
