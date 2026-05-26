const { test, expect } = require('@playwright/test');

test.describe('Flujo de Autenticación E2E', () => {

    test('Debería iniciar sesión y mostrar la sección de perfil', async ({ page }) => {
        await page.goto('http://localhost:5500/login.html');

        await page.fill('#login-email', 'admin@sportplus.com');
        await page.fill('#login-password', 'password123');

        await page.click('button[type="submit"]');

        await expect(page).toHaveURL(/.*perfil.html/);

        const avatar = page.locator('#user-avatar');
        await expect(avatar).toBeVisible();
        
        const profileName = page.locator('#profile-name');
        await expect(profileName).not.toBeEmpty();
    });

});