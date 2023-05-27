import { Entry, Gender, NewPatientEntry } from './types';

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

const parseEntry = (entry: unknown): Entry => {
  if (!entry || typeof entry !== 'object') {
    throw new Error('Incorrect or missing entry');
  }

  return entry as Entry;

  // if (
  //   'type' in entry &&
  //   'date' in entry &&
  //   'specialist' in entry &&
  //   'diagnosisCodes' in entry &&
  //   'description' in entry
  // ) {
  //   const newEntry: Entry = {
  //     type: parseEntryType(entry.type),
  //     date: parseDate(entry.date),
  //     specialist: parseSpecialist(entry.specialist),
  //     diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
  //     description: parseDescription(entry.description),
  //   };

  //   return newEntry;
  // }

  throw new Error('Incorrect entry: some fields are missing');
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries) {
    return [];
  }
  if (!Array.isArray(entries)) {
    throw new Error('Incorrect or missing entries');
  }
  return entries.map((entry) => parseEntry(entry));
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
      entries: parseEntries(object.entries),
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;
