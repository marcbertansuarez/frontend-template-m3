export default function getYouTubeVideoId(url) {
    if (!url) {
      return null;
    }
    const regex = /(?:v=|youtu\.be\/)([\w-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };