const { OpenAI } = require('openai');
const pdfParse = require('pdf-parse');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Parse resume from PDF
exports.parseResume = async (fileBuffer) => {
  try {
    const data = await pdfParse(fileBuffer);
    const text = data.text;

    // Use OpenAI to extract structured data from resume
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert resume parser for media professionals. Extract key information from the resume and return it as a JSON object with the following structure:
{
  "name": "Full Name",
  "email": "email@example.com",
  "phone": "phone number",
  "currentRole": "Current Job Title",
  "experience": {
    "years": number,
    "months": number
  },
  "skills": ["skill1", "skill2"],
  "education": "Highest education",
  "workHistory": [
    {
      "company": "Company Name",
      "role": "Role Title",
      "duration": "Duration",
      "description": "Brief description"
    }
  ],
  "location": "City, State",
  "preferredRoles": ["role1", "role2"],
  "summary": "Professional summary"
}`
        },
        {
          role: "user",
          content: `Parse this resume:\n\n${text}`
        }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    const parsedData = JSON.parse(completion.choices[0].message.content);
    return {
      success: true,
      data: parsedData,
      rawText: text
    };
  } catch (error) {
    console.error('Error parsing resume:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Match jobs to user profile using AI
exports.matchJobs = async (userProfile, jobs) => {
  try {
    const jobsList = jobs.map(job => ({
      id: job._id,
      title: job.title,
      company: job.company.name,
      description: job.description,
      requirements: job.requirements,
      category: job.category,
      experience: job.experience,
      location: job.location
    }));

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an AI job matching expert for media professionals. Analyze the candidate's profile and score each job based on relevance. Return a JSON array of job IDs ranked by match score (0-100) with brief reasons.
Format: [{"jobId": "id", "score": number, "reason": "brief explanation"}]`
        },
        {
          role: "user",
          content: `Candidate Profile:\n${JSON.stringify(userProfile, null, 2)}\n\nAvailable Jobs:\n${JSON.stringify(jobsList, null, 2)}`
        }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    const matches = JSON.parse(completion.choices[0].message.content);
    return {
      success: true,
      matches: matches.matches || matches
    };
  } catch (error) {
    console.error('Error matching jobs:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Generate tailored resume for specific job
exports.generateTailoredResume = async (userProfile, jobDetails) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert resume writer for media professionals. Create a tailored resume that highlights the candidate's most relevant experience and skills for the specific job. Return the resume in a clean, professional format."
        },
        {
          role: "user",
          content: `Create a tailored resume for this candidate:\n${JSON.stringify(userProfile, null, 2)}\n\nFor this job:\nTitle: ${jobDetails.title}\nCompany: ${jobDetails.company}\nDescription: ${jobDetails.description}\nRequirements: ${jobDetails.requirements.join(', ')}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    return {
      success: true,
      resume: completion.choices[0].message.content
    };
  } catch (error) {
    console.error('Error generating tailored resume:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Generate cover letter
exports.generateCoverLetter = async (userProfile, jobDetails) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert cover letter writer for media professionals. Create a compelling, personalized cover letter that showcases why the candidate is an excellent fit for the position. Keep it concise (250-300 words) and professional."
        },
        {
          role: "user",
          content: `Create a cover letter for this candidate:\nName: ${userProfile.name}\nCurrent Role: ${userProfile.profile?.currentRole}\nExperience: ${userProfile.profile?.experience?.years} years\nSkills: ${userProfile.profile?.skills?.join(', ')}\n\nFor this job:\nTitle: ${jobDetails.title}\nCompany: ${jobDetails.company}\nDescription: ${jobDetails.description}`
        }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    return {
      success: true,
      coverLetter: completion.choices[0].message.content
    };
  } catch (error) {
    console.error('Error generating cover letter:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Provide career advice
exports.getCareerAdvice = async (userProfile, question) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a senior media industry professional providing career advice. Give practical, actionable guidance based on the candidate's profile and their specific question. Be encouraging but realistic."
        },
        {
          role: "user",
          content: `Candidate Profile:\nName: ${userProfile.name}\nCurrent Role: ${userProfile.profile?.currentRole}\nExperience: ${userProfile.profile?.experience?.years} years ${userProfile.profile?.experience?.months} months\nSkills: ${userProfile.profile?.skills?.join(', ')}\n\nQuestion: ${question}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    return {
      success: true,
      advice: completion.choices[0].message.content
    };
  } catch (error) {
    console.error('Error getting career advice:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Assess job fit
exports.assessJobFit = async (userProfile, jobDetails) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Analyze how well the candidate fits the job. Return a JSON object with:
{
  "fitScore": number (0-100),
  "strengths": ["strength1", "strength2"],
  "gaps": ["gap1", "gap2"],
  "recommendation": "brief recommendation",
  "verdict": "excellent|good|fair|poor"
}`
        },
        {
          role: "user",
          content: `Candidate:\n${JSON.stringify(userProfile, null, 2)}\n\nJob:\nTitle: ${jobDetails.title}\nRequirements: ${jobDetails.requirements.join(', ')}\nExperience Required: ${jobDetails.experience?.min}-${jobDetails.experience?.max} years`
        }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    const assessment = JSON.parse(completion.choices[0].message.content);
    return {
      success: true,
      assessment
    };
  } catch (error) {
    console.error('Error assessing job fit:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
