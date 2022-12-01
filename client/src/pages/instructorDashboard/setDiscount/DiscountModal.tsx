
import { Formik, Form } from 'formik'

import {  Modal } from 'react-bootstrap'

import { advancedSchema } from './ValidationSchema'


import TextArea from '@/pages/admin/TextArea';
import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';
import { postRequest } from '@/services/axios/http-verbs';
import { useQuery } from '@tanstack/react-query';

import useDiscountQuery from './useDiscountQuery';
import axios from 'axios';
import { toast } from 'react-toastify';
import { toastOptions } from '@/components/toast/options';
import { UpdateValidation } from './UpdateValidation';

const APP_BASE_API_URL = import.meta.env.VITE_SERVER_BASE_API_URL;


export default function DiscountModal(props:{handleClose: (() => void), id : string, updateFlag : string}) {

  return (
    <Modal show = {true} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Discount</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
                  initialValues={{ endDate: '', percent: 0 }}
                  validationSchema= {((props.updateFlag != '')? UpdateValidation : advancedSchema )}
                  onSubmit={function (values){
                    const startDatee  = (new Date());
                    const De : Date|string = (values.endDate == '')? '':(new Date(values.endDate));
                    alert(De);
                    const per : number = values.percent;
                    alert(per);
                    const URL = `${APP_BASE_API_URL}/courses/${props.id}/discount`
                    alert(URL);
                    if(props.updateFlag == ''){
                    axios.post(`${APP_BASE_API_URL}/courses/${props.id}/discount`, {startDate: startDatee
                  ,endDate: De, percentage: per})
                         .then(_response => {
                          toast.success('Discount is Added Successfully...', toastOptions)
                         })
                         .catch(_error => {
                          toast.error('an Error has occurred please try again...')

                         })
                      }
                      else
                      {
                        let toBeUpdated = {};
                        if(values.endDate != '')
                        {
                          if(values.percent != 0)
                          {
                            toBeUpdated = {endDate : values.endDate, percent : values.percent};
                          }
                          else
                          {
                            toBeUpdated = {endDate : values.endDate};
                          }
                        }
                        else{
                          if(values.percent != 0)
                          {
                            toBeUpdated = {percent : values.percent};
                          }
                          else
                          {
                            toBeUpdated = {};
                          }
                        }
                      alert('UPDATE ' + toBeUpdated.endDate + " " + toBeUpdated.percent)
                      axios.patch(`${APP_BASE_API_URL}/courses/${props.id}/discount/${props.updateFlag}`, toBeUpdated)
                      .then(_response => {
                        toast.success('Discount is Updated Successfuly...', toastOptions);
                      })
                      .catch(_error => {
                        toast.error('an Error has occured...', toastOptions);
                      })
                      alert('What Happened')
                    }
                    props.handleClose();
                  }}>
            { _formik => (
            <Form>
                <label htmlFor='endDate' style={{fontSize:'1.1rem', fontWeight:'500'}}>End Date</label>
                &nbsp;&nbsp;
                <TextArea type='Date' placeholder='End Date'  name='endDate' />
                <hr style={{color:'white'}}/>
                <label htmlFor='percent' style={{fontSize:'1.1rem', fontWeight:'500'}}>Discount Percent</label>
                &nbsp;&nbsp;
                <TextArea type='number' placeholder='percent'  name='percent' />
                <div style = {{width:'6rem', alignSelf:'center', fontSize:'1rem', position:'relative', left:'70%', backgroundColor:'red', color:'white', borderRadius:'12px'}}> <button style = {{width:'100%', borderRadius:'12px'}}  type='submit'>Submit</button> </div>
            </Form>
                )}
        </Formik>
      </Modal.Body>
    </Modal>
  )
}
