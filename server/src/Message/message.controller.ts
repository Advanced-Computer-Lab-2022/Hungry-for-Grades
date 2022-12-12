import { Request, Response, NextFunction } from 'express';
import Messages from './message.model';
class MessageController {
  public getMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { from, to } = req.body;

      const messages = await Messages.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });

      const projectedMessages = messages.map(msg => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });
      res.json(projectedMessages);
    } catch (ex) {
      next(ex);
    }
  };

  public addMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { from, to, message } = req.body;
      const data = await Messages.create({
        message: { text: message },
        sender: from,
        users: [from, to],
      });

      if (data) return res.json({ msg: 'Message added successfully.' });
      else return res.json({ msg: 'Failed to add message to the database' });
    } catch (ex) {
      next(ex);
    }
  };
}

export default MessageController;
