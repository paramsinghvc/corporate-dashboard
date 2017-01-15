import { CorporateDashboardPage } from './app.po';

describe('corporate-dashboard App', function() {
  let page: CorporateDashboardPage;

  beforeEach(() => {
    page = new CorporateDashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
