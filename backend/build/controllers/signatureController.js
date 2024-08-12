"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSignature = void 0;
const handlebars_1 = __importDefault(require("handlebars"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const generateSignature = (req, res) => {
    const { templateName, personalInfo } = req.body;
    const baseUrl = process.env.BASE_URL;
    try {
        const templatePath = path_1.default.join(__dirname, '..', '..', 'src', 'templates', `${templateName}.hbs`);
        const templateSource = fs_1.default.readFileSync(templatePath, 'utf-8');
        const template = handlebars_1.default.compile(templateSource);
        const htmlSignature = template(Object.assign({ baseUrl }, personalInfo));
        res.json({ signature: htmlSignature });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to generate signature' });
    }
};
exports.generateSignature = generateSignature;
