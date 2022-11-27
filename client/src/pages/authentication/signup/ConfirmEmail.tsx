/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import { v4 as uuid } from 'uuid';

import { Link } from 'react-router-dom';

import { type ConfirmEmailProps } from './types';

import Button from '@/components/buttons/button/Button';
import Input from '@/components/inputs/input/Input';
import { ChangeEvent } from '@/components/common.types';
import usePostQuery from '@/hooks/usePostQuery';
import { AuthRoutes } from '@services/axios/dataServices/AuthDataService';
let verifiedCode: string;

function ConfirmEmail({
  handleSubmit,
  prev,
  firstName,
  lastName,
  email
}: ConfirmEmailProps) {
  const [code, setCode] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const { mutateAsync, isError, isSuccess } = usePostQuery();
  const [wrongMessage, setWrongMessage] = useState<string>('');

  const getVerifiedCode = async () => {
    const verifyEmail = Object.assign({}, AuthRoutes.POST.verifyEmail);
    verifyEmail.payload = {
      email,
      username: `${firstName} ${lastName}`
    };
    const { data } = await mutateAsync(verifyEmail);

    return data;
  };
  async function submit() {
    const combinedCode = code.join('');
    console.log(combinedCode);
    console.log('verifiedCode' + verifiedCode);
    if (verifiedCode === combinedCode) {
      await handleSubmit();
    } else {
      setWrongMessage('Invalid Code');
    }
  }

  useEffect(() => {
    getVerifiedCode()
      .then(response => {
        console.log('response');
        console.log(response);
        verifiedCode = `${response?.data as string}`;
        console.log('verifiedCode');
        console.log(verifiedCode);
      })
      .catch(() => {
        console.log('error');
      });
  }, [email, firstName, lastName, mutateAsync]);

  return (
    <div className='row'>
      {isSuccess && (
        <div className='alert alert-info'>
          We sent you a code to your email address. Please enter it here.
        </div>
      )}
      <small className='text-muted'>
        Didn&apos;t receive the code?{' '}
        <a
          className='text-primary'
          href='/'
          onClick={e => {
            setWrongMessage('');
            e.preventDefault();
            getVerifiedCode()
              .then(response => {
                verifiedCode = `${response?.data as string}`;
              })
              .catch(err => {
                console.log('error');
                console.log(err);
              });
          }}
        >
          Resend
        </a>
      </small>
      <div className='row'>
        {Array.from({ length: 6 }, (_, i) => i).map((_, index) => (
          <div key={uuid()} className='col-sm-4 col-lg-2'>
            <Input
              correctMessage={''}
              errorMessage={undefined}
              hint={''}
              isError={null}
              isTop={false}
              label={''}
              max={9}
              min={0}
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
                setWrongMessage('');
              }}
            />
          </div>
        ))}
      </div>

      {wrongMessage !== '' && (
        <div className='alert alert-danger'>Invalid code !</div>
      )}
      {isError && (
        <div className='alert alert-danger' role='alert'>
          Please report this Problem through this&nbsp;
          <Link className='alert-link' to='/report'>
            Link
          </Link>
        </div>
      )}

      <div className='d-flex flex-row justify-content-end my-3'>
        <Button
          backgroundColor={'secondary-bg'}
          isDisabled={false}
          label={'back'}
          name={'back'}
          type={'button'}
          onClickFunc={prev}
        />
        <Button
          backgroundColor={'primary-bg'}
          isDisabled={false}
          label={'submit'}
          name={'submit'}
          type={'button'}
          onClickFunc={submit}
        />
      </div>
    </div>
  );
}

export default ConfirmEmail;
