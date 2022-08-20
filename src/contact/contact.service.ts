import { CreateContactDto } from './dto/create-contact.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}
  // create contact
  async create(contactDto: CreateContactDto): Promise<void> {
    try {
      await this.contactRepository.create(contactDto).save();
      return;
    } catch (error: unknown) {
      throw new InternalServerErrorException();
    }
  }
}
