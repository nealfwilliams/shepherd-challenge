
import React from "react";
import { Field, FieldHookConfig } from "formik";
import MuiSelect from '@mui/material/NativeSelect';

import { ApplicationSpecSelectField } from "@/types";
import { FieldWrapper } from "./FieldWrapper";
import { Row } from "../base/Row";

export const SelectField: React.FC<{
  fieldSpec: ApplicationSpecSelectField,
  path: string[]
}> = ({ fieldSpec, path }) => {
  return (
    <FieldWrapper fieldSpec={fieldSpec} path={path}>
      {({ field }) => (
        <Row mt={1}>
          <MuiSelect {...field} variant="outlined">
            {fieldSpec.options.map(option => (
              <option value={option}>
                {option}
              </option>
            ))}
          </MuiSelect>
        </Row>
      )}
    </FieldWrapper>
  )
};