import { Router } from 'express';
import { ContractController } from '../controllers/contract.controller';

const router: Router = Router();

router.post('/identify', ContractController.create);

export { router };
