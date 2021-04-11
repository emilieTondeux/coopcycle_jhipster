import { element, by, ElementFinder } from 'protractor';

export class PaymentSysComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-payment-sys div table .btn-danger'));
  title = element.all(by.css('jhi-payment-sys div h2#page-heading span')).first();
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

export class PaymentSysUpdatePage {
  pageTitle = element(by.id('jhi-payment-sys-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  crediteurInput = element(by.id('field_crediteur'));
  debiteurInput = element(by.id('field_debiteur'));
  methodInput = element(by.id('field_method'));

  acountSelect = element(by.id('field_acount'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCrediteurInput(crediteur: string): Promise<void> {
    await this.crediteurInput.sendKeys(crediteur);
  }

  async getCrediteurInput(): Promise<string> {
    return await this.crediteurInput.getAttribute('value');
  }

  async setDebiteurInput(debiteur: string): Promise<void> {
    await this.debiteurInput.sendKeys(debiteur);
  }

  async getDebiteurInput(): Promise<string> {
    return await this.debiteurInput.getAttribute('value');
  }

  async setMethodInput(method: string): Promise<void> {
    await this.methodInput.sendKeys(method);
  }

  async getMethodInput(): Promise<string> {
    return await this.methodInput.getAttribute('value');
  }

  async acountSelectLastOption(): Promise<void> {
    await this.acountSelect.all(by.tagName('option')).last().click();
  }

  async acountSelectOption(option: string): Promise<void> {
    await this.acountSelect.sendKeys(option);
  }

  getAcountSelect(): ElementFinder {
    return this.acountSelect;
  }

  async getAcountSelectedOption(): Promise<string> {
    return await this.acountSelect.element(by.css('option:checked')).getText();
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

export class PaymentSysDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-paymentSys-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-paymentSys'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
