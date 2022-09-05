import { Alert, Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import FormattedInput from "./FormattedInput";
import TextfieldWrapper from "./TextfieldWrapper";
import * as Yup from "yup";
import { saveUser } from "../service/service";
import { useStatePage } from "../hooks/StateProvider";
import { useRef, useState } from "react";
const FormUser = () => {
  const { token, rows, setRows } = useStatePage();
  const [error, setError] = useState(false);
  const [ok, setOK]= useState(false);
  const formikRef: any = useRef();
  const INITIAL_FORM_STATE = {
    lastName: "",
    firstName: "",
    address: "",
    ssn: "",
  };
  const FORM_VALIDATION = Yup.object().shape({
    lastName: Yup.string().trim().required("required").min(2),
    firstName: Yup.string().trim().required("required").min(2),
    address: Yup.string().trim().required("required").min(2),
    ssn: Yup.string()
      .required("required")
      .test((value): any => {
        const found = rows.find((user) => user.ssn === value);
        return !found;
      })
      .test((value): any => {
        return value && !value.includes("#");
      })
      .min(11)
      
  });
  const resetForm = () => {
    formikRef.current?.resetForm();
  };

  const submitHandler = async(values:any)=>{
   
    const resp = await saveUser(token, values);
    if (resp===200) {
      const auxRows = rows.concat([values]);
      setRows(auxRows);
      setOK(true)
      resetForm();
    }else{
      setError(true)
    }
    
  }
  return (
    <Formik
      initialValues={Object.assign({}, INITIAL_FORM_STATE)}
      validationSchema={FORM_VALIDATION}
      innerRef={formikRef}
      enableReinitialize={true}
      onSubmit={(values: any) => {
        submitHandler(values);
      }}
    >
      {({ values,isValid }: any) => (
        <Form>
          <TextfieldWrapper
            fullWidth
            name="firstName"
            label="First Name"
            value={values.firstName}
            sx={{ mb: 2, mt: 2 }}
          />
          <TextfieldWrapper
            fullWidth
            name="lastName"
            label="Last Name"
            value={values.lastName}
            sx={{ mb: 2 }}
          />
          <TextfieldWrapper
            fullWidth
            name="address"
            label="Address"
            value={values.address}
            sx={{ mb: 2 }}
          />
          <FormattedInput name="ssn" label="SSN" value={values.ssn} />
          <Box sx={{ mt: 2 }}>
            <Button
              type="reset"
              onClick={resetForm}
              variant="contained"
              sx={{ mr: 2 }}
            >
              Reset{" "}
            </Button>
            <Button type="submit" variant="contained" disabled={!isValid}>
              Submit{" "}
            </Button>
          </Box>
          {ok&&<Alert severity="success" onClose={() => {setOK(false)}}>The user was saved </Alert>}
          {error&&<Alert severity="error" onClose={() => {setError(false)}}>Something went wrong</Alert>}
        </Form>
      )}
      
    </Formik>
  );
};
export default FormUser;
