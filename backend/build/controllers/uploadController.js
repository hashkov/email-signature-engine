"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadLogo = void 0;
const uploadLogo = (req, res) => {
    if (req.file) {
        res.json({ url: `/uploads/${req.file.filename}` });
    }
    else {
        res.status(400).json({ error: 'No file uploaded' });
    }
};
exports.uploadLogo = uploadLogo;
