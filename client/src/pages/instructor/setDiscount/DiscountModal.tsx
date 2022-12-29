import { Formik, Form } from 'formik';

import { Modal } from 'react-bootstrap';

import axios from 'axios';
import { toast } from 'react-toastify';

import { advancedSchema } from './ValidationSchema';

import { UpdateValidation } from './UpdateValidation';

import { toastOptions } from '@/components/toast/options';

import Input from '@/components/inputs/input/Input';

const APP_BASE_API_URL = import.meta.env.VITE_SERVER_BASE_API_URL;

export default function DiscountModal(props: {
  handleClose: () => void;
  id: string;
  updateFlag: string;
  updateFunc: () => void;
}) {
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
          onSubmit={async function (values) {
            const startDatee = new Date();
            const De: Date | string =
              values.endDate == '' ? '' : new Date(values.endDate);
            //alert(De);
            const per: number = values.percent;
            //alert(per);
            //const URL = `${APP_BASE_API_URL}/courses/${props.id}/discount`;
            //alert(URL);
            if (props.updateFlag == '') {
              await axios
                .post(`${APP_BASE_API_URL}/courses/${props.id}/discount`, {
                  startDate: startDatee,
                  endDate: De,
                  percentage: per
                })
                .then(_response => {
                  toast.success(
                    'Discount is Added Successfully...',
                    toastOptions
                  );
                  console.log(_response);
                })
                .catch(_error => {
                  toast.error('an Error has occurred please try again...');
                  console.log(_error);
                });
            } else {
              let toBeUpdated = {};
              if (values.endDate != '') {
                if (values.percent != 0) {
                  toBeUpdated = {
                    endDate: values.endDate,
                    percent: values.percent
                  };
                } else {
                  toBeUpdated = { endDate: values.endDate };
                }
              } else {
                if (values.percent != 0) {
                  toBeUpdated = { percent: values.percent };
                } else {
                  toBeUpdated = {};
                }
              }
              //alert('UPDATE ' + toBeUpdated.endDate + " " + toBeUpdated.percent)
              await axios
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
                });
            }
            props.updateFunc();
            props.handleClose();
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
								isError={formik.touched.percent && formik.errors.percent ? true : null}
								label={'Percentage'}
								name={'percent'}
								placeholder='Percentage'
								size={0}
								type='number'
								value={formik.values.percent}
								onBlurFunc={formik.handleBlur} onChangeFunc={formik.handleChange}              />
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
