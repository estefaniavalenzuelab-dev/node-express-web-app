import hbs from "hbs";

export function registrarHelpersHandlebars() {
  hbs.registerHelper("sumarUno", (valor) => {
    return Number(valor) + 1;
  });

  hbs.registerHelper("mayusculas", (texto) => {
    return String(texto ?? "").toUpperCase();
  });

  hbs.registerHelper("formatearEstado", (activo) => {
    return activo ? "Activo" : "Inactivo";
  });

  hbs.registerHelper("formatearFecha", (valor) => {
    const fecha = valor instanceof Date
      ? valor
      : new Date(valor);

    if (Number.isNaN(fecha.getTime())) {
      return "Fecha inválida";
    }

    return new Intl.DateTimeFormat("es-CL", {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(fecha);
  });

  hbs.registerHelper("esIgual", (valor1, valor2) => {
    return String(valor1) === String(valor2);
    });

}

