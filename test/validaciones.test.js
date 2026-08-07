import assert from "node:assert/strict";
import {
  convertirBooleano,
  esCorreoValido,
  normalizarTexto,
  validarId
} from "../src/utils/validaciones.js";

describe("validaciones", () => {
  describe("normalizarTexto", () => {
    it("elimina espacios externos", () => {
      assert.equal(
        normalizarTexto("  Ana  "),
        "Ana"
      );
    });
  });

  describe("esCorreoValido", () => {
    it("acepta un correo válido", () => {
      assert.equal(
        esCorreoValido("ana@example.com"),
        true
      );
    });

    it("rechaza un correo inválido", () => {
      assert.equal(
        esCorreoValido("correo-invalido"),
        false
      );
    });
  });

  describe("convertirBooleano", () => {
    it('convierte "true" en true', () => {
      assert.equal(
        convertirBooleano("true"),
        true
      );
    });

    it("lanza un error para otro texto", () => {
      assert.throws(
        () => convertirBooleano("sí"),
        /true.*false/
      );
    });
  });

  describe("validarId", () => {
    it("convierte un ID válido", () => {
      assert.equal(validarId("3"), 3);
    });

    it("rechaza un ID negativo", () => {
      assert.throws(
        () => validarId(-1),
        /entero positivo/
      );
    });
  });
});