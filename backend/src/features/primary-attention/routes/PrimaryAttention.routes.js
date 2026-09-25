// backend/src/features/primary-attention/routes/primaryAttention.routes.js
// Mount in app.js: app.use('/api/primary-attention', primaryAttentionRoutes)

import { Router } from 'express';
import { validateRegistroInput } from '../middlewares/primaryAttention.middlewares.js';
import { createRegistro, getAllRegistros, getRegistro, updateRegistro, deleteRegistro, purgeRegistro } from '../controllers/primaryAttention.controller.js';

const primaryAttentionRoutes = Router();

primaryAttentionRoutes.route('/')
  .post(validateRegistroInput, createRegistro)   // POST   /api/primary-attention
  .get(getAllRegistros);                          // GET    /api/primary-attention

primaryAttentionRoutes.route('/:id')
  .get(getRegistro)                               // GET    /api/primary-attention/:id
  .put(validateRegistroInput, updateRegistro)     // PUT    /api/primary-attention/:id
  .delete(deleteRegistro);                        // DELETE /api/primary-attention/:id (soft)

primaryAttentionRoutes.route('/:id/purge')
  .delete(purgeRegistro);                         // DELETE /api/primary-attention/:id/purge

export default primaryAttentionRoutes;