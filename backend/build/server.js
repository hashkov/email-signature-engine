"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const signatureRoutes_1 = require("./routes/signatureRoutes");
const uploadRoutes_1 = require("./routes/uploadRoutes");
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
app.use('/api/signatures', signatureRoutes_1.signatureRoutes);
app.use('/api/upload', uploadRoutes_1.uploadRoutes);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
