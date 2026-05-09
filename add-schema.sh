#!/bin/bash
for file in src/pages/insights/*.astro; do
  if [ "$file" = "src/pages/insights/index.astro" ]; then continue; fi
  
  # Extract title and description for the schema
  title=$(grep -o 'title="[^"]*"' "$file" | head -1 | cut -d'"' -f2)
  desc=$(grep -o 'description="[^"]*"' "$file" | head -1 | cut -d'"' -f2)
  url_path=$(basename "$file" .astro)
  
  # Check if BlogPosting already exists
  if grep -q "BlogPosting" "$file"; then continue; fi
  
  # Add the schema right after the Layout tag opens
  sed -i '' -e "/<Layout/a\\
  <script type=\"application/ld+json\">\\
  {\\
    \"@context\": \"https://schema.org\",\\
    \"@type\": \"BlogPosting\",\\
    \"headline\": \"$title\",\\
    \"description\": \"$desc\",\\
    \"image\": \"https://www.presciaiq.com.au/og-image.jpg\",\\
    \"author\": {\\
      \"@type\": \"Organization\",\\
      \"name\": \"PresciaIQ\"\\
    },\\
    \"publisher\": {\\
      \"@type\": \"Organization\",\\
      \"name\": \"PresciaIQ\",\\
      \"logo\": {\\
        \"@type\": \"ImageObject\",\\
        \"url\": \"https://www.presciaiq.com.au/logo.png\"\\
      }\\
    },\\
    \"datePublished\": \"2024-05-01T00:00:00+10:00\",\\
    \"mainEntityOfPage\": {\\
      \"@type\": \"WebPage\",\\
      \"@id\": \"https://www.presciaiq.com.au/insights/$url_path\"\\
    }\\
  }\\
  </script>" "$file"
done
