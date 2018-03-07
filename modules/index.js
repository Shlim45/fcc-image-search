const GoogleImages = require('google-images');

module.exports = function googleSearch(query, offset=10) {
  if (query.length <= 0) return;
  
  const client = new GoogleImages(process.env.GOOGLE_CSE, process.env.GOOGLE_KEY);
  
  return client.search(query)
    .then(images => images)
    .catch(err => console.error(err));
}
  
module.exports = function reduceImages(images) {
  return images.reduce((acc, image) => {
    return [...acc, {
        "url": image.url,
        "snippet": image.description,
        "thumbnail": image.thumbnail.url,
        "context": image.parentPage
    }];
  }, []);
}
