# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UCF Event Planners Guidelines is a comprehensive educational website for event planners at the University of Central Florida. The site provides step-by-step guidance, interactive tools, and resources for planning successful events across all UCF campuses (Main, Downtown, Lake Nona, and Rosen).

**Tech Stack:** Pure HTML, CSS, and JavaScript (no frameworks)
**Deployment:** GitHub Pages
**Target Audience:** UCF faculty, staff, and students planning university events

## Project Structure

```
UCF-Event-Planners-Guidelines_Week-12.2/
├── index.html                          # Homepage
├── conflict-management.html            # Check event calendars for conflicts
├── budgeting.html                      # Budget calculator & planning
├── venues.html                         # UCF venue listings by campus
├── parking-transportation.html         # Parking & transportation info
├── security.html                       # Event security planning
├── catering.html                       # Catering menu builder
├── event-permits.html                  # SAFE form & permits info
├── lodging.html                        # Hotel accommodations
├── marketing.html                      # Marketing & promotion guidelines
├── css/
│   ├── main.css                       # Global styles, UCF branding
│   ├── navigation.css                 # Header, footer, navigation
│   ├── animations.css                 # Scroll animations, transitions
│   └── interactive.css                # Calculator/builder styles
├── js/
│   ├── main.js                        # Global functionality, utilities
│   ├── search.js                      # Site-wide search
│   ├── animations.js                  # Scroll-triggered animations
│   ├── budget-calculator.js           # Budget calculator + Excel export
│   ├── timeline-builder.js            # Event timeline builder + Excel export
│   ├── catering-builder.js            # Catering menu builder + Excel export
│   └── flowchart.js                   # Interactive decision flowcharts
├── assets/
│   ├── images/                        # Logos, icons, images
│   └── templates/                     # Downloadable templates
├── CLAUDE.md                          # This file
├── README.md                          # Project documentation
└── .gitignore                         # Git ignore rules
```

## Development Commands

### Local Development
```bash
# Serve locally (use any HTTP server)
python3 -m http.server 8000
# OR
npx http-server -p 8000

# Open in browser
open http://localhost:8000
```

### Testing
- Test all interactive calculators (Budget, Timeline, Catering)
- Verify Excel export functionality (requires SheetJS CDN)
- Test search functionality across pages
- Check mobile responsiveness at different breakpoints
- Validate all external UCF links

### Deployment (GitHub Pages)
```bash
# Ensure you're on the correct branch
git checkout claude/init-project-setup-018Swuby94mSDB4jGWtYZBob

# Commit changes
git add .
git commit -m "Your commit message"

# Push to GitHub
git push -u origin claude/init-project-setup-018Swuby94mSDB4jGWtYZBob
```

GitHub Pages will automatically deploy from the configured branch.

## Code Architecture

