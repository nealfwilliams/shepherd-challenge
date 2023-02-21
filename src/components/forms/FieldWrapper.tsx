import React from 'react';
import { ApplicationSpecField } from "@/types";
import { FieldHelperProps, FieldInputProps, FieldMetaProps, useField } from 'formik';
import Alert from '@mui/material/Alert';
import { FIELD_PATH_DELIMITER } from '@/constants';
import { Row } from '../base/Row';
import styled from '@/styled';
import { Column } from '../base/Column';

type ChildFn = (params: {
  fieldName: string;
  field: FieldInputProps<any>,
  meta: FieldMetaProps<any>
  helpers: FieldHelperProps<any>,
}) => React.ReactElement;

const Label = styled('label', {
  props: {
    font: 'labelSmall',
  }
})

const FieldContainer = styled('div', {
  props: {
    mt: 2
  }
});

export const FieldWrapper: React.FC<{
  fieldSpec: ApplicationSpecField,
  path: string[],
  children: ChildFn 
}> = ({
  fieldSpec,
  path,
  children
}) => {
  const fieldName = path.concat([ fieldSpec.name ]).join(FIELD_PATH_DELIMITER)
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
    <FieldContainer>
      <Label>
        {fieldSpec.label}
      </Label>
      {children({
        fieldName,
        field,
        meta,
        helpers,
      })}
      {meta.touched && meta.error && (
        <Row mt={1}>
          <Alert severity="error">{meta.error}</Alert>
        </Row>
      )}
    </FieldContainer>
  )
};