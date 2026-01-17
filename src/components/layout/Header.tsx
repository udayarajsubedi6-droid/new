
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../images/logo.png'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-light-gray">
      <nav className="max-w-[120rem] mx-auto px-6 md:px-8 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-heading text-2xl font-bold text-foreground">
          <img src={logo} alt="BITSI Logo" className="inline-block h-8 w-auto mr-2" />
           </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-paragraph text-sm font-medium text-secondary hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-light-gray pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="font-paragraph text-base font-medium text-secondary hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}