require('dotenv').config();
const mongoose = require('mongoose');
const Company = require('../server/models/Company');
const Job = require('../server/models/Job');
const EducationInstitution = require('../server/models/EducationInstitution');

// Connect to database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleCompanies = [
  {
    name: 'The Times of India',
    type: 'newspaper',
    description: 'India\'s leading English daily newspaper with national and international coverage',
    website: 'https://timesofindia.indiatimes.com',
    contact: {
      email: 'careers@timesgroup.com',
      phone: '+91-22-66353535',
      address: {
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India'
      }
    },
    size: '1000+',
    founded: 1838,
    specializations: ['Journalism', 'Editorial', 'Digital Media'],
    verified: true
  },
  {
    name: 'NDTV',
    type: 'tv-channel',
    description: 'Leading Indian news channel providing 24/7 news coverage',
    website: 'https://www.ndtv.com',
    contact: {
      email: 'careers@ndtv.com',
      address: {
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India'
      }
    },
    size: '501-1000',
    founded: 1988,
    specializations: ['Broadcasting', 'Journalism', 'Video Production'],
    verified: true
  },
  {
    name: 'Edelman India',
    type: 'pr-agency',
    description: 'Global communications firm specializing in public relations and marketing',
    website: 'https://www.edelman.in',
    contact: {
      email: 'careers.india@edelman.com',
      address: {
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India'
      }
    },
    size: '201-500',
    founded: 1952,
    specializations: ['Public Relations', 'Corporate Communications', 'Digital Marketing'],
    verified: true
  },
  {
    name: 'The Wire',
    type: 'online-media',
    description: 'Independent news portal for Indian politics, economy, foreign affairs, and culture',
    website: 'https://thewire.in',
    contact: {
      email: 'editors@thewire.in',
      address: {
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India'
      }
    },
    size: '51-200',
    founded: 2015,
    specializations: ['Online Journalism', 'Digital Media', 'Investigative Reporting'],
    verified: true
  },
  {
    name: 'Ogilvy India',
    type: 'digital-agency',
    description: 'Leading advertising and marketing agency',
    website: 'https://www.ogilvy.co.in',
    contact: {
      email: 'careers.india@ogilvy.com',
      address: {
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India'
      }
    },
    size: '501-1000',
    founded: 1928,
    specializations: ['Advertising', 'Content Creation', 'Digital Marketing', 'Social Media'],
    verified: true
  }
];

