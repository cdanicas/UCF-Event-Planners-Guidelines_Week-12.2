/* ====================================
   Interactive Flowcharts
   ==================================== */

document.addEventListener('DOMContentLoaded', function() {
    const conflictFlowchart = document.getElementById('conflict-flowchart');
    const venueFlowchart = document.getElementById('venue-flowchart');

    if (conflictFlowchart) {
        initConflictFlowchart();
    }

    if (venueFlowchart) {
        initVenueFlowchart();
    }
});

/**
 * Conflict Management Flowchart
 */
function initConflictFlowchart() {
    const container = document.getElementById('conflict-flowchart');

    const flowchart = {
        start: {
            text: 'Do you have a proposed event date?',
            type: 'question',
            yes: 'check_calendar',
            no: 'flexible'
        },
        check_calendar: {
            text: 'Have you checked the UCF Events Calendar?',
            type: 'question',
            yes: 'check_athletics',
            no: 'go_check'
        },
        go_check: {
            text: 'Please check events.ucf.edu before proceeding. Click to return to Conflict Management page.',
            type: 'answer-no',
            action: () => window.location.reload()
        },
        check_athletics: {
            text: 'Have you checked the Athletics Calendar?',
            type: 'question',
            yes: 'check_availability',
            no: 'check_all'
        },
        check_all: {
            text: 'Check ALL calendars (Events, Athletics, BOT, BOG) to avoid conflicts.',
            type: 'answer-no',
            action: () => window.location.reload()
        },
        check_availability: {
            text: 'Is your date free from major conflicts?',
            type: 'question',
            yes: 'success',
            no: 'choose_new'
        },
        flexible: {
            text: 'Consider checking calendars first to identify available dates. Then choose a date that works best.',
            type: 'answer-yes',
            action: () => window.location.reload()
        },
        choose_new: {
            text: 'You should choose an alternative date to avoid conflicts with major university events.',
            type: 'answer-no',
            action: () => window.location.reload()
        },
        success: {
            text: '✓ Great! Your date appears to be conflict-free. Proceed with planning your event!',
            type: 'answer-yes',
            action: () => window.location.href = 'budgeting.html'
        }
    };

    renderFlowchartStep('start', flowchart, container);
}

/**
 * Venue Selection Flowchart
 */
function initVenueFlowchart() {
    const container = document.getElementById('venue-flowchart');

    const flowchart = {
        start: {
            text: 'How many attendees do you expect?',
            type: 'question',
            options: [
                { text: 'Under 50', next: 'small' },
                { text: '50-300', next: 'medium' },
                { text: '300-1000', next: 'large' },
                { text: 'Over 1000', next: 'very_large' }
            ]
        },
        small: {
            text: 'For small events, consider Student Union meeting rooms or department conference rooms.',
            type: 'answer-yes',
            action: () => window.scrollTo({ top: 0, behavior: 'smooth' })
        },
        medium: {
            text: 'For medium events, consider Student Union ballrooms or The Cypress Room at Addition Financial Arena.',
            type: 'answer-yes',
            action: () => window.scrollTo({ top: 0, behavior: 'smooth' })
        },
        large: {
            text: 'For large events, consider Addition Financial Arena (The Venue) or large Student Union spaces.',
            type: 'answer-yes',
            action: () => window.scrollTo({ top: 0, behavior: 'smooth' })
        },
        very_large: {
            text: 'For very large events, Addition Financial Arena is your best option. Contact them early!',
            type: 'answer-yes',
            action: () => window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    };

    renderFlowchartStep('start', flowchart, container);
}

/**
 * Render Flowchart Step
 */
function renderFlowchartStep(stepKey, flowchart, container) {
    const step = flowchart[stepKey];
    if (!step) return;

    container.innerHTML = '';

    const node = document.createElement('div');
    node.className = `flowchart-node ${step.type}`;
    node.innerHTML = `<p>${step.text}</p>`;

    if (step.type === 'question') {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'flowchart-options';

        if (step.options) {
            // Multiple choice options
            step.options.forEach(option => {
                const btn = document.createElement('button');
                btn.className = 'flowchart-btn';
                btn.textContent = option.text;
                btn.addEventListener('click', () => renderFlowchartStep(option.next, flowchart, container));
                optionsDiv.appendChild(btn);
            });
        } else {
            // Yes/No options
            const yesBtn = document.createElement('button');
            yesBtn.className = 'flowchart-btn yes';
            yesBtn.textContent = 'Yes';
            yesBtn.addEventListener('click', () => renderFlowchartStep(step.yes, flowchart, container));

            const noBtn = document.createElement('button');
            noBtn.className = 'flowchart-btn no';
            noBtn.textContent = 'No';
            noBtn.addEventListener('click', () => renderFlowchartStep(step.no, flowchart, container));

            optionsDiv.appendChild(yesBtn);
            optionsDiv.appendChild(noBtn);
        }

        node.appendChild(optionsDiv);
    } else if (step.action) {
        const btn = document.createElement('button');
        btn.className = 'flowchart-btn';
        btn.textContent = 'Continue';
        btn.addEventListener('click', step.action);

        const resetBtn = document.createElement('button');
        resetBtn.className = 'flowchart-btn';
        resetBtn.textContent = 'Start Over';
        resetBtn.style.marginLeft = '10px';
        resetBtn.addEventListener('click', () => renderFlowchartStep('start', flowchart, container));

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'flowchart-options';
        optionsDiv.appendChild(btn);
        optionsDiv.appendChild(resetBtn);

        node.appendChild(optionsDiv);
    }

    container.appendChild(node);
}
