'use client';

import { useState } from 'react';
import IntroReveal from '@/components/IntroReveal';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SelectedWorks from '@/components/SelectedWorks';
import Certifications from '@/components/Certifications';

export default function Page() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && (
        <IntroReveal
          onComplete={() => setIntroDone(true)}
          subjectSrc="/images/subject-portrait.jpg"
        />
      )}
      {introDone && (
        <>
          <Navbar
            name="Nama Kamu"
            avatarSrc="/images/subject-portrait.jpg"
            githubUrl="https://github.com/username-kamu"
            email="email-kamu@gmail.com"
          />
          <Header />
          <Hero />
          <SelectedWorks />
          <Certifications />
        </>
      )}
    </>
  );
}