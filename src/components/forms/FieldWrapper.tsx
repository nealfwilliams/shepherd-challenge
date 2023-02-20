import React from 'react';
import { ApplicationSpecField } from "@/types";
import { FieldHelperProps, FieldInputProps, FieldMetaProps, useField } from 'formik';

type ChildFn = (params: {
  fieldName: string;
  field: FieldInputProps<any>,
  meta: FieldMetaProps<any>
  helpers: FieldHelperProps<any>,
  validate: () => void;
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
  const [field, meta, helpers] = useField(fieldName);

  // TO-DO fill this out 
  const validate = () => {}

  return (
    <div>
      <label>{fieldSpec.label}</label>
      {children({
        fieldName,
        field,
        meta,
        helpers,
        validate
      })}
    </div>
  )
};