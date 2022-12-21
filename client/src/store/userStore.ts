/* eslint-disable security/detect-object-injection */
import create from 'zustand';
import { devtools } from 'zustand/middleware';

import SessionStorage from '@/services/sessionStorage/SessionStorage';

import { type IUser } from '@interfaces/user.interface';
import { EnrolledCourse, ITrainee } from '@/interfaces/course.interface';
import { Role } from '@/enums/role.enum';

export interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  getUser: () => IUser | null;
  logOut: () => void;
  isAuthenticated: boolean | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isEnrolled: (id: string) => boolean;
}

export const useUserStore = create<IUserStore, [['zustand/devtools', never]]>(
  devtools((set, get) => ({
    user: SessionStorage.get<IUser>('user') as IUser | null,
    isAuthenticated: SessionStorage.get<IUser>('user') ? true : null,
    setUser: (user: IUser) => {
      SessionStorage.set<IUser>('user', { ...user });

      set({ user, isAuthenticated: true });
    },
    getUser: () => SessionStorage.get<IUser>('user') as IUser | null,
    setIsAuthenticated: (isAuthenticated: boolean | null) =>
      set({ isAuthenticated }),
    logOut: () => {
      set({ user: null, isAuthenticated: false });
    },
    isEnrolled: _id => {
      if (get().user?.role != Role?.TRAINEE) return true; //I will remove the Card Buttons from the Card of the enrolled is true
      return (
        [
          ...((get().user as ITrainee)?._enrolledCourses as EnrolledCourse[])
        ].find(item => item?._course?._id === _id) !== undefined
      );
    }
  }))
);

export const UseUser = () => useUserStore(state => state.user);

export const UseSetUser = () => useUserStore(state => state.setUser);
export const UseUserStoreLogOut = () => useUserStore(state => state.logOut);
export const UseUserIsAuthenticated = () =>
  useUserStore(state => state.isAuthenticated);
export const UseUserSetIsAuthenticated = () =>
  useUserStore(state => state.setIsAuthenticated);
