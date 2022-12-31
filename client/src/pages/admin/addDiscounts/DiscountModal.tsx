import { Formik, Form } from 'formik';

import { Modal } from 'react-bootstrap';

import axios from 'axios';
import { toast } from 'react-toastify';

import { advancedSchema } from '@pages/instructor/setDiscount/ValidationSchema';

import { toastOptions } from '@/components/toast/options';

import Input from '@/components/inputs/input/Input';
import { ICourse } from '@/interfaces/course.interface';

const APP_BASE_API_URL = import.meta.env.VITE_SERVER_BASE_API_URL;

export default function DiscountModal(props: {
  handleClose: () => void;
  id: Set<ICourse>;
  updateFunc: () => void;
}) {
  const arr = [...props?.id];
  return (
    <Modal show onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Discount</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ endDate: '', percent: 0 }}
          validationSchema={advancedSchema}
          onSubmit={async function (values) {
            const startDatee = new Date();
            const De: Date | string =
              values.endDate == '' ? '' : new Date(values.endDate);
            const per: number = values.percent;
            //const URL = `${APP_BASE_API_URL}/courses/${props.id}/discount`;

            for (let i = 0; i < arr?.length; ++i) {
              await axios.post(
                `${APP_BASE_API_URL}/courses/${arr[i]?._id as string}/discount`,
                {
                  startDate: startDatee,
                  endDate: De,
                  percentage: per
                }
              );
            }
            toast.success('Discounts are added successully', toastOptions);
            props.updateFunc();
            props.handleClose();
            props?.id?.clear();
          }}
        >
          {formik => (
            <Form>
              <Input
                isTop
                correctMessage={''}
                errorMessage={formik.errors.endDate}
                hint={''}
                id={''}
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
                id={''}
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
