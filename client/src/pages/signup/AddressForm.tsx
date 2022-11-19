/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';

import { City, Country, State } from 'country-state-city';
import Select from 'react-select';
type Options = {
  readonly value: string;
  readonly label: string;
};

function getStates(isoCode: string) {
  alert(isoCode);
  const states = State.getStatesOfCountry(isoCode);
  console.log(states);
  return states?.map((state: { name: string; countryCode: string }) => ({
    label: state.name,
    value: state.countryCode
  }));
}

function getCitiesOfState(countryIsoCode: string, stateIsoCode: string) {
  return City.getCitiesOfState(countryIsoCode, stateIsoCode).map(city => ({
    label: city.name,
    value: city.name
  }));
}

function getCountries() {
  return Country.getAllCountries().map(country => ({
    label: country.name,
    value: country.isoCode
  }));
}

function AddressForm() {
  let updatedCities: Options[] = [];
  let updatedStates: Options[] = [];
  const formik = useFormik({
    initialValues: {
      country: 'Canada',
      state: '',
      city: ''
    },
    validationSchema: Yup.object({
      country: Yup.string().required('Country is Required'),
      state: Yup.string().required('State is Required'),
      city: Yup.string().required('City is Required')
    }),
    onSubmit: (values, actions) => {
      alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    }
  });

  const { values, setFieldValue, setValues } = formik;

  useEffect(() => {
    const countryVal = values?.country ? values?.country?.value : null;
    if (!countryVal) return;
    updatedStates = getStates(countryVal);

    const stateVal = values?.state ? values?.state?.value : null;
    if (!stateVal) return;
    updatedCities = getCitiesOfState(countryVal, stateVal);
  }, [values]);

  return (
    <div>
      <div>
        <Select
          id='country'
          label='country'
          name='country'
          options={getCountries()}
          value={values.country}
          onChange={async function change(value: string) {
            await setValues({ country: value, state: '', city: '' }, false);
            console.log(value);
          }}
        />
        <Select
          id='state'
          name='state'
          options={updatedStates ?? []}
          value={values?.state}
          onChange={async function change(value: string) {
            await setValues({ state: value, city: '' }, false);
          }}
        />
        <Select
          id='city'
          name='city'
          options={updatedCities ?? []}
          value={values.city}
          onChange={async function change(value) {
            await setFieldValue('city', value);
          }}
        />
      </div>
    </div>
  );
}

export default AddressForm;
