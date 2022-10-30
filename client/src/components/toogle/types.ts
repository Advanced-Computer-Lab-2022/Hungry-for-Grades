import { Dispatch, SetStateAction } from 'react';

 type ToogleType = {[key: string]: boolean};


export type ToogleProps = {
  toogle:ToogleType;
  setToogle: Dispatch<SetStateAction<ToogleType>>;
};
