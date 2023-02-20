import React from 'react';
import { ApplicationSpecField } from "@/types";

type ChildFn = (params: {
  fieldName: string;
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

  // TO-DO fill this out 
  const validate = () => {}

  return (
    <div>
      <label>{fieldSpec.label}</label>
      {children({
        fieldName,
        validate
      })}
    </div>
  )
};