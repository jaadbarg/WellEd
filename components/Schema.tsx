'use client';

export default function Schema() {
  // JSON-LD structured data for educational organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "The SAT Crash Course",
    "url": "https://thesatcrashcourse.com",
    "logo": "https://thesatcrashcourse.com/wp-content/uploads/2024/01/the-sat-crash-course-logo.png",
    "sameAs": [
      "https://www.facebook.com/thesatcrashcourse",
      "https://www.instagram.com/thesatcrashcourse",
      "https://twitter.com/satcrashcourse"
    ],
    "description": "Top quality Digital SAT practice tests and prep courses to help students achieve their dream scores.",
  };

  // JSON-LD structured data for course
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Digital SAT Crash Course",
    "description": "Comprehensive preparation for the Digital SAT exam with practice tests, personalized learning, and expert guidance.",
    "provider": {
      "@type": "Organization",
      "name": "The SAT Crash Course",
      "sameAs": "https://thesatcrashcourse.com"
    },
    "offers": {
      "@type": "Offer",
      "category": "Premium SAT Preparation",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
    </>
  );
}