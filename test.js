const DriverManager = require('./DriverManager');
const FormPage = require('./FormPage');
const AdminPage = require('./AdminPage');
(async function test() {
  const driverManager = new DriverManager();
  await driverManager.startDriver();
  const driver = await driverManager.getDriver();
  const formPage = new FormPage(driver);
  const adminPage = new AdminPage(driver);
  try {
    await driver.get(process.env.URL_BASE+'/unete-al-equipo-grupo-venado/');
    await formPage.fillForm();
    await formPage.verifyForm();
    await formPage.verifyFileAttachment();
    await formPage.submitForm();
  
    await driver.get(process.env.URL_BASE+'/administracion-ingresar/');
    await adminPage.loginToAdmin();
    await adminPage.viewFormEntries();
    await adminPage.verificarEntrada();

  } catch (error) {
    console.error('Error en la prueba:', error);
  } finally {
    await driverManager.closeDriver();
  }
})();
