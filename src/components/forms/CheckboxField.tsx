import React from "react";
import { ApplicationSpecCheckboxField } from "@/types";
import { FieldWrapper } from "./FieldWrapper";
import MuiCheckbox from '@mui/material/Checkbox';

export const CheckboxField: React.FC<{
  fieldSpec: ApplicationSpecCheckboxField,
  path: string[];
}> = ({ fieldSpec, path }) => {
  return (
    <FieldWrapper fieldSpec={fieldSpec} path={path}>
      {({ validate, field, helpers }) => (
        <MuiCheckbox
          {...field}
          onChange={(e) => {
            helpers.setValue(e.target.checked);
          }}
          checked={field.value === true}
        />
      )}
    </FieldWrapper>
  )
};