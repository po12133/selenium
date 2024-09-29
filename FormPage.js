
const assert = require('assert');
const path = require('path');
const { By, until  } = require('selenium-webdriver');

class FormPage {
    campoNombre = By.name('field1[]');
    campoTelefono = By.name('field4[]');
    campoCorreo = By.name('field2');
    campoNacimiento = By.name('field8');
    campoExperiencia = By.name('field12');
    campoCiudad = By.name('field11[]');
    campoDepartamento = By.name('field10');
    campoArea = By.name('field16');
    campoReferencia = By.name('field6');
    campoCv = By.name('files');
    nombreArchivo = By.css('div[data-identifier="field14"] > div > div > label > div > ul > li > div');
    botonEnvio = By.css('form[data-id="2"] .form-element-type-submit .submit-cover button');
    mensajeExito = By.css('form[data-id="2"] .final-success');
  constructor(driver) {
    this.driver = driver;
  }

  async fillForm() {
    await this.driver.findElement(this.campoNombre).sendKeys('Prueba');
    await this.driver.findElement(this.campoTelefono).sendKeys('71450557');
    await this.driver.findElement(this.campoCorreo).sendKeys('prueba@gmail.com');
    await this.driver.findElement(this.campoNacimiento).sendKeys('06/21/1998');
    await this.driver.findElement(this.campoExperiencia).sendKeys('0-3 años');
    await this.driver.findElement(this.campoCiudad).sendKeys('Cercado');
    await this.driver.findElement(this.campoDepartamento).sendKeys('Cochabamba');
    await this.driver.findElement(this.campoArea).sendKeys('Marketing');
    await this.driver.findElement(this.campoReferencia).sendKeys('Esto es una prueba');
    await this.driver.findElement(this.campoCv).sendKeys(path.resolve(__dirname, 'assets', 'Test.pdf'));
  }

  async submitForm() {
    await this.driver.findElement(this.botonEnvio).click();
    await this.driver.wait(until.elementLocated(this.mensajeExito), 5000);
  }

  async verifyForm() {
    assert.strictEqual(await this.driver.findElement(this.campoNombre).getAttribute('value'), 'Prueba', 'El Nombre completo no coincide');
    assert.strictEqual(await this.driver.findElement(this.campoTelefono).getAttribute('value'), '71450557', 'El Teléfono no coincide'); 
    assert.strictEqual(await this.driver.findElement(this.campoCorreo).getAttribute('value'), 'prueba@gmail.com', 'El correo electrónico no coincide'); 
    assert.strictEqual(await this.driver.findElement(this.campoNacimiento).getAttribute('value'), '06/21/1998', 'La Fecha de nacimiento no coincide'); 
    assert.strictEqual(await this.driver.findElement(this.campoExperiencia).getAttribute('value'), '0-3 años', 'La Experiencia de trabajo no coincide'); 
    assert.strictEqual(await this.driver.findElement(this.campoCiudad).getAttribute('value'), 'Cercado', 'La Ciudad de residencia no coincide'); 
    assert.strictEqual(await this.driver.findElement(this.campoDepartamento).getAttribute('value'), 'Cochabamba', 'El Departamento de residencia no coincide'); 
    assert.strictEqual(await this.driver.findElement(this.campoArea).getAttribute('value'), 'Marketing', 'El Área de postulación no coincide'); 
    assert.strictEqual(await this.driver.findElement(this.campoReferencia).getAttribute('value'), 'Esto es una prueba', 'La Referencia(s) no coincide');
  }

  async verifyFileAttachment() {
    const fileElement = await this.driver.findElement(this.nombreArchivo);
    try {
        await this.driver.wait(async () => {
            const text = await fileElement.getText();
            return text !== '';
        }, 5000);
    } catch (error) {
        throw new Error('No se encontró el nombre del archivo');
    }
    assert.strictEqual(await fileElement.getText(), 'Test.pdf', 'El archivo no fue adjuntado correctamente');
  }
}

module.exports = FormPage;
