import patients from '../../data/patients';
import {
  Patient,
  NonSensitivePatient,
  NewPatientEntry,
  NewEntry,
} from '../types';

import { v1 as uuid } from 'uuid';

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((d) => d.id === id);
  return entry;
};

const addEntry = (entry: NewEntry, patient: Patient): Patient => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);
  return patient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry,
};
