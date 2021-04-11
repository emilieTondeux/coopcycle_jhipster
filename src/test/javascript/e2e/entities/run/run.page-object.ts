import { element, by, ElementFinder } from 'protractor';

export class RunComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-run div table .btn-danger'));
  title = element.all(by.css('jhi-run div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class RunUpdatePage {
  pageTitle = element(by.id('jhi-run-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  clientNameInput = element(by.id('field_clientName'));
  runnerNameInput = element(by.id('field_runnerName'));
  methodInput = element(by.id('field_method'));

  basketSelect = element(by.id('field_basket'));
  restaurantSelect = element(by.id('field_restaurant'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setClientNameInput(clientName: string): Promise<void> {
    await this.clientNameInput.sendKeys(clientName);
  }

  async getClientNameInput(): Promise<string> {
    return await this.clientNameInput.getAttribute('value');
  }

  async setRunnerNameInput(runnerName: string): Promise<void> {
    await this.runnerNameInput.sendKeys(runnerName);
  }

  async getRunnerNameInput(): Promise<string> {
    return await this.runnerNameInput.getAttribute('value');
  }

  async setMethodInput(method: string): Promise<void> {
    await this.methodInput.sendKeys(method);
  }

  async getMethodInput(): Promise<string> {
    return await this.methodInput.getAttribute('value');
  }

  async basketSelectLastOption(): Promise<void> {
    await this.basketSelect.all(by.tagName('option')).last().click();
  }

  async basketSelectOption(option: string): Promise<void> {
    await this.basketSelect.sendKeys(option);
  }

  getBasketSelect(): ElementFinder {
    return this.basketSelect;
  }

  async getBasketSelectedOption(): Promise<string> {
    return await this.basketSelect.element(by.css('option:checked')).getText();
  }

  async restaurantSelectLastOption(): Promise<void> {
    await this.restaurantSelect.all(by.tagName('option')).last().click();
  }

  async restaurantSelectOption(option: string): Promise<void> {
    await this.restaurantSelect.sendKeys(option);
  }

  getRestaurantSelect(): ElementFinder {
    return this.restaurantSelect;
  }

  async getRestaurantSelectedOption(): Promise<string> {
    return await this.restaurantSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class RunDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-run-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-run'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
