const fs = require('fs');
const path = require('path');

const techFile = path.join(__dirname, 'src/pages/solutions/[service]/[industry]/[location]/[tech].astro');
let content = fs.readFileSync(techFile, 'utf8');

const schemaInsert = `
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": \`PresciaIQ \${service.name} (\${tech.name})\`,
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, Cloud",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "AUD"
  },
  "description": \`Enterprise \${service.name.toLowerCase()} built on \${tech.name} for \${industry.plural} in \${location.name}.\`
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

fs.writeFileSync(techFile, content);
console.log('Updated PresciaIQ tech template');
