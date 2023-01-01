import { FormEvent, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Select, { SingleValue } from 'react-select/';

import { toast } from 'react-toastify';

import { HttpResponse } from '@/interfaces/response.interface';
import usePostQuery from '@/hooks/usePostQuery';

import { NewsLetterRoutes } from '@services/axios/dataServices/NewsLetterDataService';
import { toastOptions } from '@/components/toast/options';

type Options = {
  value: string;
  label: string;
};
const userRoles: Options[] = [
  { label: 'All', value: '' },
  { label: 'Admin', value: 'admin' },
  { label: 'Trainee', value: 'trainee' },
  { label: 'Instructor', value: 'instructor' }
];

function AdminNewsletter() {
  const { mutateAsync: sendEmail } = usePostQuery<HttpResponse<null>>();
  const subjectRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedRole, setSelectedRole] = useState<{
    label: string;
    value: string;
  }>({
    label: 'All',
    value: ''
  });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const subject = subjectRef?.current?.value || '';
    const body = markdownRef?.current?.value || '';

    if (subject && body) {
      const EmailRoute = Object.assign({}, NewsLetterRoutes.POST.sendEmail);
      EmailRoute.payload = {
        subject,
        body
      };
      EmailRoute.query = `all=${selectedRole.label === 'All' ? 1 : 0}&role=${
        selectedRole.value
      }`;
      try {
        const response=await toast.promise(sendEmail(EmailRoute),{
					pending: 'Sending email...',
				},toastOptions);
				if(!response.status){
					toast.error('Error sending email', toastOptions);
					return;
				}
				else{
        toast.success('Email sent successfully', toastOptions);}
      } catch (error) {
        console.log(error);
        toast.error('Error sending email', toastOptions);
      }
    }
  }

  return (
    <div
      className='py-5'
      style={{
        backgroundColor: '#f8f9fa'
      }}
    >
      <Container>
        <Form onSubmit={handleSubmit}>
          <Stack gap={4}>
            <Row>
              <Col>
                <Form.Group controlId='title'>
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    ref={subjectRef}
                    required
                    placeholder='Newsletter Subject'
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='tags'>
                  <Form.Label>User Roles</Form.Label>
                  <Select
                    id='userRoles-select'
                    name='roles'
                    options={userRoles}
                    placeholder='Roles'
                    value={selectedRole}
                    onChange={function (role: SingleValue<Options>) {
                      if (role)
                        setSelectedRole({
                          label: role.label,
                          value: role.value
                        });
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId='markdown'>
              <Form.Label>Body</Form.Label>
              <Form.Control
                ref={markdownRef}
                required
                as='textarea'
                placeholder='Write Newsletter Body'
                rows={15}
              />
            </Form.Group>
            <Stack
              className='justify-content-end'
              direction='horizontal'
              gap={2}
            >
              <Button type='submit' variant='primary' onClick={handleSubmit}>
                Submit
              </Button>
              <Link to='..'>
                <Button type='button' variant='outline-secondary'>
                  Cancel
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Form>
      </Container>
    </div>
  );
}

export default AdminNewsletter;
