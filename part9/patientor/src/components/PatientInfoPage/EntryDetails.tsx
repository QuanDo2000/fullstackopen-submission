import { Diagnosis, Entry } from '../../types';

import { Box, List, ListItem, Typography } from '@mui/material';
import {
  HealthAndSafety,
  LocalHospital,
  MedicalServices,
} from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const EntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[];
}) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <Box
          key={entry.id}
          style={{
            border: '1px solid black',
            padding: '0.5em',
            marginBottom: '0.5em',
          }}
        >
          <Typography>
            {entry.date}
            <LocalHospital />
          </Typography>
          <Box
            style={{
              padding: '0.5em',
            }}
          >
            <Typography>
              <em>{entry.description}</em>
              <br />
              diagnose by {entry.specialist}
              <br />
              discharge date: {entry.discharge.date}
              <br />
              discharge criteria: {entry.discharge.criteria}
            </Typography>
          </Box>
          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
            <>
              <Typography variant="h6">Diagnoses</Typography>
              <List>
                {entry.diagnosisCodes.map((code) => (
                  <ListItem key={code}>
                    {code} {diagnoses.find((d) => d.code === code)?.name}
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      );
    case 'OccupationalHealthcare':
      return (
        <Box
          key={entry.id}
          style={{
            border: '1px solid black',
            padding: '0.5em',
            marginBottom: '0.5em',
          }}
        >
          <Typography>
            {entry.date}
            <MedicalServices />
          </Typography>
          <Box
            style={{
              padding: '0.5em',
            }}
          >
            <Typography>
              <em>{entry.description}</em>
              <br />
              diagnose by {entry.specialist}
              <br />
              employer: {entry.employerName}
              <br />
              {entry.sickLeave && (
                <>
                  sick leave start: {entry.sickLeave.startDate}
                  <br />
                  sick leave end: {entry.sickLeave.endDate}
                </>
              )}
            </Typography>
          </Box>
          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
            <>
              <Typography variant="h6">Diagnoses</Typography>
              <List>
                {entry.diagnosisCodes.map((code) => (
                  <ListItem key={code}>
                    {code} {diagnoses.find((d) => d.code === code)?.name}
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      );
    case 'HealthCheck':
      return (
        <Box
          key={entry.id}
          style={{
            border: '1px solid black',
            padding: '0.5em',
            marginBottom: '0.5em',
          }}
        >
          <Typography>
            {entry.date}
            <HealthAndSafety />
          </Typography>
          <Box
            style={{
              padding: '0.5em',
            }}
          >
            <Typography>
              <em>{entry.description}</em>
              <br />
              diagnose by {entry.specialist}
              <br />
              {entry.healthCheckRating === 0 ? (
                <FavoriteIcon color="success" />
              ) : entry.healthCheckRating === 1 ? (
                <FavoriteIcon
                  sx={{
                    color: 'yellow',
                  }}
                />
              ) : entry.healthCheckRating === 2 ? (
                <FavoriteIcon color="warning" />
              ) : (
                <FavoriteIcon
                  sx={{
                    color: 'red',
                  }}
                />
              )}
            </Typography>
          </Box>
          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
            <>
              <Typography variant="h6">Diagnoses</Typography>
              <List>
                {entry.diagnosisCodes.map((code) => (
                  <ListItem key={code}>
                    {code} {diagnoses.find((d) => d.code === code)?.name}
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      );
    default:
      return null;
  }
};

export default EntryDetails;
