const GoogleImages = require('google-images');

Object.assign(exports, {
    googleSearch(query, page) {
      if (query.length <= 0) return;

      const client = new GoogleImages(process.env.GOOGLE_CSE, process.env.GOOGLE_KEY);
      return client.search(query, {page})
        .then(images => images)
        .catch(err => console.error(err));
    },
    reduceImages(images) {
      return images.reduce((acc, image) => {
        return [...acc, {
            "url": image.url,
            "snippet": image.description,
            "thumbnail": image.thumbnail.url,
            "context": image.parentPage
        }];
      }, []);
    },
    addToHistory(query) {
      const history = localStorage.getItem(history
    }
});
