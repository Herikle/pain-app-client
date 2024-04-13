import user from "../fixtures/users/test-user.json";

describe("login", () => {
  it("can login with success", () => {
    cy.visit("login");

    cy.getByCy("email-input").type(user.email);

    cy.getByCy("password-input").type(user.password);

    cy.getByCy("login-button").click();

    cy.getByCy("profile-page").should("exist");
  });
});
