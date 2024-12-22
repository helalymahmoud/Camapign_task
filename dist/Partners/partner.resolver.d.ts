import { PartnerService } from './partner.service';
import { CreatePartnerInput } from './dto/create-partner.input';
import { Partner } from './entites/Partner.entity';
export declare class PartnerResolver {
    private partnerService;
    constructor(partnerService: PartnerService);
    Partners(): Promise<Partner[]>;
    Partner(id: string): Promise<Partner>;
    createPartner(CreatePartnerInput: CreatePartnerInput): Promise<Partner>;
    updatePartner(id: string, updatePartnerInput: CreatePartnerInput): Promise<Partner>;
    removePartner(id: string): Promise<boolean>;
}
