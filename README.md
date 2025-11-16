# UCF Event Planners Guidelines

A comprehensive educational website providing step-by-step guidance for planning events at the University of Central Florida.

## Overview

This website serves as a complete resource for UCF faculty, staff, and students planning events across all university campuses. It features interactive tools, best practices guides, and direct links to official UCF resources.

### Key Features

- **9 Comprehensive Sections** covering every aspect of event planning
- **Interactive Budget Calculator** with Excel export functionality
- **Event Timeline Builder** for tracking planning tasks
- **Catering Menu Builder** with cost estimation
- **Site-Wide Search** for quick information access
- **Interactive Flowcharts** for decision-making guidance
- **Responsive Design** optimized for desktop, tablet, and mobile
- **UCF Brand Compliant** following official style guidelines

## Sections

1. **Conflict Management** - Check UCF calendars to avoid scheduling conflicts
2. **Budgeting** - Create detailed event budgets with automatic calculations
3. **Venues** - Browse available spaces across all four UCF campuses
4. **Parking & Transportation** - Plan parking and transit for attendees
5. **Security** - Arrange appropriate security for your event
6. **Catering** - Build custom menus using UCF Dining Services
7. **Event Permits** - Navigate the SAFE form and approval process
8. **Lodging** - Find hotel accommodations near UCF campuses
9. **Marketing** - Promote your event following UCF brand standards

## Technology Stack

- **Frontend:** Pure HTML5, CSS3, and JavaScript (ES6+)
- **Styling:** Custom CSS with UCF brand colors (Black #000000, Gold #FFC904)
- **Typography:** Montserrat font (Gotham alternative)
- **Excel Export:** SheetJS library (client-side generation)
- **No Dependencies:** No framework required - vanilla JavaScript only
- **Deployment:** GitHub Pages ready

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A local web server for development (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/UCF-Event-Planners-Guidelines_Week-12.2.git
cd UCF-Event-Planners-Guidelines_Week-12.2
```

2. Open `index.html` in your browser, or serve with a local server:
```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server -p 8000
```

3. Navigate to `http://localhost:8000`

## Project Structure

```
├── index.html                    # Homepage with quick links
├── conflict-management.html      # Calendar conflict checking
├── budgeting.html               # Budget calculator
├── venues.html                  # Venue listings
├── parking-transportation.html  # Parking information
├── security.html                # Security planning
├── catering.html               # Catering menu builder
├── event-permits.html          # Permits and SAFE form
├── lodging.html                # Hotel accommodations
├── marketing.html              # Marketing guidelines
├── css/
│   ├── main.css               # Global styles
│   ├── navigation.css         # Header/footer
│   ├── animations.css         # Animations
│   └── interactive.css        # Calculator styles
├── js/
│   ├── main.js                # Global utilities
│   ├── search.js              # Search functionality
│   ├── animations.js          # Scroll animations
│   ├── budget-calculator.js   # Budget tool
│   ├── timeline-builder.js    # Timeline tool
│   ├── catering-builder.js    # Catering tool
│   └── flowchart.js           # Decision trees
└── assets/
    ├── images/                # Logos and icons
    └── templates/             # Downloadable templates
```

## Interactive Features

### Budget Calculator
- Input costs across 6 categories (Venue, Catering, Security, Marketing, Equipment, Misc)
- Automatic 10% contingency calculation
- Per-person cost estimation
- Export complete budget to Excel
- Save/load functionality using browser localStorage

### Timeline Builder
- Add, edit, and delete planning tasks
- Assign dates to tasks
- Mark tasks as complete with checkboxes
- Export timeline to Excel with status tracking
- Persistent storage in browser

### Catering Menu Builder
- Select items from UCF Dining Services menu
- Categorized by meal type (Breakfast, Lunch, Dinner, etc.)
- Real-time cost calculation per person and total
- Export menu selections to Excel
- Guest count-based pricing

### Interactive Flowcharts
- **Conflict Management:** Navigate date selection process
- **Venue Selection:** Find appropriate venues by event size
- Yes/No decision trees with visual feedback

### Site-Wide Search
- Search across all 9 pages
- Real-time results with highlighting
- Searches headings, paragraphs, and lists
- Click to jump to relevant content

## UCF Resources Integrated

The website includes direct links to:
- UCF Events Calendar (events.ucf.edu)
- UCF Athletics Schedule (ucfknights.com)
- Board of Trustees Meetings (bot.ucf.edu)
- Florida Board of Governors (flbog.edu)
- UCF Parking Services (parking.ucf.edu)
- UCF Police Department (police.ucf.edu)
- SAFE Form (risk.ucf.edu)
- UCF Dining Catering (ucf.mydininghub.com)
- UCF Brand Standards (ucf.edu/brand)
- Venue booking portals for all campuses

## Development

### Adding Content
1. Edit the relevant HTML file
2. Maintain consistent UCF branding and styling
3. Use existing CSS classes from `css/main.css`
4. Test responsiveness on multiple screen sizes

### Modifying Calculators
1. Update JavaScript in `js/` directory
2. Modify data structures as needed
3. Adjust Excel export formatting
4. Update corresponding HTML forms
5. Test all calculations and exports

### Customizing Styles
- Global styles: `css/main.css`
- Navigation: `css/navigation.css`
- Animations: `css/animations.css`
- Interactive elements: `css/interactive.css`

## Browser Compatibility

Tested and supported on:
- Google Chrome 90+
- Mozilla Firefox 88+
- Apple Safari 14+
- Microsoft Edge 90+
- Mobile Safari (iOS 14+)
- Mobile Chrome (Android 10+)

## Accessibility

- Semantic HTML5 markup
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast color scheme (WCAG AA compliant)
- Focus indicators on all interactive elements
- Reduced motion support for animations
- Screen reader friendly

## Performance

- **Zero Dependencies:** No frameworks or libraries (except SheetJS for Excel)
- **Fast Load Times:** Minimal file sizes, optimized assets
- **Efficient Animations:** GPU-accelerated CSS transforms
- **Lazy Loading:** Intersection Observer for scroll animations
- **Debounced Search:** Optimized search performance
- **LocalStorage:** Client-side data persistence

## Future Enhancements

Potential features for future development:
- User authentication for cross-device saving
- Integration with UCF calendar APIs
- Real-time venue availability
- Email notifications for timeline reminders
- PDF export capabilities
- Multi-language support (Spanish, Portuguese)
- Dark mode theme

## Contributing

This project was created for UCF's Digital AI course (Week 12.2). Contributions are welcome for:
- Bug fixes
- Content updates (UCF links, venue information, best practices)
- Accessibility improvements
- Mobile optimization
- New interactive features

## License

This project is created for educational purposes as part of UCF coursework.

## Acknowledgments

- University of Central Florida for branding guidelines and resources
- UCF Event Planning departments for guidance and best practices
- SheetJS for Excel export functionality
- Google Fonts for Montserrat typography

## Contact

For questions about event planning at UCF, contact your department or college event coordinator.

For technical issues with this website, please create an issue in the repository.

---

**Built with ❤️ for UCF Event Planners**
