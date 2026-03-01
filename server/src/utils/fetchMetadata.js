const axios = require('axios');
const cheerio = require('cheerio');

async function fetchMetadata(url) {
  try {
    const { data: html } = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      },
      timeout: 8000,
    });

    const scraper = cheerio.load(html);

    const title =
      scraper('meta[property="og:title"]').attr('content') ||
      scraper('meta[name="twitter:title"]').attr('content') ||
      scraper('title').text() ||
      '';

    const description =
      scraper('meta[property="og:description"]').attr('content') ||
      scraper('meta[name="description"]').attr('content') ||
      scraper('meta[name="twitter:description"]').attr('content') ||
      '';

    const image =
      scraper('meta[property="og:image"]').attr('content') ||
      scraper('meta[name="twitter:image"]').attr('content') ||
      scraper('link[rel="apple-touch-icon"]').attr('href') ||
      scraper('link[rel="shortcut icon"]').attr('href') ||
      '';

    const metadata = {
      title: title.trim(),
      description: description.trim(),
      image: image,
      domain: new URL(url).hostname,
    };

    // Делаем путь к картинке абсолютным, если он относительный
    if (metadata.image && !metadata.image.startsWith('http')) {
      try {
        metadata.image = new URL(metadata.image, url).toString();
      } catch (e) {}
    }

    return metadata;
  } catch (error) {
    console.error(`Metadata error for ${url}:`, error.message);
    let domain = '';
    try {
      domain = new URL(url).hostname;
    } catch (e) {
      domain = url;
    }

    return {
      title: '',
      description: '',
      image: '',
      domain,
    };
  }
}

module.exports = fetchMetadata;
