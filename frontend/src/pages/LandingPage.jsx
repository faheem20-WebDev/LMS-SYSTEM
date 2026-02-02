import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Award, Calendar, CheckCircle, ChevronRight, Star } from 'lucide-react';
import SEO from '../components/SEO';

const LandingPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <>
      <SEO />
      
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center bg-primary overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 z-0">
           <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-blue-900/20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
           <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-highlight/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-highlight font-semibold tracking-wider uppercase mb-4 block">Welcome to RSIIT</span>
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Shape Your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-highlight to-teal-200">Future Here</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-lg leading-relaxed">
                Empowering the next generation of tech leaders with world-class education, research, and innovation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login?tab=admissions" className="btn-primary bg-highlight text-primary hover:bg-teal-400 border-0">
                  Apply Now
                </Link>
                <Link to="/programs" className="px-6 py-3 rounded-lg font-semibold text-white border border-slate-500 hover:bg-white/10 transition-all">
                  Explore Programs
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
               {/* Hero Image Placeholder - Geometric Composition */}
               <div className="relative z-10 bg-gradient-to-tr from-slate-200 to-white rounded-[2rem] h-[500px] w-full shadow-2xl flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5"></div>
                  <div className="text-primary/20 font-bold text-9xl">RSIIT</div>
                  {/* Floating Elements */}
                  <motion.div 
                    animate={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 6 }}
                    className="absolute top-10 right-10 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3"
                  >
                    <div className="bg-green-100 p-2 rounded-full"><CheckCircle className="h-6 w-6 text-green-600"/></div>
                    <div>
                      <div className="text-xs text-slate-500">Admissions</div>
                      <div className="font-bold text-primary">Open Now</div>
                    </div>
                  </motion.div>
               </div>
               {/* Decorative background element */}
               <div className="absolute -bottom-10 -left-10 w-full h-full border-2 border-slate-700/50 rounded-[2rem] -z-10"></div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* About Summary */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6 font-heading">Excellence in Education</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              RSIIT provides a dynamic learning environment where students are encouraged to challenge boundaries and pursue knowledge. Our commitment to academic excellence ensures that our graduates are ready to lead in a rapidly evolving world.
            </p>
            <Link to="/about" className="inline-flex items-center text-highlight font-semibold mt-6 hover:gap-2 transition-all">
              Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "World-Class Curriculum", desc: "Rigorous academic programs designed by industry experts." },
              { icon: Users, title: "Expert Faculty", desc: "Learn from distinguished professors and researchers." },
              { icon: Award, title: "Global Recognition", desc: "Degrees accredited and respected worldwide." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.2 }}
                className="bg-slate-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-primary group-hover:text-white group-hover:bg-primary transition-colors">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
             <div>
               <span className="text-highlight font-semibold uppercase tracking-wider">Academics</span>
               <h2 className="text-3xl lg:text-4xl font-bold text-primary mt-2 font-heading">Our Programs</h2>
             </div>
             <Link to="/programs" className="hidden md:flex items-center text-primary font-semibold hover:text-highlight">
               View All Programs <ArrowRight className="ml-2 h-4 w-4" />
             </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Computer Science",
              "Information Technology",
              "Data Science",
              "Software Engineering",
              "Cyber Security",
              "Artificial Intelligence"
            ].map((prog, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 bg-primary/5 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-primary/20" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">{prog}</h3>
                  <p className="text-slate-500 text-sm mb-4">Bachelor of Science</p>
                  <Link to={`/programs`} className="text-highlight font-medium text-sm flex items-center group">
                    Learn more <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/programs" className="btn-primary w-full justify-center">View All Programs</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-primary text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 w-96 h-96 bg-highlight/10 rounded-full blur-3xl"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
             <motion.div {...fadeInUp}>
               <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-heading">Why Choose RSIIT?</h2>
               <p className="text-slate-300 mb-8 text-lg">
                 We go beyond textbooks. We build careers, character, and community.
               </p>
               <ul className="space-y-6">
                 {[
                   "Industry partnerships offering real-world internships.",
                   "State-of-the-art labs and research facilities.",
                   "A vibrant campus life with 50+ student clubs.",
                   "Career support services with 90% placement rate."
                 ].map((item, idx) => (
                   <li key={idx} className="flex items-start gap-4">
                     <div className="bg-highlight/20 p-1 rounded-full mt-1">
                       <CheckCircle className="h-5 w-5 text-highlight" />
                     </div>
                     <span className="text-slate-200 text-lg">{item}</span>
                   </li>
                 ))}
               </ul>
             </motion.div>
             <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 translate-y-8">
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl h-48 flex flex-col justify-end">
                      <span className="text-4xl font-bold text-highlight">95%</span>
                      <span className="text-sm text-slate-300">Graduation Rate</span>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl h-32 flex flex-col justify-end">
                      <span className="text-4xl font-bold text-highlight">50+</span>
                      <span className="text-sm text-slate-300">Global Partners</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl h-32 flex flex-col justify-end">
                      <span className="text-4xl font-bold text-highlight">12:1</span>
                      <span className="text-sm text-slate-300">Student-Faculty Ratio</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl h-48 flex flex-col justify-end">
                      <span className="text-4xl font-bold text-highlight">#1</span>
                      <span className="text-sm text-slate-300">Tech University in Region</span>
                    </div>
                  </div>
                </div>
             </div>
           </div>
         </div>
      </section>

      {/* Admissions Timeline */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4 font-heading">Admissions Process</h2>
            <p className="text-slate-600">Your journey to RSIIT in 4 simple steps.</p>
          </div>

          <div className="relative">
            {/* Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                { step: "01", title: "Apply Online", desc: "Submit your application via our portal." },
                { step: "02", title: "Document Review", desc: "We verify your academic records." },
                { step: "03", title: "Entrance Exam", desc: "Qualify through our aptitude test." },
                { step: "04", title: "Enrollment", desc: "Pay fees and start your journey." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-white p-6 rounded-xl border border-slate-100 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 ring-4 ring-white">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
               <Link to="/login?tab=admissions" className="btn-primary px-8 py-4 text-lg">Start Your Application</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold text-center text-primary mb-12 font-heading">What Our Students Say</h2>
           <div className="grid md:grid-cols-3 gap-8">
             {[1, 2, 3].map((i) => (
               <motion.div 
                 key={i}
                 whileHover={{ y: -5 }}
                 className="bg-white p-8 rounded-2xl shadow-sm"
               >
                 <div className="flex gap-1 text-accent mb-4">
                   {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                 </div>
                 <p className="text-slate-600 mb-6 italic">
                   "The practical approach to learning at RSIIT helped me land my dream job at a top tech company before I even graduated."
                 </p>
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                   <div>
                     <div className="font-bold text-primary">Student Name</div>
                     <div className="text-xs text-slate-500">Computer Science, '25</div>
                   </div>
                 </div>
               </motion.div>
             ))}
           </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;