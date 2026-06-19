import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import Services from '../components/home/Services';
import About from '../components/home/About';
import HowWeWork from '../components/home/HowWeWork';
import GoalsSection from '../components/home/GoalsSection';
import Testimonials from '../components/home/Testimonials';
import LeadMagnet from '../components/home/LeadMagnet';
import FAQ from '../components/home/FAQ';

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Services />
      <About />
      <HowWeWork />
      <GoalsSection />
      <Testimonials />
      <LeadMagnet />
      <FAQ />
    </main>
  );
}
