import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AcountComponentsPage, AcountDeleteDialog, AcountUpdatePage } from './acount.page-object';

const expect = chai.expect;

describe('Acount e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let acountComponentsPage: AcountComponentsPage;
  let acountUpdatePage: AcountUpdatePage;
  let acountDeleteDialog: AcountDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Acounts', async () => {
    await navBarPage.goToEntity('acount');
    acountComponentsPage = new AcountComponentsPage();
    await browser.wait(ec.visibilityOf(acountComponentsPage.title), 5000);
    expect(await acountComponentsPage.getTitle()).to.eq('coopcycleJhipsterApp.acount.home.title');
    await browser.wait(ec.or(ec.visibilityOf(acountComponentsPage.entities), ec.visibilityOf(acountComponentsPage.noResult)), 1000);
  });

  it('should load create Acount page', async () => {
    await acountComponentsPage.clickOnCreateButton();
    acountUpdatePage = new AcountUpdatePage();
    expect(await acountUpdatePage.getPageTitle()).to.eq('coopcycleJhipsterApp.acount.home.createOrEditLabel');
    await acountUpdatePage.cancel();
  });

  it('should create and save Acounts', async () => {
    const nbButtonsBeforeCreate = await acountComponentsPage.countDeleteButtons();

    await acountComponentsPage.clickOnCreateButton();

    await promise.all([
      acountUpdatePage.setNameInput('name'),
      acountUpdatePage.setSurnameInput('surname'),
      acountUpdatePage.setAgeInput('5'),
      acountUpdatePage.setAccountIDInput('accountID'),
      acountUpdatePage.setAdressInput('adress'),
      acountUpdatePage.roleSelectLastOption(),
    ]);

    expect(await acountUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await acountUpdatePage.getSurnameInput()).to.eq('surname', 'Expected Surname value to be equals to surname');
    expect(await acountUpdatePage.getAgeInput()).to.eq('5', 'Expected age value to be equals to 5');
    expect(await acountUpdatePage.getAccountIDInput()).to.eq('accountID', 'Expected AccountID value to be equals to accountID');
    expect(await acountUpdatePage.getAdressInput()).to.eq('adress', 'Expected Adress value to be equals to adress');

    await acountUpdatePage.save();
    expect(await acountUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await acountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Acount', async () => {
    const nbButtonsBeforeDelete = await acountComponentsPage.countDeleteButtons();
    await acountComponentsPage.clickOnLastDeleteButton();

    acountDeleteDialog = new AcountDeleteDialog();
    expect(await acountDeleteDialog.getDialogTitle()).to.eq('coopcycleJhipsterApp.acount.delete.question');
    await acountDeleteDialog.clickOnConfirmButton();

    expect(await acountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
