import { element, by, ElementFinder } from 'protractor';

export class BasketComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-basket div table .btn-danger'));
  title = element.all(by.css('jhi-basket div h2#page-heading span')).first();
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

export class BasketUpdatePage {
  pageTitle = element(by.id('jhi-basket-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nbElementsInput = element(by.id('field_nbElements'));
  priceInput = element(by.id('field_price'));

  restaurantSelect = element(by.id('field_restaurant'));
  productSelect = element(by.id('field_product'));
  acountSelect = element(by.id('field_acount'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNbElementsInput(nbElements: string): Promise<void> {
    await this.nbElementsInput.sendKeys(nbElements);
  }

  async getNbElementsInput(): Promise<string> {
    return await this.nbElementsInput.getAttribute('value');
  }

  async setPriceInput(price: string): Promise<void> {
    await this.priceInput.sendKeys(price);
  }

  async getPriceInput(): Promise<string> {
    return await this.priceInput.getAttribute('value');
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

  async productSelectLastOption(): Promise<void> {
    await this.productSelect.all(by.tagName('option')).last().click();
  }

  async productSelectOption(option: string): Promise<void> {
    await this.productSelect.sendKeys(option);
  }

  getProductSelect(): ElementFinder {
    return this.productSelect;
  }

  async getProductSelectedOption(): Promise<string> {
    return await this.productSelect.element(by.css('option:checked')).getText();
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

export class BasketDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-basket-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-basket'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
