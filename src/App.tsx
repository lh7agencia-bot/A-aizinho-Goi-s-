/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { SchedulingSection } from './components/SchedulingSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F5F5F5] text-[#1A092B]">
        <Navbar />
        <main>
          <Hero />
          <GallerySection />
          <TestimonialsSection />
          <SchedulingSection />
          <FaqSection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </MotionConfig>
  );
}
