const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const getDataFromLinkedin = async (company) => {
  let description = '';
  let logoUrl = '';
  let nbProfile = '';
  let websiteUrl = '';

  // 1 - Créer une instance de navigateur
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // 2 - Naviguer jusqu'à l'URL cible
  await page.goto(`https://fr.linkedin.com/company/${company}`);

  await page.waitForSelector('.about-us__basic-info-list :nth-child(3) > dd');

  // 3 - Récupérer les données
  const result = await page.evaluate(() => {
    logoUrl = document.querySelector(
      '.top-card-layout__entity-image-container'
    );
    description = document.querySelector('.about-us__description').innerText;
    nbProfile = document
      .querySelector('.face-pile__cta')
      .innerText.slice(9, -9);
    websiteUrl = document.querySelector(
      '.about-us__basic-info-list > div > dd > a'
    ).innerText;
    companySize = document.querySelector(
      '.about-us__basic-info-list :nth-child(3) > dd'
    ).innerText;

    return { description, logoUrl, nbProfile, websiteUrl, companySize };
  });

  // 4 - Retourner les données (et fermer le navigateur)
  browser.close();
  return result;
};

const getDataFromSociete = async (company) => {
  let siren = '';
  let street = '';
  let city = '';
  let country = '';
  let creationDate = '';
  let activity = '';

  // 1 - Créer une instance de navigateur
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // 2 - Naviguer jusqu'à l'URL cible
  await page.goto(`https://www.societe.com/cgi-bin/search?champs=${company}`);

  try {
    await page.waitForSelector('#didomi-notice-agree-button');
    await page.click('#didomi-notice-agree-button');
    await page.waitForSelector('.ResultBloc__link__content');
    await page.click('.ResultBloc__link__content');
    await page.waitForSelector('#rensjur');
  } catch {
    await page.waitForSelector('.ResultBloc__link__content');
    await page.click('.ResultBloc__link__content');
    await page.waitForSelector('#rensjur');
  }

  //   // 3 - Récupérer les données
  const result = await page.evaluate(() => {
    siren = document.querySelector('#identite-siren').innerText;
    street = document.querySelector(
      '.CompanyIdentity__adress__around > a :nth-child(1)'
    ).innerText;
    city = document.querySelector(
      '.CompanyIdentity__adress__around > a :nth-child(2)'
    ).innerText;
    country = document.querySelector(
      '.CompanyIdentity__adress__around > a :nth-child(3)'
    ).innerText;
    creationDate = document
      .querySelector('#rensjur > tbody > tr :nth-child(2)')
      .innerText.slice(0, 10);

    activity = document.querySelector('#ape-histo-description').innerText;

    return { siren, street, city, country, creationDate, activity };
  });

  // 4 - Retourner les données (et fermer le navigateur)
  browser.close();
  return result;
};
