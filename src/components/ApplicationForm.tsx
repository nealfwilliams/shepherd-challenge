import React from 'react';
import { Field, Formik } from 'formik';
import { Application, ApplicationSpec, ApplicationSpecComponent, APPLICATION_COMPONENT } from '@/types';
import { TextField, TEXT_FIELD_TYPE } from './forms/TextField';
import { SelectField } from './forms/SelectField';
import Button from '@mui/material/Button';
import { patch } from '@/utils';
import { NOTICE_TYPE, useNotice } from './Notice';
import { CheckboxField } from './forms/CheckboxField';
import { FIELD_PATH_DELIMITER } from '@/constants';
import { Row } from './base/Row';
import { Column } from './base/Column';

const ApplicationFormComponent: React.FC<{
  component: ApplicationSpecComponent,
  path?: string[];
}> = ({ component, path=[] }) => {
  if (component.component === APPLICATION_COMPONENT.SECTION) {
    return (
      <Column role="group" mt={6}>
        <Row role="heading" aria-level={1 + path.length} font="headingMedium">
          {component.title}
        </Row>

        <Column ml={4}>
          {component.fields.map(childComponent => (
            <ApplicationFormComponent
              path={path.concat([component.name])}
              component={childComponent}
              key={childComponent.name}
            />
          ))}
        </Column>
      </Column>
    );
  } else {
    if (component.component === APPLICATION_COMPONENT.SELECT) {
      return <SelectField fieldSpec={component} path={path}/>
    }

    if (component.component === APPLICATION_COMPONENT.TEXT) {
      return <TextField fieldSpec={component} path={path} type={TEXT_FIELD_TYPE.TEXT}/>
    }

    if (component.component === APPLICATION_COMPONENT.NUMBER) {
      return <TextField fieldSpec={component} path={path} type={TEXT_FIELD_TYPE.NUMBER}/>
    }

    if (component.component === APPLICATION_COMPONENT.URL) {
      return <TextField fieldSpec={component} path={path} type={TEXT_FIELD_TYPE.URL}/>
    }

    if (component.component === APPLICATION_COMPONENT.CHECKBOX) {
      return <CheckboxField fieldSpec={component} path={path} />
    }

    return null 
  }
}

const getEmptyFormValues = (spec: ApplicationSpec) => {
  const initialValues: {[s: string]: undefined} = {}

  const setInitialValue = (component: ApplicationSpecComponent, path: string[]) => {
    if (component.component === APPLICATION_COMPONENT.SECTION) {
      component.fields.forEach((subcomponent) => {
        setInitialValue(subcomponent, path.concat([component.name]));
      })
    } else {
      const fieldName = path.concat([component.name]).join(FIELD_PATH_DELIMITER);
      initialValues[fieldName] = undefined;
    }
  }

  spec.forEach((component) => {
    setInitialValue(component, []);
  })

  return initialValues;
}

export const ApplicationForm: React.FC<{
  application: Application
}> = ({ application }) => {
  const {open: openNotice} = useNotice();

  const applicationSpec = application.type.spec as ApplicationSpec;
  const submitUrl = `/api/applications/${application.id}`

  return (
    <Column mt={8} w="600px">
      <Formik
        initialValues={{
          ...(getEmptyFormValues(applicationSpec)),
          ...application.fields as any
        }}
        onSubmit={async (values, helpers) => {
          const result = await patch(submitUrl, {
            fields: values
          })

          if (result.success) {
            openNotice({
              message: 'Application saved successfully',
              type: NOTICE_TYPE.SUCCESS
            });
          } else {
            openNotice({
              message: 'Something went wrong! Try again later.',
              type: NOTICE_TYPE.ERROR
            });
          }
        }}
      >
        {(props) => (
          <>
            {applicationSpec.map((component) => (
              <ApplicationFormComponent component={component} key={component.name} />
            ))}

            {/*
              I am aware this doesn't follow typical form semantics
              I can explain why I choose this approach in more detail
            */}
            <Row w="100%" centered mt={6}>
              <Button
                onClick={() => {
                  if (props.errors) {
                    openNotice({
                      message: 'There are some issues with your application',
                      type: NOTICE_TYPE.ERROR
                    });
                  }

                  props.submitForm();
                }}
                variant="contained"
              >
                Save Application
              </Button>
            </Row>
          </>
        )}
      </Formik>
    </Column>
  )
};