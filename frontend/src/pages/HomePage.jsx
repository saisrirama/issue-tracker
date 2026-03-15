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
              variant="project"
            />
            <Step 
              number="02"
              title="Add Issues"
              description="Quickly capture bugs, feature requests, or tasks. Assign priorities and add descriptive tags."
              align="right"
              variant="issues"
            />
            <Step 
              number="03"
              title="Track Progress"
              description="Monitor resolution times and project health with our intuitive spreadsheet-like table interface."
              align="left"
              variant="progress"
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
            <a href="https://github.com/saisrirama" className="hover:text-indigo-600 transition-colors">My GitHub</a>
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

const Step = ({ number, title, description, align, variant }) => (
  <div className={`flex flex-col md:flex-row items-center ${align === 'right' ? 'md:flex-row-reverse' : ''} gap-12`}>
    <div className="flex-1">
      <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-2xl font-bold text-indigo-600 mb-6 border border-slate-100">
        {number}
      </div>
      <h3 className="text-3xl font-bold mb-4">{title}</h3>
      <p className="text-lg text-slate-600 leading-relaxed max-w-md">{description}</p>
    </div>
    <div className="flex-1 w-full">
      <SampleImage variant={variant} />
    </div>
  </div>
);

const SampleImage = ({ variant }) => (
  <div className="relative aspect-video overflow-hidden rounded-3xl border border-slate-100 bg-white p-4 shadow-2xl shadow-indigo-100 transition-transform hover:scale-[1.02]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.10),_transparent_35%)]" />
    <div className="relative h-full rounded-2xl border border-slate-100 bg-slate-50 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-300" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-emerald-300" />
        </div>
        <div className="h-3 w-24 rounded-full bg-slate-200" />
      </div>
      {variant === "project" && <ProjectMock />}
      {variant === "issues" && <IssueMock />}
      {variant === "progress" && <ProgressMock />}
    </div>
  </div>
);

const ProjectMock = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <div className="h-3 w-28 rounded-full bg-slate-300" />
        <div className="mt-2 h-2 w-40 rounded-full bg-slate-200" />
      </div>
      <div className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white">Create</div>
    </div>
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="h-10 rounded-xl border border-slate-200 bg-slate-50" />
      <div className="h-10 rounded-xl border border-slate-200 bg-slate-50" />
      <div className="flex justify-end">
        <div className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-white">Saved</div>
      </div>
    </div>
  </div>
);

const IssueMock = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <div className="h-3 w-24 rounded-full bg-slate-300" />
        <div className="mt-2 h-2 w-32 rounded-full bg-slate-200" />
      </div>
      <div className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white">New Issue</div>
    </div>
    <div className="grid grid-cols-[1.8fr_1fr_1fr_1fr] gap-3 rounded-2xl bg-slate-200 px-4 py-3">
      <div className="h-3 rounded-full bg-slate-300" />
      <div className="h-3 rounded-full bg-slate-300" />
      <div className="h-3 rounded-full bg-slate-300" />
      <div className="h-3 rounded-full bg-slate-300" />
    </div>
    {[0, 1, 2].map((row) => (
      <div key={row} className="grid grid-cols-[1.8fr_1fr_1fr_1fr] gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
        <div className="space-y-2">
          <div className="h-3 w-4/5 rounded-full bg-slate-200" />
          <div className="h-2 w-2/3 rounded-full bg-slate-100" />
        </div>
        <div className="flex items-center">
          <div className={`h-6 w-20 rounded-full ${row === 0 ? 'bg-rose-100' : row === 1 ? 'bg-amber-100' : 'bg-emerald-100'}`} />
        </div>
        <div className="flex items-center">
          <div className={`h-6 w-16 rounded-full ${row === 0 ? 'bg-indigo-100' : row === 1 ? 'bg-sky-100' : 'bg-slate-100'}`} />
        </div>
        <div className="flex items-center">
          <div className="h-3 w-14 rounded-full bg-slate-200" />
        </div>
      </div>
    ))}
  </div>
);

const ProgressMock = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <div className="h-3 w-28 rounded-full bg-slate-300" />
        <div className="mt-2 h-2 w-36 rounded-full bg-slate-200" />
      </div>
      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500">
        This week
      </div>
    </div>
    <div className="grid grid-cols-3 gap-3">
      {[0, 1, 2].map((card) => (
        <div key={card} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="h-2 w-12 rounded-full bg-slate-200" />
          <div className={`mt-3 h-7 w-12 rounded-full ${card === 0 ? 'bg-indigo-100' : card === 1 ? 'bg-emerald-100' : 'bg-amber-100'}`} />
          <div className="mt-3 h-2 w-16 rounded-full bg-slate-100" />
        </div>
      ))}
    </div>
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="h-3 w-32 rounded-full bg-slate-200" />
        <div className="h-2 w-14 rounded-full bg-slate-100" />
      </div>
      <div className="space-y-3">
        <div>
          <div className="mb-2 h-2 w-20 rounded-full bg-slate-200" />
          <div className="h-3 w-full rounded-full bg-slate-100" />
          <div className="-mt-3 h-3 w-4/5 rounded-full bg-indigo-200" />
        </div>
        <div>
          <div className="mb-2 h-2 w-24 rounded-full bg-slate-200" />
          <div className="h-3 w-full rounded-full bg-slate-100" />
          <div className="-mt-3 h-3 w-2/3 rounded-full bg-emerald-200" />
        </div>
        <div>
          <div className="mb-2 h-2 w-16 rounded-full bg-slate-200" />
          <div className="h-3 w-full rounded-full bg-slate-100" />
          <div className="-mt-3 h-3 w-1/2 rounded-full bg-amber-200" />
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
