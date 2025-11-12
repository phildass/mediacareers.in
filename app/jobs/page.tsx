import Link from 'next/link';
import { Briefcase, MapPin, Clock, IndianRupee, Filter } from 'lucide-react';

export default function JobsPage() {
  const jobs = [
    {
      id: 1,
      title: 'Senior Journalist',
      company: 'The Times of India',
      location: 'Mumbai, Maharashtra',
      type: 'Full-time',
      salary: '₹8-12 LPA',
      posted: '2 days ago',
      category: 'Journalism',
      description: 'Looking for an experienced journalist to cover business and finance news.',
    },
    {
      id: 2,
      title: 'Content Editor',
      company: 'NDTV',
      location: 'New Delhi',
      type: 'Full-time',
      salary: '₹6-10 LPA',
      posted: '3 days ago',
      category: 'Editing',
      description: 'Seeking a content editor for our digital news platform.',
    },
    {
      id: 3,
      title: 'PR Manager',
      company: 'Edelman India',
      location: 'Bangalore, Karnataka',
      type: 'Full-time',
      salary: '₹10-15 LPA',
      posted: '1 week ago',
      category: 'PR & Communications',
      description: 'Managing PR campaigns for technology and startup clients.',
    },
    {
      id: 4,
      title: 'Corporate Communications Specialist',
      company: 'Tata Consultancy Services',
      location: 'Hyderabad, Telangana',
      type: 'Full-time',
      salary: '₹7-11 LPA',
      posted: '4 days ago',
      category: 'Corporate Communications',
      description: 'Handle internal and external communications for TCS India.',
    },
    {
      id: 5,
      title: 'Video Content Creator',
      company: 'The Viral Fever (TVF)',
      location: 'Mumbai, Maharashtra',
      type: 'Full-time',
      salary: '₹5-8 LPA',
      posted: '5 days ago',
      category: 'Content Creation',
      description: 'Create engaging video content for digital platforms.',
    },
    {
      id: 6,
      title: 'Social Media Manager',
      company: 'Ogilvy India',
      location: 'Mumbai, Maharashtra',
      type: 'Full-time',
      salary: '₹6-9 LPA',
      posted: '1 week ago',
      category: 'Social Media',
      description: 'Manage social media strategy for major brand accounts.',
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
              <Link href="/jobs" className="text-primary font-semibold">Find Jobs</Link>
              <Link href="/companies" className="text-gray-700 hover:text-primary transition">Companies</Link>
              <Link href="/about" className="text-gray-700 hover:text-primary transition">About</Link>
              <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition">
                Post a Job
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Filters</h2>
                <Filter className="h-5 w-5 text-gray-500" />
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Job Type</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-gray-700">Full-time</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-gray-700">Part-time</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-gray-700">Contract</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-gray-700">Freelance</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Category</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-gray-700">Journalism</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-gray-700">Editing</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-gray-700">PR & Communications</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-gray-700">Content Creation</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Location</h3>
                  <input
                    type="text"
                    placeholder="Search location..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition">
                  Apply Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Job Listings */}
          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Media Jobs in India</h1>
              <p className="text-gray-600">Showing {jobs.length} jobs • AI-powered recommendations</p>
            </div>

            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow hover:shadow-md transition p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                      <p className="text-lg text-gray-700">{job.company}</p>
                    </div>
                    <span className="bg-blue-100 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {job.category}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{job.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {job.type}
                    </div>
                    <div className="flex items-center">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.posted}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition">
                      Apply Now
                    </button>
                    <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition">
                      Save Job
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
                <button className="px-4 py-2 bg-primary text-white rounded-lg">1</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
