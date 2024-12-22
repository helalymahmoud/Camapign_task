import { AdInteractionService } from './ads-interaction.service';
export declare class AdInteractionResolver {
    private readonly adInteractionService;
    constructor(adInteractionService: AdInteractionService);
    getAdStatistics(adId: string): Promise<string>;
}
