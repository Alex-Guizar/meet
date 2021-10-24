// Packages
import puppeteer, { puppeteerErrors } from "puppeteer";

import { mockData } from '../mock-data';

// Feature 1: Filter Events by City
describe('filter events by city', () => {
  let browser, page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      ignoreDefaultArgs: ['--disable-extensions']
    });
    page = await browser.newPage();

    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.city');
  });

  afterAll(() => {
    browser.close();
  });

  test('When user hasn’t searched for a city, show upcoming events from all cities.', async () => {
    const activeData = mockData.slice(0, 32);
    const eventList = await page.$$('.event');

    expect(eventList).toHaveLength(activeData.length);
  });

  test('User should see a list of suggestions when they search for a city', async () => {
    await page.type('.city', 'Berlin');

    const suggestion = await page.$eval('.suggestions-item', (el) => el.textContent);

    expect(suggestion).toBe('Berlin, Germany');
  });

  test('User can select a city from the suggested list', async () => {
    const location = await page.$eval('.suggestions-item', (el) => el.textContent);
    await page.click('.suggestions-item');

    const activeData = mockData.filter((event) => event.location === location).slice(0, 32);

    const eventTitleList = await page.$$eval('.event .event-title', (elements) => elements.map(el => el.textContent));

    for (let i = 0; i < eventTitleList.length; i++) {
      expect(eventTitleList[i]).toBe(activeData[i].summary);
    }
  });
});

// Feature 2: Show/Hide an Event's Details
describe('show/hide an event details', () => {
  let browser, page;
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();

    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  // Scenario 1
  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details.is-active');
    expect(eventDetails).toBeNull();
  });

  // Scenario 2
  test('User can expand an event to see its details', async () => {
    await page.click('.event .details-btn');

    const eventDetails = await page.$('.event .details.is-active');
    expect(eventDetails).toBeDefined();
  });

  // Scenario 3
  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .details-btn');

    const eventDetails = await page.$('.event .details.is-active');
    expect(eventDetails).toBeNull();
  });
});