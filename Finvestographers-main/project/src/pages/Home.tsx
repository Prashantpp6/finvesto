import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import Services from '../components/home/Services';
import About from '../components/home/About';
import HowWeWork from '../components/home/HowWeWork';
import WealthGrowth from '../components/home/WealthGrowth';
import GoalsSection from '../components/home/GoalsSection';
import Testimonials from '../components/home/Testimonials';
import BlogPreview from '../components/home/BlogPreview';
import LeadMagnet from '../components/home/LeadMagnet';
import FAQ from '../components/home/FAQ';
import FinalCTA from '../components/home/FinalCTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Services />
      <About />
      <HowWeWork />
      <WealthGrowth />
      <GoalsSection />
      <Testimonials />
      <BlogPreview />
      <LeadMagnet />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
