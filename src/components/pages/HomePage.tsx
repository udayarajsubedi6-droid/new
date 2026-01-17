import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowRight, Shield, Zap, Users, Award, CheckCircle2, ArrowUpRight } from 'lucide-react';

import Footer from '../layout/Footer';
import Header from '../layout/Header';
import client1 from '../images/client1.jpg'
import client2 from '../images/client2.png'
import client3 from '../images/client3.jpeg'
import client4 from '../images/client4.png'
import client5 from '../images/client5.png'
import client6 from '../images/client6.jpeg'


// Light Green Theme CSS Variables
const lightGreenTheme = `
  :root {
    --primary: #4CAF50;
    --primary-light: #81C784;
    --primary-dark: #388E3C;
    --primary-bg: #E8F5E9;
    --primary-bg-light: #F1F8E9;
    --accent: #8BC34A;
    --light-gray: #F5F5F5;
    --background: #FFFFFF;
    --foreground: #212121;
    --secondary: #757575;
    --soft-gold: #9CCC65;
  }
  
  .selection\\:bg-primary\\/30::selection {
    background-color: rgba(76, 175, 80, 0.3);
  }
`;

const SERVICES_DATA = [
  {
    _id: '1',
    serviceName: 'Software Development',
    slug: 'software-development',
    shortDescription: 'Custom software solutions',
    detailedDescription:
      'We build custom software systems based on your business needs using modern technologies.\n\nOur software services include:\n• Business management systems\n• Billing and accounting software\n• Inventory and POS systems\n• Custom internal tools',
    keyBenefits:
      'Tailored to your business\nImproves efficiency\nSaves time and cost\nScalable for future growth',
    serviceIcon: 'https://cdn-icons-png.flaticon.com/512/2920/2920277.png'
  },
  {
    _id: '2',
    serviceName: 'Website Designing',
    slug: 'website-designing',
    shortDescription: 'Professional, Reliable, Dynamic, Responsive & SEO Friendly',
    detailedDescription:
      'We create professional websites that are reliable, dynamic, and optimized for all devices and search engines.\n\nOur website designing services include:\n• Responsive web design\n• SEO-friendly architecture\n• Dynamic content management\n• Professional business websites\n• E-commerce platforms',
    keyBenefits:
      'Mobile-responsive design\nSearch engine optimized\nProfessional appearance\nUser-friendly interface\nFast loading times',
    serviceIcon: 'https://cdn-icons-png.flaticon.com/512/1055/1055645.png'
  },
  {
    _id: '3',
    serviceName: 'Web Hosting & Registration',
    slug: 'web-hosting-registration',
    shortDescription: 'Domain registration and reliable web hosting',
    detailedDescription:
      'We provide domain registration and hosting services for all types of websites.\n\nOur hosting services include:\n• Domain registration (.com, .np, .edu, .org, .gov, .net, .biz)\n• Reliable web hosting\n• Email hosting\n• SSL certificates\n• 24/7 server monitoring',
    keyBenefits:
      'Multiple domain extensions\nReliable uptime\nSecure hosting\nTechnical support\nAffordable pricing',
    serviceIcon: 'https://cdn-icons-png.flaticon.com/512/2282/2282188.png'
  },
];

const CLIENT_LOGOS_DATA = [
  { _id: '1', clientName: 'Client 1', logo: client1, displayOrder: 1 },
  { _id: '2', clientName: 'Client 2', logo: client2, displayOrder: 2 },
  { _id: '3', clientName: 'Client 3', logo: client3, displayOrder: 3 },
  { _id: '4', clientName: 'Client 4', logo: client4, displayOrder: 4 },
  { _id: '5', clientName: 'Client 5', logo: client5, displayOrder: 5 },
  { _id: '6', clientName: 'Client 6', logo: client6, displayOrder: 6 }
];

