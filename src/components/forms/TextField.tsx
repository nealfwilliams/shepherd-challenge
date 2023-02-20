import React from "react";
import { ApplicationSpecNumberField, ApplicationSpecTextField, ApplicationSpecUrlField } from "@/types";
import { FieldWrapper } from "./FieldWrapper";
import MuiTextField from '@mui/material/TextField';

export enum TEXT_FIELD_TYPE {
  TEXT='text',
  NUMBER='number',
  URL='url',
};

export const TextField: React.FC<{
  fieldSpec: ApplicationSpecTextField | ApplicationSpecNumberField | ApplicationSpecUrlField,
  path: string[];
  type: TEXT_FIELD_TYPE
}> = ({ fieldSpec, path, type }) => {
  return (
    <FieldWrapper fieldSpec={fieldSpec} path={path}>
      {({ validate, field }) => (
        <div>
          <MuiTextField {...field} type={type}></MuiTextField>
        </div>
      )}
    </FieldWrapper>
  )
};