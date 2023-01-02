import { UseUser } from '@/store/userStore';

export function useTraineeId(): string | undefined {
  return UseUser()?._id;
}
