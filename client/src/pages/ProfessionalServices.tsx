import { useState, KeyboardEvent, useEffect, useRef, useMemo } from 'react';
import { Link } from 'wouter';
import { Search, Star, MapPin, Calendar, Briefcase, ChevronDown, Filter } from 'lucide-react';
import { ShieldCheckIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { serviceCategories, dummyProfessionals, type Professional, type ServiceCategory } from '../data/professionalData';
import ChatBox from '../components/ChatBox';

export default function ProfessionalServices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [priceRange, setPriceRange] = useState('All Prices');
  const [experienceLevel, setExperienceLevel] = useState('All Experience');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Filter categories and create arrays for filter dropdowns
  const categoryOptions = ['All Categories', ...serviceCategories.map(cat => cat.name)];
  const priceOptions = ['All Prices', 'Under 10,000 FCFA', '10,000 - 25,000 FCFA', '25,000 - 50,000 FCFA', 'Over 50,000 FCFA'];
  const experienceOptions = ['All Experience', 'Entry Level (0-2 years)', 'Mid Level (3-5 years)', 'Senior Level (6+ years)', 'Expert Level (10+ years)'];

  // Get professionals by category for accordion display
  const getProfessionalsByCategory = (categoryId: string) => {
    return dummyProfessionals.filter(professional => professional.category === categoryId);
  };

  // Enhanced filtering logic with multiple criteria
  const filteredData = useMemo(() => {
    let filtered = serviceCategories.map(category => ({
      ...category,
      professionals: getProfessionalsByCategory(category.id)
    }));

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.map(category => ({
        ...category,
        professionals: category.professionals.filter(professional =>
          professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          professional.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => 
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.professionals.length > 0
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(category => category.name === selectedCategory);
    }

    // Apply experience level filter (using experience as years)
    if (experienceLevel !== 'All Experience') {
      filtered = filtered.map(category => ({
        ...category,
        professionals: category.professionals.filter(professional => {
          // Extract years from experience string or use completedProjects as proxy
          const experienceStr = professional.experience?.toString() || '0';
          const experienceYears = parseInt(experienceStr.replace(/[^\d]/g, '')) || professional.completedProjects || 0;
          
          switch (experienceLevel) {
            case 'Entry Level (0-2 years)':
              return experienceYears <= 2;
            case 'Mid Level (3-5 years)':
              return experienceYears >= 3 && experienceYears <= 5;
            case 'Senior Level (6+ years)':
              return experienceYears >= 6 && experienceYears < 10;
            case 'Expert Level (10+ years)':
              return experienceYears >= 10;
            default:
              return true;
          }
        })
      })).filter(category => category.professionals.length > 0);
    }

    return filtered;
  }, [searchTerm, selectedCategory, priceRange, experienceLevel]);

  // Count total professionals after filtering
  const totalProfessionals = filteredData.reduce((total, category) => total + category.professionals.length, 0);

  // Enhanced Intersection Observer for bidirectional scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardId = entry.target.getAttribute('data-card-id');
          if (cardId) {
            if (entry.isIntersecting) {
              // Element entering viewport
              setVisibleCards(prev => {
                const newSet = new Set(prev);
                newSet.add(cardId);
                return newSet;
              });
            } else {
              // Element leaving viewport - remove with exit animation
              const element = entry.target as HTMLElement;
              element.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
              element.style.transform = 'translateY(20px)';
              element.style.opacity = '0.7';
              
              // Reset after a short delay for re-entrance
              setTimeout(() => {
                setVisibleCards(prev => {
                  const newSet = new Set(prev);
                  newSet.delete(cardId);
                  return newSet;
                });
                element.style.transform = '';
                element.style.opacity = '';
              }, 300);
            }
          }
        });
      },
      {
        threshold: [0, 0.1, 0.9, 1],
        rootMargin: '100px 0px -100px 0px'
      }
    );

    // Observe all card elements
    cardRefs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [filteredCategories]);

  // Scroll direction detection for enhanced animations
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastScrollX = window.scrollX;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const currentScrollX = window.scrollX;
          const deltaY = currentScrollY - lastScrollY;
          const deltaX = currentScrollX - lastScrollX;
          
          // Apply scroll-based transforms to visible cards
          cardRefs.current.forEach((element, cardId) => {
            if (element && visibleCards.has(cardId)) {
              const rect = element.getBoundingClientRect();
              const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
              
              if (isInViewport) {
                // Parallax effect based on scroll direction
                const parallaxY = deltaY * 0.1;
                const parallaxX = deltaX * 0.05;
                
                element.style.transform = `translate3d(${-parallaxX}px, ${-parallaxY}px, 0) scale(${1 + Math.abs(deltaY) * 0.0001})`;
                element.style.transition = 'transform 0.1s ease-out';
                
                // Reset transform after scroll stops
                setTimeout(() => {
                  element.style.transform = '';
                  element.style.transition = 'transform 0.3s ease-out';
                }, 150);
              }
            }
          });

          lastScrollY = currentScrollY;
          lastScrollX = currentScrollX;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCards]);

  const toggleCard = (categoryId: string) => {
    const newExpandedCard = expandedCard === categoryId ? null : categoryId;
    setExpandedCard(newExpandedCard);
    
    // Smooth scroll to expanded card
    if (newExpandedCard) {
      setTimeout(() => {
        const cardElement = cardRefs.current.get(categoryId);
        if (cardElement) {
          cardElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 150);
    }
  };

  const handleKeyPress = (event: KeyboardEvent, categoryId: string) => {
    if (event.key === 'Enter') {
      toggleCard(categoryId);
    }
  };

  const setCardRef = (categoryId: string, element: HTMLDivElement | null) => {
    if (element) {
      cardRefs.current.set(categoryId, element);
    } else {
      cardRefs.current.delete(categoryId);
    }
  };

  const openChat = (professional: Professional) => {
    setSelectedProfessional(professional);
    setChatOpen(true);
  };

  const closeChat = () => {
    setChatOpen(false);
    setSelectedProfessional(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 scroll-smooth">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-700 text-white relative overflow-hidden gpu-accelerated will-change-transform">
        <div className="absolute inset-0 bg-black/10 animate-parallax-float"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up will-change-transform">
              Professional Services
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-light mb-2 text-teal-100 animate-scroll-zoom">
              in Bamenda
            </p>
            <p className="text-teal-100 text-base sm:text-lg md:text-xl mb-8 max-w-3xl mx-auto text-justify leading-relaxed animate-fadeIn">
              Connect with verified local service providers for all your needs. Find trusted professionals in your area.
            </p>
            
            {/* Enhanced Search and Filter Interface */}
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={20} />
                <input
                  type="text"
                  placeholder="Search services or professionals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 sm:py-5 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-500/50 focus:border-teal-400 text-base sm:text-lg text-gray-900 shadow-xl transition-all duration-300 hover:shadow-2xl"
                />
              </div>

              {/* Filter Controls */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Category Filter */}
                  <div className="relative">
                    <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full pl-12 pr-8 py-3 border border-white/30 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent text-gray-700 bg-white/90 cursor-pointer appearance-none"
                    >
                      {categoryOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range Filter */}
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    <select
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-full pl-12 pr-8 py-3 border border-white/30 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent text-gray-700 bg-white/90 cursor-pointer appearance-none"
                    >
                      {priceOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Experience Filter */}
                  <div className="relative">
                    <Star className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full pl-12 pr-8 py-3 border border-white/30 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent text-gray-700 bg-white/90 cursor-pointer appearance-none"
                    >
                      {experienceOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Results Summary */}
                <div className="mt-4 text-center">
                  <p className="text-white/90">
                    Showing {totalProfessionals} professionals across {filteredData.length} categories
                    {(searchTerm || selectedCategory !== 'All Categories' || priceRange !== 'All Prices' || experienceLevel !== 'All Experience') && (
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory('All Categories');
                          setPriceRange('All Prices');
                          setExperienceLevel('All Experience');
                        }}
                        className="ml-4 bg-white/20 hover:bg-white/30 px-4 py-1 rounded-full text-sm transition-colors"
                      >
                        Clear Filters
                      </button>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Service Categories with Accordion */}
        <div className="mb-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Browse Services by Category
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto text-justify">
              Discover trusted professionals in Bamenda across various service categories. Click on any category to view available professionals.
            </p>
          </div>
          
          {/* Enhanced Responsive Grid: 1 column mobile, 2 tablet, 3 desktop with better spacing */}
          {filteredData.length === 0 ? (
            <div className="text-center bg-white rounded-3xl shadow-xl p-12 col-span-full">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Professionals Found</h3>
              <p className="text-gray-600 mb-6">
                No professionals match your search criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Categories');
                  setPriceRange('All Prices');
                  setExperienceLevel('All Experience');
                }}
                className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-300"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredData.map((category, index) => {
                const categoryProfessionals = category.professionals;
                const isExpanded = expandedCard === category.id;
                const isVisible = visibleCards.has(category.id);
              
              return (
                <div
                  key={category.id}
                  ref={(el) => setCardRef(category.id, el)}
                  data-card-id={category.id}
                  className={`bg-white rounded-xl shadow-lg transition-all duration-500 overflow-hidden border-2 transform gpu-accelerated will-change-transform ${
                    isVisible 
                      ? 'entrance-visible animate-scroll-zoom' 
                      : index % 4 === 0 
                        ? 'entrance-from-left' 
                        : index % 4 === 1 
                          ? 'entrance-from-bottom' 
                          : index % 4 === 2 
                            ? 'entrance-from-right' 
                            : 'entrance-from-top'
                  } ${
                    isExpanded 
                      ? 'border-teal-400 shadow-2xl shadow-teal-200/50 scale-105 animate-parallax-float' 
                      : 'border-gray-200 hover:border-teal-300 hover:shadow-xl hover:scale-102'
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                    animationDelay: isVisible ? `${index * 150}ms` : '0ms'
                  }}
                >
                  {/* Service Card Header */}
                  <div
                    className="p-4 sm:p-6 cursor-pointer group"
                    onClick={() => toggleCard(category.id)}
                    onKeyDown={(e) => handleKeyPress(e, category.id)}
                    tabIndex={0}
                    role="button"
                    aria-expanded={isExpanded}
                    aria-controls={`professionals-${category.id}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 sm:gap-4 flex-1">
                        <div className={`text-2xl sm:text-3xl p-2 sm:p-3 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {category.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-base sm:text-lg lg:text-xl mb-1 leading-tight">
                            {category.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {categoryProfessionals.length} professional{categoryProfessionals.length !== 1 ? 's' : ''} available
                          </p>
                        </div>
                      </div>
                      <ChevronDown 
                        className={`text-gray-400 transition-all duration-300 flex-shrink-0 ml-2 ${
                          isExpanded ? 'rotate-180 text-teal-500' : 'group-hover:text-teal-400'
                        }`} 
                        size={20} 
                      />
                    </div>
                    
                    {/* Short Description */}
                    <div className="mt-4">
                      <p className="text-gray-600 text-sm text-justify max-h-14 overflow-hidden leading-relaxed">
                        {category.id === 'architecture' && 'Professional building design, plans, and architectural consultation services for residential and commercial projects.'}
                        {category.id === 'plumbing' && 'Expert plumbing repairs, installations, and maintenance for homes and businesses with 24/7 emergency service.'}
                        {category.id === 'fridge-ac' && 'Specialized repair and maintenance services for refrigerators, air conditioners, and cooling systems.'}
                        {category.id === 'electronics' && 'Professional repair services for TVs, radios, audio systems, and home electronic appliances.'}
                        {category.id === 'printer' && 'Expert printer and copier repair, maintenance, and installation services for offices and homes.'}
                        {category.id === 'computer' && 'Computer and laptop repair, software installation, virus removal, and technical support services.'}
                        {category.id === 'webdev' && 'Professional website development, maintenance, and digital solutions for local businesses.'}
                        {category.id === 'graphics' && 'Creative graphic design, branding, logo design, and marketing materials for businesses.'}
                        {category.id === 'video' && 'Professional video editing, production, and multimedia content creation services.'}
                        {category.id === 'mobile' && 'Mobile phone repair specialists for screen replacement, battery service, and software troubleshooting.'}
                        {category.id === 'electrical' && 'Licensed electrical installations, repairs, and maintenance for residential and commercial properties.'}
                        {category.id === 'tailoring' && 'Expert tailoring, clothing alterations, custom designs, and traditional wear specialists.'}
                        {category.id === 'cleaning' && 'Professional cleaning and housekeeping services for homes, offices, and commercial spaces.'}
                        {category.id === 'events' && 'Complete event planning and management for weddings, corporate events, and celebrations.'}
                        {category.id === 'marketing' && 'Digital marketing, social media management, and online promotion services for businesses.'}
                        {category.id === 'photography' && 'Professional photography and videography for weddings, events, and commercial projects.'}
                        {category.id === 'welding' && 'Expert welding and metal fabrication services for construction and repair projects.'}
                        {category.id === 'carpentry' && 'Skilled carpentry and furniture making services for custom woodwork and repairs.'}
                      </p>
                    </div>
                  </div>

                  {/* Expanded Professionals List */}
                  {isExpanded && (
                    <div 
                      id={`professionals-${category.id}`}
                      className="border-t border-gray-200 bg-gradient-to-b from-gray-50 to-gray-100 max-h-80 sm:max-h-96 overflow-y-auto animate-fadeIn custom-scrollbar"
                    >
                      <div className="p-3 sm:p-4 space-y-3">
                        {categoryProfessionals.map((professional: Professional, profIndex) => (
                          <div
                            key={professional.id}
                            className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 hover:border-teal-300 hover:shadow-md transition-all duration-300 transform hover:scale-102 animate-slideIn"
                            style={{
                              animationDelay: `${profIndex * 50}ms`
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <img
                                src={professional.photo}
                                alt={professional.name}
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-200 hover:border-teal-300 transition-colors duration-200"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                                    {professional.name}
                                  </h4>
                                  {professional.verified && (
                                    <ShieldCheckIcon className="text-green-500 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                  )}
                                </div>
                                
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 text-xs sm:text-sm text-gray-600">
                                  <div className="flex items-center gap-1">
                                    <Star className="text-yellow-500 fill-current w-3 h-3" />
                                    <span className="font-medium">{professional.rating}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <ShieldCheckIcon className="text-blue-500 w-3 h-3" />
                                    <span className="hidden sm:inline">{professional.trustCount} trust points</span>
                                    <span className="sm:hidden">{professional.trustCount} trust</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Briefcase className="text-gray-500 w-3 h-3" />
                                    <span>{professional.completedProjects} projects</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-1 mb-2 text-xs text-gray-500">
                                  <MapPin className="w-3 h-3" />
                                  <span className="truncate">{professional.location}</span>
                                </div>
                                
                                <p className="text-xs text-gray-600 text-justify line-clamp-2 mb-3 leading-relaxed">
                                  {professional.bio}
                                </p>
                                
                                <div className="flex gap-2">
                                  <Link 
                                    href={`/professional-profile/${professional.username}`}
                                    className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-1.5 px-3 rounded-md text-xs font-medium transition-all duration-200 shadow-sm hover:shadow-md flex-1 text-center"
                                  >
                                    View Profile
                                  </Link>
                                  <button
                                    onClick={() => openChat(professional)}
                                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white p-1.5 rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
                                    title="Start Chat"
                                  >
                                    <ChatBubbleLeftRightIcon className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {categoryProfessionals.length === 0 && (
                          <div className="text-center py-6 text-gray-500">
                            <p className="text-sm">No professionals available in this category yet.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            </div>
          )}
        </div>
      </div>

      {/* Chat Modal */}
      {chatOpen && selectedProfessional && (
        <ChatBox
          isOpen={chatOpen}
          onClose={closeChat}
          recipientName={selectedProfessional.name}
          currentUser="You"
        />
      )}
    </div>
  );
}