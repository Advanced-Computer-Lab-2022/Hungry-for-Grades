import { Formik, Form } from 'formik';

import { Modal } from 'react-bootstrap';

import { AxiosError } from 'axios';

import { toast } from 'react-toastify';

import { advancedSchema } from './ValidationSchema';

import { UpdateValidation } from './UpdateValidation';

import usePatchQuery from '@/hooks/usePatchQuery';

import { toastOptions } from '@/components/toast/options';

import Input from '@/components/inputs/input/Input';
import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';
import { postRequest } from '@/services/axios/http-verbs';
import { CourseDiscount } from '@/interfaces/course.interface';
import { HttpResponse } from '@/interfaces/response.interface';

export default function DiscountModal(props: {
  handleClose: () => void;
  id: string;
  updateFlag: string;
  updateFunc: () => void;
}) {
  function handleAll() {
    props.updateFunc();
    props.handleClose();
  }

  const { mutateAsync: updateDiscount } = usePatchQuery();

  return (
    <Modal show onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Discount</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ endDate: '', percent: 0 }}
          validationSchema={
            props.updateFlag != '' ? UpdateValidation : advancedSchema
          }
          // eslint-disable-next-line sonarjs/cognitive-complexity
          onSubmit={async function (values) {
            const startDatee = new Date();
            if (props.updateFlag == '') {
              const ddiscount = InstructorRoutes.POST.addDiscount;
              ddiscount.URL = `/courses/${props.id}/discount`;
              ddiscount.payload = {
                startDate: startDatee,
                endDate: values.endDate,
                percentage: values.percent
              };
              const data = await postRequest<HttpResponse<CourseDiscount[]>>(
                ddiscount
              );
              console.log(data);
              if (!data?.status) {
                toast.error(
                  (
                    data as unknown as AxiosError<
                      HttpResponse<CourseDiscount[]>
                    >
                  )?.response?.data?.message,
                  toastOptions
                );
              } else {
                toast.success('Discount is Added Successfully', toastOptions);
              }
            } else {
              const dddiscount = InstructorRoutes.PATCH.updateDiscount;
              dddiscount.URL = `/courses/${props.id}/discount/${props?.updateFlag}`;
              if (values.endDate != '' && values.endDate != undefined) {
                if (values.percent != 0) {
                  dddiscount.payload = {
                    endDate: values.endDate,
                    percentage: values.percent
                  };
                } else {
                  dddiscount.payload = { endDate: values.endDate };
                }
              } else {
                if (values.percent != 0) {
                  dddiscount.payload = { percentage: values.percent };
                }
              }
              //alert('UPDATE ' + toBeUpdated.endDate + " " + toBeUpdated.percent)

              //here i have my patch request that i want to do

              const dddata = await updateDiscount(dddiscount);
              if (!dddata?.status)
                toast.error(
                  'An Error has occured, Please try again',
                  toastOptions
                );
              else toast.success('Update is sent successfully', toastOptions);
              console.log(dddata);

              /*await axios
                .patch(
                  `${APP_BASE_API_URL}/courses/${props.id}/discount/${props.updateFlag}`,
                  toBeUpdated
                )
                .then(_response => {
                  toast.success(
                    'Discount is Updated Successfuly...',
                    toastOptions
                  );
                  console.log(_response);
                })
                .catch(_error => {
                  toast.error('an Error has occured...', toastOptions);
                  console.log(_error);
                });*/
            }
            handleAll();
          }}
        >
          {formik => (
            <Form>
              <Input
                isTop
                correctMessage={''}
                errorMessage={formik.errors.endDate}
                hint={''}
                id={'enddate-232131232142'}
                isError={
                  formik.touched.endDate && formik.errors.endDate ? true : null
                }
                label={'End Date'}
                name={'endDate'}
                placeholder='End Date'
                size={0}
                type='date'
                value={formik.values.endDate}
                onBlurFunc={formik.handleBlur}
                onChangeFunc={formik.handleChange}
              />

              <Input
                isTop
                correctMessage={''}
                errorMessage={formik.errors.percent}
                hint={''}
                id={'percentage-12'}
                isError={
                  formik.touched.percent && formik.errors.percent ? true : null
                }
                label={'Percentage'}
                name={'percent'}
                placeholder='Percentage'
                size={0}
                type='number'
                value={formik.values.percent}
                onBlurFunc={formik.handleBlur}
                onChangeFunc={formik.handleChange}
              />
              <hr />

              <button
                style={{
                  backgroundColor: '#A00407',
                  color: 'white',
                  marginLeft: '80%'
                }}
                type='submit'
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}
