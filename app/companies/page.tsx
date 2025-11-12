import Link from 'next/link';
import { Briefcase, Building2, MapPin, Users } from 'lucide-react';

export default function CompaniesPage() {
  const companies = [
    {
      name: 'The Times of India',
      industry: 'Print & Digital Media',
      location: 'Mumbai',
      employees: '5000+',
      openJobs: 12,
      logo: '📰',
    },
    {
      name: 'NDTV',
      industry: 'Broadcast Media',
      location: 'New Delhi',
      employees: '1000+',
      openJobs: 8,
      logo: '📺',
    },
    {
      name: 'Edelman India',
      industry: 'PR & Communications',
      location: 'Mumbai',
      employees: '500+',
      openJobs: 15,
      logo: '📢',
    },
    {
      name: 'The Viral Fever (TVF)',
      industry: 'Digital Content',
      location: 'Mumbai',
      employees: '200+',
      openJobs: 6,
      logo: '🎬',
    },
    {
      name: 'Ogilvy India',
      industry: 'Advertising & Marketing',
      location: 'Mumbai',
      employees: '1500+',
      openJobs: 10,
      logo: '🎨',
    },
    {
      name: 'Tata Consultancy Services',
      industry: 'Corporate Communications',
      location: 'Multiple Cities',
      employees: '50000+',
      openJobs: 5,
      logo: '🏢',
    },
  ];

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
              <Link href="/companies" className="text-primary font-semibold">Companies</Link>
              <Link href="/about" className="text-gray-700 hover:text-primary transition">About</Link>
              <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition">
                Post a Job
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hiring Companies</h1>
          <p className="text-xl text-gray-600">
            Explore top media companies and organizations actively hiring across India
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company, index) => (
            <div key={index} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">{company.logo}</div>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                  {company.openJobs} open jobs
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{company.name}</h3>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 mr-2" />
                  {company.industry}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {company.location}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {company.employees} employees
                </div>
              </div>

              <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition">
                View Jobs
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
