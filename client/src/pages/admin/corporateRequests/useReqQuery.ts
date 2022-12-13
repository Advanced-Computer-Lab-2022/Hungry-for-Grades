import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';

import { AllReport } from '@/interfaces/reports.interface';
import { HttpResponse } from '@/interfaces/response.interface';
import { ReportDataService } from '@/services/axios/dataServices/ReportDataService';
import { getRequest } from '@/services/axios/http-verbs';

// NEEDS TO BE REVISED BECAUSE IT PRODUCES A WARNING
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReports(_activePage: number) {
  const Reports = ReportDataService.GET.getReports;

  Reports.query = `startDate=${'1900-01-31T22:00:00.000Z'}&limit=${10}`;

  return getRequest<HttpResponse<AllReport[]>>(Reports);
}

export function useReqQuery() {
  const [activePage, setActivePage] = useState<number>(1);

  return {
    ...useQuery(
      ['admin-gimme-reports', activePage, location],
      () => getReports(activePage),
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
