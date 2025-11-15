import Link from 'next/link';
import { Briefcase, Target, Users, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Briefcase className="h-8 w-8 text-primary" />
              <span className="ml-2 text-2xl font-bold text-gray-900">MediaCareers.in</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/jobs" className="text-gray-700 hover:text-primary transition">Find Jobs</Link>
              <Link href="/companies" className="text-gray-700 hover:text-primary transition">Companies</Link>
              <Link href="/about" className="text-primary font-semibold">About</Link>
              <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition">
                Post a Job
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About MediaCareers.in</h1>
        
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <p className="text-lg text-gray-700 mb-4">
            In a fast-paced sector like media and communications, finding the right job requires more than a 
            generic search engine—it demands specialization, intelligence, and speed. MediaCareers.in is designed 
            to meet this exact need, serving as the first dedicated, AI-driven job platform for journalists, 
            editors, PR specialists, corporate communicators, content creators, and other aligned professionals 
            across India.
          </p>
          
          <p className="text-lg text-gray-700 mb-4">
            We understand the unique challenges faced by media professionals in today&apos;s rapidly evolving landscape. 
            Traditional job boards often dilute your search with irrelevant opportunities, wasting precious time. 
            That&apos;s why we built MediaCareers.in—a specialized platform that speaks your language and understands 
            your career aspirations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex items-center mb-4">
              <Target className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700">
              To empower media professionals across India by connecting them with opportunities that truly match 
              their skills, experience, and career goals through intelligent technology and deep industry understanding.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex items-center mb-4">
              <Sparkles className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-700">
              To become India&apos;s premier career platform for the media industry, where every journalist, editor, 
              communicator, and content creator finds their perfect next opportunity powered by AI innovation.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">Why We&apos;re Different</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-2xl mr-2">🎯</span>
              <span><strong>Specialized Focus:</strong> Only media and communications jobs—no noise, no distractions.</span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-2">🤖</span>
              <span><strong>AI-Powered Matching:</strong> Smart algorithms learn your preferences and surface the most relevant opportunities.</span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-2">⚡</span>
              <span><strong>Lightning Fast:</strong> Advanced search technology delivers results in milliseconds.</span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-2">🇮🇳</span>
              <span><strong>India-First:</strong> Built specifically for the Indian media landscape with local insights and connections.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <div className="flex items-center mb-4">
            <Users className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Who We Serve</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Job Seekers</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Journalists & Reporters</li>
                <li>• Editors & Copy Editors</li>
                <li>• PR Specialists</li>
                <li>• Corporate Communicators</li>
                <li>• Content Creators</li>
                <li>• Social Media Managers</li>
                <li>• Communications Strategists</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Employers</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• News Organizations</li>
                <li>• Digital Media Companies</li>
                <li>• PR Agencies</li>
                <li>• Corporate Communications Teams</li>
                <li>• Content Production Studios</li>
                <li>• Marketing Agencies</li>
                <li>• Startups & Tech Companies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
