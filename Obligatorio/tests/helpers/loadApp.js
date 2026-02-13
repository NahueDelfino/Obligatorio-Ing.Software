const fs = require("fs");
const path = require("path");

function loadHtmlIntoDom() {
  const htmlPath = path.resolve(__dirname, "../../index.html");
  const html = fs.readFileSync(htmlPath, "utf8");

  document.open();
  document.write(html);
  document.close();

  // stubs típicos
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
}

function runAppScript() {
  // IMPORTANTE: en tu index.html el script real es ./js/code.js
  const candidates = [
    path.resolve(__dirname, "../../js/code.js"),
    path.resolve(__dirname, "../../code.js"),
  ];

  const appPath = candidates.find((p) => fs.existsSync(p));
  if (!appPath) {
    throw new Error("No se encontró code.js. Probé:\n" + candidates.join("\n"));
  }

  delete require.cache[appPath];
  require(appPath);

  // Fuerza init si el script esperaba eventos del navegador
  document.dispatchEvent(new Event("DOMContentLoaded"));
  window.dispatchEvent(new Event("load"));
}

function bootApp() {
  loadHtmlIntoDom();
  runAppScript();
}

module.exports = { bootApp };