### UCF Branding (css/main.css)
- **Primary Colors:** UCF Black (#000000), UCF Gold (#FFC904)
- **Typography:** Montserrat font (Gotham alternative)
- **Design:** Professional, desktop-first responsive design
- All components follow UCF brand standards

### Navigation System (css/navigation.css, js/main.js)
- Fixed header with 9-tab navigation
- Mobile hamburger menu for small screens
- Site-wide search bar in header
- Consistent footer across all pages

### Interactive Tools (js/*.js)

**Budget Calculator (budget-calculator.js)**
- Real-time calculation of event costs across 6 categories
- Automatic 10% contingency calculation
- Per-person cost estimation
- Export to Excel via SheetJS
- LocalStorage persistence

**Timeline Builder (timeline-builder.js)**
- Add/edit/delete tasks with dates
- Mark tasks complete with checkboxes
- Export timeline to Excel
- LocalStorage persistence

**Catering Menu Builder (catering-builder.js)**
- Select from categorized menu items (Breakfast, Lunch, Dinner, Appetizers, Beverages, Desserts)
- Real-time cost calculation based on guest count
- Export selections to Excel
- Meal type filtering

**Flowcharts (flowchart.js)**
- Interactive decision trees for conflict checking and venue selection
- Yes/No branching logic
- Visual feedback with color-coded nodes

### Search Functionality (search.js)
- Searches page headings, paragraphs, and list items
- Real-time results with debouncing
- Highlights matching text
- Click results to scroll to content or navigate to page

### Animations (animations.css, animations.js)
- Scroll-triggered fade-in animations using Intersection Observer
- Staggered animations for card grids
- Hover effects on all interactive elements
- Page transition animations
- Smooth scroll behavior

### Excel Export Implementation
All calculators use SheetJS (xlsx.js) loaded via CDN:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
```

Export functions create formatted Excel workbooks with:
- Header information (event name, date, etc.)
- Categorized data tables
- Summary totals
- Professional formatting

## Key Features

1. **9 Comprehensive Sections** covering all aspects of UCF event planning
2. **3 Interactive Calculators** with Excel export (Budget, Timeline, Catering)
3. **Site-Wide Search** for quick access to information
4. **Interactive Flowcharts** for decision-making guidance
5. **External UCF Links** to official resources, calendars, and services
6. **Best Practices Guides** for each planning category
7. **Responsive Design** works on desktop, tablet, and mobile
8. **Accessibility** features including keyboard navigation and ARIA labels

## Important External Links

The site includes links to official UCF resources:
- events.ucf.edu (Campus Events Calendar)
- ucfknights.com (Athletics Schedule)
- bot.ucf.edu (Board of Trustees)
- flbog.edu (FL Board of Governors)
- parking.ucf.edu (Parking Services)
- police.ucf.edu (UCF Police)
- risk.ucf.edu (SAFE Form)
- ucf.mydininghub.com (Catering)
- ucf.edu/brand (Brand Standards)
- Various venue reservation sites

## Common Modifications

### Adding New Content
1. Update relevant HTML page in root directory
2. Maintain UCF branding and consistent styling
3. Use existing CSS classes from main.css
4. Test responsiveness

### Modifying Calculators
1. Update data structures in respective .js files
2. Adjust Excel export format in export functions
3. Update HTML form fields to match
4. Test calculations and exports

### Updating Styles
1. Global styles: css/main.css
2. Navigation: css/navigation.css
3. Animations: css/animations.css
4. Calculators: css/interactive.css

### Adding New Pages
1. Create HTML file in root directory
2. Copy header/footer from existing page
3. Add navigation link to all pages
4. Update search index in search.js
5. Test all links and navigation

## Browser Compatibility

Tested and supported:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Mobile Chrome (Android 10+)

## Performance Notes

- No external dependencies except SheetJS for Excel export
- Vanilla JavaScript for optimal performance
- CSS animations use GPU-accelerated properties
- Lazy loading via Intersection Observer
- Debounced search prevents excessive processing

## Accessibility

- Semantic HTML5 elements
- ARIA labels where appropriate
- Keyboard navigation support
- Focus visible styles
- Color contrast meets WCAG AA standards
- Reduced motion support via prefers-reduced-motion

## Future Enhancements

Potential additions for future development:
- User authentication for saving preferences
- Integration with UCF calendar APIs
- Real-time venue availability checking
- Email reminder system for timeline tasks
- Print-optimized views
- PDF export options
- Multi-language support

## Troubleshooting

**Excel Export Not Working:**
- Verify SheetJS CDN is loading (check browser console)
- Ensure browser allows file downloads
- Try different browser if issues persist

**Search Not Finding Results:**
- Check search index in search.js includes target page
- Verify search terms match actual page content
- Clear browser cache

**Animations Not Triggering:**
- Ensure animations.js is loaded
- Check browser supports Intersection Observer
- Disable animations for browsers with prefers-reduced-motion

**Mobile Menu Not Opening:**
- Verify main.js is loaded correctly
- Check for JavaScript errors in console
- Test mobile-menu-toggle button click handler

## Notes for Development

- This is a static website - no server-side code required
- All data persistence uses browser LocalStorage
- Excel exports happen client-side in browser
- No build process required - files can be edited directly
- Maintain UCF branding consistency in all modifications
- Test on actual mobile devices, not just browser dev tools
