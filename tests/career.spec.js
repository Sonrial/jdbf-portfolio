import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => { await page.goto('./'); });

test('professional history preserves dates and separates academic participation', async ({ page }) => {
  const career = page.locator('#experience');
  await career.scrollIntoViewIfNeeded();
  await expect(career.locator('article')).toHaveCount(3);
  await expect(career.locator('article').first()).toContainText('tres alternativas fotovoltaicas');
  await expect(career.locator('time[datetime="2025-07"]')).toHaveText('Julio');
  await expect(career.locator('time[datetime="2025-11"]')).toHaveText('noviembre de 2025');
  await expect(career.locator('article').nth(1)).toContainText('Participación académica');
  await expect(career.locator('article').nth(1).locator('time')).toHaveText('2022');
  await expect(career).not.toContainText(/OLYMPIC|ELECTROPERU|ENEL|actualidad/);
});

test('education includes supported training, languages and accessible disclosure', async ({ page }) => {
  const education = page.locator('#education');
  await education.scrollIntoViewIfNeeded();
  await expect(education).toContainText('Universidad Autónoma de Bucaramanga (UNAB)');
  await expect(education).toContainText('Inglés · B2');
  await expect(education.locator('.training-item')).toHaveCount(4);
  const summary = education.locator('summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(education.locator('details')).toHaveAttribute('open', '');
  await expect(education).toContainText('formación introductoria en SAP PM');
  await expect(education).not.toContainText('Cualquier curso');
  for (const dark of [false, true]) {
    if (dark) await page.getByRole('button', { name: 'Activar tema oscuro' }).click();
    const result = await new AxeBuilder({ page }).include('#experience').include('#education').analyze();
    expect(result.violations).toEqual([]);
  }
});

test('search finds institutions and courses and focuses new sections', async ({ page }) => {
  for (const [query, name, section] of [['Acueducto', 'Trayectoria', 'experience'], ['INEL PowerFactory', 'Formación', 'education']]) {
    await page.getByRole('button', { name: 'Buscar en el portfolio' }).click();
    await page.getByRole('combobox').fill(query);
    await expect(page.getByRole('option')).toHaveCount(1);
    await expect(page.getByRole('option')).toContainText(name);
    await page.getByRole('combobox').press('Enter');
    await expect(page.locator(`#${section}`)).toBeFocused();
  }
});

test('identity, LinkedIn and structured metadata agree', async ({ page }) => {
  await expect(page.locator('.hero-role')).toHaveText('Ingeniero en Energías y Sostenibilidad');
  const linkedin = page.getByRole('link', { name: 'Perfil en LinkedIn' });
  await expect(linkedin).toHaveAttribute('href', 'https://www.linkedin.com/in/jos%C3%A9-david-barrios-franco-221159363');
  const person = await page.locator('script[type="application/ld+json"]').textContent().then(JSON.parse);
  expect(person.name).toBe('José David Barrios Franco');
  expect(person.address.addressLocality).toBe('Piedecuesta');
  expect(person.sameAs).toContain(await linkedin.getAttribute('href'));
});
