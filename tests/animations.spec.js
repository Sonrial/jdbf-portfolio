import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Movimiento real y recuperación gráfica', () => {
  test.use({ reducedMotion: 'no-preference' });
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.__drawCalls = 0;
      for (const context of [WebGLRenderingContext, WebGL2RenderingContext]) {
        for (const method of ['drawElements', 'drawArrays']) {
          const original = context.prototype[method];
          context.prototype[method] = function (...args) {
            window.__drawCalls += 1;
            return original.apply(this, args);
          };
        }
      }
    });
    await page.goto('./');
    await expect(page.locator('.energy-scene')).toHaveAttribute('data-ready', 'true');
  });

  test('anima, conserva el canvas al pausar y reanuda sin reconstruirlo', async ({ page }) => {
    const draws = () => page.evaluate(() => window.__drawCalls);
    const first = await draws();
    await expect.poll(draws).toBeGreaterThan(first + 30);
    await page.evaluate(() => { window.__originalCanvas = document.querySelector('.energy-scene canvas'); });
    await page.getByRole('button', { name: 'Pausar animación 3D' }).click();
    expect(await page.evaluate(() => window.__originalCanvas === document.querySelector('.energy-scene canvas'))).toBe(true);
    await page.waitForTimeout(250);
    const stopped = await draws();
    await page.waitForTimeout(350);
    expect(await draws()).toBe(stopped);
    await page.getByRole('button', { name: 'Reanudar animación 3D' }).click();
    await expect.poll(draws).toBeGreaterThan(stopped + 30);
  });

  test('deja de dibujar fuera de pantalla y al activar movimiento reducido', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const offscreen = await page.evaluate(() => window.__drawCalls);
    await page.waitForTimeout(350);
    expect(await page.evaluate(() => window.__drawCalls)).toBe(offscreen);
    await page.locator('.hero').scrollIntoViewIfNeeded();
    await expect.poll(() => page.evaluate(() => window.__drawCalls)).toBeGreaterThan(offscreen + 30);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(250);
    const reduced = await page.evaluate(() => window.__drawCalls);
    await page.waitForTimeout(350);
    expect(await page.evaluate(() => window.__drawCalls)).toBe(reduced);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await expect.poll(() => page.evaluate(() => window.__drawCalls)).toBeGreaterThan(reduced + 30);
  });

  test('recupera WebGL tras perder el contexto y mantiene la alternativa visible', async ({ page }) => {
    const supported = await page.evaluate(() => {
      const canvas = document.querySelector('.energy-scene canvas');
      const gl = canvas.getContext('webgl2');
      window.__contextRecovery = gl.getExtension('WEBGL_lose_context');
      window.__contextRecovery?.loseContext();
      return Boolean(window.__contextRecovery);
    });
    expect(supported).toBe(true);
    await expect(page.locator('.energy-scene')).toHaveAttribute('data-ready', 'false');
    await expect(page.locator('.scene-static')).toBeVisible();
    await page.waitForTimeout(300);
    await page.evaluate(() => window.__contextRecovery.restoreContext());
    await expect(page.locator('.energy-scene')).toHaveAttribute('data-ready', 'true');
    await expect(page.locator('.scene-static')).not.toBeVisible();
    const restored = await page.evaluate(() => window.__drawCalls);
    await expect.poll(() => page.evaluate(() => window.__drawCalls)).toBeGreaterThan(restored + 30);
  });
});

test('diálogo accesible, foco contenido y cabecera móvil sin superposición', async ({ page }) => {
  await page.goto('./');
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const overlaps = await page.locator('.header-inner').evaluate(header => {
      const elements = [header.querySelector('.wordmark'), ...header.querySelectorAll('nav a'), ...header.querySelectorAll('.header-actions button')];
      const rects = elements.map(element => element.getBoundingClientRect());
      return rects.some((rect, index) => index > 0 && rect.left < rects[index - 1].right - 1);
    });
    expect(overlaps).toBe(false);
  }
  await page.getByRole('button', { name: 'Ver proyecto: Technical Automation Systems' }).click();
  const dialog = page.getByRole('dialog', { name: 'Technical Automation Systems' });
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate(element => element.contains(document.activeElement) || document.activeElement === document.body)).toBe(true);
  }
  const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(accessibility.violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
});
