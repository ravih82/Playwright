class ReportsPage {
  constructor(page) {
    this.page = page;
    this.searchBox = page.locator('#reportSearch');
    this.searchButton = page.locator('#searchBtn');
    this.resultRow = page.locator('#reportResult');
  }

  async searchProcess(processName) {
    await this.searchBox.fill(processName);
    await this.searchButton.click();
  }

  async getProcessName() {
    return await this.resultRow.textContent();
  }
}
module.exports = ReportsPage;
