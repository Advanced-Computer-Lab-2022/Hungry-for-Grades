import { UseUser } from '@/store/userStore';

export default function useInstructorId(): string | undefined {
  return UseUser()?._id;
}
