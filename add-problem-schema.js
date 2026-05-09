const fs = require('fs');
const path = require('path');

const problemFile = path.join(__dirname, 'src/pages/solutions/[service]/[industry]/[location]/[problem].astro');
let content = fs.readFileSync(problemFile, 'utf8');

const schemaInsert = `
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": \`PresciaIQ \${service.name}\`,
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, Cloud",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "AUD"
  },
  "description": \`Predictive AI software designed to solve \${problem.problemShort.toLowerCase()} for \${industry.plural} in \${location.name}.\`
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": title,
  "speakable": {
    "@type": "SpeakableSpecification",
    "xpath": [
      "/html/head/title",
      "/html/head/meta[@name='description']/@content"
    ]
  },
  "url": canonicalURL
};
`;

content = content.replace('const faqSchema = {', schemaInsert + '\nconst faqSchema = {');
content = content.replace('<script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />', '<script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />\n  <script type="application/ld+json" set:html={JSON.stringify(softwareSchema)} />\n  <script type="application/ld+json" set:html={JSON.stringify(speakableSchema)} />');

fs.writeFileSync(problemFile, content);
console.log('Updated PresciaIQ problem template');
