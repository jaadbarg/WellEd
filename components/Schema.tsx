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
    "email": "contact@thesatcrashcourse.com",
    "telephone": "+1-800-SAT-PREP",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Los Angeles",
      "addressRegion": "CA",
      "addressCountry": "US"
    }
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
      "availability": "https://schema.org/InStock",
      "price": "5000",
      "priceCurrency": "USD"
    },
    "courseCode": "SAT-CRASH-COURSE-2025",
    "timeRequired": "P8W",
    "educationalCredentialAwarded": "SAT Preparation Certificate"
  };
  
  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Digital SAT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Digital SAT is the new format of the SAT exam that is taken on a computer or tablet. It features adaptive testing, shorter testing time, and built-in tools like a calculator for all math questions."
        }
      },
      {
        "@type": "Question",
        "name": "How long is the Digital SAT Crash Course?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our comprehensive Digital SAT Crash Course is designed to be completed in 8 weeks, with personalized pacing options available based on your test date and preparation needs."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer personalized tutoring?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer personalized one-on-one tutoring with our expert SAT instructors who can focus on your specific needs and areas for improvement."
        }
      },
      {
        "@type": "Question",
        "name": "How many practice tests are included?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our program includes 10 full-length, adaptive Digital SAT practice tests that simulate the real exam experience, plus additional section-specific practice tests."
        }
      },
      {
        "@type": "Question",
        "name": "What's your average score improvement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Students who complete our full Digital SAT Crash Course see an average improvement of 150+ points, with many students improving by 200+ points."
        }
      }
    ]
  };

  // LocalBusiness Schema for rich results
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "The SAT Crash Course",
    "image": "https://thesatcrashcourse.com/wp-content/uploads/2024/01/the-sat-crash-course-logo.png",
    "url": "https://thesatcrashcourse.com",
    "telephone": "+1-800-SAT-PREP",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Education Ave",
      "addressLocality": "Los Angeles",
      "addressRegion": "CA",
      "postalCode": "90001",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.052235,
      "longitude": -118.243683
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    },
    "priceRange": "$$$"
  };
  
  // Review schema
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Course",
      "name": "Digital SAT Crash Course",
      "url": "https://thesatcrashcourse.com/courses/digital-sat"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4.9",
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": "Alexander Chen"
    },
    "reviewBody": "The Digital SAT Crash Course helped me increase my score by 200 points! The practice tests were incredibly realistic and the personalized study plan was exactly what I needed to stay on track."
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
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
    </>
  );
}