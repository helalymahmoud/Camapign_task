import { TicketService } from './ticket.service';
import { CreateTicketInput } from './dto/create-ticket.input';
import { Ticket } from './entities/tickets.entity';
export declare class TicketResolver {
    private ticketService;
    constructor(ticketService: TicketService);
    Tickets(): Promise<Ticket[]>;
    Ticket(id: string): Promise<Ticket>;
    createTicket(CreateTicketInput: CreateTicketInput): Promise<Ticket>;
    updateTicket(id: string, updateTicketInput: CreateTicketInput): Promise<Ticket>;
    removeTicket(id: string): Promise<boolean>;
}
