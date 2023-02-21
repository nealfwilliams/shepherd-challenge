import React from "react";
import { ApplicationSpecNumberField, ApplicationSpecTextField, ApplicationSpecUrlField } from "@/types";
import { FieldWrapper } from "./FieldWrapper";
import MuiTextField from '@mui/material/TextField';
import { Row } from "../base/Row";

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
      {({ field, helpers }) => (
        <Row mt={1}>
          <MuiTextField
            {...field}
            size="small"
            style={{
              width: type === TEXT_FIELD_TYPE.NUMBER ? '150px' : '100%'
            }}
            type={type}
            onChange={type !== TEXT_FIELD_TYPE.NUMBER ? field.onChange : (e) => {
              helpers.setValue(e.target.value ? Number(e.target.value) : undefined);
            }}
          />
        </Row>
      )}
    </FieldWrapper>
  )
};