import { Request, Response } from 'express';
import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

const templatesDir = path.join(__dirname, '..', '..', 'src', 'templates');

export const generateSignature = (req: Request, res: Response) => {
  const { templateName, personalInfo } = req.body;
  const baseUrl = process.env.BASE_URL;

  try {
    const templatePath = path.join(
      __dirname,
      '..',
      '..',
      'src',
      'templates',
      `${templateName}.hbs`
    );
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const template = Handlebars.compile(templateSource);
    const htmlSignature = template({ baseUrl, ...personalInfo });

    res.json({ signature: htmlSignature });
  } catch (error) {
    res.status(400).json({ error: 'Failed to generate signature' });
  }
};

export const getTemplates = (req: Request, res: Response) => {
  try {
    const files = fs.readdirSync(templatesDir);

    const templateNames = files
      .filter((file) => file.endsWith('.hbs'))
      .map((file) => file.replace('.hbs', ''));

    res.json(templateNames);
  } catch (error) {
    console.error('Error reading templates directory:', error);
    res.status(500).json({ error: 'Failed to retrieve templates' });
  }
};
