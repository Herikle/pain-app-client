import user from "../fixtures/users/test-user.json";

describe("test subjects actions", () => {
  beforeEach(() => {
    cy.clearUserData(user.email, user.password);
    cy.login(user.email, user.password);
    cy.visit("profile");
  });

  it("create a new subject", () => {
    cy.getByCy("add-patient-button").click();

    cy.getByCy("patient-page").should("exist");
  });

  it("open delete subject popup", () => {
    cy.addSubjectTo(user.email, user.password).then((subject) => {
      cy.visit(`patient/${subject._id}`);
      cy.getByCy("delete-patient-button").wait(1000).click();
      cy.getByCy("delete-patient-modal").should("exist");
    });
  });

  it("delete subject", () => {
    cy.addSubjectTo(user.email, user.password).then((subject) => {
      cy.visit(`patient/${subject._id}`);
      cy.getByCy("delete-patient-button").wait(1000).click();
      cy.getByCy("delete-patient-modal").should("exist");

      cy.getByCy("confirm-action-button").click();

      cy.getByCy("profile-page").should("exist");

      cy.getByCy("table-row").should("not.exist");
    });
  });
});
