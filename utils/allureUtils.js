const { allure } = require('allure-playwright');

class allureUtils {
    async takeScreenshot() {
        const screenshotBuffer = await this.page.screenshot(); // Capture screenshot
        allure.attachment(
            'Screenshot', 
            screenshotBuffer, 
            'image/png' // Correct MIME type
        );
    }
}

module.exports = allureUtils;