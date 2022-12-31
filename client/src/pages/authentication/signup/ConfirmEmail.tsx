/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

import { type ConfirmEmailProps } from './types';

import Button from '@/components/buttons/button/Button';
import Input from '@/components/inputs/input/Input';
import { ChangeEvent } from '@/components/common.types';
import usePostQuery from '@/hooks/usePostQuery';
import { AuthRoutes } from '@services/axios/dataServices/AuthDataService';
import ErrorMessage from '@/components/error/message/ErrorMessage';
import { HttpResponse } from '@/interfaces/response.interface';
import { toastOptions } from '@/components/toast/options';
let verifiedCode: string;

function ConfirmEmail({
  handleSubmit,
  prev,
  firstName,
  lastName,
  email
}: ConfirmEmailProps) {
  const [code, setCode] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const { mutateAsync, isError, isSuccess, error } =
    usePostQuery<HttpResponse<string>>();

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
    const id = toast.loading(
      'Please wait while we send you a code to your email address',
      toastOptions
    );
    getVerifiedCode()
      .then(response => {
        console.log('response');
        console.log(response);
        verifiedCode = `${response?.data}`;
        console.log('verifiedCode');
        console.log(verifiedCode);
        toast.update(id, {
          render: 'We sent you a code to your email address',
          type: 'success',
          isLoading: false,
          ...toastOptions
        });
      })
      .catch(err => {
        toast.update(id, {
          render: 'unable to send verification code',
          type: 'error',
          isLoading: false,
          ...toastOptions
        });

        console.log('error');
        console.log(err);
      });
  }, [mutateAsync]);

  return (
    <div className='row'>
      {isSuccess && (
        <div className='alert alert-info'>
          We sent you a code to your
          <a
            className='link-secondary text-dark'
            href='https://mail.google.com/mail'
            rel='noopener noreferrer'
            target='_blank'
          >
            {' '}
            email address
          </a>
          . Please enter it here.
        </div>
      )}
      <small className='text-muted'>
        Didn&apos;t receive the code?{' '}
        <a
          className='text-primary'
          href='/'
          onClick={e => {
            setWrongMessage('');
            const id = toast.loading(
              'Please wait while we are re-sending you a code to your email address',
              toastOptions
            );
            e.preventDefault();
            getVerifiedCode()
              .then(response => {
                verifiedCode = `${response?.data}`;

                toast.update(id, {
                  render: 'We sent you a code to your email address',
                  type: 'success',
                  isLoading: false,
                  ...toastOptions
                });
              })
              .catch(err => {
                toast.update(id, {
                  render: 'unable to send verification code',
                  type: 'error',
                  isLoading: false,
                  ...toastOptions
                });

                console.log(err);
              });
          }}
        >
          Resend
        </a>
      </small>
      <div className='row'>
        {Array.from({ length: 6 }, (_, i) => i).map((_, index) => (
          <div key={`${index * 2}`} className='col-sm-4 col-lg-2'>
            <Input
              correctMessage={''}
              errorMessage={undefined}
              hint={''}
              id={`code-${index * 4}`}
              isError={null}
              isTop={false}
              label={''}
              max={9}
              min={0}
              name={`code${index}`}
              placeholder={''}
              size={0}
              type='number'
              value={`${code.at(index) ?? ''}`}
              onChangeFunc={function change(e: ChangeEvent) {
                setCode([
                  ...code.slice(0, index),
                  parseInt(
                    parseInt(e.target.value + '') > 9 ? '9' : e.target.value
                  ),
                  ...code.slice(index + 1)
                ]);
                setWrongMessage('');
              }}
              // focus on next element
              onKeyDownFunc={function keyDown(
                e: React.KeyboardEvent<HTMLInputElement>
              ) {
                if (e.key === 'Backspace' && e.target.value === '') {
                  const prevInput = document.getElementById(
                    `code-${index * 4 - 4}`
                  ) as HTMLInputElement;
                  if (prevInput) {
                    prevInput.focus();
                  }
                }
                if (e.key === 'ArrowRight' && e.target.value !== '') {
                  const nextInput = document.getElementById(
                    `code-${index * 4 + 4}`
                  ) as HTMLInputElement;
                  if (nextInput) {
                    nextInput.focus();
                  }
                }
              }}
            />
          </div>
        ))}
      </div>

      {wrongMessage !== '' && (
        <div className='alert alert-danger mt-3'>Invalid Code !</div>
      )}
      {isError && error && <ErrorMessage />}

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