const TESTIMONIALS_DATA = [
  {
    _id: '1',
    clientName: 'Sarah Mitchell',
    clientTitle: 'CTO',
    clientCompany: 'Fortune 500 Tech',
    testimonialText: 'TechVision transformed our entire infrastructure. Their expertise and dedication resulted in a 40% reduction in operational costs while improving system reliability.',
    rating: 5,
    clientPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop'
  },
  {
    _id: '2',
    clientName: 'Michael Chen',
    clientTitle: 'VP of Engineering',
    clientCompany: 'Global Finance Corp',
    testimonialText: 'Working with TechVision has been a game-changer. Their cloud migration strategy was flawless, and the ongoing support has been exceptional.',
    rating: 5,
    clientPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop'
  },
  {
    _id: '3',
    clientName: 'Emily Rodriguez',
    clientTitle: 'Chief Information Officer',
    clientCompany: 'Healthcare Systems Inc',
    testimonialText: 'The security solutions implemented by TechVision gave us peace of mind. Their team is knowledgeable, responsive, and truly understands enterprise needs.',
    rating: 5,
    clientPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop'
  }
];

const CERTIFICATIONS_DATA = [
  { _id: '1', certificationName: 'AWS Certified', issuingOrganization: 'Amazon Web Services', certificationImage: 'https://via.placeholder.com/100x100?text=AWS' },
  { _id: '2', certificationName: 'Microsoft Azure', issuingOrganization: 'Microsoft', certificationImage: 'https://via.placeholder.com/100x100?text=Azure' },
  { _id: '3', certificationName: 'ISO 27001', issuingOrganization: 'ISO', certificationImage: 'https://via.placeholder.com/100x100?text=ISO' },
  { _id: '4', certificationName: 'SOC 2 Type II', issuingOrganization: 'AICPA', certificationImage: 'https://via.placeholder.com/100x100?text=SOC2' }
];

const TECH_VIDEOS = [
  'https://videos.pexels.com/video-files/3141211/3141211-uhd_2560_1440_25fps.mp4',
];

