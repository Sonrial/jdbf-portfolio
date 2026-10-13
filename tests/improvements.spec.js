import { test, expect } from '@playwright/test';

const email = 'josebarriosetc@gmail.com';

test('el correo actualizado llega al enlace, al borrador y a los metadatos', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('./');
  const metadata = await page.locator('script[type="application/ld+json"]').textContent();
  expect(JSON.parse(metadata).email).toBe(email);
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await expect(page.locator('.email-row a')).toHaveText(email);
  await expect(page.locator('.email-row a')).toHaveAttribute('href', `mailto:${email}`);
  await page.getByRole('button', { name: 'Copiar correo electrónico' }).click();
  await expect(page.locator('.copy-status')).toHaveText('Correo copiado');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(email);
  await page.getByLabel('Tu nombre', { exact: true }).fill('  Ana López  ');
  await page.getByLabel('Tu correo', { exact: true }).fill('ana@example.com');
  await page.getByLabel('Cuéntame sobre tu proyecto').fill('  Solar & energía + automatización  ');
  await page.getByRole('button', { name: 'Preparar correo' }).click();
  const draft = new URL(await page.getByRole('link', { name: 'Abrir aplicación de correo' }).getAttribute('href'));
  expect(draft.pathname).toBe(email);
  expect(draft.searchParams.get('subject')).toBe('Proyecto de Ana López');
  expect(draft.searchParams.get('body')).toContain('Solar & energía + automatización');
  await page.setViewportSize({ width: 320, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
});

test('editar el mensaje invalida el borrador anterior y rechaza campos vacíos con espacios', async ({ page }) => {
  await page.goto('./');
  await page.getByLabel('Tu nombre', { exact: true }).fill('Cliente');
  await page.getByLabel('Tu correo', { exact: true }).fill('cliente@example.com');
  const message = page.getByLabel('Cuéntame sobre tu proyecto');
  await message.fill('Primera propuesta');
  await page.getByRole('button', { name: 'Preparar correo' }).click();
  await expect(page.getByRole('link', { name: 'Abrir aplicación de correo' })).toBeVisible();
  await message.fill('Propuesta actualizada');
  await expect(page.getByRole('link', { name: 'Abrir aplicación de correo' })).toHaveCount(0);
  await expect(page.locator('.contact-status')).toBeEmpty();
  await page.getByRole('button', { name: 'Preparar correo' }).click();
  const draft = new URL(await page.getByRole('link', { name: 'Abrir aplicación de correo' }).getAttribute('href'));
  expect(draft.searchParams.get('body')).toContain('Propuesta actualizada');
  expect(draft.searchParams.get('body')).not.toContain('Primera propuesta');
  await message.fill('   ');
  await page.getByRole('button', { name: 'Preparar correo' }).click();
  expect(await message.evaluate(element => element.validity.customError)).toBe(true);
  await expect(page.getByRole('link', { name: 'Abrir aplicación de correo' })).toHaveCount(0);
  await message.fill('Información válida');
  expect(await message.evaluate(element => element.validity.valid)).toBe(true);
});

test('el tema sigue el dispositivo hasta elegir una preferencia propia', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#141713');
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Activar tema oscuro' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('busca varias palabras en cualquier orden, por especialidad y herramientas', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: 'Buscar en el portfolio', exact: true }).click();
  const input = page.getByRole('combobox');
  await input.fill('  FLORA   energia  ');
  await expect(page.getByRole('option')).toHaveCount(1);
  await expect(page.getByRole('option')).toContainText('PTAP La Flora');
  await input.fill('energia');
  await expect(page.getByRole('option')).toHaveCount(3);
  await input.fill('python automatizacion');
  await expect(page.getByRole('option')).toHaveCount(1);
  await expect(page.getByRole('option')).toContainText('Mi caja de herramientas');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#stack$/);
});

test('una descarga fallida del módulo 3D mantiene el portfolio navegable', async ({ page }) => {
  await page.route('**/assets/EnergyScene-*.js', route => route.abort());
  await page.goto('./');
  await expect(page.locator('.scene-fallback')).toBeVisible();
  await expect(page.locator('.energy-scene canvas')).toHaveCount(0);
  await expect(page.locator('.project-card')).toHaveCount(6);
  await page.getByRole('button', { name: 'Ver proyecto: Technical Automation Systems' }).click();
  await expect(page.getByRole('dialog', { name: 'Technical Automation Systems' })).toBeVisible();
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Buscar en el portfolio', exact: true }).click();
  await expect(page.getByRole('combobox')).toBeFocused();
});
