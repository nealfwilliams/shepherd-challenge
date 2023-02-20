import React from 'react';
import { Field, Formik } from 'formik';
import { Application, ApplicationSpec, ApplicationSpecComponent, APPLICATION_COMPONENT } from '@/types';

const ApplicationFormComponent: React.FC<{
  component: ApplicationSpecComponent,
  path?: string[];
}> = ({ component, path=[] }) => {
  if (component.component === APPLICATION_COMPONENT.SECTION) {
    return (
      <div role="group">
        <div role="heading" aria-level={1 + path.length}>
          {component.title}
        </div>

        {component.fields.map(childComponent => (
          <ApplicationFormComponent
            path={path.concat([component.name])}
            component={childComponent}
            key={component.name}
          />
        ))}

      </div>
    );
  } else {
    const fieldName = path.concat([ component.name ]).join('__')

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
        {applicationSpec.map((component) => (
          <ApplicationFormComponent component={component} key={component.name} />
        ))}
      </>
    </Formik>
  )
};