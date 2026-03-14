import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">IssueTracker</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="text-slate-600 hover:text-slate-900 font-medium px-4 py-2 transition-colors">
                Login
              </Link>
              <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-indigo-200 active:scale-95">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Track issues, ship faster.
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            The modern issue tracker designed for high-performance teams. 
            Organize projects, manage bugs, and stay focused on what matters.
          </p>
          <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 active:scale-95 inline-block">
            Start Tracking Issues
          </Link>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need</h2>
            <p className="text-slate-500">Built to handle the velocity of modern engineering.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon="🚀"
              title="Organize Projects"
              description="Keep all your tasks and bugs organized by project for better visibility. "
            />
            <FeatureCard 
              icon="🐛"
              title="Track Bugs Easily"
              description="Capture detailed reports and follow them from report to resolution."
            />
            <FeatureCard 
              icon="🔥"
              title="Manage Priorities"
              description="Focus on what matters most with clear priority levels and tags."
            />
          </div>
        </div>
      </section>

      {/* Usage Section */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How it works</h2>
            <p className="text-slate-500">Streamlined workflow from discovery to deployment.</p>
          </div>
          <div className="space-y-24">
            <Step 
              number="01"
              title="Create a Project"
              description="Set up your workspace in seconds. Define your project scope and invite your team members."
              align="left"
            />
            <Step 
              number="02"
              title="Add Issues"
              description="Quickly capture bugs, feature requests, or tasks. Assign priorities and add descriptive tags."
              align="right"
            />
            <Step 
              number="03"
              title="Track Progress"
              description="Monitor resolution times and project health with our intuitive spreadsheet-like table interface."
              align="left"
            />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-indigo-400 text-5xl mb-8">"</div>
          <p className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed italic">
            "Finally a simple issue tracker that doesn't feel bloated. It focuses on speed and clarity, making it a joy to use everyday."
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 bg-slate-700 rounded-full border-2 border-indigo-400"></div>
            <div className="text-left">
              <div className="font-bold">Alex Rivera</div>
              <div className="text-indigo-300 text-sm">Lead Engineer @ TechFlow</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center">
            <div className="h-6 w-6 bg-slate-900 rounded flex items-center justify-center mr-2">
              <span className="text-white text-xs font-bold font-sans">I</span>
            </div>
            <span className="font-bold text-slate-900">IssueTracker</span>
          </div>
          <div className="flex space-x-8 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-indigo-600 transition-colors">GitHub</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">About</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
          </div>
          <p className="text-xs text-slate-400">© 2026 IssueTracker Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-8 bg-slate-50 rounded-3xl border border-transparent hover:border-indigo-100 hover:bg-white transition-all hover:shadow-xl hover:shadow-indigo-50 group">
    <div className="text-4xl mb-6 group-hover:scale-110 transition-transform origin-left">{icon}</div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{description}</p>
  </div>
);

const Step = ({ number, title, description, align }) => (
  <div className={`flex flex-col md:flex-row items-center ${align === 'right' ? 'md:flex-row-reverse' : ''} gap-12`}>
    <div className="flex-1">
      <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-2xl font-bold text-indigo-600 mb-6 border border-slate-100">
        {number}
      </div>
      <h3 className="text-3xl font-bold mb-4">{title}</h3>
      <p className="text-lg text-slate-600 leading-relaxed max-w-md">{description}</p>
    </div>
    <div className="flex-1 w-full aspect-video bg-white rounded-3xl shadow-2xl shadow-indigo-100 border border-slate-100 p-4 transition-transform hover:scale-[1.02]">
      <div className="w-full h-full bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 font-mono text-sm overflow-hidden">
        {/* Placeholder for screenshot - logic would be to use real screenshots later */}
        <div className="p-8 space-y-4 w-full">
           <div className="h-4 w-1/3 bg-slate-200 rounded animate-pulse"></div>
           <div className="h-20 w-full bg-slate-100 rounded border border-slate-200 p-4 space-y-2">
              <div className="h-2 w-3/4 bg-slate-200 rounded"></div>
              <div className="h-2 w-1/2 bg-slate-200 rounded"></div>
           </div>
           <div className="h-20 w-full bg-white rounded border border-indigo-100 p-4 space-y-2 shadow-sm">
              <div className="h-2 w-full bg-indigo-50 rounded"></div>
              <div className="h-2 w-2/3 bg-indigo-50 rounded"></div>
           </div>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
