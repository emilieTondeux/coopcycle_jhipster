import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PaymentSysComponentsPage, PaymentSysDeleteDialog, PaymentSysUpdatePage } from './payment-sys.page-object';

const expect = chai.expect;

describe('PaymentSys e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let paymentSysComponentsPage: PaymentSysComponentsPage;
  let paymentSysUpdatePage: PaymentSysUpdatePage;
  let paymentSysDeleteDialog: PaymentSysDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PaymentSys', async () => {
    await navBarPage.goToEntity('payment-sys');
    paymentSysComponentsPage = new PaymentSysComponentsPage();
    await browser.wait(ec.visibilityOf(paymentSysComponentsPage.title), 5000);
    expect(await paymentSysComponentsPage.getTitle()).to.eq('coopcycleJhipsterApp.paymentSys.home.title');
    await browser.wait(ec.or(ec.visibilityOf(paymentSysComponentsPage.entities), ec.visibilityOf(paymentSysComponentsPage.noResult)), 1000);
  });

  it('should load create PaymentSys page', async () => {
    await paymentSysComponentsPage.clickOnCreateButton();
    paymentSysUpdatePage = new PaymentSysUpdatePage();
    expect(await paymentSysUpdatePage.getPageTitle()).to.eq('coopcycleJhipsterApp.paymentSys.home.createOrEditLabel');
    await paymentSysUpdatePage.cancel();
  });

  it('should create and save PaymentSys', async () => {
    const nbButtonsBeforeCreate = await paymentSysComponentsPage.countDeleteButtons();

    await paymentSysComponentsPage.clickOnCreateButton();

    await promise.all([
      paymentSysUpdatePage.setCrediteurInput('crediteur'),
      paymentSysUpdatePage.setDebiteurInput('debiteur'),
      paymentSysUpdatePage.setMethodInput('method'),
      // paymentSysUpdatePage.acountSelectLastOption(),
    ]);

    expect(await paymentSysUpdatePage.getCrediteurInput()).to.eq('crediteur', 'Expected Crediteur value to be equals to crediteur');
    expect(await paymentSysUpdatePage.getDebiteurInput()).to.eq('debiteur', 'Expected Debiteur value to be equals to debiteur');
    expect(await paymentSysUpdatePage.getMethodInput()).to.eq('method', 'Expected Method value to be equals to method');

    await paymentSysUpdatePage.save();
    expect(await paymentSysUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await paymentSysComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last PaymentSys', async () => {
    const nbButtonsBeforeDelete = await paymentSysComponentsPage.countDeleteButtons();
    await paymentSysComponentsPage.clickOnLastDeleteButton();

    paymentSysDeleteDialog = new PaymentSysDeleteDialog();
    expect(await paymentSysDeleteDialog.getDialogTitle()).to.eq('coopcycleJhipsterApp.paymentSys.delete.question');
    await paymentSysDeleteDialog.clickOnConfirmButton();

    expect(await paymentSysComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
