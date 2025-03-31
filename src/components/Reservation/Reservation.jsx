import React, { useRef, useEffect, useState } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/dark.css';
import './Reservation.css';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock, 
  FaCheck,
  FaUtensils,
  FaWineGlassAlt,
  FaBirthdayCake,
  FaHeart
} from 'react-icons/fa';
import { GiPartyPopper } from 'react-icons/gi';
import { motion } from 'framer-motion';

const Reservation = () => {
  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
    occasion: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeOccasion, setActiveOccasion] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [datePicker, setDatePicker] = useState(null);
  const [timePicker, setTimePicker] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  useEffect(() => {
    // Initialize date picker only if ref exists
    if (dateInputRef.current && !datePicker) {
      const fpDate = flatpickr(dateInputRef.current, {
        minDate: 'today',
        dateFormat: 'F j, Y',
        disable: [
          function(date) {
            return (date.getDay() === 0 || date.getDay() === 1);
          }
        ],
        onChange: (selectedDates, dateStr) => {
          setFormData(prev => ({ ...prev, date: dateStr }));
          setShowTimePicker(true);
        }
      });
      setDatePicker(fpDate);
    }

    // Initialize time picker only if ref exists and showTimePicker is true
    if (timeInputRef.current && showTimePicker && !timePicker) {
      const fpTime = flatpickr(timeInputRef.current, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "h:i K",
        minuteIncrement: 30,
        minTime: "18:00",
        maxTime: "23:30",
        onChange: (selectedDates, dateStr) => {
          setFormData(prev => ({ ...prev, time: dateStr }));
        }
      });
      setTimePicker(fpTime);
    }

    return () => {
      // Cleanup flatpickr instances
      if (datePicker) datePicker.destroy();
      if (timePicker) timePicker.destroy();
    };
  }, [showTimePicker, datePicker, timePicker]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOccasionSelect = (occasion) => {
    setActiveOccasion(occasion);
    setFormData(prev => ({ ...prev, occasion }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsLoading(false);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        date: '',
        time: '',
        guests: '',
        name: '',
        email: '',
        phone: '',
        notes: '',
        occasion: ''
      });
      setActiveOccasion(null);
      setShowTimePicker(false);
    }, 5000);
  };

  const occasions = [
    { id: 'dinner', label: 'Dinner', icon: <FaUtensils /> },
    { id: 'date', label: 'Date Night', icon: <FaHeart /> },
    { id: 'drinks', label: 'Drinks', icon: <FaWineGlassAlt /> },
    { id: 'celebration', label: 'Celebration', icon: <GiPartyPopper /> },
    { id: 'birthday', label: 'Birthday', icon: <FaBirthdayCake /> }
  ];

  return (
    <section id="reservations" className="reservation-section">
      <div className="container">
        <motion.div 
          className="reservation-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div 
            className="reservation-text" 
            variants={itemVariants}
          >
            <h2 className="section-title">Book Your Night</h2>
            <p>Reserve your table for an unforgettable dining experience under the stars.</p>
            
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <FaPhone />
                </div>
                <span>(555) 123-4567</span>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <span>reservations@midnight.cafe</span>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <span>123 Moonlight Ave, Night City</span>
              </div>
            </div>

            <div className="hours">
              <h4><FaClock className="hours-icon" /> Hours</h4>
              <p>Wednesday - Thursday: 6pm - 2am</p>
              <p>Friday - Saturday: 6pm - 4am</p>
              <p className="closed">Closed Sunday - Tuesday</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="reservation-form"
            variants={itemVariants}
          >
            {isSubmitted ? (
              <div className="success-message">
                <FaCheck className="success-icon" />
                <h3>Reservation Confirmed!</h3>
                <p>We've sent the details to your email. See you soon!</p>
              </div>
            ) : (
              <form id="booking-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="reservation-date">Date</label>
                  <input
                    type="text"
                    id="reservation-date"
                    name="date"
                    className="form-control"
                    ref={dateInputRef}
                    placeholder="Select date"
                    readOnly
                    required
                    value={formData.date}
                  />
                </div>

                {showTimePicker && (
                  <div className="form-group">
                    <label htmlFor="reservation-time">Time</label>
                    <input
                      type="text"
                      id="reservation-time"
                      name="time"
                      className="form-control"
                      ref={timeInputRef}
                      placeholder="Select time"
                      readOnly
                      required
                      value={formData.time}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="reservation-guests">Number of Guests</label>
                  <select 
                    id="reservation-guests" 
                    name="guests"
                    className="form-control" 
                    required
                    value={formData.guests}
                    onChange={handleChange}
                  >
                    <option value="">Select guests</option>
                    {[...Array(10).keys()].map(i => (
                      <option key={i+1} value={i+1}>{i+1} {i === 0 ? 'person' : 'people'}</option>
                    ))}
                    <option value="11">11-15 people</option>
                    <option value="16">16-20 people</option>
                    <option value="21">21+ people</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Occasion (Optional)</label>
                  <div className="occasion-selector">
                    {occasions.map(occasion => (
                      <button
                        key={occasion.id}
                        type="button"
                        className={`occasion-btn ${activeOccasion === occasion.id ? 'active' : ''}`}
                        onClick={() => handleOccasionSelect(occasion.id)}
                      >
                        <span className="occasion-icon">{occasion.icon}</span>
                        <span>{occasion.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reservation-name">Full Name</label>
                  <input
                    type="text"
                    id="reservation-name"
                    name="name"
                    className="form-control"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reservation-email">Email</label>
                  <input
                    type="email"
                    id="reservation-email"
                    name="email"
                    className="form-control"
                    placeholder="Your email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reservation-phone">Phone</label>
                  <input
                    type="tel"
                    id="reservation-phone"
                    name="phone"
                    className="form-control"
                    placeholder="Your phone number"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reservation-notes">Special Requests</label>
                  <textarea
                    id="reservation-notes"
                    name="notes"
                    className="form-control"
                    placeholder="Dietary restrictions, celebrations, etc."
                    rows="3"
                    value={formData.notes}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn-gold"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Confirm Reservation'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reservation;