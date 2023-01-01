import { useQuery } from '@tanstack/react-query';

import { HttpResponse } from '@/interfaces/response.interface';
import { PaymentRoutes } from '@/services/axios/dataServices/PaymenrDataService';
import { postRequest } from '@/services/axios/http-verbs';
import { UseUserDeductBalance } from '@/store/userStore';

type Data = {
  data: {
    _id: string;
    amount: number;
  };
  message: string;
  success: boolean;
};

export function savePayment(
  traineeId: string,
  country: string,
  walletUsed: string
) {
  const payment = PaymentRoutes.POST.savePayment;
  payment.URL = `/payment/success/${encodeURIComponent(traineeId)}`;
  payment.query = `country=${country}
    &walletUsed=${walletUsed}`;
  return postRequest<HttpResponse<Data>>(payment);
}

export default function usePostQuery(
  traineeId: string,
  country: string,
  walletUsed: string
) {
  return {
    ...useQuery(['savePayment', traineeId, country, walletUsed], () =>
      savePayment(traineeId, country, walletUsed)
    )
  };
}
