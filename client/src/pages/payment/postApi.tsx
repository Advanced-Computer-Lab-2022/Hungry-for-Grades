import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { HttpResponse } from '@/interfaces/response.interface';
const APP_BASE_API_URL = import.meta.env.VITE_SERVER_BASE_API_URL;

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
  const res: HttpResponse<Data> = await axios.post(
    `${APP_BASE_API_URL}/payment/success/${encodeURIComponent(
      traineeId
    )}?country=${country}&walletUsed=${walletUsed}`
  );
  if (!res.data.success) {
    throw new Error(`server returned error ${res.message}`);
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
