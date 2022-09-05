

import NumberFormat from 'react-number-format';

import { useField , useFormikContext} from 'formik';
import { TextField } from '@mui/material';

 const FormattedInput= ({ name,
  value,
  ...otherProps}:any)=> {
  const [field, mata] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (event:any) => {
    setFieldValue(name,event.target.value);
  };
  const configTextfield:any = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
  };
  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }
  return (
    <NumberFormat
      {...configTextfield}
      onChange={handleChange}
      customInput={TextField}
      value={value}
      format="###-##-####"
      mask="#"
    />
  );
}

export default FormattedInput;