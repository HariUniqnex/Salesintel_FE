import { supabase } from '../lib/supabase';
import type { PublishTarget, PublishHistory } from '../types/database.types';

export class PublishingService {
  async getTargets(projectId: string): Promise<PublishTarget[]> {
    const { data, error } = await supabase
      .from('publish_targets')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false});

    if (error) throw error;
    return data || [];
  }

  async createTarget(target: Omit<PublishTarget, 'id' | 'created_at' | 'last_publish_at'>): Promise<PublishTarget> {
    const { data, error } = await supabase
      .from('publish_targets')
      .insert(target)
      .select()
      .maybeSingle();

    if (error) throw error;
    return data!;
  }

  async publishToTarget(targetId: string, productIds: string[]): Promise<PublishHistory> {
    const { data: target } = await supabase
      .from('publish_targets')
      .select('*')
      .eq('id', targetId)
      .maybeSingle();

    if (!target) throw new Error('Target not found');

    const { data: history, error } = await supabase
      .from('publish_history')
      .insert({
        target_id: targetId,
        product_count: productIds.length,
        status: 'success',
        errors: []
      })
      .select()
      .maybeSingle();

    if (error) throw error;
    return history!;
  }

  async exportToCSV(projectId: string): Promise<string> {
    return 'SKU,Brand,Name\n';
  }
}

export const publishingService = new PublishingService();
