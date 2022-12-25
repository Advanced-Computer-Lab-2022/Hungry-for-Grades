import { postRequest } from '../http-verbs';

import { Report, ReportDTO } from '@/interfaces/reports.interface';
import { HttpResponse } from '@/interfaces/response.interface';

export const ReportDataService = {
  GET: {
    getReports: {
      URL: '/report/' as const,
      params: '',
      query: '',
      payload: {},
      response: {}
    }
  },
  POST: {
    makeReport: {
      URL: '/report/' as const,
      params: '',
      query: '',
      payload: {},
      response: {}
    },
    sendMessage: {
      URL: '',
      params: '',
      query: '',
      payload: {},
      response: {}
    },
    requestCourse: {
      URL: '/report' as const,
      params: '',
      query: '',
      payload: {},
      response: {}
    }
  },
  PATCH: {
    updateReport: {
      URL: '/report/',
      params: '',
      query: '',
      payload: {},
      response: {}
    }
  }
};

export async function requestCourse(
  reportData: ReportDTO
): Promise<Report | null> {
  if (!reportData) {
    return null;
  }
  const courseRequest = ReportDataService.POST.requestCourse;
  courseRequest.payload = reportData;
  const res = await postRequest<HttpResponse<Report>>(courseRequest);
  if (res.statusText !== 'Created') {
    throw new Error(`server returned response status ${res.statusText}`);
  }
  if (!res.data.success) {
    throw new Error(`server returned error ${res.data.message}`);
  }
  return res.data?.data;
}
