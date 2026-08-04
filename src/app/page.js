'use client';

import { useState } from 'react';
import IntroReveal from '@/components/IntroReveal';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SelectedWorks from '@/components/SelectedWorks';
import Certifications from '@/components/Certifications';
import EducationHistory from '@/components/EducationHistory';
import TechStackTable from '@/components/TechStackTable';
import Experiences from '@/components/Experiences';
import SkillsMarquee from '@/components/SkillsMarquee';
import BackpackerJourney from '@/components/BackpackerJourney';

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
            name="Yazid Denny Troya"
            avatarSrc="/images/subject-portrait.jpg"
            githubUrl="https://github.com/yaaazid/portofolio"
            email="yazid234g@gmail.com"
          />
          <Header city="Bekasi, ID" />
          <Hero />
          <SelectedWorks />
          <Certifications />
          <EducationHistory />
          <TechStackTable />
          <Experiences />
          <SkillsMarquee />
          <BackpackerJourney />
        </>
      )}
    </>
  );
}