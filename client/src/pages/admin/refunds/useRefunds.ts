import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';

import { AllReport, Reason } from '@/interfaces/reports.interface';
import {  PaginatedResponse } from '@/interfaces/response.interface';
import { ReportDataService } from '@/services/axios/dataServices/ReportDataService';
import { getRequest } from '@/services/axios/http-verbs';

// NEEDS TO BE REVISED BECAUSE IT PRODUCES A WARNING
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReports(_activePage: number, filterVal: string) {
  const Reports = ReportDataService.GET.getReports;

  if (filterVal != 'All')
    Reports.query = `startDate=${'1400-01-31T22:00:00.000Z'}&limit=${10}&reason=${
      Reason.REFUND
    }&status=${filterVal}&page=${_activePage}`;
  else
    Reports.query = `startDate=${'1400-01-31T22:00:00.000Z'}&limit=${10}&reason=${
      Reason.REFUND
    }&page=${_activePage}`;

  return getRequest<PaginatedResponse<AllReport[]>>(Reports);
}

export function useRefundQuery(updates: number, filterVal: string) {
  const [activePage, setActivePage] = useState<number>(1);

  return {
    ...useQuery(
      ['admin-gimme-refundsss', activePage, location, updates, filterVal],
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
