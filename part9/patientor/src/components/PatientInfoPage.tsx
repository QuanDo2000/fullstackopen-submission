import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Box, Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { Patient } from '../types';

const PatientInfoPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    axios
      .get<Patient>(`http://localhost:3001/api/patients/${id}`)
      .then((res) => {
        console.log(res.data);
        setPatient(res.data);
      });
  }, [id]);

  if (!patient) {
    return <div>loading...</div>;
  }

  return (
    <div className="App">
      <Box>
        <Typography variant="h4">
          {patient.name}{' '}
          {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
        </Typography>
        <Typography>ssn: {patient.ssn}</Typography>
        <Typography>occupation: {patient.occupation}</Typography>
      </Box>
    </div>
  );
};

export default PatientInfoPage;
