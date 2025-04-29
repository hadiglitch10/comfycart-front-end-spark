
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export const products: Product[] = [
  {
    id: 1,
    title: "Luxe Memory Foam Pillow",
    price: 29.99,
    description: "Memory foam pillow that contours to your head and neck for maximum comfort and support. Hypoallergenic cover included.",
    category: "bedroom",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=2069",
    rating: { rate: 4.8, count: 125 }
  },
  {
    id: 2,
    title: "Ergonomic Office Chair",
    price: 249.99,
    description: "Fully adjustable office chair with lumbar support, headrest, and breathable mesh back for all-day comfort.",
    category: "furniture",
    image: "https://images.unsplash.com/photo-1579503841516-e0bd7fca5faa?q=80&w=2070",
    rating: { rate: 4.6, count: 89 }
  },
  {
    id: 3,
    title: "Plush Throw Blanket",
    price: 39.99,
    description: "Ultra-soft microfiber throw blanket, perfect for staying cozy during movie nights or cold evenings.",
    category: "living",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071",
    rating: { rate: 4.9, count: 213 }
  },
  {
    id: 4,
    title: "Smart LED Desk Lamp",
    price: 59.99,
    description: "Adjustable desk lamp with multiple brightness levels, color temperatures, and a built-in USB charging port.",
    category: "lighting",
    image: "https://images.unsplash.com/photo-1534189021142-638a4250c776?q=80&w=2066",
    rating: { rate: 4.7, count: 76 }
  },
  {
    id: 5,
    title: "Ceramic Plant Pot Set",
    price: 34.99,
    description: "Set of 3 minimalist ceramic plant pots in varying sizes, perfect for succulents and small indoor plants.",
    category: "decor",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2072",
    rating: { rate: 4.5, count: 112 }
  },
  {
    id: 6,
    title: "Premium Cotton Bed Sheets",
    price: 79.99,
    description: "400-thread-count 100% cotton sheet set including flat sheet, fitted sheet, and pillow cases.",
    category: "bedroom",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070",
    rating: { rate: 4.8, count: 143 }
  },
  {
    id: 7,
    title: "Minimalist Wall Clock",
    price: 49.99,
    description: "Sleek, silent wall clock with a wooden frame and clean, modern design that complements any room.",
    category: "decor",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=2070",
    rating: { rate: 4.6, count: 99 }
  },
  {
    id: 8,
    title: "Scented Soy Candle Set",
    price: 45.99,
    description: "Set of 3 hand-poured soy candles in relaxing scents like Lavender, Eucalyptus, and Vanilla.",
    category: "decor",
    image: "https://images.unsplash.com/photo-1603006905003-be475563f01a?q=80&w=2070",
    rating: { rate: 4.9, count: 186 }
  },
  {
    id: 9,
    title: "Air-Purifying Plant Collection",
    price: 89.99,
    description: "Set of 4 easy-care indoor plants known for their air-purifying qualities, in coordinating pots.",
    category: "decor",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=2070",
    rating: { rate: 4.7, count: 118 }
  },
  {
    id: 10,
    title: "Cozy Knit Throw Pillow",
    price: 29.99,
    description: "Chunky knit decorative pillow with removable, washable cover in a versatile neutral color.",
    category: "living",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=2069",
    rating: { rate: 4.5, count: 92 }
  },
  {
    id: 11,
    title: "Modern Coffee Table",
    price: 199.99,
    description: "Mid-century inspired coffee table with wooden legs and durable surface, perfect for any living space.",
    category: "furniture",
    image: "https://images.unsplash.com/photo-1554295405-abb8fd54f153?q=80&w=2026",
    rating: { rate: 4.6, count: 74 }
  },
  {
    id: 12,
    title: "Glass Water Carafe",
    price: 24.99,
    description: "Elegant glass carafe with matching cup, perfect for bedside water or serving guests.",
    category: "kitchen",
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?q=80&w=2036",
    rating: { rate: 4.7, count: 106 }
  },
  {
    id: 13,
    title: "Bamboo Bath Mat",
    price: 39.99,
    description: "Natural bamboo bath mat that's water-resistant, eco-friendly, and adds a spa-like touch to your bathroom.",
    category: "bathroom",
    image: "https://images.unsplash.com/photo-1600566752355-35803d47f1f9?q=80&w=2070",
    rating: { rate: 4.4, count: 83 }
  },
  {
    id: 14,
    title: "Copper Cocktail Set",
    price: 69.99,
    description: "Complete cocktail making kit in elegant copper finish, including shaker, jigger, stirrer, and more.",
    category: "kitchen",
    image: "https://images.unsplash.com/photo-1556911073-38141963c9e0?q=80&w=2070",
    rating: { rate: 4.8, count: 127 }
  },
  {
    id: 15,
    title: "Wool Area Rug",
    price: 149.99,
    description: "Hand-woven wool area rug with modern geometric pattern, adds warmth and style to any room.",
    category: "living",
    image: "https://images.unsplash.com/photo-1576161787962-01a2813a0823?q=80&w=2070",
    rating: { rate: 4.7, count: 93 }
  },
  {
    id: 16,
    title: "Ceramic Dinnerware Set",
    price: 129.99,
    description: "16-piece artisan ceramic dinnerware set including plates, bowls, and mugs for four people.",
    category: "kitchen",
    image: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?q=80&w=2070",
    rating: { rate: 4.8, count: 154 }
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getCategories = (): string[] => {
  const categories = products.map(product => product.category);
  return [...new Set(categories)];
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.title.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery)
  );
};
