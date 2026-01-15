import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';
import heroImage from '../assets/fullmeal.png';
import botIcon from '../assets/logo.png';
export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { 
      title: "Zinger Burger", 
      desc: "Crispy spicy fillet with fresh lettuce", 
      price: "R59.99",
      img: "data:image/jpeg;base64,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",
      category: "Burgers"
    },
    { 
      title: "Original Recipe Bucket", 
      desc: "8 pieces of famous Original Recipe chicken", 
      price: "R149.99",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTQb5AhUBu6JtglC8n5LQbzkx_eIlcbCB90g&s",
      category: "Buckets"
    },
    { 
      title: "Streetwise 2", 
      desc: "2 pieces chicken, chips, and a drink", 
      price: "R49.99",
      img: "data:image/jpeg;base64,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",
      category: "Meals"
    },
    { 
      title: "Popcorn Chicken", 
      desc: "Bite-sized pieces of crispy chicken", 
      price: "R39.99",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtVNn_ylnqmpATk67n6O7twsckJZf2pJW4xQ&s",
      category: "Snacks"
    },
    { 
      title: "Twister Wrap", 
      desc: "Grilled chicken with fresh veggies", 
      price: "R44.99",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPnJiLMQK88KTJLca0_l8wgEt_ov42RYNWQw&s",
      category: "Wraps"
    },
    { 
      title: "Colonel's Burger", 
      desc: "Classic beef burger with special sauce", 
      price: "R54.99",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf7BvSsBGmsuOpVa_jp_5u8OoZGhXqktNctg&s",
      category: "Burgers"
    },
  ];

  const heroImg = "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className="landing-page">
      {/* Navigation */}
      <header className="kfc-nav">
        <div className="nav-container">
          <div className="nav-content">
            <div className="logo-container">
              <div className="kfc-logo">
                <span style={{color: 'white', fontWeight: 'bold'}}>KFC</span>
              </div>
              <div>
                <h1 className="kfc-logo-text">KENTUCKY FRIED CHICKEN</h1>
                <p className="logo-tagline">It's Finger Lickin' Good</p>
              </div>
            </div>

            <nav className="desktop-nav">
              <a href="#home">Home</a>
              <a href="#menu">Menu</a>
              <a href="#deals">Deals</a>
              <a href="#about">About</a>
              <button className="order-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Order Now
              </button>
            </nav>

            <div className="mobile-nav-btn">
              <button className="mobile-order-btn">Order</button>
              <button 
                className="mobile-menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="mobile-menu">
              <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
              <a href="#menu" onClick={() => setMenuOpen(false)}>Menu</a>
              <a href="#deals" onClick={() => setMenuOpen(false)}>Deals</a>
              <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Taste That's <span>Finger Lickin' Good</span>
            </h1>
            <p className="hero-description">
              Since 1952, we've been serving the world's best fried chicken. 
              Made with our secret blend of 11 herbs and spices.
            </p>
            <div className="hero-buttons">
              <button className="primary-btn">Order Delivery</button>
              <button className="secondary-btn">View Menu</button>
            </div>
          </div>
          <div className="hero-image-container">
            <img src={heroImage} alt="KFC Chicken" className="hero-image" />
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="menu-section">
        <h2 className="section-title">Our Menu</h2>
        <p className="section-subtitle">Delicious chicken favorites</p>
        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <div key={index} className="menu-card">
              <img src={item.img} alt={item.title} className="menu-image" />
              <div className="menu-card-content">
                <div className="menu-card-header">
                  <h3 className="menu-card-title">{item.title}</h3>
                  <span className="menu-category">{item.category}</span>
                </div>
                <p className="menu-description">{item.desc}</p>
                <div className="menu-card-footer">
                  <span className="menu-price">{item.price}</span>
                  <button className="add-to-cart-btn">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deals Section */}
      <section id="deals" className="deals-section">
        <h2 className="deals-title">Special Deals</h2>
        <p className="deals-subtitle">Limited time offers</p>
        <div className="deals-grid">
          <div className="deal-card">
            <h3 className="deal-card-title">Family Feast</h3>
            <p className="deal-description">12pc Chicken + 3 Large Sides</p>
            <div className="deal-price">R199</div>
            <button className="deal-order-btn">Order Now</button>
          </div>
          <div className="deal-card">
            <h3 className="deal-card-title">Zinger Combo</h3>
            <p className="deal-description">Burger + Fries + Drink</p>
            <div className="deal-price">R79</div>
            <button className="deal-order-btn">Order Now</button>
          </div>
          <div className="deal-card">
            <h3 className="deal-card-title">Bucket For One</h3>
            <p className="deal-description">3pc Chicken + Side + Drink</p>
            <div className="deal-price">R99</div>
            <button className="deal-order-btn">Order Now</button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">
              Since <span>1952</span>
            </h2>
            <p className="about-description">
              Colonel Harland Sanders started KFC with his secret recipe of 11 herbs and spices. 
              Today, we continue to serve the same great taste that made us famous.
            </p>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">24K+</div>
                <div className="stat-label">Restaurants</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">150+</div>
                <div className="stat-label">Countries</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">65</div>
                <div className="stat-label">Years</div>
              </div>
            </div>
          </div>
          <div className="about-card">
            <h3 className="card-title">Did You Know?</h3>
            <p className="card-description">
              Colonel Sanders was 65 years old when he started KFC, proving it's never too late to follow your dreams!
            </p>
            <div className="card-feature">
              <div className="feature-icon">👨‍🍳</div>
              <div className="feature-text">
                <h4>Secret Recipe</h4>
                <p>11 herbs and spices</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="kfc-footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">
                <div className="footer-logo-icon">KFC</div>
                <div className="footer-logo-text">KENTUCKY FRIED CHICKEN</div>
              </div>
              <p className="footer-description">
                Serving finger lickin' good chicken since 1952.
              </p>
            </div>
            <div>
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#menu">Menu</a></li>
                <li><a href="#deals">Deals</a></li>
                <li><a href="#about">About</a></li>
              </ul>
            </div>
            <div>
              <h4>Support</h4>
              <ul className="footer-links">
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <p className="footer-contact">
                1-800-KFC-1964<br />
                contact@kfc.com
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Kentucky Fried Chicken. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot Button */}
      <button 
        onClick={() => navigate("/chatbot")} 
        className="chatbot-btn"
      >
        <img 
    src={botIcon} 
    alt="Chatbot" 
    style={{ width: '32px', height: '32px' }}
  />
        <div className="chatbot-badge">AI</div>
      </button>
    </div>
  );
}