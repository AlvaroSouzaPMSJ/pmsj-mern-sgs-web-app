// backend/src/features/specialized-attention/routes/specializedAttention.routes.js
// Mount in app.js: app.use('/api/specialized-attention', specializedAttentionRoutes)

import { Router } from 'express';
import { validateIndicadorInput } from '../middlewares/specializedAttention.middlewares.js';
import { createIndicador, getAllIndicadores, getIndicador, updateIndicador, deleteIndicador, purgeIndicador } from '../controllers/specializedAttention.controller.js';

const specializedAttentionRoutes = Router();

specializedAttentionRoutes.route('/')
  .post(validateIndicadorInput, createIndicador)   // POST   /api/specialized-attention
  .get(getAllIndicadores);                          // GET    /api/specialized-attention

specializedAttentionRoutes.route('/:id')
  .get(getIndicador)                                // GET    /api/specialized-attention/:id
  .put(validateIndicadorInput, updateIndicador)     // PUT    /api/specialized-attention/:id
  .delete(deleteIndicador);                         // DELETE /api/specialized-attention/:id (soft)

specializedAttentionRoutes.route('/:id/purge')
  .delete(purgeIndicador);                          // DELETE /api/specialized-attention/:id/purge

export default specializedAttentionRoutes;