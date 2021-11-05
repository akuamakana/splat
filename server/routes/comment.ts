import { createComment, deleteComment } from '../controllers/comment';

import { Express } from 'express';
import verifyLoggedIn from '../middleware/verifyLoggedIn';

export const commentRoute = (app: Express) => {
  app.post('/comment', [verifyLoggedIn], createComment);

  app.delete('/comment/:id', [verifyLoggedIn], deleteComment);
};
