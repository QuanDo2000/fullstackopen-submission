import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { NewEntry, Diagnosis } from '../../types';

interface Props {
  onSubmit: (entry: NewEntry) => void;
  onClose: () => void;
  diagnoses: Diagnosis[];
}

const spacingStyle = {
  marginBottom: '1em',
};

const HealthCheckForm = ({ onSubmit, onClose, diagnoses }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const handleReset = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthCheckRating('');
    setDiagnosisCodes([]);
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
    onSubmit({
      type: 'HealthCheck',
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating),
      diagnosisCodes,
    });
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
        <Box
          sx={{
            marginBottom: '0.5em',
          }}
        >
          <FormLabel>HealthCheckRating</FormLabel>
          <RadioGroup
            row
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(target.value)}
          >
            <FormControlLabel value="0" control={<Radio />} label="Healthy" />
            <FormControlLabel value="1" control={<Radio />} label="LowRisk" />
            <FormControlLabel value="2" control={<Radio />} label="HighRisk" />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label="CriticalRisk"
            />
          </RadioGroup>
        </Box>
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

export default HealthCheckForm;
