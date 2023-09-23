import { Request, Response } from 'express';
import { CreateContractDto } from '../dtos/create-contract.dto';
import { ContractService } from '../services/contract.service';

export class ContractController {
  static async create(req: Request, res: Response) {
    const createContractDto: CreateContractDto = req.body;
    if (!createContractDto.email && !createContractDto.phoneNumber) {
      return res
        .status(400)
        .json({ error: 'Please provide either email address or phone number' });
    }
    try {
      const contract = await ContractService.create(createContractDto);
      return res.status(200).json(contract);
    } catch (error) {
      console.log(
        '✔️ ~ file: contract.controller.ts:12 ~ ContractController ~ create ~ error:',
        error,
      );
      return res.status(500).json({ error: 'Registration failed' });
    }
  }
}
