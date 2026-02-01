
class OwnerPage {
  constructor(page) {
    this.page = page;
    this.approveButton = page.locator('#ownerApprove');
  }

  async approveProcess() {
    await this.approveButton.click();
  }
}
module.exports = OwnerPage;
