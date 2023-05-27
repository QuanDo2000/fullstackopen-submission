import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { Diagnosis, NewEntry } from '../../types';

interface Props {
  onSubmit: (entry: NewEntry) => void;
  onClose: () => void;
  showNotification: (message: string) => void;
  diagnoses: Diagnosis[];
}

const spacingStyle = {
  marginBottom: '1em',
};

const OccupationalHealthcareForm = ({
  onSubmit,
  onClose,
  showNotification,
  diagnoses,
}: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  const handleReset = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes([]);
    setEmployerName('');
    setSickLeaveStartDate('');
    setSickLeaveEndDate('');
  };

  const handleDiagnosisCodeChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (sickLeaveStartDate === '' && sickLeaveEndDate === '') {
      onSubmit({
        type: 'OccupationalHealthcare',
        description,
        date,
        specialist,
        diagnosisCodes,
        employerName,
      });
    } else if (sickLeaveStartDate !== '' && sickLeaveEndDate !== '') {
      onSubmit({
        type: 'OccupationalHealthcare',
        description,
        date,
        specialist,
        diagnosisCodes,
        employerName,
        sickLeave: {
          startDate: sickLeaveStartDate,
          endDate: sickLeaveEndDate,
        },
      });
    } else {
      showNotification('Please fill in both sick leave dates');
    }
  };

  return (
    <Box>
      <Typography
        variant="h5"
        style={{
          marginBottom: '0.5em',
        }}
      >
        New HealthCheck Entry
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Description"
          fullWidth
          required
          style={spacingStyle}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          fullWidth
          required
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          style={spacingStyle}
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          required
          style={spacingStyle}
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <Box sx={spacingStyle}>
          <FormControl
            sx={{
              width: '100%',
            }}
          >
            <InputLabel id="dianosis-code-label">DiagnosisCodes</InputLabel>
            <Select
              labelId="dianosis-code-label"
              multiple
              value={diagnosisCodes}
              input={<OutlinedInput label="DiagnosisCodes" />}
              onChange={handleDiagnosisCodeChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 224,
                  },
                },
              }}
            >
              {diagnoses.map((diagnosis) => (
                <MenuItem key={diagnosis.code} value={diagnosis.code}>
                  {diagnosis.code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <TextField
          label="EmployerName"
          fullWidth
          required
          style={spacingStyle}
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <TextField
          label="SickLeaveStartDate"
          fullWidth
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          style={spacingStyle}
          value={sickLeaveStartDate}
          onChange={({ target }) => setSickLeaveStartDate(target.value)}
        />
        <TextField
          label="SickLeaveEndDate"
          fullWidth
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          style={spacingStyle}
          value={sickLeaveEndDate}
          onChange={({ target }) => setSickLeaveEndDate(target.value)}
        />
        <Button
          variant="contained"
          type="submit"
          style={{
            marginRight: '1em',
          }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          type="button"
          onClick={handleReset}
          style={{
            marginRight: '1em',
          }}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          type="button"
          color="error"
          onClick={onClose}
        >
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default OccupationalHealthcareForm;
