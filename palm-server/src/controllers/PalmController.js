const {
  DONE,
  CONFLICT,
  NOT_VALID,
  NOT_FOUND,
} = require("../constants/StatusCode");
const oEnvironment = require('../constants/Environment.js');
const Controller = require("../controllers/Controller");
const TextService = require("../Services/TextService");

var PalmController = class PalmController extends Controller {
  constructor() {
    super();
  }
  /**
   * Función para comunicarse con la API de PalM
   *
   * @param {Request} oRequest Request de la peticion, aqui se reciben las credenciales del usuario
   * @param {Response} oResponse Este objeto maneja el response de la solicitud
   *
   * @author Eduardo Cortez
   */
  chatting = async (oRequest, oResponse) => {
    let answer = null;
    const textService = new TextService();
    try {
      let sPromp = oRequest.body.prompt;
      textService.client
        .generateText({
          model: textService.TEXT_BISION_01,
          prompt: {
            text: sPromp,
          },
        })
        .then((result) => {
          answer = result[0].candidates[0].output
          // answer = result;
          // console.log(JSON.stringify(result, null, 2));
          this.respond(oResponse, DONE, { message: "Success", data: answer });
        });
    } catch (oException) {
      this.respond(oResponse, NOT_VALID, null, oException);
    }
  };
};

module.exports = PalmController;
