import * as yup from 'yup';

export const UpdateValidation = yup.object().shape({
  endDate: yup.date().min(new Date(), "End Date can't be in the past"),
  percent: yup
    .number()
    .max(100, "The discount percent can't exceed 100")
    .min(0, "Discount Can't be Negative")
});
