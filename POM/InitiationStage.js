
class InitiationPage {
  constructor(page) {
    this.page = page;
    this.processNameInput = page.locator('#processName');
    this.submitButton = page.locator('#submitProcess');
  }

  async initiateProcess(name) {
    await this.processNameInput.fill(name);
    await this.submitButton.click();
  }
}
module.exports = InitiationPage;
