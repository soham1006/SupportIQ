import { NextFunction, Request, Response } from 'express';
import { uploadService } from './upload.service';

export class UploadController {
  async upload(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
      }

const result = await uploadService.uploadDocument(
  req.file,
  'cmr0cyi3s0000pd5ouofy8ndd',
  'cmr0d3rzq0000pd2g9fh2pfvm',
);
      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const uploadController = new UploadController();