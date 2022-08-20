import { CreateContactDto } from './dto/create-contact.dto';
import { ContactService } from './contact.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}
  // create contact
  @Post()
  create(@Body() contactDto: CreateContactDto): Promise<void> {
    return this.contactService.create(contactDto);
  }
}
