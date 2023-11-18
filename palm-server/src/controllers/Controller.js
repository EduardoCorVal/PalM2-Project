const oEnvironment = require('../constants/Environment.js');
const { NOT_FOUND, NOT_VALID, PERMISSIONS } = require("../constants/StatusCode");

var Controller = class Controller {
  constructor() {}
  /**
   * Función que retorna la respuesta.
   *
   * @param {Response} oResponse Este objeto maneja el response de la solicitud.
   * @param {number} nStatusCode Codigo de estado de la solicud.
   * @param {Array} oData Arreglo de datos que seran devueltos en la solicitud.
   * @param {string | object} oException Mensaje de error o objeto error si lo hay.
   *
   * @author Eduardo Cortez
   */
  respond = (oResponse, nStatusCode, oData = null, oException = null) => {
    oResponse.status(nStatusCode);
    if (oData == null)
      switch (nStatusCode) {
        case NOT_FOUND:
          oData = { message: oEnvironment.GENERAL_MESSAGE_NOT_FOUND };
          break;
        case NOT_VALID:
          oData = { message: oEnvironment.GENERAL_MESSAGE_NOT_VALID };
          break;
        case PERMISSIONS:
          oData = { message: oEnvironment.GENERAL_MESSAGE_UNAUTHORIZED };
          break;
        default:
          oData = { message: oEnvironment.GENERAL_MESSAGE_ERROR };
          break;
      }
    oResponse.json(oData);
  };
};

module.exports = Controller;
