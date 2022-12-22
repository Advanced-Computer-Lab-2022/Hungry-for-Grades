import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getRequest } from '@/services/axios/http-verbs';
import { HttpResponse } from '@/interfaces/response.interface';
import { IUser } from '@/interfaces/user.interface';
import { ReportDataService } from '@/services/axios/dataServices/ReportDataService';
import { AllReport } from '@/interfaces/reports.interface';

async function getReports(activePage: number, user: IUser) {
  const Reports = ReportDataService.GET.getReports;

  Reports.query = `page=${activePage}&limit=${10}&_user=${user?._id}`;

  return getRequest<HttpResponse<AllReport[]>>(Reports);
}
const useCoursesQuery = (user: IUser) => {
  const [activePage, setActivePage] = useState<number>(1);

  return {
    ...useQuery(
      ['traine-gimme-my-reportss', activePage, location],
      () => getReports(activePage, user),
      {
        cacheTime: 1000 * 60 * 60 * 24,
        retryDelay: 1000,
        enabled: true // 1 second
      }
    ),
    activePage,
    setActivePage
  };
};

export default useCoursesQuery;
