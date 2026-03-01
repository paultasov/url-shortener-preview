const ShortenService = require('../services/shorten.service');
const { nanoid } = require('nanoid');
const fetchMetadata = require('../utils/fetchMetadata');

class ShortenController {
  static async CreateLink(req, res) {
    try {
      let { url } = req.body;

      if (!url) return res.status(400).json({ error: 'URL is required' });

      // Нормализуем URL: если нет http, добавляем https
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
      }

      // Валидация URL на бэкенде
      try {
        new URL(url);
      } catch (e) {
        return res.status(400).json({ error: 'Invalid URL format' });
      }

      // Собираем метаданные
      const metadata = await fetchMetadata(url);

      // Генерируем короткий ID
      const shortCode = nanoid(7);

      await ShortenService.CreateLink({
        url,
        shortCode,
        ...metadata,
      });

      const shortUrl = `${req.protocol}://${req.get('host')}/api/${shortCode}`;

      res.status(201).json({
        shortUrl,
        metadata,
      });
    } catch (error) {
      console.error('Shortening error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async Redirect(req, res) {
    try {
      const { shortCode } = req.params;
      const link = await ShortenService.FindByCode(shortCode);

      if (!link) {
        return res.status(404).send('<h1>404: Ссылка не найдена</h1>');
      }

      return res.redirect(link.originalUrl);
    } catch (error) {
      console.error('Redirect error:', error);
      res.status(500).send('Server Error');
    }
  }
}

module.exports = ShortenController;
