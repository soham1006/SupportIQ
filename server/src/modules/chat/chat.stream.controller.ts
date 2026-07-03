import { Response } from 'express';
import { AuthRequest } from '../../shared/types/AuthRequest';

export class ChatStreamController {
  async stream(
    req: AuthRequest,
    res: Response,
  ) {
    res.status(501).json({
      success: false,
      message:
        'Streaming endpoint will be implemented next.',
    });
  }
}

export const chatStreamController =
  new ChatStreamController();