import * as yup from 'yup';

export const advancedSchema = yup.object().shape({
  endDate: yup
    .date()
    .min(new Date(), "End Date can't be in the past")
    .required('Required'),
  percent: yup
    .number()
    .max(100, "The discount percent can't exceed 100")
    .min(1, 'Discount Cant be less than 1%')
    .required('Required')
});
