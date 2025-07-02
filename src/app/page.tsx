import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import SkillsSection from '@/components/skills-section';
import ProjectsSection from '@/components/projects-section';
import EducationSection from '@/components/education-section';
import TestimonialsSection from '@/components/testimonials-section';
import BlogSection from '@/components/blog-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
