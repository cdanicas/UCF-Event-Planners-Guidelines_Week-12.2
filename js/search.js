/* ====================================
   Search JavaScript - Site-Wide Search
   ==================================== */

// Search index will be populated from all pages
let searchIndex = [];

document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    buildSearchIndex();
});

/**
 * Initialize Search Functionality
 */
function initSearch() {
    const searchInput = document.getElementById('global-search');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');

    if (!searchInput || !searchBtn || !searchResults) return;

    // Search on button click
    searchBtn.addEventListener('click', performSearch);

    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Real-time search with debounce
    searchInput.addEventListener('input', window.UCFUtils.debounce(performSearch, 300));

    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target) && !searchBtn.contains(e.target)) {
            searchResults.classList.add('hidden');
        }
    });
}

/**
 * Perform Search
 */
function performSearch() {
    const searchInput = document.getElementById('global-search');
    const searchResults = document.getElementById('search-results');
    const query = searchInput.value.trim().toLowerCase();

    if (query.length < 2) {
        searchResults.classList.add('hidden');
        return;
    }

    const results = searchContent(query);
    displaySearchResults(results);
}

/**
 * Search Content
 */
function searchContent(query) {
    const results = [];

    // Search in current page
    const pageTitle = document.title;
    const mainContent = document.querySelector('.main-content');

    if (mainContent) {
        // Search in headings
        const headings = mainContent.querySelectorAll('h1, h2, h3, h4');
        headings.forEach(heading => {
            if (heading.textContent.toLowerCase().includes(query)) {
                results.push({
                    title: heading.textContent,
                    excerpt: getExcerpt(heading),
                    page: pageTitle,
                    element: heading
                });
            }
        });

        // Search in paragraphs
        const paragraphs = mainContent.querySelectorAll('p');
        paragraphs.forEach(p => {
            if (p.textContent.toLowerCase().includes(query)) {
                const title = getNearestHeading(p);
                results.push({
                    title: title || 'Content Match',
                    excerpt: highlightMatch(p.textContent, query),
                    page: pageTitle,
                    element: p
                });
            }
        });

        // Search in list items
        const listItems = mainContent.querySelectorAll('li');
        listItems.forEach(li => {
            if (li.textContent.toLowerCase().includes(query)) {
                const title = getNearestHeading(li);
                results.push({
                    title: title || 'List Item',
                    excerpt: highlightMatch(li.textContent, query),
                    page: pageTitle,
                    element: li
                });
            }
        });
    }

    // Search in search index for other pages
    searchIndex.forEach(item => {
        if (item.content.toLowerCase().includes(query)) {
            results.push({
                title: item.title,
                excerpt: highlightMatch(item.content, query),
                page: item.page,
                url: item.url
            });
        }
    });

    // Remove duplicates and limit results
    const uniqueResults = results.filter((result, index, self) =>
        index === self.findIndex(r => r.title === result.title && r.excerpt === result.excerpt)
    );

    return uniqueResults.slice(0, 10);
}

/**
 * Display Search Results
 */
function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');

    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item"><p>No results found</p></div>';
        searchResults.classList.remove('hidden');
        return;
    }

    let html = '';
    results.forEach(result => {
        html += `
            <div class="search-result-item" data-url="${result.url || '#'}"${result.element ? ` data-scroll-to="${result.element.id || ''}"` : ''}>
                <div class="search-result-page">${result.page}</div>
                <div class="search-result-title">${result.title}</div>
                <div class="search-result-excerpt">${result.excerpt}</div>
            </div>
        `;
    });

    searchResults.innerHTML = html;
    searchResults.classList.remove('hidden');

    // Add click handlers to results
    const resultItems = searchResults.querySelectorAll('.search-result-item');
    resultItems.forEach(item => {
        item.addEventListener('click', function() {
            const url = this.dataset.url;
            const scrollTo = this.dataset.scrollTo;

            if (scrollTo) {
                const element = document.getElementById(scrollTo);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    element.style.backgroundColor = '#FFF8DC';
                    setTimeout(() => element.style.backgroundColor = '', 2000);
                }
            } else if (url && url !== '#') {
                window.location.href = url;
            }

            searchResults.classList.add('hidden');
        });
    });
}

/**
 * Get Excerpt Around Match
 */
function getExcerpt(element) {
    let text = '';
    let nextElement = element.nextElementSibling;

    while (nextElement && text.length < 150) {
        if (nextElement.tagName === 'P') {
            text += nextElement.textContent + ' ';
            break;
        }
        nextElement = nextElement.nextElementSibling;
    }

    return text.trim().substring(0, 150) + (text.length > 150 ? '...' : '');
}

/**
 * Get Nearest Heading
 */
function getNearestHeading(element) {
    let prev = element.previousElementSibling;

    while (prev) {
        if (prev.tagName.match(/^H[1-6]$/)) {
            return prev.textContent;
        }
        prev = prev.previousElementSibling;
    }

    // If no previous heading, check parent
    let parent = element.parentElement;
    while (parent && parent !== document.body) {
        const heading = parent.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) {
            return heading.textContent;
        }
        parent = parent.parentElement;
    }

    return null;
}

/**
 * Highlight Match in Text
 */
function highlightMatch(text, query) {
    const maxLength = 150;
    const index = text.toLowerCase().indexOf(query.toLowerCase());

    if (index === -1) return text.substring(0, maxLength) + '...';

    // Get context around match
    const start = Math.max(0, index - 50);
    const end = Math.min(text.length, index + query.length + 100);

    let excerpt = text.substring(start, end);
    if (start > 0) excerpt = '...' + excerpt;
    if (end < text.length) excerpt += '...';

    // Highlight the match
    const regex = new RegExp(`(${query})`, 'gi');
    excerpt = excerpt.replace(regex, '<strong style="background-color: #FFC904; padding: 0 2px;">$1</strong>');

    return excerpt;
}

/**
 * Build Search Index
 */
function buildSearchIndex() {
    // Define pages to index
    const pages = [
        {
            title: 'Home',
            url: 'index.html',
            keywords: 'event planning ucf university central florida guidelines budget venues parking catering'
        },
        {
            title: 'Conflict Management',
            url: 'conflict-management.html',
            keywords: 'calendar events athletics board trustees schedule conflicts dates'
        },
        {
            title: 'Budgeting',
            url: 'budgeting.html',
            keywords: 'budget calculator costs expenses funding timeline checklist'
        },
        {
            title: 'Venues',
            url: 'venues.html',
            keywords: 'venue arena student union downtown lake nona rosen campus locations spaces rooms'
        },
        {
            title: 'Parking & Transportation',
            url: 'parking-transportation.html',
            keywords: 'parking shuttle transportation map lots accessibility'
        },
        {
            title: 'Security',
            url: 'security.html',
            keywords: 'security police ucfpd safety emergency officers'
        },
        {
            title: 'Catering',
            url: 'catering.html',
            keywords: 'catering food dining menu dietary restrictions beverages'
        },
        {
            title: 'Event Permits',
            url: 'event-permits.html',
            keywords: 'permits safe form approval licenses regulations'
        },
        {
            title: 'Lodging',
            url: 'lodging.html',
            keywords: 'hotels accommodations lodging group booking reservations'
        },
        {
            title: 'Marketing',
            url: 'marketing.html',
            keywords: 'marketing promotion social media brand standards advertising'
        }
    ];

    searchIndex = pages.map(page => ({
        title: page.title,
        page: page.title,
        url: page.url,
        content: page.keywords
    }));
}
