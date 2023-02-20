import { ApplicationSpecSelectField } from "@/types";
import { Field } from "formik";
import React from "react";
import { FieldWrapper } from "./FieldWrapper";

export const SelectField: React.FC<{
  fieldSpec: ApplicationSpecSelectField,
  path: string[]
}> = ({ fieldSpec, path }) => {
  return (
    <FieldWrapper fieldSpec={fieldSpec} path={path}>
      {({ fieldName, validate }) => (
        <Field
          name={fieldName}
          validate={validate}
          component="select"
        >
          {fieldSpec.options.map(option => (
            <option value={option}>
              {option}
            </option>
          ))}
        </Field>
      )}
    </FieldWrapper>
  )
};