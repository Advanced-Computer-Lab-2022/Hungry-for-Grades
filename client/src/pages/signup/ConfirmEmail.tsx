import { useState } from 'react';

import { v4 as uuid } from 'uuid';

import Button from '@/components/buttons/button/Button';
import Input from '@/components/inputs/input/Input';
import { ChangeEvent } from '@/components/common.types';

function ConfirmEmail({
  handleSubmit
}: {
  handleSubmit: (email: string) => void;
}) {
  const [code, setCode] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  return (
    <div className='row'>
      {Array.from({ length: 6 }, (_, i) => i).map((_, index) => (
        <div key={uuid()} className='col-2'>
          <Input
            correctMessage={''}
            errorMessage={undefined}
            hint={''}
            isError={null}
            isTop={false}
            label={''}
            name={`code${index}`}
            placeholder={''}
            size={0}
            type={'number'}
            value={`${code.at(index) ?? ''}`}
            onChangeFunc={function change(e: ChangeEvent) {
              setCode([
                ...code.slice(0, index),
                parseInt(e.target.value),
                ...code.slice(index + 1)
              ]);
            }}
          />
        </div>
      ))}

      <div className='d-flex flex-row justify-content-end my-3'>
        <Button
          backgroundColor={'primary-bg'}
          isDisabled={false}
          label={'next'}
          name={'next'}
          type={'button'}
          onClickFunc={handleSubmit}
        />
      </div>
    </div>
  );
}

export default ConfirmEmail;
