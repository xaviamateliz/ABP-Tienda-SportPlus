const { test, expect } = require('@playwright/test');

test.describe('Flujo E2E: Registro y Limpieza', () => {
  let idGeneradoTemporalmente = null;

  test.afterAll(async ({ request }) => {
    if (idGeneradoTemporalmente) {
      await request.delete(`https://divisive-utopia-lilly.ngrok-free.dev/api/usuarios/${idGeneradoTemporalmente}`);
    }
  });

  test('Debería registrar un usuario y capturar su ID para el teardown', async ({ page }) => {
    const promesaRespuesta = page.waitForResponse(response => 
      response.url().includes('/api/usuarios') && response.status() === 200
    );

    await page.goto('https://divisive-utopia-lilly.ngrok-free.dev/registro');

    await page.fill('#registro-nombre', 'Robot Test');
    await page.fill('#registro-email', 'robot@sportplus.com');
    await page.fill('#registro-password', 'test1234');
    
    await page.click('button[type="submit"]');

    const respuestaAPI = await promesaRespuesta;
    const cuerpoRespuesta = await respuestaAPI.json();
    
    idGeneradoTemporalmente = cuerpoRespuesta.id;

    await expect(page).toHaveURL(/.*login/);
    const mensajeExito = page.locator('.mensaje-exito');
    await expect(mensajeExito).toBeVisible();
  });
});