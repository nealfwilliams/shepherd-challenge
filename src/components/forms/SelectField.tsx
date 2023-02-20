
import React from "react";
import { Field, FieldHookConfig } from "formik";
import MuiSelect from '@mui/material/NativeSelect';

import { ApplicationSpecSelectField } from "@/types";
import { FieldWrapper } from "./FieldWrapper";

export const SelectField: React.FC<{
  fieldSpec: ApplicationSpecSelectField,
  path: string[]
}> = ({ fieldSpec, path }) => {
  return (
    <FieldWrapper fieldSpec={fieldSpec} path={path}>
      {({ validate, field }) => (
        <div>
          <MuiSelect {...field}>
            {fieldSpec.options.map(option => (
              <option value={option}>
                {option}
              </option>
            ))}
          </MuiSelect>
        </div>
      )}
    </FieldWrapper>
  )
};