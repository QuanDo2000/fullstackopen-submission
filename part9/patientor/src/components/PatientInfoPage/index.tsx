import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientsService from '../../services/patients';
import diagnosesService from '../../services/diagnoses';

import { Box, Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { Diagnosis, Patient } from '../../types';

import EntryDetails from './EntryDetails';
import EntryForm from './EntryForm';

const PatientInfoPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    if (!id) {
      return;
    }
    patientsService.getOne(id).then((patient) => {
      setPatient(patient);
    });
  }, [id]);

  useEffect(() => {
    diagnosesService.getAll().then((diagnoses) => {
      setDiagnoses(diagnoses);
    });
  }, []);

  if (!patient) {
    return <div>loading...</div>;
  }

  return (
    <div className="App">
      <Box style={{ marginTop: '0.5em' }}>
        <Typography
          variant="h4"
          style={{
            marginBottom: '0.5em',
          }}
        >
          {patient.name}{' '}
          {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
        </Typography>
        <Box
          style={{
            marginBottom: '0.5em',
          }}
        >
          <Typography>ssn: {patient.ssn}</Typography>
          <Typography>occupation: {patient.occupation}</Typography>
        </Box>
        <EntryForm setPatient={setPatient} diagnoses={diagnoses} />
        {patient.entries && patient.entries.length > 0 && (
          <Box>
            <Typography
              variant="h5"
              style={{
                marginBottom: '0.5em',
              }}
            >
              entries
            </Typography>
            {patient.entries.map((entry) => (
              <EntryDetails
                key={entry.id}
                entry={entry}
                diagnoses={diagnoses}
              />
            ))}
          </Box>
        )}
      </Box>
    </div>
  );
};

export default PatientInfoPage;
