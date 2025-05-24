import Url from '../models/url.js';
import { nanoid } from 'nanoid';

export const shortenUrl = async (req, res) => {
  const { longUrl } = req.body;
  const shortId = nanoid(8);

  const newUrl = new Url({ longUrl, shortId });
  await newUrl.save();

  res.json({ shortUrl: `https://zapurl.onrender.com/${shortId}` });
};

export const redirectToLongUrl = async (req, res) => {
  const { shortId } = req.params;
  const urlEntry = await Url.findOne({ shortId });

  if (urlEntry) {
    res.redirect(urlEntry.longUrl);
  } else {
    res.status(404).send('URL not found');
  }
};
