import { supabase } from '../lib/supabase';

export class DashboardService {
  async getGlobalMetrics() {
    const { data: projects } = await supabase
      .from('projects')
      .select('id, status');

    const activeProjects = projects?.filter(p => p.status === 'active').length || 0;

    const { data: allProducts } = await supabase
      .from('products')
      .select('id');

    const { data: allGoldenRecords } = await supabase
      .from('golden_records')
      .select('published_at');

    const publishedProducts = allGoldenRecords?.filter(g => g.published_at).length || 0;

    return {
      totalProjects: projects?.length || 0,
      activeProjects,
      totalProducts: allProducts?.length || 0,
      publishedProducts
    };
  }

  async getProjectMetrics(projectId: string) {
    return [];
  }
}

export const dashboardService = new DashboardService();
