/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import { Search, Briefcase, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';

export default function Home() {
  const jobCategories = [
    { name: 'Journalism', icon: '📰', count: '150+ jobs' },
    { name: 'Editing', icon: '✏️', count: '80+ jobs' },
    { name: 'PR & Communications', icon: '📢', count: '200+ jobs' },
    { name: 'Corporate Communications', icon: '🏢', count: '120+ jobs' },
    { name: 'Content Creation', icon: '🎬', count: '180+ jobs' },
    { name: 'Social Media', icon: '📱', count: '90+ jobs' },
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Matching',
      description: 'Our intelligent system learns your preferences and suggests the most relevant opportunities.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get instant results from thousands of media jobs across India in milliseconds.',
    },
    {
      icon: Users,
      title: 'Specialized Network',
      description: 'Connect with media professionals, editors, and hiring managers in your field.',
    },
    {
      icon: TrendingUp,
      title: 'Industry Insights',
      description: 'Stay updated with salary trends, skill requirements, and market demands.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-primary" />
              <span className="ml-2 text-2xl font-bold text-gray-900">MediaCareers.in</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/jobs" className="text-gray-700 hover:text-primary transition">Find Jobs</Link>
              <Link href="/companies" className="text-gray-700 hover:text-primary transition">Companies</Link>
              <Link href="/about" className="text-gray-700 hover:text-primary transition">About</Link>
              <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition">
                Post a Job
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Media Career</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            India&apos;s first AI-driven job platform exclusively for journalists, editors, PR specialists, 
            corporate communicators, and content creators. Specialized, intelligent, and lightning fast.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-full shadow-lg p-2 flex items-center">
              <Search className="h-6 w-6 text-gray-400 ml-4" />
              <input
                type="text"
                placeholder="Search for journalism, content writing, PR jobs..."
                className="flex-1 px-4 py-3 outline-none text-gray-700"
              />
              <button className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary-dark transition">
                Search
              </button>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Popular searches: <span className="text-primary cursor-pointer">Senior Editor</span>, 
              <span className="text-primary cursor-pointer ml-2">Content Strategist</span>, 
              <span className="text-primary cursor-pointer ml-2">PR Manager</span>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {jobCategories.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition cursor-pointer border border-gray-200"
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why MediaCareers.in?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Active Job Listings</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-blue-100">Registered Professionals</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Hiring Companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gray-900 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Job?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of media professionals who&apos;ve found their perfect role through our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Create Free Account
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition">
              For Employers
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Briefcase className="h-6 w-6" />
                <span className="ml-2 text-xl font-bold">MediaCareers.in</span>
              </div>
              <p className="text-gray-400">
                India&apos;s first AI-driven job platform for media professionals.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Job Seekers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/jobs" className="hover:text-white">Browse Jobs</Link></li>
                <li><Link href="/companies" className="hover:text-white">Companies</Link></li>
                <li><Link href="/career-advice" className="hover:text-white">Career Advice</Link></li>
                <li><Link href="/salary-guide" className="hover:text-white">Salary Guide</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Employers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/post-job" className="hover:text-white">Post a Job</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/recruitment-solutions" className="hover:text-white">Solutions</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MediaCareers.in. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
