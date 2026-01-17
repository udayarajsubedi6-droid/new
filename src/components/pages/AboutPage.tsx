import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Target, Eye, Heart, TrendingUp, X, Linkedin } from 'lucide-react';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import bimal from '../member/bimal.jpg';
import udaya from '../member/udaya.jpg';
import sandesh from '../member/sandesh.jpg';
import sanjit from '../member/sanjit.jpg';
import director from '../member/Mangeing director.jpg';
import umesh from '../member/umeshsubedi.jpg';
import ram from '../member/ram.jpg';
import kedar from '../member/kedar.jpg';


 

// Inline mock data - replace with your actual team data
const TEAM_DATA = [
  {
  _id: '1',
  fullName: 'Premhari Parajuli',
  role: 'Executive Director',
  photo: director,
  bio: 'Premhari Parajuli is the Founder and Executive Director of the company. He established the organization with a focus on delivering professional, technology-driven solutions and sustainable business growth. He leads corporate strategy, operations, and client engagement, ensuring high standards of service, governance, and innovation. Under his leadership, the company has developed a strong reputation for reliability, ethical practices, and long-term value creation.',
  displayOrder: 1
}
,

  {
    _id: '2',
    fullName: 'Udayaraj Subedi',
    role: 'Senior Software Engineer',
    photo: udaya,
    bio: 'Udayaraj Subedi is a core technical pillar of our organization and a highly respected member of the team. He leads the development of modern software solutions with dedication and creativity. His deep knowledge of technology, problem-solving ability, and mentoring spirit have greatly strengthened our engineering culture. He is committed to delivering secure, scalable, and innovative systems that bring real value to our clients.',
    displayOrder: 2
  },

  {
    _id: '3',
    fullName: 'Sanjit Pandit',
    role: 'Software Engineer',
    photo: sanjit,
    bio: 'Sanjit Pandit is an important and energetic member of our technical team. His passion for coding and learning new technologies helps our organization stay updated and competitive. He works sincerely to build reliable applications and always supports his colleagues with a positive attitude. His contribution plays a meaningful role in shaping quality digital products for our clients.',
    displayOrder: 3
  },

  {
    _id: '4',
    fullName: 'Sandesh Sapkota',
    role: 'Project Manager',
    photo: sandesh,
    bio: 'Sandesh Sapkota is a trusted leader in managing our projects and teams. He is valued for his communication skills, responsibility, and ability to bring people together. Sandesh ensures that every project is planned carefully, executed professionally, and delivered on time. His dedication helps maintain strong relationships between the company, clients, and technical teams.',
    displayOrder: 4
  },

  {
    _id: '5',
    fullName: 'Umesh Subedi',
    role: 'Accountant',
    photo: umesh,
    bio: 'Umesh Subedi is a reliable and valuable member who manages the financial backbone of our organization. His careful handling of accounts, budgeting, and financial planning supports the stability and growth of the company. He is known for his honesty, accuracy, and disciplined approach to financial management.',
    displayOrder: 5
  },

  {
    _id: '6',
    fullName: 'Bimal Pun',
    role: 'Technician',
    photo: bimal,
    bio: 'Bimal Pun is a dedicated technician and an essential part of our operational team. His practical skills and commitment ensure that all technical systems function smoothly. He responds quickly to challenges and is always ready to support clients and colleagues with patience and professionalism.',
    displayOrder: 6
  },

  {
    _id: '7',
    fullName: 'Ramkumar Adhikari',
    role: 'Technician',
    photo: ram,
    bio: 'Ramkumar Adhikari is a hardworking and valued technician in our organization. His hands-on experience and problem-solving mindset help maintain dependable services. He is respected for his supportive nature and willingness to go the extra mile to meet organizational and client needs.',
    displayOrder: 7
  },

  {
    _id: '8',
    fullName: 'Kedar Pyakurel',
    role: 'Technician',
    photo: kedar,
    bio: 'Kedar Pyakurel is a sincere and committed member of our technical workforce. His contribution in installation, maintenance, and field support is highly appreciated. He represents the company’s values through his responsible work ethic and dedication to service excellence.',
    displayOrder: 8
  }
];



