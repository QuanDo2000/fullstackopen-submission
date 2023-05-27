import { useState } from 'react';
import { useParams } from 'react-router-dom';

import patientsService from '../../services/patients';

import HealthCheckForm from './HealthCheckForm';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Alert from '@mui/material/Alert';
import { Diagnosis, NewEntry, Patient } from '../../types';
import OccupationalHealthcareForm from './OccupationalHealthcareForm';
import HospitalForm from './HospitalForm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 1, border: '1px dotted' }}>{children}</Box>
      )}
    </div>
  );
}

const Notification = ({ message }: { message: string }) => {
  if (message === '') {
    return null;
  }
  return (
    <Alert
      severity="warning"
      sx={{
        marginBottom: '0.5em',
      }}
    >
      {message}
    </Alert>
  );
};

interface Props {
  setPatient: (patient: React.SetStateAction<Patient | undefined>) => void;
  diagnoses: Diagnosis[];
}

const EntryForm = ({ setPatient, diagnoses }: Props) => {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [notification, setNotification] = useState('');

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  const handleClose = () => {
    setValue(0);
  };

  const handleSubmit = (entry: NewEntry) => {
    if (!id) {
      showNotification('No patient id');
      return;
    }

    patientsService
      .addEntry(id, entry)
      .then((patient) => {
        setPatient(patient);
        handleClose();
      })
      .catch((error) => {
        showNotification(error.response.data);
      });
  };

  return (
    <Box sx={{ width: '100%', marginBottom: '0.5em' }}>
      <Notification message={notification} />
      <ButtonGroup
        variant="outlined"
        style={{
          marginBottom: '0.5em',
        }}
      >
        <Button onClick={() => setValue(1)}>HealthCheck</Button>
        <Button onClick={() => setValue(2)}>OccupationalHealthcare</Button>
        <Button onClick={() => setValue(3)}>Hospital</Button>
      </ButtonGroup>
      <TabPanel value={value} index={1}>
        <HealthCheckForm
          onSubmit={handleSubmit}
          onClose={handleClose}
          diagnoses={diagnoses}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <OccupationalHealthcareForm
          onSubmit={handleSubmit}
          onClose={handleClose}
          showNotification={showNotification}
          diagnoses={diagnoses}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <HospitalForm
          onSubmit={handleSubmit}
          onClose={handleClose}
          diagnoses={diagnoses}
        />
      </TabPanel>
    </Box>
  );
};

export default EntryForm;
