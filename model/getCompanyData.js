const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin);

module.exports = async function scrapCompanyData(company) {
  let description = '-';
  let logoUrl = '-';
  let nbProfile = '-';
  let websiteUrl = '-';
  let siren = '-';
  let street = '-';
  let city = '-';
  let country = '-';
  let creationDate = '-';
  let activity = '-';

  // 1 - Créer une instance de navigateur
  const browser = await puppeteer.launch();
  const pageLinkedin = await browser.newPage();
  const pageSocieteCom = await browser.newPage();

  // 2 - Naviguer jusqu'à l'URL cible

  try {
    await pageLinkedin.goto(`https://fr.linkedin.com/company/${company}`);
    pageLinkedin.waitForSelector(
      '.about-us__basic-info-list :nth-child(3) > dd'
    );

    await pageSocieteCom.goto(
      `https://www.societe.com/cgi-bin/search?champs=${company}`
    );

    await pageSocieteCom.waitForSelector('#didomi-notice-agree-button');
    await pageSocieteCom.click('#didomi-notice-agree-button');
    await pageSocieteCom.waitForSelector('.ResultBloc__link__content');
    await pageSocieteCom.click('.ResultBloc__link__content');
    await pageSocieteCom.waitForSelector('#rensjur');
  } catch {
    await pageSocieteCom.goto(
      `https://www.societe.com/cgi-bin/search?champs=${company}`
    );

    await pageSocieteCom.waitForSelector('.ResultBloc__link__content');
    await pageSocieteCom.click('.ResultBloc__link__content');
    await pageSocieteCom.waitForSelector('#rensjur');
  }

  // 3 - Récupérer les données
  const resultLinkedin = await pageLinkedin.evaluate(() => {
    logoUrl = document.querySelector(
      '.top-card-layout__entity-image-container > img'
    ).src;
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

  const resultSocieteCom = await pageSocieteCom.evaluate(() => {
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
  return { ...resultLinkedin, ...resultSocieteCom };
};
