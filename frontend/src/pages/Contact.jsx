import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <>
      <SEO title="Contact Us" description="Get in touch with RSIIT for admissions, inquiries, or support." />

      <div className="min-h-screen bg-slate-50">
        <section className="bg-primary text-white pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6 font-heading"
            >
              Contact Us
            </motion.h1>
          </div>
        </section>

        <section className="section-padding px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6 font-heading">Get in Touch</h2>
                <p className="text-slate-600 text-lg">Have questions? We're here to help.</p>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-1">Visit Us</h3>
                  <p className="text-slate-600">123 University Ave, Tech City, ST 12345</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-1">Email Us</h3>
                  <p className="text-slate-600">admissions@rsiit.edu</p>
                  <p className="text-slate-600">info@rsiit.edu</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-1">Call Us</h3>
                  <p className="text-slate-600">+1 (555) 123-4567</p>
                  <p className="text-slate-600">Mon - Fri, 9am - 5pm</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="label">First Name</label>
                    <input type="text" className="input" placeholder="John" />
                  </div>
                  <div>
                    <label className="label">Last Name</label>
                    <input type="text" className="input" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="label">Email</label>
                  <input type="email" className="input" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="label">Message</label>
                  <textarea rows="4" className="input" placeholder="How can we help you?"></textarea>
                </div>
                <button type="button" className="w-full btn-primary">Send Message</button>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
