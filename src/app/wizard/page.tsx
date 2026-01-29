"use client";

import { JSX } from 'react';
import Wizard from '../../components/wizard/Wizard';

export default function WizardPage(): JSX.Element {
  
  return (
    <main className="min-h-screen p-8">
      <Wizard />
    </main>
  );
}
