import { aggregationService } from './aggregationService';
import { cleansingService } from './cleansingService';
import { standardizationService } from './standardizationService';
import { businessRulesService } from './businessRulesService';
import { enrichmentService } from './enrichmentService';
import { goldenRecordService } from './goldenRecordService';

export class WorkflowService {
  async processProductThroughPipeline(productId: string): Promise<void> {
    try {
      await aggregationService.aggregateProductData(productId);

      await cleansingService.performCleansing(productId);

      await standardizationService.performStandardization(productId);

      await businessRulesService.validateProduct(productId);

      await enrichmentService.enrichProduct(productId);

      await goldenRecordService.generateGoldenRecord(productId);

      console.log(`Product ${productId} processed successfully through entire pipeline`);
    } catch (error) {
      console.error(`Pipeline processing failed for product ${productId}:`, error);
      throw error;
    }
  }

  async processMultipleProducts(productIds: string[]): Promise<void> {
    const results = await Promise.allSettled(
      productIds.map(id => this.processProductThroughPipeline(id))
    );

    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    console.log(`Batch processing complete: ${successful} successful, ${failed} failed`);
  }
}

export const workflowService = new WorkflowService();
