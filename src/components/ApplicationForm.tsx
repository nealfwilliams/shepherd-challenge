import React from 'react';
import { Field, Formik } from 'formik';
import { Application, ApplicationSpec, ApplicationSpecField, APPLICATION_COMPONENT } from '@/types';

const ApplicationFormField: React.FC<{
  field: ApplicationSpecField,
  path?: string[];
}> = ({ field, path=[] }) => {
  if (field.component === APPLICATION_COMPONENT.SECTION) {
    return (
      <div role="group">
        <div role="heading" aria-level={1 + path.length}>
          {field.title}
        </div>

        {field.fields.map(childField => (
          <ApplicationFormField path={path.concat([field.name])} field={childField} key={field.name} />
        ))}

      </div>
    );
  } else {
    const fieldName = path.concat([ field.name ]).join('__')

    return (
      <div>{fieldName}</div>
    )
  }
}

export const ApplicationForm: React.FC<{
  application: Application
}> = ({ application }) => {
  const applicationSpec = application.type.spec as ApplicationSpec;

  return (
    <Formik
      initialValues={application.fields as any} 
      onSubmit={() => {}}
    >
      <>
        {applicationSpec.map((field) => (
          <ApplicationFormField field={field} />
        ))}
      </>
    </Formik>
  )
};