const sampleJobs = async (companies) => [
  {
    title: 'Senior Journalist - Politics',
    company: companies[0]._id,
    description: 'We are looking for an experienced journalist to cover political news and developments across India.',
    requirements: ['5+ years of journalism experience', 'Strong writing skills', 'Knowledge of Indian politics', 'Bachelor\'s degree in Journalism or related field'],
    responsibilities: ['Cover political events', 'Conduct interviews', 'Write news articles and analysis', 'Meet daily deadlines'],
    category: 'journalism',
    type: 'full-time',
    experience: { min: 5, max: 10, required: true },
    salary: { min: 600000, max: 1200000, currency: 'INR', negotiable: true },
    location: { city: 'New Delhi', state: 'Delhi', country: 'India', remote: false },
    skills: ['News Writing', 'Research', 'Interviewing', 'Political Analysis'],
    education: { level: 'Bachelor\'s', field: 'Journalism/Mass Communication' },
    benefits: ['Health Insurance', 'Press Card', 'Travel Allowance'],
    status: 'active'
  },
  {
    title: 'Video Producer',
    company: companies[1]._id,
    description: 'Join our video production team to create compelling visual stories for our digital platforms.',
    requirements: ['3+ years in video production', 'Proficiency in Adobe Premiere Pro', 'Strong storytelling skills', 'Ability to work under pressure'],
    responsibilities: ['Produce video content', 'Edit and post-produce videos', 'Coordinate with reporters and anchors', 'Manage video equipment'],
    category: 'video-production',
    type: 'full-time',
    experience: { min: 3, max: 7, required: true },
    salary: { min: 500000, max: 900000, currency: 'INR', negotiable: true },
    location: { city: 'New Delhi', state: 'Delhi', country: 'India', remote: false },
    skills: ['Video Editing', 'Adobe Premiere Pro', 'Storytelling', 'Camera Operation'],
    education: { level: 'Bachelor\'s', field: 'Film/Media Production' },
    benefits: ['Health Insurance', 'Equipment Allowance', 'Creative Freedom'],
    status: 'active'
  },
  {
    title: 'PR Account Manager',
    company: companies[2]._id,
    description: 'Manage client accounts and develop strategic PR campaigns for leading brands.',
    requirements: ['4+ years in PR or communications', 'Experience managing client relationships', 'Excellent written and verbal communication', 'Bachelor\'s degree in PR or Communications'],
    responsibilities: ['Manage client accounts', 'Develop PR strategies', 'Write press releases and media pitches', 'Build media relationships'],
    category: 'pr',
    type: 'full-time',
    experience: { min: 4, max: 8, required: true },
    salary: { min: 700000, max: 1500000, currency: 'INR', negotiable: true },
    location: { city: 'Mumbai', state: 'Maharashtra', country: 'India', remote: false },
    skills: ['Public Relations', 'Media Relations', 'Strategic Planning', 'Client Management'],
    education: { level: 'Bachelor\'s', field: 'PR/Communications' },
    benefits: ['Health Insurance', 'Performance Bonus', 'Work from Home Options'],
    status: 'active'
  },
  {
    title: 'Content Editor',
    company: companies[3]._id,
    description: 'Edit and curate content for our online news platform covering politics, economy, and culture.',
    requirements: ['3+ years of editorial experience', 'Strong editing skills', 'Knowledge of SEO', 'Bachelor\'s in Journalism or English'],
    responsibilities: ['Edit articles for clarity and accuracy', 'Manage editorial calendar', 'Coordinate with writers', 'Ensure quality standards'],
    category: 'editorial',
    type: 'full-time',
    experience: { min: 3, max: 6, required: true },
    salary: { min: 450000, max: 750000, currency: 'INR', negotiable: true },
    location: { city: 'New Delhi', state: 'Delhi', country: 'India', remote: true },
    skills: ['Editing', 'Content Management', 'SEO', 'AP Style'],
    education: { level: 'Bachelor\'s', field: 'Journalism/English' },
    benefits: ['Health Insurance', 'Remote Work', 'Flexible Hours'],
    status: 'active'
  },
  {
    title: 'Social Media Manager',
    company: companies[4]._id,
    description: 'Lead social media strategy and execution for major brand accounts.',
    requirements: ['2+ years in social media management', 'Experience with all major platforms', 'Creative thinking', 'Data analysis skills'],
    responsibilities: ['Develop social media strategies', 'Create content calendars', 'Manage social media accounts', 'Analyze performance metrics'],
    category: 'social-media',
    type: 'full-time',
    experience: { min: 2, max: 5, required: true },
    salary: { min: 400000, max: 800000, currency: 'INR', negotiable: true },
    location: { city: 'Mumbai', state: 'Maharashtra', country: 'India', remote: false },
    skills: ['Social Media Marketing', 'Content Creation', 'Analytics', 'Community Management'],
    education: { level: 'Bachelor\'s', field: 'Marketing/Communications' },
    benefits: ['Health Insurance', 'Creative Environment', 'Learning Opportunities'],
    status: 'active'
  }
];

