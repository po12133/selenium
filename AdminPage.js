
const { By, until  } = require('selenium-webdriver');
const assert = require('assert');

class AdminPage {
    adminLogin = By.id('user_login');
    adminPassword = By.id('user_pass');
    wpSubmit = By.id('wp-submit');
    primeraEntrada = By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-list-block.padding-right.width-4 > div > div.formcraft_table > div.tbody > div.tr.canHover:nth-child(1)');
    contenedorEntrada = By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-view-block.width-6 > div > div > div.tbody.page-count-1 > div');

    entradaNombre = By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-view-block.width-6 > div > div > div.tbody.page-count-1 > div > div.field-page-content > span:nth-child(1) > .field-value');
    entradaTelefono = By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-view-block.width-6 > div > div > div.tbody.page-count-1 > div > div.field-page-content > span:nth-child(2) > .field-value');
    entradaCorreo = By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-view-block.width-6 > div > div > div.tbody.page-count-1 > div > div.field-page-content > span:nth-child(3) > .field-value');
    entradaNacimiento = By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-view-block.width-6 > div > div > div.tbody.page-count-1 > div > div.field-page-content > span:nth-child(4) > .field-value');
    entradaExperiencia = By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-view-block.width-6 > div > div > div.tbody.page-count-1 > div > div.field-page-content > span:nth-child(5) > .field-value');
    entradaCiudad = By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-view-block.width-6 > div > div > div.tbody.page-count-1 > div > div.field-page-content > span:nth-child(6) > .field-value');
    entradaDepartamento = By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-view-block.width-6 > div > div > div.tbody.page-count-1 > div > div.field-page-content > span:nth-child(7) > .field-value');
    entradaArea = By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-view-block.width-6 > div > div > div.tbody.page-count-1 > div > div.field-page-content > span:nth-child(8) > .field-value');
    entradaReferencia = By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-view-block.width-6 > div > div > div.tbody.page-count-1 > div > div.field-page-content > span:nth-child(10) > .field-value');
    nombreArchivo = By.css('#formcraft_dashboard > div > div:nth-child(2) > div.block.entry-view-block.width-6 > div > div > div.tbody.page-count-1 > div > div.field-page-content > span:nth-child(9) > .field-value > div > a');
  constructor(driver) {
    this.driver = driver;
  }

  async loginToAdmin() {
    await this.driver.sleep(500);
    await this.driver.findElement(this.adminLogin).sendKeys(process.env.USER_LOGIN);
    await this.driver.sleep(500);
    await this.driver.findElement(this.adminPassword).sendKeys(process.env.USER_PASS);
    await this.driver.findElement(this.wpSubmit).click();
  }

  async viewFormEntries() {
    await this.driver.get(process.env.URL_BASE+'/wp-admin/admin.php?page=formcraft-entries');
    await this.driver.wait(until.elementLocated(this.primeraEntrada), 5000);
    await this.driver.findElement(this.primeraEntrada).click();
    await this.driver.wait(until.elementLocated(this.contenedorEntrada), 5000);
  }

  async verificarEntrada() {
    assert.strictEqual(await this.driver.findElement(this.entradaNombre).getText(), 'Prueba', 'El Nombre completo no coincide'); 
    assert.strictEqual(await this.driver.findElement(this.entradaTelefono).getText(), '71450557', 'El Teléfono no coincide'); 
    assert.strictEqual(await this.driver.findElement(this.entradaCorreo).getText(), 'prueba@gmail.com', 'El correo electrónico no coincide'); 
    assert.strictEqual(await this.driver.findElement(this.entradaNacimiento).getText(), '06/21/1998', 'La Fecha de nacimiento no coincide'); 
    assert.strictEqual(await this.driver.findElement(this.entradaExperiencia).getText(), '0-3 años', 'La Experiencia de trabajo no coincide'); 
    assert.strictEqual(await this.driver.findElement(this.entradaCiudad).getText(), 'Cercado', 'La Ciudad de residencia no coincide'); 
    assert.strictEqual(await this.driver.findElement(this.entradaDepartamento).getText(), 'Cochabamba', 'El Departamento de residencia no coincide'); 
    assert.strictEqual(await this.driver.findElement(this.entradaArea).getText(), 'Marketing', 'El Área de postulación no coincide'); 
    assert.strictEqual(await this.driver.findElement(this.entradaReferencia).getText(), 'Esto es una prueba', 'La Referencia(s) no coincide'); 
    assert.strictEqual(await this.driver.findElement(this.nombreArchivo).getText(), 'Test.pdf', 'El archivo no fue adjuntado correctamente'); 
  }
}

module.exports = AdminPage;
