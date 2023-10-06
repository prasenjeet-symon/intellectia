import { Router } from 'express';
import { getPaginatedUserActivities } from '../controller/user';

const router = Router();

router.get('/activities/:userId', getPaginatedUserActivities);

export { router as userRouter };
