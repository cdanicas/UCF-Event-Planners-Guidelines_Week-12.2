/* ====================================
   Budget Calculator with Excel Export
   ==================================== */

document.addEventListener('DOMContentLoaded', function() {
    const budgetCalculator = document.getElementById('budget-calculator');
    if (budgetCalculator) {
        initBudgetCalculator();
    }
});

let budgetData = {
    eventName: '',
    eventDate: '',
    attendees: 0,
    venue: {
        rental: 0,
        setup: 0
    },
    catering: {
        food: 0,
        service: 0
    },
    security: 0,
    marketing: {
        printing: 0,
        digital: 0
    },
    equipment: {
        av: 0,
        other: 0
    },
    misc: {
        permits: 0,
        contingency: 0,
        other: 0
    }
};

function initBudgetCalculator() {
    // Event details listeners
    document.getElementById('event-name')?.addEventListener('input', (e) => budgetData.eventName = e.target.value);
    document.getElementById('event-date')?.addEventListener('input', (e) => budgetData.eventDate = e.target.value);
    document.getElementById('expected-attendees')?.addEventListener('input', (e) => {
        budgetData.attendees = parseInt(e.target.value) || 0;
        calculateTotals();
    });

    // Budget input listeners
    const budgetInputs = document.querySelectorAll('.budget-input');
    budgetInputs.forEach(input => {
        input.addEventListener('input', handleBudgetInput);
    });

    // Button listeners
    document.getElementById('export-excel')?.addEventListener('click', exportBudgetToExcel);
    document.getElementById('save-budget')?.addEventListener('click', saveBudgetToLocalStorage);
    document.getElementById('clear-budget')?.addEventListener('click', clearBudget);

    // Load saved budget if exists
    loadBudgetFromLocalStorage();
}

function handleBudgetInput(e) {
    const value = parseFloat(e.target.value) || 0;
    const id = e.target.id;

    // Map input IDs to budget data structure
    const mapping = {
        'venue-rental': () => budgetData.venue.rental = value,
        'venue-setup': () => budgetData.venue.setup = value,
        'catering-food': () => budgetData.catering.food = value,
        'catering-service': () => budgetData.catering.service = value,
        'security-cost': () => budgetData.security = value,
        'marketing-printing': () => budgetData.marketing.printing = value,
        'marketing-digital': () => budgetData.marketing.digital = value,
        'equipment-av': () => budgetData.equipment.av = value,
        'equipment-other': () => budgetData.equipment.other = value,
        'misc-permits': () => budgetData.misc.permits = value,
        'misc-other': () => budgetData.misc.other = value
    };

    if (mapping[id]) {
        mapping[id]();
        calculateTotals();
    }
}

function calculateTotals() {
    // Calculate category totals
    const venueTotal = budgetData.venue.rental + budgetData.venue.setup;
    const cateringTotal = budgetData.catering.food + budgetData.catering.service;
    const securityTotal = budgetData.security;
    const marketingTotal = budgetData.marketing.printing + budgetData.marketing.digital;
    const equipmentTotal = budgetData.equipment.av + budgetData.equipment.other;

    // Calculate subtotal (before contingency)
    const subtotal = venueTotal + cateringTotal + securityTotal + marketingTotal + equipmentTotal + budgetData.misc.permits + budgetData.misc.other;

    // Calculate 10% contingency
    const contingency = subtotal * 0.10;
    budgetData.misc.contingency = contingency;

    // Update contingency input
    const contingencyInput = document.getElementById('misc-contingency');
    if (contingencyInput) {
        contingencyInput.value = contingency.toFixed(2);
    }

    // Calculate grand total
    const miscTotal = budgetData.misc.permits + budgetData.misc.contingency + budgetData.misc.other;
    const grandTotal = subtotal + contingency;

    // Calculate per person cost
    const perPersonCost = budgetData.attendees > 0 ? grandTotal / budgetData.attendees : 0;

    // Update display
    updateSummaryDisplay({
        venueTotal,
        cateringTotal,
        securityTotal,
        marketingTotal,
        equipmentTotal,
        miscTotal,
        grandTotal,
        perPersonCost
    });
}

function updateSummaryDisplay(totals) {
    const elements = {
        'venue-total': totals.venueTotal,
        'catering-total': totals.cateringTotal,
        'security-total': totals.securityTotal,
        'marketing-total': totals.marketingTotal,
        'equipment-total': totals.equipmentTotal,
        'misc-total': totals.miscTotal,
        'grand-total': totals.grandTotal,
        'per-person-cost': totals.perPersonCost
    };

    Object.keys(elements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = window.UCFUtils.formatCurrency(elements[id]);
        }
    });
}

