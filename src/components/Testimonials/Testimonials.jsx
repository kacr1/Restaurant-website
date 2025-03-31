import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';
import './Testimonials.css';
import { FaStar, FaQuoteLeft, FaPenAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    rating: 5,
    text: "The midnight tasting menu was an absolute revelation. Each course was perfectly timed and the wine pairings were inspired. We didn't leave until 3am and it was worth every minute! The chef personally came to our table to explain the lunar-inspired ingredients.",
    author: "Sarah J.",
    role: "Regular Guest",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    date: "Visited June 2023",
    featured: true
  },
  {
    id: 2,
    rating: 4,
    text: "Amazing atmosphere and service. The craft cocktails were unlike anything I've tasted before. The live jazz band created the perfect ambiance for our anniversary dinner. The staff went above and beyond to make our night special.",
    author: "Michael T.",
    role: "First-time Visitor",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    date: "Visited May 2023"
  },
  {
    id: 3, 
    rating: 5,
    text: "Best dining experience this year! The chef's moonlight selection featured incredible local ingredients. The staff made us feel like VIPs throughout our entire 4-hour dining experience. The wine sommelier's pairings were perfection.",
    author: "Emma L.",
    role: "Food Blogger",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    date: "Visited April 2023",
    featured: true
  },
  {
    id: 4,
    rating: 5,
    text: "The starlight wine pairing was worth every penny. Each course was a masterpiece, and the sommelier's selections elevated the experience. The midnight chocolate dessert was life-changing. We'll be back for the seasonal menu!",
    author: "David R.",
    role: "Wine Enthusiast",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    date: "Visited March 2023"
  }
];

const Testimonials = () => {
  return (
    <section id="reviews" className="testimonials-section">
      {/* Floating decorations */}
      <div className="floating-decoration"></div>
      <div className="floating-decoration"></div>
      <div className="floating-decoration"></div>
      
      <div className="testimonials-overlay"></div>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Moonlit Memories</h2>
          <p className="section-subtitle">Stories from our cherished guests about their nocturnal dining experiences</p>
        </motion.div>
        
        <div className="testimonial-carousel">
          <Swiper
            modules={[Pagination, Autoplay, EffectCreative]}
            spaceBetween={40}
            slidesPerView={1}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
              renderBullet: (index, className) => {
                return `<span class="${className}">
                  <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="5" cy="5" r="4" fill="currentColor"/>
                  </svg>
                </span>`;
              }
            }}
            autoplay={{ 
              delay: 8000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            loop={true}
            grabCursor={true}
            effect={'creative'}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: [0, 0, -400],
                opacity: 0
              },
              next: {
                translate: ['100%', 0, 0]
              }
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
                effect: 'slide'
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 40,
                effect: 'slide'
              }
            }}
          >
            {testimonials.map(testimonial => (
              <SwiperSlide key={testimonial.id}>
                <motion.div 
                  className="testimonial-card"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  {testimonial.featured && (
                    <div className="featured-badge">
                      <FaStar /> Featured Review
                    </div>
                  )}
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < testimonial.rating ? 'filled' : 'empty'}
                      />
                    ))}
                  </div>
                  <div className="quote-icon">
                    <FaQuoteLeft />
                  </div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-author">
                    <div className="author-image">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author}
                        loading="lazy"
                        width={80}
                        height={80}
                      />
                    </div>
                    <div className="author-info">
                      <h4>{testimonial.author}</h4>
                      <span className="role">{testimonial.role}</span>
                      <span className="date">{testimonial.date}</span>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        <motion.div 
          className="review-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <a href="#booking" className="btn-gold">
            <FaPenAlt /> Share Your Experience
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;