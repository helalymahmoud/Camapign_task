import { Campaign } from 'src/campaigns/entities/campaign.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTicketInput } from './dto/create-ticket.input';
import { Ticket } from './entities/tickets.entity';
export declare class TicketService {
    private ticketRepository;
    private userRepository;
    private campaignRepository;
    constructor(ticketRepository: Repository<Ticket>, userRepository: Repository<User>, campaignRepository: Repository<Campaign>);
    findAll(): Promise<Ticket[]>;
    findOne(id: string): Promise<Ticket>;
    create(input: CreateTicketInput): Promise<Ticket>;
    update(id: string, updateTicketInput: CreateTicketInput): Promise<Ticket>;
    remove(id: string): Promise<void>;
}
