"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signatureRoutes = void 0;
const express_1 = require("express");
const signatureController_1 = require("../controllers/signatureController");
const router = (0, express_1.Router)();
router.post('/generate', signatureController_1.generateSignature);
router.get('/templates', signatureController_1.getTemplates);
exports.signatureRoutes = router;
