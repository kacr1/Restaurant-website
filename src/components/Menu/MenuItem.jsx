import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlus, 
  FaStar, 
  FaCheck, 
  FaHeart, 
  FaFire, 
  FaLeaf,
  FaSeedling,
  FaPepperHot,
  FaFish,
  FaWineGlassAlt
} from 'react-icons/fa';
import { 
  GiMeal, 
  GiChickenOven, 
  GiSteak,
  GiFullPizza,
  GiSushis,
  GiCakeSlice,
  GiIceCreamCone
} from 'react-icons/gi';
import { IoMdNutrition } from 'react-icons/io';

const MenuItem = ({ 
  item, 
  addToCart, 
  delay = 0, 
  isInCart, 
  isHighlighted 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [nutritionVisible, setNutritionVisible] = useState(false);

  // Handle adding item to cart with animation
  const handleAddToCart = () => {
    setIsAnimating(true);
    addToCart(item);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        delay: delay / 1000,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      transition: { duration: 0.2 }
    },
    highlight: {
      scale: [1, 1.03, 1],
      boxShadow: [
        "0 0 0 0 rgba(252, 163, 17, 0)",
        "0 0 20px 8px rgba(252, 163, 17, 0.3)",
        "0 0 0 0 rgba(252, 163, 17, 0)"
      ],
      transition: {
        duration: 1.5,
        times: [0, 0.5, 1]
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    pulse: {
      scale: [1, 1.1, 1],
      transition: { duration: 0.5 }
    }
  };

  // Get appropriate icon based on dish type
  const getDishIcon = () => {
    if (item.category === 'steak') return <GiSteak className="dish-icon" />;
    if (item.category === 'pasta') return <GiMeal className="dish-icon" />;
    if (item.category === 'seafood') return <FaFish className="dish-icon" />;
    if (item.category === 'pizza') return <GiFullPizza className="dish-icon" />;
    if (item.category === 'sushi') return <GiSushis className="dish-icon" />;
    if (item.category === 'dessert') return <GiCakeSlice className="dish-icon" />;
    if (item.category === 'ice-cream') return <GiIceCreamCone className="dish-icon" />;
    return <GiMeal className="dish-icon" />;
  };

  return (
    <motion.div
      className={`menu-item ${item.featured ? 'featured' : ''} ${isInCart ? 'in-cart' : ''}`}
      variants={itemVariants}
      initial="hidden"
      animate={["visible", isHighlighted ? "highlight" : ""]}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      aria-labelledby={`item-${item.id}-title`}
    >
      {/* Featured Badge */}
      {item.featured && (
        <motion.div 
          className="featured-badge"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay / 1000 + 0.2 }}
        >
          <FaStar className="badge-icon" />
          <span>Chef's Pick</span>
        </motion.div>
      )}

      {/* Spicy Badge */}
      {item.spicyLevel > 0 && (
        <motion.div 
          className="spicy-badge"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay / 1000 + 0.3 }}
        >
          <FaPepperHot className="badge-icon" />
          <span>{'🌶️'.repeat(item.spicyLevel)}</span>
        </motion.div>
      )}

      {/* Image Container */}
      <div className="item-image-container">
        {!isImageLoaded && (
          <div className="image-placeholder">
            {getDishIcon()}
          </div>
        )}
        <motion.img
          src={item.image}
          alt={item.name}
          className={`item-image ${isImageLoaded ? 'loaded' : 'loading'}`}
          onLoad={() => setIsImageLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isImageLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Favorite Button */}
        <motion.button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaHeart className={`heart-icon ${isFavorite ? 'filled' : 'outline'}`} />
        </motion.button>

        {/* Quick View Button */}
        <motion.button 
          className="quick-view-btn"
          onClick={() => setNutritionVisible(true)}
          aria-label="View nutrition information"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <IoMdNutrition className="nutrition-icon" />
        </motion.button>
      </div>

      {/* Content Container */}
      <div className="item-content">
        <div className="item-header">
          <h3 id={`item-${item.id}-title`}>
            {item.name}
            {item.seasonal && <span className="seasonal-badge">Seasonal</span>}
          </h3>
          <motion.span 
            className="price"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          >
            ${item.price.toFixed(2)}
          </motion.span>
        </div>
        
        <p className="description">{item.description}</p>
        
        {/* Rating */}
        {item.rating && (
          <div className="item-rating">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className={`star ${i < item.rating ? 'filled' : 'empty'}`} 
              />
            ))}
            <span>({item.reviewCount}+)</span>
          </div>
        )}
        
        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <motion.div 
            className="item-tags"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay / 1000 + 0.1 }}
          >
            {item.tags.map(tag => (
              <span key={tag} className="tag">
                {tag === 'vegetarian' && <FaLeaf className="tag-icon" />}
                {tag === 'vegan' && <FaSeedling className="tag-icon" />}
                {tag === 'gluten-free' && <span className="tag-icon">GF</span>}
                {tag === 'spicy' && <FaPepperHot className="tag-icon" />}
                {tag}
              </span>
            ))}
          </motion.div>
        )}
        
        {/* Footer with dietary info and add to cart */}
        <div className="item-footer">
          <div className="item-meta">
            {item.calories && (
              <span className="calories">
                <FaFire className="calorie-icon" />
                {item.calories} cal
              </span>
            )}
            
            {item.pairing && (
              <span className="pairing">
                <FaWineGlassAlt className="pairing-icon" />
                Pairs with {item.pairing}
              </span>
            )}
          </div>
          
          <motion.button
            className={`add-to-cart ${isInCart ? 'added' : ''}`}
            onClick={!isInCart ? handleAddToCart : null}
            variants={buttonVariants}
            initial="rest"
            whileHover={!isInCart ? "hover" : "rest"}
            whileTap={!isInCart ? "tap" : "rest"}
            animate={isAnimating ? "pulse" : "rest"}
            disabled={isInCart}
            aria-label={isInCart ? "Item already in cart" : `Add ${item.name} to cart`}
          >
            {isInCart ? (
              <>
                <FaCheck className="check-icon" />
                <span>Added</span>
              </>
            ) : (
              <>
                <FaPlus className="plus-icon" />
                <span>Add to Order</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Nutrition Modal */}
      {nutritionVisible && (
        <motion.div 
          className="nutrition-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="modal-content">
            <h4>Nutrition Information</h4>
            <button 
              className="close-modal" 
              onClick={() => setNutritionVisible(false)}
              aria-label="Close nutrition information"
            >
              &times;
            </button>
            
            {item.nutrition ? (
              <div className="nutrition-facts">
                <div className="fact">
                  <span>Calories</span>
                  <span>{item.nutrition.calories}</span>
                </div>
                <div className="fact">
                  <span>Protein</span>
                  <span>{item.nutrition.protein}g</span>
                </div>
                <div className="fact">
                  <span>Carbs</span>
                  <span>{item.nutrition.carbs}g</span>
                </div>
                <div className="fact">
                  <span>Fat</span>
                  <span>{item.nutrition.fat}g</span>
                </div>
                {item.nutrition.allergens && (
                  <div className="allergens">
                    <span>Contains: {item.nutrition.allergens.join(', ')}</span>
                  </div>
                )}
              </div>
            ) : (
              <p>Nutrition information not available</p>
            )}
          </div>
        </motion.div>
      )}

      {/* Glow effect when highlighted */}
      {isHighlighted && (
        <motion.div 
          className="highlight-glow"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2 }}
        />
      )}
    </motion.div>
  );
};

