import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useSpring, useScroll } from 'framer-motion';
import { X, ArrowRight, CheckCircle } from 'lucide-react';

import Footer from '../layout/Footer';
import Header from '../layout/Header';

// Inline mock data for services// Inline mock data for services
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
  {
    _id: '4',
    serviceName: 'Online Business Promotion',
    slug: 'online-business-promotion',
    shortDescription: 'SEO, Business Listing & Social Media Marketing',
    detailedDescription:
      'We help promote your business online through various digital marketing channels.\n\nOur promotion services include:\n• SEO (Search Engine Optimization)\n• Google Business Listing\n• Facebook Page & Promotion\n• E-Boosting campaigns\n• E-Genath (digital presence)\n• Social media marketing',
    keyBenefits:
      'Increased online visibility\nMore customer reach\nBetter search rankings\nSocial media engagement\nMeasurable results',
    serviceIcon: 'https://cdn-icons-png.flaticon.com/512/1055/1055687.png'
  },
  {
    _id: '5',
    serviceName: 'Mobile Application',
    slug: 'mobile-application',
    shortDescription: 'iOS, Android and Java Platform apps',
    detailedDescription:
      'We develop mobile applications for iOS, Android, and Java platforms.\n\nOur mobile app services include:\n• Native Android apps\n• iOS applications\n• Cross-platform solutions\n• Mobile app maintenance\n• App store deployment',
    keyBenefits:
      'Multi-platform support\nUser-friendly interface\nSecure applications\nRegular updates\nApp store optimization',
    serviceIcon: 'https://cdn-icons-png.flaticon.com/512/888/888879.png'
  },
  {
    _id: '6',
    serviceName: 'Hardware & Networking',
    slug: 'hardware-networking',
    shortDescription: 'Computer repairs, networking & internet setup',
    detailedDescription:
      'We provide hardware repair and networking services for your office or home.\n\nOur hardware services include:\n• Laptop repair and maintenance\n• Desktop repair and upgrades\n• Printer installation and repair\n• Antivirus installation\n• Network setup and configuration\n• Internet setup and troubleshooting',
    keyBenefits:
      'Quick repair service\nReliable networking\nVirus protection\nProfessional installation\nAffordable rates',
    serviceIcon: 'https://cdn-icons-png.flaticon.com/512/2920/2920249.png'
  },
  {
    _id: '7',
    serviceName: 'Desktop Publishing',
    slug: 'desktop-publishing',
    shortDescription: 'Design, printing and typing services',
    detailedDescription:
      'We offer complete desktop publishing services for all your printing and design needs.\n\nOur DTP services include:\n• Brochure design\n• Visiting card design\n• Banner and poster design\n• Advertisement materials\n• English & Nepali typing\n• Color printing services',
    keyBenefits:
      'Professional designs\nBilingual typing support\nHigh-quality printing\nQuick turnaround\nCompetitive pricing',
    serviceIcon: 'https://cdn-icons-png.flaticon.com/512/3239/3239958.png'
  }
]

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
 
export default function ServicesPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);

  useEffect(() => {
    // Load data directly from constant
    setServices(SERVICES_DATA);

    if (slug) {
      const service = SERVICES_DATA.find(s => s.slug === slug);
      if (service) {
        setSelectedService(service);
      }
    }
  }, [slug]);

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
    navigate(`/services/${service.slug}`);
  };
 const { scrollYProgress } = useScroll();

const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const handleCloseModal = () => {
    setSelectedService(null);
    navigate('/services');
  };

  return (
    <div className="min-h-screen bg-background">
         <style>{lightGreenTheme}</style>
      
            {/* Scroll Progress Indicator */}
            <motion.div
              className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
              style={{ scaleX }}
            />
      <div className="mx-auto px-6 md:px-8 lg:px-0">
        <Header />

        {/* Hero Section */}
        <section className="pt-40 pb-24 px-8">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-wide">
                Our Services
              </h1>
              <p className="font-paragraph font-[500] text-base text-secondary/80">
                Comprehensive IT solutions designed to drive your business forward.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 px-8">
          <div className="max-w-[120rem] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  onClick={() => handleServiceClick(service)}
                  className="bg-background border border-light-gray p-8 rounded-lg cursor-pointer hover:border-primary transition-colors group shadow-sm hover:shadow-md hover:shadow-primary/10"
                >
                  {service.serviceIcon && (
                    <div className="mb-6 w-16 h-16 bg-primary/5 rounded-lg flex items-center justify-center">
                      <img
                        src={service.serviceIcon}
                        alt={service.serviceName || 'Service icon'}
                        className="w-10 h-10 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  )}
                  <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors tracking-wide">
                    {service.serviceName}
                  </h3>
                  <p className="font-paragraph text-base text-secondary mb-4 leading-relaxed">
                    {service.shortDescription}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-paragraph text-sm font-medium">
                    Learn More
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-8 bg-light-gray/30">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-wide">
                Need a Custom Solution?
              </h2>
              <p className="font-paragraph font-[500] text-base text-secondary/80 mb-8 max-w-2xl mx-auto">
                Every business is unique. Let's discuss how we can tailor our services to meet your specific needs.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-paragraph text-sm font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
              >
                Contact Us
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Service Detail Modal */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              >
                <div className="sticky top-0 bg-background border-b border-light-gray p-6 flex justify-between items-center shadow-sm z-10">
                  <div className="flex items-center gap-4">
                    {selectedService.serviceIcon && (
                      <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center">
                        <img
                          src={selectedService.serviceIcon}
                          alt={selectedService.serviceName || 'Service icon'}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                    )}
                    <h2 className="font-heading text-2xl font-bold text-foreground tracking-wide">
                      {selectedService.serviceName}
                    </h2>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 hover:bg-light-gray rounded-lg transition-colors"
                    aria-label="Close"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="p-8">
                  <div className="space-y-8">
                    <div>
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-4 tracking-wide">
                        Overview
                      </h3>
                      <p className="font-paragraph text-base text-secondary leading-relaxed">
                        {selectedService.shortDescription}
                      </p>
                    </div>

                    {selectedService.detailedDescription && (
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-foreground mb-4 tracking-wide">
                          Detailed Description
                        </h3>
                        <div className="font-paragraph text-sm text-secondary whitespace-pre-line leading-relaxed">
                          {selectedService.detailedDescription}
                        </div>
                      </div>
                    )}

                    {selectedService.keyBenefits && (
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-foreground mb-4 tracking-wide">
                          Key Benefits
                        </h3>
                        <div className="space-y-3">
                          {selectedService.keyBenefits.split('\n').filter((benefit: string) => benefit.trim()).map((benefit: string, index: number) => (
                            <div key={index} className="flex items-start gap-3">
                              <CheckCircle size={20} className="text-primary mt-0.5 flex-shrink-0" />
                              <p className="font-paragraph text-sm text-secondary">
                                {benefit.trim()}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-6 border-t border-light-gray">
                      <Link
                        to="/contact"
                        onClick={handleCloseModal}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-paragraph text-sm font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                      >
                        Get Started
                        <ArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </div>
  );
}