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
  diagnoses: Diagnosis[];
}

const spacingStyle = {
  marginBottom: '1em',
};

const HospitalForm = ({ onSubmit, onClose, diagnoses }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const handleReset = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes([]);
    setDischargeDate('');
    setDischargeCriteria('');
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: 'Hospital',
      description,
      date,
      specialist,
      diagnosisCodes,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
    });
  };

  const handleDiagnosisCodeChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
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
          label="DischargeDate"
          fullWidth
          required
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          style={spacingStyle}
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
        />
        <TextField
          label="DischargeCriteria"
          fullWidth
          required
          style={spacingStyle}
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
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

export default HospitalForm;
