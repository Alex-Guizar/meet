import React from 'react';
import puppeteer, { puppeteerErrors } from "puppeteer";


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