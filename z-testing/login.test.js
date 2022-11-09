import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://localhost:3999/')
})

afterAll(async () => {
    await driver.sleep(1000)
    driver.quit()
})


test('4 additional console logs should appear in chrome when create Account criteria in met', async () => {
    await driver.sleep(300)

    await driver.findElement(By.id('email-create-input')).sendKeys('mason@gmail.com')
    await driver.sleep(300)

    await driver.findElement(By.id('createAcc-names-input')).sendKeys('Mason and Malena')
    await driver.sleep(300)

    await driver.findElement(By.id('password-create-input')).sendKeys('password')
    await driver.sleep(300)

    await driver.findElement(By.id('password-create-input2')).sendKeys('password')
})