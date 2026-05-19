import { useEffect, useState } from 'react';
import { reportsService } from '@/services/reportsService';
import type { ReportSummary } from '@/interfaces';

export function useMonthlyReport(year: number, month: number) {
  const [data, setData] = useState<ReportSummary | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    reportsService.monthly(year, month).then(setData).finally(() => setLoading(false));
  }, [year, month]);
  return { data, loading };
}