export default function AboutPage() {
  const { memberId } = useParams();

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
  const navigate = useNavigate();
  const [team, setTeam] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  useEffect(() => {
    // Simulate loading data (without async call)
    const sortedTeam: any = [...TEAM_DATA].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    setTeam(sortedTeam);

    if (memberId) {
      const member = sortedTeam.find((m: any) => m._id === memberId);
      if (member) {
        setSelectedMember(member);
      }
    }
  }, [memberId]);

  const handleMemberClick = (member: any) => {
    setSelectedMember(member);
    navigate(`/about/${member._id}`);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
    navigate('/about');
  };

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We pursue the highest standards in everything we do, from code quality to client service.',
    },
    {
      icon: Eye,
      title: 'Innovation',
      description: 'We stay ahead of technology trends to deliver cutting-edge solutions that drive competitive advantage.',
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'We build trust through transparency, honesty, and ethical business practices in every engagement.',
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      description: 'We invest in our people and partnerships, fostering continuous learning and mutual success.',
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
                About BITSI              </h1>
              <p className="font-paragraph font-[500] text-base text-secondary/80">

                We focus on delivering quality services in software development, website solutions, networking, CCTV installation, and IT support, ensuring long-term value and customer satisfaction.              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 px-8 bg-light-gray/30">
          <div className="max-w-[120rem] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-wide">Our Mission</h2>
                <p className="font-paragraph font-[500] text-base text-secondary mb-6">
                  To provide dependable, affordable, and practical IT solutions that help businesses, institutions, and individuals grow through technology.
                </p>
                <p className="font-paragraph font-[500] text-base text-secondary">

                  We focus on delivering quality services in software development, website solutions, networking, CCTV installation, and IT support, ensuring long-term value and customer satisfaction.                </p>
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
                    <div className="text-5xl font-heading font-bold text-primary mb-2">500+</div>
                    <p className="font-paragraph text-base text-secondary">Projects Delivered</p>
                  </div>
                  <div>
                    <div className="text-5xl font-heading font-bold text-primary mb-2">98%</div>
                    <p className="font-paragraph text-base text-secondary">Client Satisfaction</p>
                  </div>
                  <div>
                    <div className="text-5xl font-heading font-bold text-primary mb-2">15+</div>
                    <p className="font-paragraph text-base text-secondary">Years of Excellence</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-24 px-8">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-wide">Our Vision</h2>
              <p className="font-paragraph font-[500] text-base text-secondary mb-6">

                We focus on delivering quality services in software development, website solutions, networking, CCTV installation, and IT support, ensuring long-term value and customer satisfaction.
              </p>
              <p className="font-paragraph font-[500] text-base text-secondary">
                We envision a future where businesses can leverage technology seamlessly to achieve their strategic objectives, and we're dedicated to making that vision a reality through our comprehensive IT services and solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 px-8 bg-light-gray/30">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-wide">Our Core Values</h2>
              <p className="font-paragraph font-[500] text-base text-secondary max-w-2xl mx-auto">
                The principles that guide every decision we make and every solution we deliver.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-background p-8 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                      <Icon size={32} className="text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-3 tracking-wide">
                      {value.title}
                    </h3>
                    <p className="font-paragraph text-sm text-secondary">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-24 px-8">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center tracking-wide">Our Story</h2>

              <div className="space-y-6">
                <p className="font-paragraph font-[500] text-base text-secondary">
                  BITSI Network, officially registered as Bhagawati IT Services & Investment Pvt. Ltd., was established to meet the growing demand for dependable IT and technology services in Nepal.
                </p>

                <p className="font-paragraph font-[500] text-base text-secondary">
                  Starting with core services such as computer hardware support, networking, and website development, BITSI Network gradually expanded into software development, mobile applications, CCTV installation, and online business promotion.
                </p>

                <p className="font-paragraph font-[500] text-base text-secondary">
                  With hands-on experience across public offices, businesses, and individual clients, we have built a reputation for practical solutions, honest pricing, and long-term support.
                </p>

                <p className="font-paragraph font-[500] text-base text-secondary">
                  Today, BITSI Network continues to serve clients from Kalanki, Kathmandu, and beyond with a commitment to quality and trust.
                </p>
              </div>

            </motion.div>
          </div>
        </section>



        <section className="py-32 bg-gradient-to-b from-white to-light-gray/20 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-soft-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="max-w-[120rem] mx-auto px-6 md:px-8 lg:px-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-paragraph text-sm font-medium text-primary tracking-wide uppercase">
                  Our Leadership
                </span>
              </div>

              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
                Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Visionaries</span>
              </h2>
              <p className="font-paragraph text-lg text-secondary/80 max-w-3xl mx-auto leading-relaxed">
                Our leadership team brings together decades of experience in technology, strategy, and innovation to drive excellence across every dimension of our business.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  onClick={() => handleMemberClick(member)}
                  className="group relative"
                >
                  <div className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer border border-light-gray/50 hover:border-primary/30">
                     {member.photo && (
                      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-light-gray/30 to-light-gray/10">
                        <img
                          src={member.photo}
                          alt={member.fullName || 'Team member'}
                          className="w-full h-full object-cover opacity-90 grayscale-[30%] group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
                         <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                         <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                            <span className="font-paragraph text-[10px] font-semibold text-foreground tracking-wide uppercase">
                              View Profile
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                     <div className="p-4 relative">
                       <div className="absolute top-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <h3 className="font-heading text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300 tracking-tight line-clamp-1">
                        {member.fullName}
                      </h3>
                      <p className="font-paragraph text-xs text-secondary/80 font-medium tracking-wide line-clamp-2">
                        {member.role}
                      </p>

                       <div className="mt-3 flex items-center gap-1.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="font-paragraph text-[10px] font-semibold uppercase tracking-wider">
                          Learn More
                        </span>
                        <svg
                          className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>

                     <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full" />
                  </div>
                </motion.div>
              ))}
            </div> 

             <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 text-center"
            >
              <p className="font-paragraph text-base text-secondary/70 mb-6">
                Interested in joining our leadership team?
              </p>
              <Link
                to="/careers"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-white rounded-lg hover:bg-primary transition-all duration-300 font-paragraph text-sm font-medium shadow-lg hover:shadow-xl"
              >
                View Open Positions
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Member Detail Modal */}
        <AnimatePresence>
          {selectedMember && (
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
                    {selectedMember.fullName}
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                      {selectedMember.photo && (
                        <div className="aspect-square rounded-lg overflow-hidden bg-light-gray mb-6">
                          <img
                            src={selectedMember.photo}
                            alt={selectedMember.fullName || 'Team member'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-heading text-base font-semibold text-foreground mb-2 tracking-wide">
                            Role
                          </h3>
                          <p className="font-paragraph text-sm text-secondary">
                            {selectedMember.role}
                          </p>
                        </div>
                        {selectedMember.linkedinProfile && (
                          <div>
                            <a
                              href={selectedMember.linkedinProfile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-primary font-paragraph text-sm font-medium hover:underline"
                            >
                              <Linkedin size={20} />
                              LinkedIn Profile
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
                        Biography
                      </h3>
                      <div className="font-paragraph text-base text-secondary whitespace-pre-line">
                        {selectedMember.bio}
                      </div>
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