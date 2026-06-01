export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  dateAdded: string;
  tags: string[];
}

export interface CelebrationWish {
  id: string;
  sender: string;
  message: string;
  badge: {
    emoji: string;
    text: string;
    color: string; // Tailwind bg color class
  };
  bgColor: string; // Tailwind background style card
  dateAdded: string;
  isSparkly: boolean;
}

export interface TristanQuality {
  id: string;
  title: string;
  description: string;
  votes: number;
  iconName: string; // Lucide icon identifier
  color: string;
}
