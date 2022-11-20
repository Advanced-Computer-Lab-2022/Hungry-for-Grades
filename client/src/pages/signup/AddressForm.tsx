/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Country } from 'country-state-city';
import Select from 'react-select';

type Options = {
  readonly value: string;
  readonly label: string;
};

function getCountries() {
  return Country.getAllCountries().map(country => ({
    label: country.name,
    value: country.isoCode
  }));
}

function AddressForm() {
  const formik = useFormik({
    initialValues: {
      country: 'Canada'
    },
    validationSchema: Yup.object({
      country: Yup.string().required('Country is Required')
    }),
    onSubmit: (values, actions) => {
      alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    }
  });

  const { values, setValues } = formik;

  return (
    <div>
      <div>
        <Select
          id='country'
          label='country'
          name='country'
          options={getCountries()}
          value={values?.country}
          onChange={async function change(option: Options) {
            await setValues({ country: option }, false);
          }}
        />
      </div>
    </div>
  );
}

export default AddressForm;
