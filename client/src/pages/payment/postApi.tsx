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

export async function savePayment(
  traineeId: string,
  country: string,
  walletUsed: string
): Promise<Data> {
  const payment = PaymentRoutes.POST.savePayment;
  payment.URL = `/payment/success/${encodeURIComponent(traineeId)}`;
  payment.query = country = `${country}
    &walletUsed=${walletUsed}`;
  const res = await postRequest<HttpResponse<Data>>(payment);
  console.log(res);
  if (!res.data.success) {
    throw new Error(`server returned error ${res.data.message}`);
  }
  if (walletUsed == 'true') {
    const deductBalance = UseUserDeductBalance();
    deductBalance(res.data.data.data.amount);
  }
  return res.data;
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
