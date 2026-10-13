import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';

const identity = JSON.parse(readFileSync(new URL('./fixtures/visual-identity.json', import.meta.url), 'utf8'));

test('mantiene los colores y la tipografía de la identidad aprobada', async ({ page }) => {
  await page.goto('./');
  for (const theme of ['light', 'dark']) {
    if (theme === 'dark') await page.getByRole('button', { name: 'Activar tema oscuro' }).click();
    const values = await page.locator('html').evaluate((element, properties) => {
      const style = getComputedStyle(element);
      return Object.fromEntries(properties.map(property => [property, style.getPropertyValue(property).trim()]));
    }, Object.keys(identity[theme]));
    expect(values).toEqual(identity[theme]);
    expect(await page.locator('body').evaluate(element => getComputedStyle(element).fontFamily)).toContain('Inter Variable');
  }
});

test('cambiar el tema conserva el mismo canvas y su contexto gráfico', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('.energy-scene')).toHaveAttribute('data-ready', 'true');
  await page.evaluate(() => {
    window.__sceneCanvas = document.querySelector('.energy-scene canvas');
    window.__sceneContext = window.__sceneCanvas.getContext('webgl2');
  });
  for (let i = 0; i < 6; i++) {
    await page.locator('.theme-button').click();
    expect(await page.evaluate(() => window.__sceneCanvas === document.querySelector('.energy-scene canvas'))).toBe(true);
    expect(await page.evaluate(() => !window.__sceneContext.isContextLost())).toBe(true);
  }
});

test('la escena agrupa objetos para mantener un presupuesto pequeño de dibujo', async ({ page }) => {
  await page.addInitScript(() => {
    window.__gpuBudget = { frames: 0, draws: 0 };
    for (const Context of [WebGLRenderingContext, WebGL2RenderingContext]) {
      for (const method of ['clear', 'drawElements', 'drawArrays', 'drawElementsInstanced', 'drawArraysInstanced']) {
        const original = Context.prototype[method];
        if (typeof original !== 'function') continue;
        Context.prototype[method] = function (...args) {
          window.__gpuBudget[method === 'clear' ? 'frames' : 'draws']++;
          return original.apply(this, args);
        };
      }
    }
  });
  await page.goto('./');
  await expect(page.locator('.energy-scene')).toHaveAttribute('data-ready', 'true');
  const budget = await page.evaluate(() => window.__gpuBudget);
  expect(budget.frames).toBeGreaterThan(0);
  expect(budget.draws / budget.frames).toBeLessThanOrEqual(12);
});

test('los proyectos se revelan en una ventana baja sin desactivar el movimiento', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 320, height: 200 });
  await page.goto('./');
  await page.locator('#work').scrollIntoViewIfNeeded();
  await expect(page.locator('#work')).toHaveClass(/revealed/);
  await expect(page.locator('#work')).toHaveCSS('opacity', '1');
});

test('el buscador devuelve foco a la sección y permite cerrar con Enter', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: 'Buscar en el portfolio', exact: true }).click();
  await page.getByRole('combobox').fill('sobre mi');
  await page.keyboard.press('Enter');
  await expect(page.locator('#about')).toBeFocused();
  await page.getByRole('button', { name: 'Buscar en el portfolio', exact: true }).click();
  const close = page.getByRole('button', { name: 'Cerrar búsqueda' });
  await close.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog', { name: 'Buscar en el portfolio' })).not.toBeVisible();
  await expect(page).toHaveURL(/#about$/);
});

test('el cierre de una ficha larga permanece visible y no se cierra por clic interno', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 500 });
  await page.goto('./');
  const trigger = page.getByRole('button', { name: 'Ver proyecto: PEVI / Industrial Energy Efficiency' });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'PEVI / Industrial Energy Efficiency' });
  await dialog.evaluate(element => { element.scrollTop = element.scrollHeight; });
  const close = page.getByRole('button', { name: 'Cerrar proyecto' });
  const rect = await close.boundingBox();
  expect(rect.y).toBeGreaterThanOrEqual(0);
  expect(rect.y + rect.height).toBeLessThanOrEqual(500);
  await dialog.click({ position: { x: 2, y: 50 } });
  await expect(dialog).toBeVisible();
  await close.click();
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test('el formulario muestra errores asociados y enfoca el primer campo inválido', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: 'Preparar correo' }).click();
  const name = page.getByLabel('Tu nombre', { exact: true });
  await expect(name).toBeFocused();
  await expect(name).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#contact-name-error')).toHaveText('Escribe tu nombre.');
  await name.fill('Persona');
  await expect(page.locator('#contact-name-error')).toHaveCount(0);
  await page.getByLabel('Tu correo', { exact: true }).fill('correo-invalido');
  await page.getByRole('button', { name: 'Preparar correo' }).click();
  await expect(page.locator('#contact-email-error')).toContainText('nombre@dominio.com');
  await expect(page.getByLabel('Tu correo', { exact: true })).toBeFocused();
  const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(accessibility.violations).toEqual([]);
});