// Sample menu items data
export const menuItems = [
  {
    id: 1,
    name: "Midnight Steak",
    category: "steak",
    description: "Black Angus ribeye with our signature midnight spices rub, finished with truffle butter.",
    price: 38.00,
    featured: true,
    rating: 4.8,
    reviewCount: 124,
    tags: ["signature", "gluten-free"],
    dietary: [],
    calories: 650,
    pairing: "Cabernet Sauvignon",
    image: "/images/midnight-steak.jpg",
    nutrition: {
      calories: 650,
      protein: 52,
      carbs: 3,
      fat: 48,
      allergens: []
    }
  },
  {
    id: 2,
    name: "Moonlight Pasta",
    category: "pasta",
    description: "Handmade fettuccine with wild mushrooms, black truffle cream sauce, and shaved parmesan.",
    price: 24.00,
    rating: 4.6,
    reviewCount: 98,
    tags: ["vegetarian"],
    dietary: ["vegetarian"],
    calories: 420,
    pairing: "Chardonnay",
    image: "/images/moonlight-pasta.jpg",
    nutrition: {
      calories: 420,
      protein: 18,
      carbs: 52,
      fat: 22,
      allergens: ["dairy", "gluten"]
    }
  },
  {
    id: 3,
    name: "Starlight Salmon",
    category: "seafood",
    description: "Pan-seared salmon with lemon beurre blanc, asparagus, and herbed quinoa.",
    price: 28.00,
    rating: 4.7,
    reviewCount: 87,
    tags: ["gluten-free", "healthy"],
    dietary: ["gluten-free"],
    calories: 380,
    pairing: "Sauvignon Blanc",
    image: "/images/starlight-salmon.jpg",
    nutrition: {
      calories: 380,
      protein: 34,
      carbs: 22,
      fat: 18,
      allergens: ["fish"]
    }
  },
  {
    id: 4,
    name: "Galactic Pizza",
    category: "pizza",
    description: "Wood-fired pizza with mozzarella, spicy salami, mushrooms, and black truffle oil.",
    price: 22.00,
    featured: true,
    spicyLevel: 2,
    rating: 4.9,
    reviewCount: 156,
    tags: ["spicy", "signature"],
    dietary: [],
    calories: 580,
    pairing: "Chianti",
    image: "/images/galactic-pizza.jpg",
    nutrition: {
      calories: 580,
      protein: 28,
      carbs: 62,
      fat: 26,
      allergens: ["dairy", "gluten"]
    }
  },
  {
    id: 5,
    name: "Nebula Sushi Platter",
    category: "sushi",
    description: "Chef's selection of 12 premium nigiri and maki rolls with wasabi and pickled ginger.",
    price: 32.00,
    rating: 4.9,
    reviewCount: 112,
    tags: ["healthy", "fresh"],
    dietary: [],
    calories: 480,
    pairing: "Sake",
    image: "/images/nebula-sushi.jpg",
    nutrition: {
      calories: 480,
      protein: 32,
      carbs: 58,
      fat: 12,
      allergens: ["fish", "shellfish"]
    }
  },
  {
    id: 6,
    name: "Cosmic Burger",
    category: "burger",
    description: "Wagyu beef patty with aged cheddar, caramelized onions, and truffle aioli on brioche.",
    price: 26.00,
    rating: 4.5,
    reviewCount: 76,
    tags: ["signature"],
    dietary: [],
    calories: 720,
    pairing: "IPA Beer",
    image: "/images/cosmic-burger.jpg",
    nutrition: {
      calories: 720,
      protein: 42,
      carbs: 48,
      fat: 38,
      allergens: ["dairy", "gluten", "eggs"]
    }
  },
  {
    id: 7,
    name: "Black Hole Chocolate Cake",
    category: "dessert",
    description: "Triple-layer chocolate cake with ganache filling and gold leaf decoration.",
    price: 14.00,
    seasonal: true,
    rating: 4.9,
    reviewCount: 143,
    tags: ["vegetarian"],
    dietary: ["vegetarian"],
    calories: 620,
    pairing: "Port Wine",
    image: "/images/black-hole-cake.jpg",
    nutrition: {
      calories: 620,
      protein: 8,
      carbs: 82,
      fat: 32,
      allergens: ["dairy", "gluten", "eggs"]
    }
  },
  {
    id: 8,
    name: "Supernova Ice Cream",
    category: "ice-cream",
    description: "Vanilla bean ice cream with popping candy, caramel swirl, and edible glitter.",
    price: 10.00,
    rating: 4.7,
    reviewCount: 92,
    tags: ["vegetarian"],
    dietary: ["vegetarian"],
    calories: 380,
    pairing: "Dessert Wine",
    image: "/images/supernova-icecream.jpg",
    nutrition: {
      calories: 380,
      protein: 6,
      carbs: 48,
      fat: 18,
      allergens: ["dairy"]
    }
  }
];

export default MenuItem;