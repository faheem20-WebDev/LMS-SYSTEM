import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image }) => {
  const siteName = "RSIIT - Rising Star Institute";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const metaDesc = description || "RSIIT is a premier university offering world-class education in technology, innovation, and leadership.";
  const metaKeywords = keywords || "university, education, technology, RSIIT, degree, admissions";
  const metaImage = image || "/og-image.jpg"; // You would need a real image here

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={metaKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={metaDesc} />
      <meta property="twitter:image" content={metaImage} />
      
      {/* Schema.org */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "CollegeOrUniversity",
            "name": "${siteName}",
            "url": "https://rsiit.edu",
            "logo": "https://rsiit.edu/logo.png",
            "sameAs": [
              "https://facebook.com/rsiit",
              "https://twitter.com/rsiit",
              "https://linkedin.com/school/rsiit"
            ]
          }
        `}
      </script>
    </Helmet>
  );
};

export default SEO;
