require('dotenv').config(); 

const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const assert = require('assert');
const { time } = require('console');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async function example() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();

  try {
    await driver.manage().window().maximize();
    await driver.get(process.env.URL_BASE+'/unete-al-equipo-grupo-venado/');

    await driver.findElement(By.name('field1[]')).sendKeys('Prueba');
    await driver.findElement(By.name('field4[]')).sendKeys('71450557');
    await driver.findElement(By.name('field2')).sendKeys('prueba@gmail.com');
    await driver.findElement(By.name('field8')).sendKeys('06/21/1998');
    await driver.findElement(By.name('field12')).sendKeys('0-3 años');
    await driver.findElement(By.name('field11[]')).sendKeys('Cercado');
    await driver.findElement(By.name('field10')).sendKeys('Cochabamba');
    await driver.findElement(By.name('field16')).sendKeys('Marketing');
    await driver.findElement(By.name('field6')).sendKeys('Esto es una prueba');
    await driver.findElement(By.name('files')).sendKeys(path.resolve(__dirname, 'assets', 'Test.pdf'));
    
    var campoNombre = By.name('field1[]');
    assert.strictEqual(await driver.findElement(campoNombre).getAttribute('value'), 'Prueba', 'El Nombre completo no coincide'); 
    assert.strictEqual(await driver.findElement(By.name('field4[]')).getAttribute('value'), '71450557', 'El Teléfono no coincide'); 
    assert.strictEqual(await driver.findElement(By.name('field2')).getAttribute('value'), 'prueba@gmail.com', 'El correo electrónico no coincide'); 
    assert.strictEqual(await driver.findElement(By.name('field8')).getAttribute('value'), '06/21/1998', 'La Fecha de nacimiento no coincide'); 
    assert.strictEqual(await driver.findElement(By.name('field12')).getAttribute('value'), '0-3 años', 'La Experiencia de trabajo no coincide'); 
    assert.strictEqual(await driver.findElement(By.name('field11[]')).getAttribute('value'), 'Cercado', 'La Ciudad de residencia no coincide'); 
    assert.strictEqual(await driver.findElement(By.name('field10')).getAttribute('value'), 'Cochabamba', 'El Departamento de residencia no coincide'); 
    assert.strictEqual(await driver.findElement(By.name('field16')).getAttribute('value'), 'Marketing', 'El Área de postulación no coincide'); 
    assert.strictEqual(await driver.findElement(By.name('field6')).getAttribute('value'), 'Esto es una prueba', 'La Referencia(s) no coincide'); 
    
    const fileElement = await driver.wait(until.elementLocated(By.css('div[data-identifier="field14"] > div > div > label > div > ul > li > div')), 5000);

    try {
      await driver.wait(async () => {
          const text = await fileElement.getText();
          return text !== '';
      }, 5000);
    } catch (error) {
      throw new Error('No se encontró el nombre del archivo');
    }
    assert.strictEqual( await fileElement.getText(), 'Test.pdf', 'El archivo no fue adjuntado correctamente');

    console.log('El formulario se lleno correctamente.');

    await driver.findElement(By.css('form[data-id="2"] .form-element-type-submit .submit-cover button')).click();
    await driver.wait(until.elementLocated(By.css('form[data-id="2"] .final-success')), 5000);
    
    console.log('El formulario se ha enviado correctamente.');

    await driver.get(process.env.URL_BASE+'/administracion-ingresar/');
    await sleep(500);
    await driver.findElement(By.id('user_login')).sendKeys(process.env.USER_LOGIN);
    await sleep(500);
    await driver.findElement(By.id('user_pass')).sendKeys(process.env.USER_PASS);
    await driver.findElement(By.id('wp-submit')).click();
    await driver.wait(until.urlContains('wp-admin'), 5000);
    await driver.get(process.env.URL_BASE+'/wp-admin/admin.php?page=formcraft-entries');
    
    await driver.findElement(By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-list-block.padding-right.width-4 > div > div.formcraft_table > div.tr.thead > select')).click();

    await driver.wait(until.elementLocated(By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-list-block.padding-right.width-4 > div > div.formcraft_table > div.tr.thead > select > option[value="2"]')), 5000);
    await driver.findElement(By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-list-block.padding-right.width-4 > div > div.formcraft_table > div.tr.thead > select > option[value="2"]')).click();

    await sleep(2000); 

    await driver.wait(until.elementLocated(By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-list-block.padding-right.width-4 > div > div.formcraft_table > div.tbody > div:nth-child(1)')), 5000);
    await driver.findElement(By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-list-block.padding-right.width-4 > div > div.formcraft_table > div.tbody > div:nth-child(1)')).click();

    await driver.wait(until.elementLocated(By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-view-block.width-6 > div > div > div.tbody.page-count-1 > div')), 5000);
  
    assert.strictEqual(await driver.findElement(By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-view-block.width-6 > div > div > div.tbody.page-count-1 > div > div.field-page-content > span:nth-child(1) > .field-value')).getText(), 'Prueba', 'El Nombre completo no coincide'); 
    assert.strictEqual(await driver.findElement(By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-view-block.width-6 > div > div > div.tbody.page-count-1 > div > div.field-page-content > span:nth-child(2) > .field-value')).getText(), '71450557', 'El Teléfono no coincide'); 
    assert.strictEqual(await driver.findElement(By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-view-block.width-6 > div > div > div.tbody.page-count-1 > div > div.field-page-content > span:nth-child(3) > .field-value')).getText(), 'prueba@gmail.com', 'El correo electrónico no coincide'); 
    assert.strictEqual(await driver.findElement(By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-view-block.width-6 > div > div > div.tbody.page-count-1 > div > div.field-page-content > span:nth-child(4) > .field-value')).getText(), '06/21/1998', 'La Fecha de nacimiento no coincide'); 
    assert.strictEqual(await driver.findElement(By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-view-block.width-6 > div > div > div.tbody.page-count-1 > div > div.field-page-content > span:nth-child(5) > .field-value')).getText(), '0-3 años', 'La Experiencia de trabajo no coincide'); 
    assert.strictEqual(await driver.findElement(By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-view-block.width-6 > div > div > div.tbody.page-count-1 > div > div.field-page-content > span:nth-child(6) > .field-value')).getText(), 'Cercado', 'La Ciudad de residencia no coincide'); 
    assert.strictEqual(await driver.findElement(By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-view-block.width-6 > div > div > div.tbody.page-count-1 > div > div.field-page-content > span:nth-child(7) > .field-value')).getText(), 'Cochabamba', 'El Departamento de residencia no coincide'); 
    assert.strictEqual(await driver.findElement(By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-view-block.width-6 > div > div > div.tbody.page-count-1 > div > div.field-page-content > span:nth-child(8) > .field-value')).getText(), 'Marketing', 'El Área de postulación no coincide'); 
    assert.strictEqual(await driver.findElement(By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-view-block.width-6 > div > div > div.tbody.page-count-1 > div > div.field-page-content > span:nth-child(10) > .field-value')).getText(), 'Esto es una prueba', 'La Referencia(s) no coincide'); 
    assert.strictEqual(await driver.findElement(By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-view-block.width-6 > div > div > div.tbody.page-count-1 > div > div.field-page-content > span:nth-child(9) > .field-value > div > a')).getText(), 'Test.pdf', 'El archivo no fue adjuntado correctamente'); 

    console.log('Todas las verificaciones pasaron correctamente.');
  } catch (error) {
    console.error('Error en la prueba:', error); 
  } finally {
    await driver.quit();
  }
})();