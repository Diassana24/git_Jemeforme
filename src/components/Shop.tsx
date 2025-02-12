import React, { useState } from 'react';
import { Star, ChevronRight, Heart, ShoppingCart, Search, Menu, Package, BookOpen, Briefcase, GraduationCap } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: 'formation' | 'service' | 'article';
  bestseller?: boolean;
  promo?: number;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "Formation Complete Développement Web",
    price: 199.99,
    rating: 4.8,
    reviews: 1250,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    category: 'formation',
    bestseller: true,
    description: "Apprenez HTML, CSS, JavaScript et React avec des projets pratiques"
  },
  {
    id: 2,
    title: "Mentorat Personnalisé",
    price: 99.99,
    rating: 5.0,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1",
    category: 'service',
    description: "1h de mentorat individuel avec un expert"
  },
  {
    id: 3,
    title: "Pack d'icônes pour UI/UX",
    price: 29.99,
    rating: 4.5,
    reviews: 328,
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113",
    category: 'article',
    promo: 15,
    description: "Plus de 1000 icônes vectorielles pour vos designs"
  },
  {
    id: 4,
    title: "Formation Design System",
    price: 149.99,
    rating: 4.7,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8",
    category: 'formation',
    description: "Créez des systèmes de design évolutifs et maintenables"
  },
  {
    id: 5,
    title: "Review de Code",
    price: 79.99,
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: 'service',
    description: "Analyse approfondie de votre code par un senior"
  }
];

const categories = [
  { id: 'formation', name: 'Formations', icon: GraduationCap },
  { id: 'service', name: 'Services', icon: Briefcase },
  { id: 'article', name: 'Articles', icon: Package }
];

export function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const filteredProducts = products.filter(product => 
    (!selectedCategory || product.category === selectedCategory) &&
    (!searchQuery || product.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-4 py-2">
            <button className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded">
              <Menu className="w-6 h-6" />
              <span>Toutes les catégories</span>
            </button>
            <div className="flex-1">
              <div className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un produit..."
                  className="w-full px-4 py-2 text-gray-900 rounded-l focus:outline-none"
                />
                <button className="bg-orange-500 px-6 rounded-r hover:bg-orange-600">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                className={`flex items-center justify-between p-6 rounded-lg shadow-sm ${
                  selectedCategory === category.id
                    ? 'bg-blue-50 border-2 border-blue-500'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <Icon className="w-8 h-8 text-blue-500" />
                  <div className="text-left">
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-gray-500">
                      {filteredProducts.filter(p => p.category === category.id).length} produits
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                />
                {product.bestseller && (
                  <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-sm">
                    Bestseller
                  </div>
                )}
                {product.promo && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                    -{product.promo}%
                  </div>
                )}
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center space-x-1 mb-2">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-xl font-bold">{product.price}€</span>
                    {product.promo && (
                      <span className="text-sm text-gray-500 line-through">
                        {(product.price / (1 - product.promo / 100)).toFixed(2)}€
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => addToCart({
                      id: product.id,
                      title: product.title,
                      price: product.price
                    })}
                    className="flex items-center space-x-1 bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Ajouter</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}