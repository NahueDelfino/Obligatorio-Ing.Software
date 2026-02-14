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
  const candidates = [
    path.resolve(__dirname, "../../js/code.js"), // ruta real
    path.resolve(__dirname, "../../code.js"),
  ];

  const appPath = candidates.find((p) => fs.existsSync(p));
  if (!appPath) {
    throw new Error("No se encontró code.js. Probé:\n" + candidates.join("\n"));
  }

  // Reset del “guard” si existe
  window.__huellasAppInitialized = false;

  delete require.cache[appPath];
  require(appPath);

  // Inicialización determinística (sin depender de DOMContentLoaded)
  if (typeof window.__huellasInit === "function") {
    window.__huellasInit();
  } else {
    // fallback por si aún no está el hook
    document.dispatchEvent(new Event("DOMContentLoaded"));
    window.dispatchEvent(new Event("load"));
  }
}

function bootApp() {
  loadHtmlIntoDom();
  runAppScript();
}

module.exports = { bootApp };
