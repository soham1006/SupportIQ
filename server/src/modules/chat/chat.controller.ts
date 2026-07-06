import {
  NextFunction,
  Response,
} from 'express';

import { AuthRequest } from '../../shared/types/AuthRequest';

import { chatService } from './chat.service';

export class ChatController {
  async ask(
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

      const {
        question,
        conversationId,
      } = req.body;

      if (!question) {
        return res.status(400).json({
          success: false,
          message: 'Question is required',
        });
      }

      const result =
        await chatService.ask(
          question,
          req.user.id,
          req.user.organizationId,
          conversationId,
        );

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getConversations(
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

    const conversations =
      await chatService.getConversations(
        req.user.id,
      );

    res.json({
      success: true,
      data: conversations,
    });
  } catch (error) {
    next(error);
  }
}


async getMessages(
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

   const conversationId =
  Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;

const messages =
  await chatService.getMessages(
    conversationId,
  );

    res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
}


}

export const chatController =
  new ChatController();