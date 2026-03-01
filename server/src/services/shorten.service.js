const { Link } = require('../../db/models');

class ShortenService {
  static CreateLink(data) {
    return Link.create({
      shortCode: data.shortCode,
      originalUrl: data.url,
      title: data.title,
      description: data.description,
      image: data.image,
    });
  }

  static FindByCode(shortCode) {
    return Link.findOne({ where: { shortCode } });
  }
}

module.exports = ShortenService;
