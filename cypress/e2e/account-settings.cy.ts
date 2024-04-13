import user from "../fixtures/users/test-user.json";

describe("test account settings", () => {
  beforeEach(() => {
    cy.login(user.email, user.password);
    cy.visit("profile");
    cy.getByCy("edit-account-info").click();
  });

  it("open account settings with success", () => {
    cy.getByCy("account-settings-title").should("exist");
  });

  it("button to change display name is disabled", () => {
    cy.getByCy("save-display-name").should("be.disabled");
  });

  it("button is enabled if display name is changed", () => {
    cy.getByCy("display-name-input").type("new");
    cy.getByCy("save-display-name").should("not.be.disabled");
  });

  it("email form should exist if user click to change email", () => {
    cy.getByCy("change-email-button").click();
    cy.getByCy("update-email-form").should("exist");
  });

  it("button to change password is visible", () => {
    cy.getByCy("change-password-button").should("be.visible");
  });
});