// Utility Components
interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const Reveal = ({ children, className = '', delay = 0 }: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
        transition={{ duration: 0.8, delay: delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ParallaxImage = ({ src, alt, className = '' }: ParallaxImageProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-[120%] relative -top-[10%]">
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
};

interface StickySectionProps {
  title: string;
  children: React.ReactNode;
}

const StickySection = ({ title, children }: StickySectionProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 py-24 border-t border-light-gray/50">
      <div className="lg:w-1/3">
        <div className="sticky top-32">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            {title}
          </h2>
          <div className="h-1 w-24 bg-primary mb-8" />
        </div>
      </div>
      <div className="lg:w-2/3">
        {children}
      </div>
    </div>
  );
};

export default function HomePage() {
  const [services, setServices] = useState<any[]>([]);
  const [clientLogos, setClientLogos] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    // Load inline data
    setServices(SERVICES_DATA);
    setClientLogos(CLIENT_LOGOS_DATA);
    setTestimonials(TESTIMONIALS_DATA);
    setCertifications(CERTIFICATIONS_DATA);

    // Select random video
    const randomIndex = Math.floor(Math.random() * TECH_VIDEOS.length);
    setVideoUrl(TECH_VIDEOS[randomIndex]);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-foreground overflow-clip">
      {/* Light Green Theme CSS */}
      <style>{lightGreenTheme}</style>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      {/* Header with consistent padding */}
      <div className="mx-auto px-6 md:px-8 lg:px-12">
        <Header />
      </div>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Video Background */}
          {videoUrl && (
            <video
              key={videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0"
              aria-hidden="true"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          )}

          {/* Video Overlay - Gradient for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/50 to-foreground/70 z-[1]" />

          {/* Abstract Background Elements */}
          <div className="absolute inset-0 z-[2]">
            <div className="absolute top-0 right-0 w-[60vw] h-[80vh] bg-primary/5 rounded-bl-[10rem] opacity-50" />
          </div>

          <div className="container max-w-[120rem] mx-auto px-6 md:px-8 lg:px-12 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm border border-white/20 mb-8 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-paragraph text-sm font-medium text-secondary tracking-wide uppercase">Reliable IT Solutions</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-8 drop-shadow-2xl">
                  Build Your Digital <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-light to-white">
                    Future With Us
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="font-paragraph font-[500] text-base md:text-lg text-white/95 max-w-2xl leading-relaxed mb-12 border-l-2 border-primary pl-6 drop-shadow-lg">
                  We help businesses build websites, software, and mobile apps that are simple, reliable, and affordable.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="flex flex-wrap gap-6">
                  <Link
                    to="/services"
                    className="group relative px-8 py-4 bg-white text-foreground overflow-hidden transition-all hover:bg-primary hover:text-white shadow-xl hover:shadow-2xl hover:shadow-primary/30"
                  >
                    <span className="relative z-10 font-paragraph font-medium flex items-center gap-3">
                      Our Services <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                  <Link
                    to="/contact"
                    className="group relative px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-foreground transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
                  >
                    <span className="font-paragraph font-medium">Contact Us</span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Marquee Logos Section */}
        {clientLogos.length > 0 && (
          <section className="py-16 border-y border-light-gray bg-white overflow-hidden">
            <div className="max-w-[120rem] mx-auto px-6 md:px-8 lg:px-12 mb-8">
              <p className="font-paragraph text-sm text-secondary uppercase tracking-widest text-center">Trusted by </p>
            </div>
            <div className="relative flex overflow-x-hidden group">
             <div className="animate-marquee whitespace-nowrap flex items-center gap-24 md:gap-40 px-8">
  {[...clientLogos, ...clientLogos].map((client, index) => (
    <div
      key={`${client._id}-${index}`}
      className="flex-shrink-0 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500
                 px-6 min-w-[160px] flex justify-center"
    >
      {client.logo && (
        <img
          src={client.logo}
          alt={client.clientName}
          className="h-12 w-auto object-contain"
        />
      )}
    </div>
  ))}
</div>

              <div className="animate-marquee whitespace-nowrap flex items-center gap-24 md:gap-40 px-8">
                {[...clientLogos, ...clientLogos].map((client, index) => (
                  <div
                    key={`${client._id}-${index}`}
                    className="flex-shrink-0 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500
                 px-6 min-w-[160px] flex justify-center"
                  >
                    {client.logo && (
                      <img
                        src={client.logo}
                        alt={client.clientName}
                        className="h-12 w-auto object-contain"
                      />
                    )}
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* Philosophy Section */}
        <section className="py-32 bg-background">
          <div className="max-w-[120rem] mx-auto px-6 md:px-8 lg:px-12">
            <StickySection title="The BITSI Standard">
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
                {[{ icon: Shield, title: 'Reliable Solutions', description: 'We build stable and dependable systems that work smoothly for your business every day.' },
                { icon: Zap, title: 'Fast Delivery', description: 'Quick turnaround times without compromising quality. Get your project done on schedule.' },
                { icon: Users, title: 'Expert Support', description: 'Our experienced team is here to help you from start to finish and beyond.' },
                { icon: Award, title: 'Affordable Pricing', description: 'Quality IT services at prices that make sense for small and medium businesses.' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={index} delay={index * 0.1}>
                      <div className="group">
                        <div className="w-16 h-16 bg-white border border-light-gray flex items-center justify-center mb-6 group-hover:bg-primary group-hover:border-primary transition-colors duration-500">
                          <Icon size={28} className="text-foreground group-hover:text-white transition-colors duration-500" />
                        </div>
                        <h3 className="font-heading text-2xl font-semibold text-foreground mb-4 group-hover:translate-x-2 transition-transform duration-300">{item.title}</h3>
                        <p className="font-paragraph text-secondary leading-relaxed border-l border-light-gray pl-4 group-hover:border-primary transition-colors duration-300">
                          {item.description}
                        </p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </StickySection>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-32 bg-white">
          <div className="max-w-[120rem] mx-auto px-6 md:px-8 lg:px-12">
            <div className="mb-24 max-w-4xl">
              <Reveal>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-wide">
                  Comprehensive <span className="italic text-secondary">Solutions</span>
                </h2>
                <p className="font-paragraph font-[500] text-base text-secondary">
                  Tailored IT strategies designed to propel your business into the future.
                </p>
              </Reveal>
            </div>

            <div className="space-y-32">
              {services.map((service, index) => (
                <div key={service._id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-start lg:items-center`}>
                  <div className="lg:w-1/2 w-full">
                    <Reveal>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                        {service.serviceIcon ? (
                          <div className="w-full h-full bg-gradient-to-br from-primary/5 via-primary-light/5 to-primary/3 p-12 flex items-center justify-center border border-light-gray shadow-md">
                            <img
                              src={service.serviceIcon}
                              alt={service.serviceName}
                              className="w-1/2 h-1/2 object-contain opacity-90"
                            />
                          </div>
                        ) : (
                          <ParallaxImage
                            src="https://static.wixstatic.com/media/34c8fd_c0ce7d1b996342a582be61184ce00711~mv2.png"
                            alt={service.serviceName}
                            className="w-full h-full"
                          />
                        )}
                        <div className="absolute inset-0 border border-black/5 pointer-events-none" />
                      </div>
                    </Reveal>
                  </div>

                  <div className="lg:w-1/2 w-full">
                    <Reveal delay={0.2}>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="font-heading text-2xl font-bold tracking-widest text-primary">0{index + 1}</span>
                        <div className="h-px w-12 bg-light-gray" />
                      </div>
                      <h3 className="font-heading text-3xl font-bold text-foreground mb-6 tracking-wide">{service.serviceName}</h3>
                      <p className="font-paragraph text-base text-secondary mb-8 leading-relaxed">
                        {service.detailedDescription || service.shortDescription}
                      </p>

                      {service.keyBenefits && (
                        <ul className="space-y-4 mb-10">
                          {service.keyBenefits.split('\n').slice(0, 3).map((benefit: any, i: number) => (
                            <li key={i} className="flex items-start gap-3 font-paragraph text-sm text-secondary">
                              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <Link
                        to={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors group"
                      >
                        <span className="border-b border-foreground group-hover:border-primary pb-1 transition-colors">Explore Service</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </Link>
                    </Reveal>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-24 text-center">
              <Link to="/services" className="inline-block px-12 py-5 border border-foreground text-foreground hover:bg-foreground hover:text-white transition-all duration-300 font-paragraph font-medium tracking-wide shadow-md hover:shadow-lg hover:shadow-foreground/20">
                View All Services
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-white relative overflow-hidden">
          <div className="max-w-[120rem] mx-auto px-6 md:px-8 lg:px-12 relative z-10">
            <div className="bg-background border border-light-gray p-12 md:p-24 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10 max-w-4xl mx-auto text-center">
                <Reveal>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight tracking-wide">
                    Ready to Architect <br /> Your Future?
                  </h2>
                  <p className="font-paragraph font-[500] text-base text-secondary/80 mb-12 max-w-2xl mx-auto">
                    Let's discuss how our enterprise solutions can drive efficiency, security, and growth for your organization.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link
                      to="/contact"
                      className="px-10 py-5 bg-primary text-white font-paragraph font-medium text-base hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                    >
                      Schedule Consultation
                    </Link>
                    <Link
                      to="/services"
                      className="px-10 py-5 bg-white border border-light-gray text-foreground font-paragraph font-medium text-base hover:border-foreground transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-foreground/10"
                    >
                      View Service Portfolio
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 40s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
}