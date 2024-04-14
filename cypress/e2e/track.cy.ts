import user from "../fixtures/users/test-user.json";

describe("test episode actions", () => {
  beforeEach(() => {
    cy.clearUserData(user.email, user.password);
    cy.login(user.email, user.password);
  });

  it("create new track", () => {
    cy.addSubjectTo(user.email, user.password).then((subject) => {
      cy.addEpisodeTo(user.email, user.password, subject._id).then(
        (episode) => {
          cy.visit(`episode/${episode._id}`);
          cy.getByCy("add-track-button").wait(1000).click();
          cy.getByCy("track-component").should("have.length", 2);
        }
      );
    });
  });

  it("edit track modal is visible", () => {
    cy.addSubjectTo(user.email, user.password).then((subject) => {
      cy.addEpisodeTo(user.email, user.password, subject._id).then(
        (episode) => {
          cy.visit(`episode/${episode._id}`);
          cy.getByCy("edit-track-button").wait(1000).click();
          cy.getByCy("edit-track-modal").should("exist");
        }
      );
    });
  });

  it("open segment modal", () => {
    cy.addSubjectTo(user.email, user.password).then((subject) => {
      cy.addEpisodeTo(user.email, user.password, subject._id).then(
        (episode) => {
          cy.visit(`episode/${episode._id}`);
          cy.getByCy("segment-component").wait(1000).first().click();
          cy.getByCy("edit-segment-modal").should("exist");
        }
      );
    });
  });

  it("navigate through all tabs in segment modal", () => {
    cy.addSubjectTo(user.email, user.password).then((subject) => {
      cy.addEpisodeTo(user.email, user.password, subject._id).then(
        (episode) => {
          cy.visit(`episode/${episode._id}`);
          cy.getByCy("segment-component").wait(1000).first().click();
          cy.getByCy("edit-segment-modal").should("exist");

          cy.getByCy("segment-page").should("exist");

          cy.getByCy("intensities-tab").click();
          cy.getByCy("intensities-page").should("exist");

          cy.getByCy("quality-tab").click();
          cy.getByCy("quality-page").should("exist");

          cy.getByCy("intervention-tab").click();
          cy.getByCy("intervention-page").should("exist");

          cy.getByCy("symptoms-tab").click();
          cy.getByCy("symptoms-page").should("exist");
        }
      );
    });
  });

  it("delete track", () => {
    cy.addSubjectTo(user.email, user.password).then((subject) => {
      cy.addEpisodeTo(user.email, user.password, subject._id).then(
        (episode) => {
          cy.visit(`episode/${episode._id}`);
          cy.getByCy("delete-track-button").wait(1000).click();
          cy.getByCy("delete-track-modal").should("exist");
          cy.getByCy("delete-track-modal-name")
            .invoke("text")
            .then((text) => {
              cy.getByCy("confirm-action-input").type(text);
              cy.getByCy("confirm-action-button").click();

              cy.getByCy("track-component").should("not.exist");
            });
        }
      );
    });
  });
});
