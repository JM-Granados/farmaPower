// routes/upload.routes.ts
import { Router } from 'express';
import { uploadImageController } from '../controllers/upload.controller';
import { upload } from '../multerConfig';

const router = Router();

router.post('/upload', upload.single('image'), uploadImageController);

export default router;
