import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { X, MapPin, Briefcase, Building2, ExternalLink, Heart, TrendingUp, Users, Award } from 'lucide-react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

interface JobRole {
  _id: string;
  jobTitle: string;
  department?: string;
  location?: string;
  employmentType?: string;
  jobDescription?: string;
  requirements?: string;
  applicationUrl?: string;
}

const OPEN_ROLES: JobRole[] = [
  //   {
  //     _id: '1',
  //     jobTitle: 'Senior Full Stack Developer',
  //     department: 'Engineering',
  //     location: 'San Francisco, CA / Remote',
  //     employmentType: 'Full-time',
  //     jobDescription: `We're looking for an experienced Full Stack Developer to join our engineering team. You'll be working on cutting-edge web applications using React, Node.js, and modern cloud technologies.

  // Key Responsibilities:
  // • Design and develop scalable web applications
  // • Collaborate with product and design teams
  // • Write clean, maintainable code with comprehensive tests
  // • Participate in code reviews and technical discussions
  // • Mentor junior developers`,
  //     requirements: `Required Skills:
  // • 5+ years of experience with JavaScript/TypeScript
  // • Strong experience with React and Node.js
  // • Experience with cloud platforms (AWS, Azure, or GCP)
  // • Understanding of microservices architecture
  // • Excellent problem-solving skills

  // Nice to Have:
  // • Experience with Docker and Kubernetes
  // • Familiarity with CI/CD pipelines
  // • Open source contributions`,
  //     applicationUrl: 'https://apply.workable.com/techvision/j/ABC123/',
  //   },
  //   {
  //     _id: '2',
  //     jobTitle: 'DevOps Engineer',
  //     department: 'Infrastructure',
  //     location: 'Remote',
  //     employmentType: 'Full-time',
  //     jobDescription: `Join our infrastructure team to build and maintain reliable, scalable cloud systems. You'll work with cutting-edge DevOps tools and practices to support our growing platform.

  // Key Responsibilities:
  // • Manage and optimize cloud infrastructure
  // • Implement CI/CD pipelines
  // • Monitor system performance and reliability
  // • Automate deployment processes
  // • Collaborate with development teams`,
  //     requirements: `Required Skills:
  // • 3+ years of DevOps experience
  // • Strong knowledge of AWS or Azure
  // • Experience with Kubernetes and Docker
  // • Proficiency in Infrastructure as Code (Terraform, CloudFormation)
  // • Understanding of networking and security best practices

  // Nice to Have:
  // • Experience with monitoring tools (Datadog, New Relic)
  // • Knowledge of GitOps practices
  // • Scripting skills (Python, Bash)`,
  //     applicationUrl: '',
  //   },
  //   {
  //     _id: '3',
  //     jobTitle: 'Product Manager',
  //     department: 'Product',
  //     location: 'New York, NY / Hybrid',
  //     employmentType: 'Full-time',
  //     jobDescription: `We're seeking a strategic Product Manager to lead product initiatives and drive innovation. You'll work closely with engineering, design, and business teams to deliver exceptional products.

  // Key Responsibilities:
  // • Define product vision and roadmap
  // • Gather and prioritize product requirements
  // • Work with cross-functional teams to deliver features
  // • Analyze product metrics and user feedback
  // • Communicate product strategy to stakeholders`,
  //     requirements: `Required Skills:
  // • 4+ years of product management experience
  // • Strong analytical and problem-solving skills
  // • Experience with agile development methodologies
  // • Excellent communication and leadership skills
  // • Data-driven decision making

  // Nice to Have:
  // • Technical background or CS degree
  // • Experience with B2B SaaS products
  // • Understanding of AI/ML technologies`,
  //     applicationUrl: 'https://apply.workable.com/techvision/j/DEF456/',
  //   },
  //   {
  //     _id: '4',
  //     jobTitle: 'UX/UI Designer',
  //     department: 'Design',
  //     location: 'Remote',
  //     employmentType: 'Full-time',
  //     jobDescription: `We're looking for a creative UX/UI Designer to craft beautiful, intuitive user experiences. You'll work on diverse projects ranging from web applications to mobile apps.

  // Key Responsibilities:
  // • Design user interfaces for web and mobile applications
  // • Create wireframes, prototypes, and high-fidelity mockups
  // • Conduct user research and usability testing
  // • Collaborate with product and engineering teams
  // • Maintain design systems and style guides`,
  //     requirements: `Required Skills:
  // • 3+ years of UX/UI design experience
  // • Proficiency in Figma or similar design tools
  // • Strong portfolio demonstrating design process
  // • Understanding of user-centered design principles
  // • Excellent visual design skills

  // Nice to Have:
  // • Experience with design systems
  // • Motion design skills
  // • Front-end development knowledge (HTML/CSS)`,
  //     applicationUrl: '',
  //   },
];

