import React, { useState, useEffect } from 'react';
import { Box, ImageList, ImageListItem } from '@mui/material';
/**
 * RedditImageScraper component.
 * Fetches and displays images from a specified subreddit.
 *
 * @component
 * @example
 * <RedditImageScraper subreddit="earthporn" />
 * @param {Object} props - The props object.
 * @param {string} props.subreddit - The subreddit from which to fetch images.
 * @returns {React.Element} The rendered RedditImageScraper component.
 */
function RedditImageScraper({ subreddit }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const response = await fetch(
        `https://www.reddit.com/r/${subreddit}/new.json?limit=100`
      );
      const data = await response.json();
      const newImages = data.data.children
        .filter((post) => post.data.post_hint === 'image')
        .map((post) => {
          return {
            img: post?.data?.url,
            title: post?.data?.title,
            permalink: post?.data?.permalink,
          };
        });
      setImages(newImages);
    }
    fetchImages();
  }, [subreddit]);

  return (
    <Box
      sx={{
        width: '100%',
        height: 450,
        overflowY: 'scroll',
      }}
    >
      <ImageList cols={3} gap={8} variant='masonry'>
        {images.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading='lazy'
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default RedditImageScraper;
