import {
  NextFunction,
  Response,
} from 'express';

import { chatService } from './chat.service';
import { ChatInput } from './chat.validation';
import { AuthRequest } from '../../shared/types/AuthRequest';

export class ChatController {
  async chat(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { question, conversationId } =
        req.body as ChatInput & {
          conversationId?: string;
        };

      const result =
        await chatService.ask(
          question,
          req.user.id,
          req.user.organizationId,
          conversationId,
        );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const chatController =
  new ChatController();