import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';

import { AllReport } from '@/interfaces/reports.interface';
import { PaginatedResponse } from '@/interfaces/response.interface';
import { ReportDataService } from '@/services/axios/dataServices/ReportDataService';
import { getRequest } from '@/services/axios/http-verbs';

// NEEDS TO BE REVISED BECAUSE IT PRODUCES A WARNING
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReportss(
  _activePage: number,
  filterValStatus: string,
  filterValType: string
) {
  const Reports = ReportDataService.GET.getReports;

  const reason =
    filterValType == 'All' ? 'Technical,Financial,Other,Refund' : filterValType;

  if (filterValStatus != 'All')
    Reports.query = `startDate=${'1800-01-31T22:00:00.000Z'}&limit=${10}&reason=${reason}&status=${filterValStatus}&page=${_activePage}`;
  else
    Reports.query = `startDate=${'1800-01-31T22:00:00.000Z'}&limit=${10}&reason=${reason}&page=${_activePage}`;

  return getRequest<PaginatedResponse<AllReport[]>>(Reports);
}

export function useReportReq(
  updates: number,
  filterValStatus: string,
  filterValType: string
) {
  const [activePage, setActivePage] = useState<number>(1);

  return {
    ...useQuery(
      [
        'admin-gimme-reportsFinanciaaall',
        activePage,
        location,
        updates,
        filterValStatus,
        filterValType
      ],
      () => getReportss(activePage, filterValStatus, filterValType),
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
