'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

// Tahun dihitung di browser, jadi tidak basi walau situs tidak di-deploy ulang tiap tahun.
// Snapshot server memakai tahun saat build supaya HTML awal tetap berisi tahun yang masuk akal.
const getYear = () => String(new Date().getFullYear());

export default function CurrentYear() {
  return useSyncExternalStore(subscribe, getYear, getYear);
}
