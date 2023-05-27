import {
  Diagnose,
  Discharge,
  Gender,
  NewEntry,
  NewPatientEntry,
  SickLeave,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnose['code']> => {
  if (!Array.isArray(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnosisCodes');
  }

  diagnosisCodes.forEach((code) => {
    if (!isString(code)) {
      throw new Error('Incorrect diagnosisCodes');
    }
  });

  return diagnosisCodes as Array<Diagnose['code']>;
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  if (typeof healthCheckRating !== 'number') {
    throw new Error('Incorrect or missing healthCheckRating');
  }

  if (healthCheckRating < 0 || healthCheckRating > 3) {
    throw new Error('Incorrect healthCheckRating');
  }

  return healthCheckRating;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== 'object') {
    throw new Error('Incorrect or missing sickLeave');
  }

  if ('startDate' in sickLeave && 'endDate' in sickLeave) {
    return {
      startDate: parseDate(sickLeave.startDate),
      endDate: parseDate(sickLeave.endDate),
    };
  }

  throw new Error('Incorrect sickLeave: some fields are missing');
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== 'object') {
    throw new Error('Incorrect or missing discharge');
  }

  if ('date' in discharge && 'criteria' in discharge) {
    return {
      date: parseDate(discharge.date),
      criteria: parseDescription(discharge.criteria),
    };
  }

  throw new Error('Incorrect discharge: some fields are missing');
};

const parseHealthCheckEntry = (entry: unknown): NewEntry => {
  if (!entry || typeof entry !== 'object') {
    throw new Error('Incorrect or missing entry');
  }

  if (
    'description' in entry &&
    'date' in entry &&
    'specialist' in entry &&
    'type' in entry &&
    'healthCheckRating' in entry
  ) {
    const newEntry: NewEntry = {
      description: parseDescription(entry.description),
      date: parseDate(entry.date),
      specialist: parseSpecialist(entry.specialist),
      type: 'HealthCheck',
      healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
    };

    if ('diagnosisCodes' in entry) {
      newEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
    }

    return newEntry;
  }

  throw new Error('Incorrect entry: some fields are missing');
};

const parseOccupationalHealthcareEntry = (entry: unknown): NewEntry => {
  if (!entry || typeof entry !== 'object') {
    throw new Error('Incorrect or missing entry');
  }

  if (
    'description' in entry &&
    'date' in entry &&
    'specialist' in entry &&
    'type' in entry &&
    'employerName' in entry
  ) {
    const newEntry: NewEntry = {
      description: parseDescription(entry.description),
      date: parseDate(entry.date),
      specialist: parseSpecialist(entry.specialist),
      type: 'OccupationalHealthcare',
      employerName: parseName(entry.employerName),
    };

    if ('diagnosisCodes' in entry) {
      newEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
    }

    if ('sickLeave' in entry) {
      newEntry.sickLeave = parseSickLeave(entry.sickLeave);
    }

    return newEntry;
  }

  throw new Error('Incorrect entry: some fields are missing');
};

const parseHospitalEntry = (entry: unknown): NewEntry => {
  if (!entry || typeof entry !== 'object') {
    throw new Error('Incorrect or missing entry');
  }

  if (
    'description' in entry &&
    'date' in entry &&
    'specialist' in entry &&
    'type' in entry &&
    'discharge' in entry
  ) {
    const newEntry: NewEntry = {
      description: parseDescription(entry.description),
      date: parseDate(entry.date),
      specialist: parseSpecialist(entry.specialist),
      type: 'Hospital',
      discharge: parseDischarge(entry.discharge),
    };

    if ('diagnosisCodes' in entry) {
      newEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
    }

    return newEntry;
  }

  throw new Error('Incorrect entry: some fields are missing');
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object &&
    'entries' in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export const toNewEntry = (entry: unknown): NewEntry => {
  if (!entry || typeof entry !== 'object') {
    throw new Error('Incorrect or missing entry');
  }

  if (
    'description' in entry &&
    'date' in entry &&
    'specialist' in entry &&
    'type' in entry
  ) {
    switch (entry.type) {
      case 'HealthCheck':
        return parseHealthCheckEntry(entry);
      case 'OccupationalHealthcare':
        return parseOccupationalHealthcareEntry(entry);
      case 'Hospital':
        return parseHospitalEntry(entry);
      default:
        throw new Error('Incorrect or missing entry type');
    }
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;
