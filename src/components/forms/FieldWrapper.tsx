import React from 'react';
import { ApplicationSpecField } from "@/types";
import { FieldHelperProps, FieldInputProps, FieldMetaProps, useField } from 'formik';
import Alert from '@mui/material/Alert';

type ChildFn = (params: {
  fieldName: string;
  field: FieldInputProps<any>,
  meta: FieldMetaProps<any>
  helpers: FieldHelperProps<any>,
}) => React.ReactElement;

export const FieldWrapper: React.FC<{
  fieldSpec: ApplicationSpecField,
  path: string[],
  children: ChildFn 
}> = ({
  fieldSpec,
  path,
  children
}) => {
  const fieldName = path.concat([ fieldSpec.name ]).join('__')
  const [field, meta, helpers] = useField({
    name: fieldName,
    validate: () => {
      for (const validation of fieldSpec.validate || []) {
        if (validation.type === 'required' && ['', null, undefined].includes(field.value)) {
          return 'This field is required';
        }

        if (validation.type === 'min' && field.value < validation.value) {
          return `The field value must be greater than ${0}`;
        }
      }
    }
  });

  return (
    <div>
      <label>{fieldSpec.label}</label>
      {children({
        fieldName,
        field,
        meta,
        helpers,
      })}
      {meta.touched && meta.error && (
        <Alert severity="error">{meta.error}</Alert>
      )}
    </div>
  )
};