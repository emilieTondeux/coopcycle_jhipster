import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RunComponentsPage, RunDeleteDialog, RunUpdatePage } from './run.page-object';

const expect = chai.expect;

describe('Run e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let runComponentsPage: RunComponentsPage;
  let runUpdatePage: RunUpdatePage;
  let runDeleteDialog: RunDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Runs', async () => {
    await navBarPage.goToEntity('run');
    runComponentsPage = new RunComponentsPage();
    await browser.wait(ec.visibilityOf(runComponentsPage.title), 5000);
    expect(await runComponentsPage.getTitle()).to.eq('coopcycleJhipsterApp.run.home.title');
    await browser.wait(ec.or(ec.visibilityOf(runComponentsPage.entities), ec.visibilityOf(runComponentsPage.noResult)), 1000);
  });

  it('should load create Run page', async () => {
    await runComponentsPage.clickOnCreateButton();
    runUpdatePage = new RunUpdatePage();
    expect(await runUpdatePage.getPageTitle()).to.eq('coopcycleJhipsterApp.run.home.createOrEditLabel');
    await runUpdatePage.cancel();
  });

  it('should create and save Runs', async () => {
    const nbButtonsBeforeCreate = await runComponentsPage.countDeleteButtons();

    await runComponentsPage.clickOnCreateButton();

    await promise.all([
      runUpdatePage.setClientNameInput('clientName'),
      runUpdatePage.setRunnerNameInput('runnerName'),
      runUpdatePage.setMethodInput('method'),
      runUpdatePage.basketSelectLastOption(),
      runUpdatePage.restaurantSelectLastOption(),
    ]);

    expect(await runUpdatePage.getClientNameInput()).to.eq('clientName', 'Expected ClientName value to be equals to clientName');
    expect(await runUpdatePage.getRunnerNameInput()).to.eq('runnerName', 'Expected RunnerName value to be equals to runnerName');
    expect(await runUpdatePage.getMethodInput()).to.eq('method', 'Expected Method value to be equals to method');

    await runUpdatePage.save();
    expect(await runUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await runComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Run', async () => {
    const nbButtonsBeforeDelete = await runComponentsPage.countDeleteButtons();
    await runComponentsPage.clickOnLastDeleteButton();

    runDeleteDialog = new RunDeleteDialog();
    expect(await runDeleteDialog.getDialogTitle()).to.eq('coopcycleJhipsterApp.run.delete.question');
    await runDeleteDialog.clickOnConfirmButton();

    expect(await runComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
