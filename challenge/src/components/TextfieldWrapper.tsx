import { useField } from 'formik';
import { TextField } from '@mui/material';

const TextfieldWrapper = ({
  name,
  value,
  ...otherProps
}:any) => {
  const [field, mata] = useField(name);
  const configTextfield = {
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
    <TextField {...configTextfield}  value={value} />
  );
};

export default TextfieldWrapper;