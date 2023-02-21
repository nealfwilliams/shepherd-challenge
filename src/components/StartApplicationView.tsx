import React, { useState } from 'react'
import { post } from '@/utils';
import { useRouter } from 'next/router'
import BusinessIcon from '@mui/icons-material/Business';
import CarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';

import { ApplicationType } from '@/types';
import styled from '../styled';
import { Row } from './base/Row';
import { Column } from './base/Column';

const StartApplicationButton = styled(Column, {
  props: {
    h: '200px',
    w: '200px',
    m: 4,
    p: 4,
    border: true,
    borderColor: 'textLight',
    borderRadius: 2,
    bg: 'faint',
    clickable: true,
    centered: true,
    color: 'textMedium',
    font: 'controlSmall'
  },
});

const IconRow = styled(Row, {
  styles: {
    fontSize: '60px',
  },
  props: {
    mb: 4
  }
})

// In practice, the icon would need to come from api
const getIcon = (applicationType: ApplicationType) => {
  if (applicationType.label === 'Company application') {
    return BusinessIcon;
  } else if (applicationType.label === 'Auto application') {
    return CarIcon;
  }
  return PersonIcon;
}

export const StartApplicationView: React.FC<{
  applicationTypes: ApplicationType[]
}> = ({ applicationTypes }) => {
  const router = useRouter();
  const [inProgress, setProgress] = useState(false);

  if (inProgress) {
    // TO-DO add spinner
    return <div>Loading...</div>;
  }

  const startApplication = async (typeId: number) => {
    setProgress(true);
    const response = await post('/api/applications', { typeId });

    if (response.id) {
      router.push(`/applications/${response.id}`);
    }

    // TO-DO handle error
  };

  return (
    <Column h="100vh" centered>
      <Row
        font="headingLarge"
        aria-level={1}
      >
        Start New Application
      </Row>

      <Row mt={2}>
        {applicationTypes.map(applicationType => {
          const Icon = getIcon(applicationType);

          return (
            <StartApplicationButton
              role="button"
              tabIndex={0}
              onClick={() => startApplication(applicationType.id)}
            >
              <IconRow>
                <Icon fontSize="inherit" />
              </IconRow>
              {applicationType.label}
            </StartApplicationButton>
          );
        })}
      </Row>
    </Column>
  );
};