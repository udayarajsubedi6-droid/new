import { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

import Footer from '../layout/Footer';
import Header from '../layout/Header';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError('');

  const formattedMessage = `
From: ${formData.name}
Mail Address: ${formData.email}

Message:
${formData.message}
`;

  const formDataToSend = new FormData();
  formDataToSend.append('access_key', '20f7f673-6237-4f05-8826-c7dbec43f63f');

  // Subject (shown as email subject)
  formDataToSend.append('subject', formData.company || 'New Contact Message');

  // Sender name
  formDataToSend.append('from_name', formData.company || formData.name);

  // Main formatted message body
  formDataToSend.append('message', formattedMessage);

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formDataToSend,
    });

    const data = await response.json();

    if (data.success) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', company: '', message: '' });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 1000);
    } else {
      setError(data.message || 'Something went wrong. Please try again.');
    }
  } catch (error) {
    setError('Network error. Please check your connection and try again.');
  } finally {
    setIsSubmitting(false);
  }
};

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
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
                Get in Touch
              </h1>
              <p className="font-paragraph font-[500] text-base text-secondary/80">
                Let's discuss how we can help transform your business with innovative IT solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 px-8">
          <div className="max-w-[120rem] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="font-heading text-3xl font-bold text-foreground mb-8 tracking-wide">
                  Contact Information
                </h2>
                <p className="font-paragraph font-[500] text-base text-secondary/80 mb-12">
                  Reach out to us through any of the following channels, or fill out the form and we'll get back to you within 24 hours.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-semibold text-foreground mb-2 tracking-wide">
                        Mail
                      </h3>
                      <a
                        href="mailto:contact@bitsinetwork.com"
                        className="font-paragraph text-sm text-secondary hover:text-primary transition-colors"
                      >
                        contact@bitsinetwork.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-semibold text-foreground mb-2 tracking-wide">
                        Phone
                      </h3>
                      <a
                        href="tel:+977 9869539234"
                        className="font-paragraph text-sm text-secondary hover:text-primary transition-colors"
                      >
                        +977 9869539234
                      </a>
                      <br />
                      <span className="font-paragraph text-xs text-secondary">
                        Sunday - Friday, 10:00 AM - 6:00 PM NPT
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-semibold text-foreground mb-2 tracking-wide">
                        Office
                      </h3>
                      <p className="font-paragraph text-sm text-secondary">
                        Bafal, Kathmandu<br />
                        Nepal
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-8 bg-light-gray/30 rounded-lg">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-4 tracking-wide">
                    Business Hours
                  </h3>
                  <div className="space-y-2 font-paragraph text-sm text-secondary">
                    <div className="flex justify-between">
                      <span>Sunday - Friday</span>
                      <span>10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="bg-background border border-light-gray p-8 rounded-lg shadow-sm">
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-6 tracking-wide">
                    Send Us a Message
                  </h2>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-16 text-center"
                    >
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={32} className="text-primary" />
                      </div>
                      <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                        Message Sent!
                      </h3>
                      <p className="font-paragraph text-base text-secondary">
                        Thank you for contacting us. We'll get back to you soon.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block font-paragraph text-xs font-medium text-foreground mb-2 uppercase tracking-wide"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-light-gray rounded-lg font-paragraph text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                          placeholder=""
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block font-paragraph text-xs font-medium text-foreground mb-2 uppercase tracking-wide"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-light-gray rounded-lg font-paragraph text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                          placeholder="yourname@bitsinetwork.com"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="company"
                          className="block font-paragraph text-xs font-medium text-foreground mb-2 uppercase tracking-wide"
                        >
                          Subject
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-light-gray rounded-lg font-paragraph text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                          placeholder="Subject of your message"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block font-paragraph text-xs font-medium text-foreground mb-2 uppercase tracking-wide"
                        >
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 border border-light-gray rounded-lg font-paragraph text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                          placeholder="Tell us about your project or inquiry..."
                        />
                      </div>

                      {/* Error message display */}
                      {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="font-paragraph text-sm text-red-600 text-center">
                            {error}
                          </p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-paragraph text-sm font-medium hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin">⏳</span>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={20} />
                          </>
                        )}
                      </button>

                      <p className="font-paragraph text-xs text-secondary text-center">
                        By submitting this form, you agree to our Privacy Policy and Terms of Service.
                      </p>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}