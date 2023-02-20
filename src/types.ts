import { Prisma } from "@prisma/client";

export type Application = Prisma.ApplicationGetPayload<{
  include: {
    type: true
  }
}>;

export type ApplicationType = Prisma.ApplicationTypeGetPayload<{}>

export enum APPLICATION_COMPONENT {
  SECTION='section',
  TEXT='text',
  NUMBER='number',
  SELECT='select',
  CHECKBOX='checkbox'
}

export type ApplicationSpecSection = {
  component: APPLICATION_COMPONENT.SECTION;
  title: string;
  description: string;
  name: string;
  fields: ApplicationSpecComponent[]
};

// TO-DO break this up into separate types so min only can be applied to number
export type ApplicationFieldValidation = {
  type: 'required'
} | {
  type: 'min',
  value: number 
}

export type ApplicationSpecTextField = {
  component: APPLICATION_COMPONENT.TEXT;
  name: string;
  label: string;
  validations?: ApplicationFieldValidation[]
};

export type ApplicationSpecNumberField = {
  component: APPLICATION_COMPONENT.NUMBER;
  name: string;
  label: string;
  validations?: ApplicationFieldValidation[]
};

export type ApplicationSpecCheckboxField = {
  component: APPLICATION_COMPONENT.CHECKBOX;
  name: string;
  label: string;
  validations?: ApplicationFieldValidation[]
};

export type ApplicationSpecSelectField = {
  component: APPLICATION_COMPONENT.SELECT;
  name: string;
  label: string;
  options: string[];
  validations?: ApplicationFieldValidation[];
};

export type ApplicationSpecComponent = 
  | ApplicationFormField
  | ApplicationSpecSection

export type ApplicationFormField = 
  | ApplicationSpecTextField
  | ApplicationSpecNumberField
  | ApplicationSpecSelectField

export type ApplicationSpec = ApplicationSpecComponent[];