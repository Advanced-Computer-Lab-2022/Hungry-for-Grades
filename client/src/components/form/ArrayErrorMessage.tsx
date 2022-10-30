import { FormikProps, getIn } from 'formik';

type ArrayErrorMessageProps = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & FormikProps<any>;

function ArrayErrorMessage(props: ArrayErrorMessageProps) {
  let errors = getIn(props.errors, props.name) as unknown[];
  if (!errors) {
    return <></>;
  }
  if (Array.isArray(errors)) {
    errors = errors.filter(e => typeof e !== 'object');
    if (errors.length === 0) {
      return <></>;
    }
    return (
      <div className='text-danger small'>
        {errors.map(e => (
          <span key={e as string}>{e as string}</span>
        ))}
      </div>
    );
  }
  return <div className='text-danger small'>{errors}</div>;
}

export default ArrayErrorMessage;
