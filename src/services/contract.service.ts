import { Contract } from '../entities/contract.entity';
import { CreateContractDto } from '../dtos/create-contract.dto';
import { ILike } from 'typeorm';
import { LinkPrecedenceEnum } from '../enums/contract.enum';

export class ContractService {
  static async create(createContractDto: CreateContractDto) {
    const { email, phoneNumber } = createContractDto;
    const contract = {
      primaryContractId: 0,
      emails: [],
      phoneNumbers: [],
      secondaryContractIds: [],
    };

    let createContractPayload = {};
    let emailAlreadyExists, phoneNumberAlreadyExists, primaryContract;

    if (email) {
      emailAlreadyExists = await Contract.findOne({
        where: { email: ILike(`${email}`) },
      });
    }

    if (phoneNumber) {
      phoneNumberAlreadyExists = await Contract.findOne({
        where: { phoneNumber },
      });
    }

    if (phoneNumberAlreadyExists && emailAlreadyExists) {
      if (phoneNumberAlreadyExists.createdAt > emailAlreadyExists.createdAt) {
        await Contract.update(
          { id: phoneNumberAlreadyExists.id },
          {
            linkPrecedence: LinkPrecedenceEnum.secondary,
            linkedId: emailAlreadyExists.id,
          },
        );
        primaryContract = emailAlreadyExists;
      } else {
        await Contract.update(
          { id: emailAlreadyExists.id },
          {
            linkPrecedence: LinkPrecedenceEnum.secondary,
            linkedId: phoneNumberAlreadyExists.id,
          },
        );
        primaryContract = phoneNumberAlreadyExists;
      }
    } else if (phoneNumberAlreadyExists) {
      createContractPayload = {
        email,
        phoneNumber,
        linkedId: phoneNumberAlreadyExists.id,
        linkPrecedence: LinkPrecedenceEnum.secondary,
      };
      primaryContract = phoneNumberAlreadyExists;
    } else if (emailAlreadyExists) {
      createContractPayload = {
        email,
        phoneNumber,
        linkedId: emailAlreadyExists.id,
        linkPrecedence: LinkPrecedenceEnum.secondary,
      };
      primaryContract = emailAlreadyExists;
    } else {
      createContractPayload = {
        email,
        phoneNumber,
        linkedId: null,
        linkPrecedence: LinkPrecedenceEnum.primary,
      };
    }

    if (Object.keys(createContractPayload).length > 0) {
      const createContract = await Contract.save(createContractPayload);

      if (!primaryContract) {
        contract.primaryContractId = createContract['id'];
        contract.emails.push(createContract['email']);
        contract.phoneNumbers.push(createContract['phoneNumber']);
      }
    }
    if (primaryContract) {
      const contracts = await Contract.find({
        where: [{ id: primaryContract.id }, { linkedId: primaryContract.id }],
        order: {
          createdAt: 'ASC',
        },
      });
      contract.primaryContractId = primaryContract.id;
      for (const c of contracts) {
        if (c.email) contract.emails.push(c.email);
        if (c.phoneNumber) contract.phoneNumbers.push(c.phoneNumber);
        if (c.linkedId) contract.secondaryContractIds.push(c.id);
      }
      contract.emails = [...new Set(contract.emails)];
      contract.phoneNumbers = [...new Set(contract.phoneNumbers)];
    }

    return { contract };
  }
}
