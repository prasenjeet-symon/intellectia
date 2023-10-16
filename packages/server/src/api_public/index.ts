import { Router } from 'express';

const router: Router = Router();

router.get('/', (_req, res) => {
  res.send({ message: 'Hello World' });
});

export default router;
