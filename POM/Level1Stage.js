class Level1Page {
  constructor(page) {
    this.page = page;
    this.approveButton = page.locator('#level1Approve');
  }

  async approveProcess() {
    await this.approveButton.click();
  }
}
module.exports = Level1Page;
