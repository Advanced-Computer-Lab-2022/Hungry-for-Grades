import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';

import { AllReport } from '@/interfaces/reports.interface';
import { PaginatedResponse } from '@/interfaces/response.interface';
import { ReportDataService } from '@/services/axios/dataServices/ReportDataService';
import { getRequest } from '@/services/axios/http-verbs';

// NEEDS TO BE REVISED BECAUSE IT PRODUCES A WARNING
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReports(_activePage: number, filterVal: string) {
  const Reports = ReportDataService.GET.getReports;

  if (filterVal != 'All')
    Reports.query = `startDate=${'1900-01-31T22:00:00.000Z'}&limit=${10}&reason=${'Course_Request'}&status=${filterVal}&page=${_activePage}`;
  else
    Reports.query = `startDate=${'1900-01-31T22:00:00.000Z'}&limit=${10}&reason=${'Course_Request'}&page=${_activePage}`;

  return getRequest<PaginatedResponse<AllReport[]>>(Reports);
}

export function useReqQuery(updates: number, filterVal: string) {
  const [activePage, setActivePage] = useState<number>(1);

  return {
    ...useQuery(
      ['admin-gimme-reports', activePage, location, updates, filterVal],
      () => getReports(activePage, filterVal),
      {
        cacheTime: 1000 * 60 * 60 * 24,
        retryDelay: 1000,
        enabled: true // 1 second
      }
    ),
    activePage,
    setActivePage
  };
}