export default function CareersPage() {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const [openRoles, setOpenRoles] = useState<any[]>([]);
  const [selectedRole, setSelectedRole] = useState<any>(null);

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
  useEffect(() => {
    // Load data directly from constant
    setOpenRoles(OPEN_ROLES);

    if (roleId) {
      const role: any = OPEN_ROLES.find(r => r._id === roleId);
      if (role) {
        setSelectedRole(role);
      }
    }
  }, [roleId]);

  const handleRoleClick = (role: any) => {
    setSelectedRole(role);
    navigate(`/careers/${role._id}`);
  };

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const handleCloseModal = () => {
    setSelectedRole(null);
    navigate('/careers');
  };

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health, dental, and vision insurance plus wellness programs.',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Continuous learning opportunities, certifications, and clear advancement paths.',
    },
    {
      icon: Users,
      title: 'Collaborative Culture',
      description: 'Work with talented professionals in an inclusive, supportive environment.',
    },
    {
      icon: Award,
      title: 'Competitive Compensation',
      description: 'Market-leading salaries, bonuses, equity options, and retirement benefits.',
    },
  ];

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
                Join Our Team
              </h1>
              <p className="font-paragraph font-[500] text-base text-secondary/80">
                Build your career with a company that values innovation, excellence, and your professional growth.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-24 px-8 bg-light-gray/30">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-wide">
                Why TechVision?
              </h2>
              <p className="font-paragraph font-[500] text-base text-secondary max-w-2xl mx-auto">
                We're not just building technology—we're building careers and shaping the future.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-background p-8 rounded-lg"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                      <Icon size={32} className="text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-3 tracking-wide">
                      {benefit.title}
                    </h3>
                    <p className="font-paragraph text-sm text-secondary">
                      {benefit.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Company Culture */}
        <section className="py-24 px-8">
          <div className="max-w-[120rem] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading text-5xl font-bold text-foreground mb-6">
                  Our Culture
                </h2>
                <p className="font-paragraph text-lg text-secondary mb-6">
                  At TechVision, we believe that great technology comes from great teams. Our culture is built on collaboration, innovation, and mutual respect. We encourage creative thinking, celebrate diverse perspectives, and support each other's growth.
                </p>
                <p className="font-paragraph text-lg text-secondary mb-6">
                  Whether you're working on cutting-edge AI solutions, architecting cloud infrastructure, or leading client engagements, you'll be part of a team that values your contributions and invests in your success.
                </p>
                <p className="font-paragraph text-lg text-secondary">
                  We offer flexible work arrangements, continuous learning opportunities, and a supportive environment where you can do your best work while maintaining work-life balance.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-primary/5 p-12 rounded-lg"
              >
                <div className="space-y-8">
                  <div>
                    <div className="text-4xl font-heading font-bold text-primary mb-2">200+</div>
                    <p className="font-paragraph text-sm text-secondary">Team Members</p>
                  </div>
                  <div>
                    <div className="text-4xl font-heading font-bold text-primary mb-2">95%</div>
                    <p className="font-paragraph text-sm text-secondary">Employee Satisfaction</p>
                  </div>
                  <div>
                    <div className="text-4xl font-heading font-bold text-primary mb-2">4.8</div>
                    <p className="font-paragraph text-sm text-secondary">Glassdoor Rating</p>
                  </div>
                  <div>
                    <div className="text-4xl font-heading font-bold text-primary mb-2">50+</div>
                    <p className="font-paragraph text-sm text-secondary">Countries Represented</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-24 px-8 bg-light-gray/30">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-wide">
                Open Positions
              </h2>
              <p className="font-paragraph font-[500] text-base text-secondary">
                Explore opportunities to join our growing team.
              </p>
            </motion.div>

            {openRoles.length > 0 ? (
              <div className="space-y-4">
                {openRoles.map((role: JobRole, index: number) => (
                  <motion.div
                    key={role._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    onClick={() => handleRoleClick(role)}
                    className="bg-background border border-light-gray p-8 rounded-lg cursor-pointer hover:border-primary transition-colors group"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-heading text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors tracking-wide">
                          {role.jobTitle}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-secondary">
                          {role.department && (
                            <span className="inline-flex items-center gap-2 font-paragraph text-xs">
                              <Building2 size={16} />
                              {role.department}
                            </span>
                          )}
                          {role.location && (
                            <span className="inline-flex items-center gap-2 font-paragraph text-xs">
                              <MapPin size={16} />
                              {role.location}
                            </span>
                          )}
                          {role.employmentType && (
                            <span className="inline-flex items-center gap-2 font-paragraph text-xs">
                              <Briefcase size={16} />
                              {role.employmentType}
                            </span>
                          )}
                        </div>
                      </div>
                      <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-paragraph text-xs font-medium hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/20 self-start md:self-center">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <p className="font-paragraph text-lg text-secondary mb-6">
                  We don't have any open positions at the moment, but we're always looking for talented individuals.
                  If you'd like to get in touch, please email us at{" "}
                  <a
                    href="mailto:contact@bitsinetwork.com"
                    className="text-primary underline hover:no-underline"
                  >
                    career@bitsinetwork.com
                  </a>.
                </p>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-paragraph text-base font-medium hover:bg-primary/90 transition-colors"
                >
                  Send Us Your Resume
                </Link>
              </motion.div>
            )}
          </div>
        </section>

        {/* Job Detail Modal */}
        <AnimatePresence>
          {selectedRole && (
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
                className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="sticky top-0 bg-background border-b border-light-gray p-6 flex justify-between items-center shadow-sm">
                  <h2 className="font-heading text-2xl font-bold text-foreground tracking-wide">
                    {selectedRole.jobTitle}
                  </h2>
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
                    <div className="flex flex-wrap gap-4 text-secondary pb-6 border-b border-light-gray">
                      {selectedRole.department && (
                        <span className="inline-flex items-center gap-2 font-paragraph text-sm">
                          <Building2 size={18} />
                          {selectedRole.department}
                        </span>
                      )}
                      {selectedRole.location && (
                        <span className="inline-flex items-center gap-2 font-paragraph text-sm">
                          <MapPin size={18} />
                          {selectedRole.location}
                        </span>
                      )}
                      {selectedRole.employmentType && (
                        <span className="inline-flex items-center gap-2 font-paragraph text-sm">
                          <Briefcase size={18} />
                          {selectedRole.employmentType}
                        </span>
                      )}
                    </div>

                    {selectedRole.jobDescription && (
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-foreground mb-4 tracking-wide">
                          Job Description
                        </h3>
                        <div className="font-paragraph text-sm text-secondary whitespace-pre-line">
                          {selectedRole.jobDescription}
                        </div>
                      </div>
                    )}

                    {selectedRole.requirements && (
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-foreground mb-4 tracking-wide">
                          Requirements
                        </h3>
                        <div className="font-paragraph text-sm text-secondary whitespace-pre-line">
                          {selectedRole.requirements}
                        </div>
                      </div>
                    )}

                    <div className="pt-6 border-t border-light-gray">
                      {selectedRole.applicationUrl ? (
                        <a
                          href={selectedRole.applicationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-paragraph text-sm font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                        >
                          Apply Now
                          <ExternalLink size={20} />
                        </a>
                      ) : (
                        <Link
                          to="/contact"
                          onClick={handleCloseModal}
                          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-paragraph text-sm font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                        >
                          Apply via Contact Form
                        </Link>
                      )}
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