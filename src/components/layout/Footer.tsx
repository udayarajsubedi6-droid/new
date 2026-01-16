// src/components/layout/Footer.tsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 px-6">
      <div className="max-w-[120rem] mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-heading text-2xl font-bold mb-4">BITSI</h3>
            <p className="font-paragraph text-sm text-light-gray/70">
              Next-generation enterprise IT solutions for modern businesses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="font-paragraph text-sm text-light-gray/70 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="font-paragraph text-sm text-light-gray/70 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="font-paragraph text-sm text-light-gray/70 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          {/* <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="font-paragraph text-sm text-light-gray/70">Cloud Infrastructure</li>
              <li className="font-paragraph text-sm text-light-gray/70">Cybersecurity</li>
              <li className="font-paragraph text-sm text-light-gray/70">Data Analytics</li>
            </ul>
          </div> */}

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="font-paragraph text-sm text-light-gray/70 hover:text-white transition-colors">
                  Get in Touch
                </Link>
              </li>
              <li>
                <Link to="/careers" className="font-paragraph text-sm text-light-gray/70 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-light-gray/20 pt-8">
          <p className="font-paragraph text-sm text-light-gray/50 text-center">
            © {new Date().getFullYear()} BITSI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}