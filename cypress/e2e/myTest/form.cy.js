describe("Form Tests", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("Girilen değerlerin doğruluğunu karşılaştırma.", function () {
    const name = cy.get("[ data-cy=first-name]");
    const ıhsan = name.type("Ihsan");
    ıhsan.first().should("have.value", "Ihsan");

    const email = cy.get("[ data-cy=email]");
    const correctemail = email.type("ihsn_dgn@example.com");
    correctemail.first().should("have.value", "ihsn_dgn@example.com");

    const passWord = cy.get("[ data-cy=passWord]");
    const correctPassWord = passWord.type("1997");
    correctPassWord.first().should("have.value", "1997");

    const terms = cy.get("[ data-cy=terms]");
    const clickOne = terms.click({ force: true });
    clickOne.click({ force: false });
  });

  it("FirstName hatası alıcakmıyım - Buton disabled olacak mı?", function () {
    const name = cy.get("[ data-cy=first-name]");
    const ıhsan = name.type("Ihsan");
    ıhsan.clear();

    const lastName = cy.get("[ data-cy=last-name]");
    const Dogan = lastName.type("Dogan");

    const email = cy.get("[ data-cy=email]");
    const correctemail = email.type("ihsn_dgn@example.com");

    const passWord = cy.get("[ data-cy=passWord]");
    const correctPassWord = passWord.type("1997");

    const terms = cy.get("[ data-cy=terms]");
    const clickOne = terms.click({ force: true });

    const disableButton = cy.get("[data-cy=button]").should("be.disabled");
    const errName = cy.get("[ data-cy=errName]").should("be.visible");
  });

  it("Bilgiler doğru gelince button aktif mi?", function () {
    const name = cy.get("[ data-cy=first-name]");
    const ıhsan = name.type("Ihsan");

    const lastName = cy.get("[ data-cy=last-name]");
    const Dogan = lastName.type("Dogan");

    const email = cy.get("[ data-cy=email]");
    const correctemail = email.type("ihsn_dgn@example.com");

    const passWord = cy.get("[ data-cy=passWord]");
    const correctPassWord = passWord.type("1997");

    const terms = cy.get("[ data-cy=terms]");
    const clickOne = terms.click({ force: true });

    cy.get("[data-cy=button]").should("be.enabled");
  });

  it("firstName doldurulumadığında gelen hata mesajı doğru mu?", function () {
    const name = cy.get("[ data-cy=first-name]");
    const ıhsan = name.type("Ihsan");
    ıhsan.clear();

    const errName = cy.get("[ data-cy=errName]");

    errName.should("have.text", "Lütfen adınızı giriniz!");
  });

  it("Bilgiler doğru girilip butona tıklanınca, girilen firstname aşağıda çıkıyormu,doğru bir şekil de mi?", function () {
    const name = cy.get("[ data-cy=first-name]");
    const ıhsan = name.type("Ihsan");

    const lastName = cy.get("[ data-cy=last-name]");
    const Dogan = lastName.type("Dogan");

    const email = cy.get("[ data-cy=email]");
    const correctemail = email.type("ihsn_dgn@example.com");

    const passWord = cy.get("[ data-cy=passWord]");
    const correctPassWord = passWord.type("1997");

    const terms = cy.get("[ data-cy=terms]");
    const clickOne = terms.click({ force: true });

    cy.get("[data-cy=button]").click();

    cy.get("[data-cy=item]").first().should("be.visible");
    cy.get("[data-cy=item]").should("have.text", "Ihsan");
  });
});
