import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';

const original = JSON.parse(readFileSync(new URL('./fixtures/original-content.json', import.meta.url), 'utf8'));

test.beforeEach(async ({ page }) => { await page.goto('./'); });

test('preserva todos los proyectos y casos del portfolio original', async ({ page }) => {
  await expect(page.locator('.project-card')).toHaveCount(6);
  for (const project of original.projects) {
    const card = page.locator('.project-card').filter({ hasText: project.title });
    await expect(card).toContainText(project.description);
    for (const category of project.category.split(' / ')) await expect(card).toContainText(category);
  }
  await expect(page.locator('.case-item')).toHaveCount(4);
  for (const item of original.cases) {
    const detail = page.locator('.case-item').filter({ hasText: item.title });
    if (!await detail.evaluate(element => element.open)) await detail.locator('summary').click();
    for (const key of ['problem', 'solution', 'result', 'stack']) await expect(detail).toContainText(item[key]);
  }
  await expect(page.locator('#about')).toContainText('regulación energética colombiana');
  await expect(page.locator('h1')).toContainText('Jose David');
  await expect(page.locator('h1')).toContainText('Barrios Franco');
});

test('filtra por área y permite abrir y cerrar fichas accesibles', async ({ page }) => {
  const filters = page.getByRole('group', { name: 'Filtrar proyectos' });
  for (const [category, count] of [['Energía', 3], ['Software', 2], ['Sostenibilidad', 1], ['Todos', 6]]) {
    await filters.getByRole('button', { name: category, exact: true }).click();
    await expect(page.locator('.project-card')).toHaveCount(count);
  }
  const trigger = page.getByRole('button', { name: 'Ver proyecto: PV System Evaluation — PTAP La Flora' });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'PV System Evaluation — PTAP La Flora' });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText(original.cases[1].solution);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test('búsqueda tolera acentos, navegación por teclado y resultados vacíos', async ({ page }) => {
  await page.keyboard.press('Control+k');
  const dialog = page.getByRole('dialog', { name: 'Buscar en el portfolio' });
  await expect(dialog).toBeVisible();
  const search = page.getByRole('combobox');
  await search.fill('PVsyst');
  await expect(dialog.getByRole('option')).toHaveCount(1);
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog', { name: 'PV System Evaluation — PTAP La Flora' })).toBeVisible();
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Buscar en el portfolio', exact: true }).click();
  await search.fill('xyz-inexistente');
  await expect(dialog).toContainText('Sin resultados');
  await search.fill('sobre mi');
  await expect(dialog.getByRole('option')).toHaveCount(1);
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#about$/);
  await expect(dialog).not.toBeVisible();
});

test('guarda el tema y descarga un contacto con datos reales', async ({ page }) => {
  await page.getByRole('button', { name: 'Activar tema oscuro' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Guardar contacto' }).click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe('Jose-David-Barrios-Franco.vcf');
  const file = await download.path();
  const contact = readFileSync(file, 'utf8');
  expect(contact).toContain('FN:Jose David Barrios Franco');
  expect(contact).toContain('EMAIL:contacto@jdbf.dev');
  expect(contact).toContain('Santander');
});

test('valida el formulario y explica el envío mediante correo', async ({ page }) => {
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Preparar correo' }).click();
  expect(await page.locator('input[name="name"]').evaluate(element => element.validity.valueMissing)).toBe(true);
  await page.getByLabel('Tu nombre', { exact: true }).fill('María Pérez');
  await page.getByLabel('Tu correo', { exact: true }).fill('maria@example.com');
  await page.getByLabel('Cuéntame sobre tu proyecto').fill('Evaluación de un sistema solar FV.');
  await page.getByRole('button', { name: 'Preparar correo' }).click();
  await expect(page.locator('.contact-status')).toContainText('revisa el mensaje y envíalo allí');
  await expect(page.locator('.email-row a')).toHaveAttribute('href', 'mailto:contacto@jdbf.dev');
  const draft = new URL(await page.getByRole('link', { name: 'Abrir aplicación de correo' }).getAttribute('href'));
  expect(draft.searchParams.get('subject')).toBe('Proyecto de María Pérez');
  expect(draft.searchParams.get('body')).toContain('Evaluación de un sistema solar FV.');
  expect(draft.searchParams.get('body')).toContain('maria@example.com');
});

test('es accesible en ambos temas y en la búsqueda', async ({ page }) => {
  for (const section of ['#about', '#stack', '#work', '#cases', '#contact']) await page.locator(section).scrollIntoViewIfNeeded();
  for (const theme of ['light', 'dark']) {
    if (theme === 'dark') await page.getByRole('button', { name: 'Activar tema oscuro' }).click();
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations).toEqual([]);
  }
  await page.getByRole('button', { name: 'Buscar en el portfolio', exact: true }).click();
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(results.violations).toEqual([]);
});

test('no tiene errores, desbordamiento ni dependencia de WebGL para el contenido', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.reload();
  await expect(page.locator('.energy-scene')).toBeVisible();
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  const canvas = page.locator('.energy-scene canvas');
  await expect(canvas).toHaveCount(1);
  await page.getByRole('button', { name: 'Pausar animación 3D' }).click();
  await expect(page.getByRole('button', { name: 'Reanudar animación 3D' })).toHaveAttribute('aria-pressed', 'true');
  expect(errors).toEqual([]);
});

test('muestra alternativa estática cuando WebGL no está disponible', async ({ page }) => {
  await page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (type.startsWith('webgl')) return null;
      return getContext.call(this, type, ...args);
    };
  });
  await page.reload();
  await expect(page.locator('.scene-static')).toBeVisible();
  await expect(page.locator('.energy-scene canvas')).toHaveCount(0);
  await expect(page.locator('.project-card')).toHaveCount(6);
  await page.getByRole('button', { name: 'Ver proyecto: Technical Automation Systems' }).click();
  await expect(page.getByRole('dialog', { name: 'Technical Automation Systems' })).toBeVisible();
});
