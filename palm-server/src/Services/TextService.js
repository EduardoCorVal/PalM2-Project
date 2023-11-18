// Deacoplate!
const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;
const { GoogleAuth } = require("google-auth-library");
const oEnvironment = require('../constants/Environment.js');

var TextService = class TextService {
    constructor() {
      this.TEXT_BISION_01 = "models/text-bison-001";
      this.client = new TextServiceClient({
        authClient: new GoogleAuth().fromAPIKey(oEnvironment.GC_API_KEY),
      });
    }
};

module.exports = TextService;