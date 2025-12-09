# Cultural Powers Design Guidelines

## Design Approach

**Selected Approach: Custom Cultural Design System**
- Justification: African traditional healing requires a unique visual language that balances ancestral authenticity with modern digital trust
- This is a spiritual service platform requiring deep cultural resonance while maintaining professional credibility
- Primary references: Blend of luxury brand sophistication (for trust/professionalism) with bold cultural expression (for authenticity)

## Core Design Principles

1. **Sacred Minimalism**: Spacious layouts that honor the gravity of spiritual work - avoid cluttered interfaces
2. **Cultural Authority**: Design communicates expertise, ancestral connection, and legitimate spiritual power
3. **Accessible Mysticism**: Complex spiritual concepts made approachable through clear hierarchy and progressive disclosure
4. **Trust Through Transparency**: Clear pricing, processes, and information architecture build confidence

## Typography System

**Font Families:**
- Primary Headings: Playfair Display (serif, 700/900 weights) - conveys tradition, authority, gravitas
- Secondary Headings: Montserrat (sans-serif, 600/700 weights) - modern clarity
- Body Text: Inter (sans-serif, 400/500 weights) - exceptional readability for extensive content

**Hierarchy:**
- Hero Headlines: 3.5rem (desktop) / 2rem (mobile), Playfair Display Black
- Section Titles: 2.5rem (desktop) / 1.75rem (mobile), Playfair Display Bold  
- Service Titles: 1.75rem, Montserrat Semibold
- Body Text: 1.125rem, Inter Regular (larger for readability of spiritual content)
- Small Text/Labels: 0.875rem, Inter Medium

## Layout System

**Spacing Primitives:** Use Tailwind units of 4, 8, 12, 16, 24 consistently
- Component padding: p-8 to p-16
- Section spacing: py-16 to py-24
- Element gaps: gap-4, gap-8, gap-12
- Container max-width: max-w-7xl with px-4 mobile / px-8 desktop

**Grid Patterns:**
- Hero sections: Full-width with centered content max-w-4xl
- Service cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Testimonials: grid-cols-1 lg:grid-cols-2
- Shop products: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Blog articles: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

## Images

**Hero Section:**
- Large hero image featuring African spiritual imagery (ancestral symbols, traditional healing elements, sacred fire, cultural patterns)
- Overlay with subtle gradient to ensure text readability
- Animated particle effects or subtle energy waves overlay
- Height: 85vh on desktop, 70vh on mobile

**Secondary Images:**
- About page: Portrait of healer with traditional attire/cultural background
- Service pages: Relevant ritual/cultural imagery per service
- Shop products: Clean product photography on neutral backgrounds
- Blog: Featured images for each article (cultural scenes, symbols, nature)
- Success stories: Before/after testimonial photos with permission

## Component Library

### Navigation
- Sticky header with transparent-to-solid transition on scroll
- Logo left, main nav center, action buttons (Emergency Help, Book Now) right
- Mobile: Hamburger menu with full-screen overlay navigation
- Include WhatsApp/Phone quick access icons in header

### Hero Section
- Full-width background image with animated overlay effects
- Centered headline + subheadline + 3 primary CTAs
- Floating trust indicators: "24/7 Support" badge, operating hours, consultation fees
- Scrolling animation hint (down arrow or cultural symbol)

### Service Cards
- Image/icon at top
- Service title in Montserrat Semibold
- Brief description (2-3 lines)
- Price display prominently
- "Learn More" + "Book Now" dual CTAs
- Hover: Subtle lift effect with enhanced imagery

### Booking Interface
- Multi-step form with progress indicator
- Service selection with visual cards
- Date/time picker with available slots
- Payment method selection with icons
- Summary sidebar showing total, service details
- Trust badges near payment section

### AI Tools (Dream Analyzer, Bad Luck Detector, etc.)
- Card-based interface with mystical iconography
- Input areas with generous padding
- Progressive disclosure: Question → Analysis → Results → Action
- Results presented with visual indicators (meters, charts, symbols)
- Clear CTA to book relevant service

### Shop Interface
- Product grid with hover zoom on images
- Quick view modal for product details
- Sticky "Add to Cart" button
- Cart drawer slides from right
- Category filter sidebar on desktop, dropdown on mobile

### Admin Dashboard
- Sidebar navigation with collapsible sections
- Data tables with sort/filter capabilities
- Analytics widgets with charts
- Content editor with live preview
- Mobile-responsive table views with horizontal scroll

### Testimonials
- Large quote format with client name/location
- Star ratings prominently displayed
- Photo (if available) in circular frame with cultural border
- Carousel on mobile, grid on desktop
- Video testimonials with play overlay

### Blog
- Featured post hero at top of blog index
- Article cards with image, title, excerpt, read time
- Category tags with cultural icons
- Social share buttons
- Related articles at bottom of posts

### Footer
- Multi-column layout (About, Services, Quick Links, Contact)
- Newsletter signup with cultural border treatment
- Social media icons
- Trust badges (payment methods, security)
- Multi-language selector
- Cultural pattern background element

## Animations (Minimal, Purposeful)

- Hero: Subtle particle/energy animation overlay
- Service cards: Gentle lift on hover (transform: translateY(-4px))
- Page transitions: Smooth fade-in for content sections
- AI tool results: Progressive reveal with slide-up animation
- Emergency button: Subtle pulse to draw attention
- Loading states: Custom spinner with cultural symbol
- No excessive scroll-triggered animations - maintain performance

## Cultural Design Elements

**African Patterns & Motifs:**
- Decorative borders using traditional geometric patterns
- Section dividers with cultural symbols
- Background textures with subtle Adinkra-inspired patterns
- Icon set incorporating African spiritual symbols
- Custom illustrated elements for AI tool interfaces

**Visual Hierarchy for Trust:**
- Consultation fees always clearly visible
- Operating hours prominently displayed
- Emergency contact always accessible
- Credentials and experience highlighted
- Success rates and testimonials given significant space

## Mobile-First Considerations

- Touch targets minimum 44px height
- Thumb-zone optimization for primary actions
- Simplified navigation with clear hierarchy
- Collapsible sections for 200+ services (expandable categories)
- Swipeable product galleries
- Bottom navigation bar for key actions on mobile
- WhatsApp/Call buttons as floating action buttons on mobile

## Responsive Breakpoints

- Mobile: 0-767px (single column, stacked)
- Tablet: 768-1023px (2-column grids)
- Desktop: 1024px+ (3-4 column grids, full layouts)

## Accessibility

- WCAG AA contrast ratios throughout (critical given theme preference)
- Semantic HTML structure
- ARIA labels for all interactive elements
- Keyboard navigation for all features
- Focus indicators visible and styled
- Alt text for all spiritual/cultural imagery
- Form labels and error messages clear and descriptive