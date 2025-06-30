import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import SkillsSection from '@/components/skills-section';
import ProjectsSection from '@/components/projects-section';
import EducationSection from '@/components/education-section';
import TestimonialsSection from '@/components/testimonials-section';
import BlogSection from '@/components/blog-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';
import ScrollAnimationWrapper from '@/components/scroll-animation-wrapper';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ScrollAnimationWrapper>
          <SkillsSection />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <ProjectsSection />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <EducationSection />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <TestimonialsSection />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <BlogSection />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <ContactSection />
        </ScrollAnimationWrapper>
      </main>
      <Footer />
    </div>
  );
}
