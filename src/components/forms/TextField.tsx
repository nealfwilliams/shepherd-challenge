import { ApplicationSpecTextField } from "@/types";
import { Field } from "formik";
import React from "react";
import { FieldWrapper } from "./FieldWrapper";

export const TextField: React.FC<{
  fieldSpec: ApplicationSpecTextField,
  path: string[]
}> = ({ fieldSpec, path }) => {
  return (
    <FieldWrapper fieldSpec={fieldSpec} path={path}>
      {({ fieldName, validate }) => (
        <Field
          name={fieldName}
          validate={validate}
          component="input"
        />
      )}
    </FieldWrapper>
  )
};