const axios = require('axios');
const cheerio = require('cheerio');
const Job = require('../models/Job');
const Company = require('../models/Company');

// Scraper for job sites
class JobScraper {
  constructor() {
    this.sources = [
      // Add actual job board URLs here
      // Example sources that would be implemented in production:
      // 'https://www.naukri.com/journalism-jobs',
      // 'https://www.linkedin.com/jobs/media-jobs-india',
      // 'https://www.indeed.co.in/Media-jobs',
    ];
  }

  // Generic scraping function (template)
  async scrapeJobBoard(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 10000
      });

      const $ = cheerio.load(response.data);
      const jobs = [];

      // This is a template - actual selectors would depend on the website
      // Each job board would need its own custom scraping logic
      $('.job-listing').each((index, element) => {
        const job = {
          title: $(element).find('.job-title').text().trim(),
          company: $(element).find('.company-name').text().trim(),
          location: $(element).find('.location').text().trim(),
          description: $(element).find('.description').text().trim(),
          url: $(element).find('a').attr('href'),
          scrapedAt: new Date()
        };

        if (job.title && job.company) {
          jobs.push(job);
        }
      });

      return jobs;
    } catch (error) {
      console.error(`Error scraping ${url}:`, error.message);
      return [];
    }
  }

  // Save scraped jobs to database
  async saveJobs(jobs) {
    const savedJobs = [];

    for (const jobData of jobs) {
      try {
        // Find or create company
        let company = await Company.findOne({ 
          name: new RegExp(`^${jobData.company}$`, 'i') 
        });

        if (!company) {
          company = await Company.create({
            name: jobData.company,
            type: 'other',
            description: `Company information will be updated`,
            activeJobs: 1
          });
        }

        // Check if job already exists
        const existingJob = await Job.findOne({
          title: jobData.title,
          company: company._id,
          'source.url': jobData.url
        });

        if (!existingJob) {
          const job = await Job.create({
            title: jobData.title,
            company: company._id,
            description: jobData.description,
            location: {
              city: jobData.location
            },
            category: this.categorizeJob(jobData.title, jobData.description),
            applicationUrl: jobData.url,
            postedBy: 'scraper',
            source: {
              url: jobData.url,
              scrapedAt: jobData.scrapedAt
            },
            status: 'active'
          });

          savedJobs.push(job);
        }
      } catch (error) {
        console.error(`Error saving job ${jobData.title}:`, error.message);
      }
    }

    return savedJobs;
  }

  // Categorize job based on title and description
  categorizeJob(title, description) {
    const text = `${title} ${description}`.toLowerCase();

    if (text.includes('journalist') || text.includes('reporter')) {
      return 'journalism';
    } else if (text.includes('editor') || text.includes('editorial')) {
      return 'editorial';
    } else if (text.includes('digital') || text.includes('online')) {
      return 'digital-media';
    } else if (text.includes('pr ') || text.includes('public relations')) {
      return 'pr';
    } else if (text.includes('corporate communications') || text.includes('internal communications')) {
      return 'corporate-communications';
    } else if (text.includes('content') || text.includes('writer')) {
      return 'content-creation';
    } else if (text.includes('social media')) {
      return 'social-media';
    } else if (text.includes('broadcast') || text.includes('tv') || text.includes('radio')) {
      return 'broadcasting';
    } else if (text.includes('photo') || text.includes('camera')) {
      return 'photography';
    } else if (text.includes('video') || text.includes('production')) {
      return 'video-production';
    }

    return 'other';
  }

  // Run scraper for all sources
  async scrapeAll() {
    console.log('Starting job scraping...');
    let allJobs = [];

    for (const source of this.sources) {
      console.log(`Scraping ${source}...`);
      const jobs = await this.scrapeJobBoard(source);
      allJobs = allJobs.concat(jobs);
    }

    console.log(`Scraped ${allJobs.length} jobs`);

    if (allJobs.length > 0) {
      const savedJobs = await this.saveJobs(allJobs);
      console.log(`Saved ${savedJobs.length} new jobs to database`);
      return savedJobs;
    }

    return [];
  }
}

// Export singleton instance
module.exports = new JobScraper();
