import { Repository } from 'typeorm';
import { CreatePartnerInput } from './dto/create-partner.input';
import { Campaign } from 'src/campaigns/entities/campaign.entity';
import { Partner } from './entites/Partner.entity';
export declare class PartnerService {
    private partnerRepository;
    private campaignRepository;
    constructor(partnerRepository: Repository<Partner>, campaignRepository: Repository<Campaign>);
    findAll(): Promise<Partner[]>;
    findOne(id: string): Promise<Partner>;
    create(input: CreatePartnerInput): Promise<Partner>;
    update(id: string, updatePartnerInput: CreatePartnerInput): Promise<Partner>;
    remove(id: string): Promise<void>;
}