function exportBudgetToExcel() {
    if (typeof XLSX === 'undefined') {
        alert('Excel library not loaded. Please refresh the page.');
        return;
    }

    // Create workbook
    const wb = XLSX.utils.book_new();

    // Create budget worksheet data
    const wsData = [
        ['UCF Event Budget'],
        ['Event Name:', budgetData.eventName || 'Not specified'],
        ['Event Date:', budgetData.eventDate || 'Not specified'],
        ['Expected Attendees:', budgetData.attendees || 0],
        [],
        ['BUDGET BREAKDOWN'],
        [],
        ['Venue Costs'],
        ['Venue Rental', window.UCFUtils.formatCurrency(budgetData.venue.rental)],
        ['Setup/Cleanup', window.UCFUtils.formatCurrency(budgetData.venue.setup)],
        ['Venue Total', window.UCFUtils.formatCurrency(budgetData.venue.rental + budgetData.venue.setup)],
        [],
        ['Catering Costs'],
        ['Food & Beverages', window.UCFUtils.formatCurrency(budgetData.catering.food)],
        ['Service Fees', window.UCFUtils.formatCurrency(budgetData.catering.service)],
        ['Catering Total', window.UCFUtils.formatCurrency(budgetData.catering.food + budgetData.catering.service)],
        [],
        ['Security'],
        ['Security Personnel', window.UCFUtils.formatCurrency(budgetData.security)],
        [],
        ['Marketing & Promotion'],
        ['Printing', window.UCFUtils.formatCurrency(budgetData.marketing.printing)],
        ['Digital Marketing', window.UCFUtils.formatCurrency(budgetData.marketing.digital)],
        ['Marketing Total', window.UCFUtils.formatCurrency(budgetData.marketing.printing + budgetData.marketing.digital)],
        [],
        ['Equipment & Supplies'],
        ['A/V Equipment', window.UCFUtils.formatCurrency(budgetData.equipment.av)],
        ['Other Supplies', window.UCFUtils.formatCurrency(budgetData.equipment.other)],
        ['Equipment Total', window.UCFUtils.formatCurrency(budgetData.equipment.av + budgetData.equipment.other)],
        [],
        ['Miscellaneous'],
        ['Permits & Fees', window.UCFUtils.formatCurrency(budgetData.misc.permits)],
        ['Contingency (10%)', window.UCFUtils.formatCurrency(budgetData.misc.contingency)],
        ['Other Expenses', window.UCFUtils.formatCurrency(budgetData.misc.other)],
        ['Miscellaneous Total', window.UCFUtils.formatCurrency(budgetData.misc.permits + budgetData.misc.contingency + budgetData.misc.other)],
        [],
        ['GRAND TOTAL', window.UCFUtils.formatCurrency(calculateGrandTotal())],
        ['Per Person Cost', window.UCFUtils.formatCurrency(budgetData.attendees > 0 ? calculateGrandTotal() / budgetData.attendees : 0)]
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Budget');

    // Generate filename
    const filename = `UCF_Event_Budget_${budgetData.eventName || 'Untitled'}_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Save file
    XLSX.writeFile(wb, filename);

    window.UCFUtils.showToast('Budget exported to Excel successfully!', 'success');
}

function calculateGrandTotal() {
    const venueTotal = budgetData.venue.rental + budgetData.venue.setup;
    const cateringTotal = budgetData.catering.food + budgetData.catering.service;
    const marketingTotal = budgetData.marketing.printing + budgetData.marketing.digital;
    const equipmentTotal = budgetData.equipment.av + budgetData.equipment.other;
    const miscTotal = budgetData.misc.permits + budgetData.misc.contingency + budgetData.misc.other;

    return venueTotal + cateringTotal + budgetData.security + marketingTotal + equipmentTotal + miscTotal;
}

function saveBudgetToLocalStorage() {
    localStorage.setItem('ucf_event_budget', JSON.stringify(budgetData));
    window.UCFUtils.showToast('Budget saved successfully!', 'success');
}

function loadBudgetFromLocalStorage() {
    const saved = localStorage.getItem('ucf_event_budget');
    if (saved) {
        budgetData = JSON.parse(saved);

        // Populate form fields
        document.getElementById('event-name').value = budgetData.eventName || '';
        document.getElementById('event-date').value = budgetData.eventDate || '';
        document.getElementById('expected-attendees').value = budgetData.attendees || 0;
        document.getElementById('venue-rental').value = budgetData.venue.rental || 0;
        document.getElementById('venue-setup').value = budgetData.venue.setup || 0;
        document.getElementById('catering-food').value = budgetData.catering.food || 0;
        document.getElementById('catering-service').value = budgetData.catering.service || 0;
        document.getElementById('security-cost').value = budgetData.security || 0;
        document.getElementById('marketing-printing').value = budgetData.marketing.printing || 0;
        document.getElementById('marketing-digital').value = budgetData.marketing.digital || 0;
        document.getElementById('equipment-av').value = budgetData.equipment.av || 0;
        document.getElementById('equipment-other').value = budgetData.equipment.other || 0;
        document.getElementById('misc-permits').value = budgetData.misc.permits || 0;
        document.getElementById('misc-other').value = budgetData.misc.other || 0;

        calculateTotals();
        window.UCFUtils.showToast('Loaded saved budget', 'info');
    }
}

function clearBudget() {
    if (confirm('Are you sure you want to clear all budget data?')) {
        budgetData = {
            eventName: '',
            eventDate: '',
            attendees: 0,
            venue: { rental: 0, setup: 0 },
            catering: { food: 0, service: 0 },
            security: 0,
            marketing: { printing: 0, digital: 0 },
            equipment: { av: 0, other: 0 },
            misc: { permits: 0, contingency: 0, other: 0 }
        };

        // Clear all inputs
        document.querySelectorAll('.budget-calculator input').forEach(input => input.value = '');

        calculateTotals();
        localStorage.removeItem('ucf_event_budget');
        window.UCFUtils.showToast('Budget cleared', 'info');
    }
}
