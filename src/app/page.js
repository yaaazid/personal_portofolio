import IntroGate from '@/components/IntroGate';
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
import VerticalPhotoScroll from '@/components/VerticalPhotoScroll';
import Footer from '@/components/Footer';
import { profile, works, techStack } from '@/lib/constants';
import { TECH_ICONS, TECH_BRAND_COLORS } from '@/lib/techIcons';

const PORTRAIT = '/images/subject-portrait.jpg';

// Tile foto karya (yang punya screenshot) diselang-seling dengan tile ikon teknologi.
function buildScrollItems() {
  const workTiles = works
    .filter((w) => w.image)
    .map((w) => ({ id: w.slug, image: w.image, alt: w.title, caption: w.title }));

  const techTiles = techStack.map((t) => ({
    id: t.icon,
    icon: TECH_ICONS[t.icon],
    brand: TECH_BRAND_COLORS[t.icon],
    caption: t.substance,
  }));

  const items = [];
  const total = Math.max(workTiles.length, techTiles.length);
  for (let i = 0; i < total; i++) {
    if (techTiles[i]) items.push(techTiles[i]);
    if (workTiles[i]) items.push(workTiles[i]);
  }
  return items;
}

export default function Page() {
  return (
    <IntroGate subjectSrc={PORTRAIT}>
      <Navbar />
      <Header city={profile.city} />
      <Hero />
      <SelectedWorks />
      <Certifications />
      <EducationHistory />
      <TechStackTable />
      <Experiences />
      <SkillsMarquee />
      <BackpackerJourney />
      <VerticalPhotoScroll
        eyebrow="In the Evidence Room"
        title="Work & Tools"
        items={buildScrollItems()}
      />
      <Footer />
    </IntroGate>
  );
}