const sampleEducationInstitutions = [
  {
    name: 'Indian Institute of Journalism & New Media',
    type: 'institute',
    programs: [
      {
        name: 'Post Graduate Diploma in Journalism',
        degree: 'diploma',
        duration: '1 year',
        specialization: ['Print Journalism', 'Broadcast Journalism', 'Digital Journalism'],
        fees: { amount: 350000, currency: 'INR' },
        eligibility: 'Bachelor\'s degree in any discipline'
      }
    ],
    location: { city: 'Bangalore', state: 'Karnataka', country: 'India' },
    contact: {
      email: 'admissions@iijnm.org',
      phone: '+91-80-25467678',
      website: 'https://www.iijnm.org',
      address: 'Bangalore, Karnataka'
    },
    accreditation: ['Recognized by industry'],
    established: 2001,
    description: 'Premier institute for journalism and new media education',
    facilities: ['Studio', 'Newsroom', 'Library', 'Computer Lab'],
    placements: {
      hasPlacement: true,
      averagePackage: 400000,
      topRecruiters: ['The Hindu', 'NDTV', 'CNN-News18']
    }
  },
  {
    name: 'Xavier Institute of Communications',
    type: 'institute',
    programs: [
      {
        name: 'Post Graduate Diploma in Mass Media',
        degree: 'diploma',
        duration: '2 years',
        specialization: ['Journalism', 'Advertising', 'Public Relations', 'New Media'],
        fees: { amount: 400000, currency: 'INR' },
        eligibility: 'Bachelor\'s degree with 50% marks'
      }
    ],
    location: { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
    contact: {
      email: 'xicadmissions@gmail.com',
      phone: '+91-22-26601170',
      website: 'https://xaviercomm.org',
      address: 'Mumbai, Maharashtra'
    },
    accreditation: ['UGC Recognized'],
    established: 1956,
    description: 'One of India\'s oldest and most respected mass communication institutes',
    facilities: ['TV Studio', 'Radio Station', 'Editing Suites', 'Photography Lab'],
    placements: {
      hasPlacement: true,
      averagePackage: 450000,
      topRecruiters: ['Times Group', 'HT Media', 'Ogilvy']
    }
  },
  {
    name: 'Symbiosis Institute of Media and Communication',
    type: 'institute',
    programs: [
      {
        name: 'Bachelor of Arts in Journalism and Mass Communication',
        degree: 'bachelors',
        duration: '3 years',
        specialization: ['Journalism', 'Advertising', 'Films and Video Production'],
        fees: { amount: 500000, currency: 'INR' },
        eligibility: '12th pass with 50% marks'
      }
    ],
    location: { city: 'Pune', state: 'Maharashtra', country: 'India' },
    contact: {
      email: 'simc@symbiosis.ac.in',
      phone: '+91-20-25655065',
      website: 'https://www.siu.edu.in/simc',
      address: 'Pune, Maharashtra'
    },
    accreditation: ['UGC Approved', 'NAAC A+ Grade'],
    established: 1990,
    description: 'Premier media and communication institute under Symbiosis International University',
    facilities: ['Broadcast Studio', 'Production House', 'Newsroom', 'Digital Lab'],
    placements: {
      hasPlacement: true,
      averagePackage: 500000,
      topRecruiters: ['Zee Media', 'India Today Group', 'Red Chillies Entertainment']
    }
  }
];

const seedDatabase = async () => {
  try {
    console.log('Starting database seed...');

    // Clear existing data
    await Company.deleteMany({});
    await Job.deleteMany({});
    await EducationInstitution.deleteMany({});
    console.log('Cleared existing data');

    // Insert companies
    const companies = await Company.insertMany(sampleCompanies);
    console.log(`Inserted ${companies.length} companies`);

    // Insert jobs
    const jobs = await Job.insertMany(await sampleJobs(companies));
    console.log(`Inserted ${jobs.length} jobs`);

    // Update company active jobs count
    for (const company of companies) {
      const jobCount = jobs.filter(j => j.company.toString() === company._id.toString()).length;
      await Company.findByIdAndUpdate(company._id, { activeJobs: jobCount });
    }

    // Insert education institutions
    const institutions = await EducationInstitution.insertMany(sampleEducationInstitutions);
    console.log(`Inserted ${institutions.length} education institutions`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
