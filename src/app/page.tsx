import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "Queata Batery Traders | Solar & Battery Solutions",
  description: "Explore our premium solar and battery solutions tailored for your energy needs.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pt-20">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12">
               <Image src="/images/logo/queata_logo.png" alt="Queata Batery Traders Logo" fill className="object-contain" priority/>
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight hidden sm:block">Queata Batery Traders</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="#how-it-works" className="hidden md:block text-slate-600 hover:text-orange-500 font-medium transition-colors">How It Works</Link>
            <Link href="#testimonials" className="hidden md:block text-slate-600 hover:text-orange-500 font-medium transition-colors">Reviews</Link>
            <Link href="/auth/signin" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transform hover:-translate-y-0.5">
              Log In To Portal
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden mx-4 sm:mx-6 lg:mx-8 rounded-3xl mt-4">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero_bg.png" alt="Hero Background" fill style={{ objectFit: 'cover' }} quality={100} priority />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm">
               <span className="text-blue-300 font-semibold text-sm">#1 Rated Solar Provider in the Region</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
              Power Your Life With <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">Clean Energy</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed font-light">
              Join thousands of homeowners achieving complete energy independence. Industry-leading solar panels and smart battery storage, installed beautifully.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signup" className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-xl shadow-blue-600/30 text-lg group">
                Get Your Free Quote 
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
              <Link href="#solutions" className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl backdrop-blur-md border border-white/20 transition-all duration-300 text-lg">
                View Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Benefits Section */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-200">
               <div className="p-4">
                  <h4 className="text-4xl font-extrabold text-slate-900 mb-2">10k+</h4>
                  <p className="text-slate-500 font-medium">Installations Completed</p>
               </div>
               <div className="p-4">
                  <h4 className="text-4xl font-extrabold text-slate-900 mb-2">25 Yrs</h4>
                  <p className="text-slate-500 font-medium">Equipment Warranty</p>
               </div>
               <div className="p-4">
                  <h4 className="text-4xl font-extrabold text-slate-900 mb-2">100%</h4>
                  <p className="text-slate-500 font-medium">Energy Independence</p>
               </div>
               <div className="p-4 flex flex-col items-center justify-center">
                  <div className="flex text-yellow-400 mb-2">
                     {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                     ))}
                  </div>
                  <p className="text-slate-500 font-medium">5-Star Customer Rating</p>
               </div>
            </div>
         </div>
      </section>

      {/* Services Showcase */}
      <section id="solutions" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Our Expertise</span>
            <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl mb-6">Premium Solar Solutions</h2>
            <p className="text-xl text-slate-600">We provide end-to-end solar configurations tailored to residential and grand-scale commercial deployments.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Card 1: Solar */}
            <div className="group bg-slate-50 rounded-3xl p-10 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10 w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/30">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Solar Modules</h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">High-efficiency, durable solar arrays designed to capture maximum yield regardless of your climate.</p>
              <ul className="space-y-4">
                 <li className="flex items-center text-slate-700 font-medium"><svg className="w-6 h-6 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> Monocrystalline 400W+ Panels</li>
                 <li className="flex items-center text-slate-700 font-medium"><svg className="w-6 h-6 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> Seamless Roof Integration</li>
                 <li className="flex items-center text-slate-700 font-medium"><svg className="w-6 h-6 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> Commercial Grid Setups</li>
              </ul>
            </div>

            {/* Card 2: Batteries */}
            <div className="group bg-slate-50 rounded-3xl p-10 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10 w-16 h-16 bg-orange-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-orange-500/30">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Battery & Storage</h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">Next-generation lithium-ion packs and bespoke hybrid inverters for total energy independence overnight.</p>
              <ul className="space-y-4">
                 <li className="flex items-center text-slate-700 font-medium"><svg className="w-6 h-6 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> 5kWh - 15kWh Smart Home Batteries</li>
                 <li className="flex items-center text-slate-700 font-medium"><svg className="w-6 h-6 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> Complete Blackout Protection</li>
                 <li className="flex items-center text-slate-700 font-medium"><svg className="w-6 h-6 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> Grid-Tie & Off-Grid Hybrid Inverters</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-slate-900 text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <span className="text-orange-400 font-bold tracking-wider uppercase text-sm mb-2 block">Simplified Process</span>
               <h2 className="text-4xl font-extrabold sm:text-5xl mb-6">How It Works</h2>
               <p className="text-xl text-slate-400">Switching to solar shouldn't be complicated. We handle everything from the initial design to massive grid interconnection.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-12 relative">
               {/* Connecting Line */}
               <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-slate-700 z-0"></div>
               
               <div className="relative z-10 text-center">
                  <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-slate-900 shadow-xl shadow-blue-500/10">
                     <span className="text-3xl font-black text-blue-500">1</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Get a Free Quote</h3>
                  <p className="text-slate-400 leading-relaxed">Reach out via our portal. We’ll analyze your energy bill and map your roof remotely to calculate your exact savings.</p>
               </div>
               <div className="relative z-10 text-center">
                  <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-slate-900 shadow-xl shadow-orange-500/10">
                     <span className="text-3xl font-black text-orange-500">2</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Custom Design</h3>
                  <p className="text-slate-400 leading-relaxed">Our engineers craft a personalized system maximizing your sunlight exposure while preserving your home's aesthetics.</p>
               </div>
               <div className="relative z-10 text-center">
                  <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-slate-900 shadow-xl shadow-green-500/10">
                     <span className="text-3xl font-black text-green-500">3</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Installation</h3>
                  <p className="text-slate-400 leading-relaxed">Our certified crews install the panels and batteries in as little as 1-2 days, handling all city permits and grid approvals.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-slate-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Real Results</span>
               <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl mb-6">Customer Stories</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
               {[
                  { name: "Sarah Jenkins", role: "Residential Owner", location: "Austin, TX", text: "Queata wiped out my $300 electric bill entirely. Their installers were incredibly professional, and the smart battery app is addictive to watch!" },
                  { name: "Michael Roberts", role: "Facility Manager", location: "Denver, CO", text: "We installed a commercial grid on our warehouse roof. The ROI was mapped out perfectly, and they handled all structural permitting seamlessly." },
                  { name: "Elena Gomez", role: "Homeowner", location: "Phoenix, AZ", text: "During the recent blackout, our lights didn't even flicker. The 10kWh battery backup kicked in instantly. Best investment we've ever made." }
               ].map((testimonial, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
                     <div>
                        <div className="flex text-yellow-400 mb-6">
                           {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>)}
                        </div>
                        <p className="text-slate-700 italic mb-8 text-lg">"{testimonial.text}"</p>
                     </div>
                     <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                        <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold text-xl">{testimonial.name[0]}</div>
                        <div>
                           <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                           <p className="text-sm text-slate-500">{testimonial.role} &bull; {testimonial.location}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

       {/* FAQ Section */}
       <section className="py-24 bg-white border-t border-slate-200">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl mb-6">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-6">
               {[
                  { q: "How much money will I actually save?", a: "Most customers see a 70-100% reduction in their monthly energy bills. The exact savings depend on your state’s net metering laws, your roof's sun exposure, and your average consumption." },
                  { q: "Do solar panels work on cloudy days?", a: "Yes! While direct sunlight yields the highest energy production, our high-efficiency panels continue to generate significant power even on overcast days." },
                  { q: "What happens during a power outage?", a: "If you have our Battery Storage system installed, your home will automatically switch to backup power instantly, keeping your essentials running without interruption." },
                  { q: "How long does installation take?", a: "The physical installation usually takes just 1-2 days. Permitting and utility grid connection wait times vary by city." }
               ].map((faq, idx) => (
                  <div key={idx} className="bg-slate-50 p-8 rounded-2xl">
                     <h3 className="text-xl font-bold text-slate-900 mb-3">{faq.q}</h3>
                     <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="bg-blue-600 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">Ready for Energy Independence?</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Get a free, custom solar design and savings estimate without leaving your couch.</p>
            <Link href="/auth/signup" className="inline-block bg-white text-blue-600 font-extrabold py-4 px-10 rounded-xl hover:bg-slate-50 transition-colors shadow-xl text-lg">
               Start My Free Quote
            </Link>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-12 text-center md:text-left mb-12">
            <div>
               <Image src="/images/logo/queata_logo.png" alt="Queata Batery Traders Logo" width={40} height={40} className="object-contain mx-auto md:mx-0 mb-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
               <p className="text-sm">Powering sustainable futures worldwide. Providing industry-grade solar & battery solutions.</p>
            </div>
            <div>
               <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Company</h4>
               <ul className="space-y-2 text-sm">
                  <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
               </ul>
            </div>
            <div>
               <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Legal</h4>
               <ul className="space-y-2 text-sm">
                  <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Warranty Info</Link></li>
               </ul>
            </div>
        </div>
        <div className="text-center pt-8 border-t border-slate-800">
           <p className="text-sm">&copy; {new Date().getFullYear()} Queata Batery Traders. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
