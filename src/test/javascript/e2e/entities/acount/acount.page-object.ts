import { element, by, ElementFinder } from 'protractor';

export class AcountComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-acount div table .btn-danger'));
  title = element.all(by.css('jhi-acount div h2#page-heading span')).first();
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

export class AcountUpdatePage {
  pageTitle = element(by.id('jhi-acount-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  surnameInput = element(by.id('field_surname'));
  ageInput = element(by.id('field_age'));
  accountIDInput = element(by.id('field_accountID'));
  adressInput = element(by.id('field_adress'));

  roleSelect = element(by.id('field_role'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setSurnameInput(surname: string): Promise<void> {
    await this.surnameInput.sendKeys(surname);
  }

  async getSurnameInput(): Promise<string> {
    return await this.surnameInput.getAttribute('value');
  }

  async setAgeInput(age: string): Promise<void> {
    await this.ageInput.sendKeys(age);
  }

  async getAgeInput(): Promise<string> {
    return await this.ageInput.getAttribute('value');
  }

  async setAccountIDInput(accountID: string): Promise<void> {
    await this.accountIDInput.sendKeys(accountID);
  }

  async getAccountIDInput(): Promise<string> {
    return await this.accountIDInput.getAttribute('value');
  }

  async setAdressInput(adress: string): Promise<void> {
    await this.adressInput.sendKeys(adress);
  }

  async getAdressInput(): Promise<string> {
    return await this.adressInput.getAttribute('value');
  }

  async roleSelectLastOption(): Promise<void> {
    await this.roleSelect.all(by.tagName('option')).last().click();
  }

  async roleSelectOption(option: string): Promise<void> {
    await this.roleSelect.sendKeys(option);
  }

  getRoleSelect(): ElementFinder {
    return this.roleSelect;
  }

  async getRoleSelectedOption(): Promise<string> {
    return await this.roleSelect.element(by.css('option:checked')).getText();
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

export class AcountDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-acount-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-acount'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
