import user from "../fixtures/users/test-user.json";
import episodeSample from "../fixtures/episodes/episode-sample.json";
import { v4 } from "uuid";

describe("test episode actions", () => {
  beforeEach(() => {
    cy.clearUserData(user.email, user.password);
    cy.login(user.email, user.password);
  });

  it("create a blank new episode", () => {
    cy.addSubjectTo(user.email, user.password).then((subject) => {
      cy.visit(`patient/${subject._id}`);
      cy.getByCy("add-episode-button").wait(1000).click();
      cy.getByCy("create-episode-option").click();
      cy.getByCy("episode-page").should("exist");
    });
  });

  it.only("create a new episode importing from archive", () => {
    cy.addSubjectTo(user.email, user.password).then((subject) => {
      cy.visit(`patient/${subject._id}`);
      cy.getByCy("add-episode-button").wait(1000).click();
      cy.getByCy("import-episode-option").click();
      cy.getByCy("import-episode-input").selectFile(
        "cypress/fixtures/episodes/episode-sample.json",
        { force: true }
      );
      cy.getByCy("import-episode-button").click();
      cy.getByCy("episode-page").should("exist");

      cy.contains(episodeSample.name);
    });
  });

  it("delete episode", () => {
    cy.addSubjectTo(user.email, user.password).then((subject) => {
      cy.addEpisodeTo(user.email, user.password, subject._id).then(
        (episode) => {
          cy.visit(`episode/${episode._id}`);
          cy.getByCy("delete-episode-button").wait(1000).click();
          cy.getByCy("delete-episode-modal").should("exist");
          cy.getByCy("confirm-action-button").click();
          cy.getByCy("table-row").should("not.exist");
        }
      );
    });
  });

  it("export episode", () => {
    cy.addSubjectTo(user.email, user.password).then((subject) => {
      cy.addEpisodeTo(user.email, user.password, subject._id).then(
        (episode) => {
          cy.visit(`episode/${episode._id}`);
          cy.getByCy("export-episode-button").wait(1000).click();
          cy.getByCy("export-episode-modal").should("exist");
          const fileName = v4();
          cy.getByCy("export-episode-file-name-input").clear().type(fileName);
          cy.getByCy("confirm-action-button").click();

          cy.readFile(`cypress/downloads/${fileName}.json`);
        }
      );
    });
  });
});
