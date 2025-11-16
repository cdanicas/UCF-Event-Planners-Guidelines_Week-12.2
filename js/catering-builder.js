/* ====================================
   Catering Menu Builder with Excel Export
   ==================================== */

document.addEventListener('DOMContentLoaded', function() {
    const cateringBuilder = document.getElementById('catering-builder');
    if (cateringBuilder) {
        initCateringBuilder();
    }
});

let cateringData = {
    eventName: '',
    guestCount: 0,
    mealType: '',
    selectedItems: []
};

function initCateringBuilder() {
    // Event details listeners
    document.getElementById('catering-event-name')?.addEventListener('input', (e) => {
        cateringData.eventName = e.target.value;
        updateCateringSummary();
    });

    document.getElementById('guest-count')?.addEventListener('input', (e) => {
        cateringData.guestCount = parseInt(e.target.value) || 0;
        updateCateringSummary();
    });

    document.getElementById('meal-type')?.addEventListener('change', (e) => {
        cateringData.mealType = e.target.value;
        filterMenuCategories();
        updateCateringSummary();
    });

    // Menu checkbox listeners
    const checkboxes = document.querySelectorAll('.menu-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleMenuSelection);
    });

    // Button listeners
    document.getElementById('export-catering-excel')?.addEventListener('click', exportCateringToExcel);
    document.getElementById('clear-catering')?.addEventListener('click', clearCatering);
}

function handleMenuSelection(e) {
    const checkbox = e.target;
    const itemId = checkbox.id;
    const itemLabel = checkbox.nextElementSibling.textContent;
    const price = parseFloat(checkbox.dataset.price) || 0;
    const category = checkbox.dataset.category;

    if (checkbox.checked) {
        cateringData.selectedItems.push({
            id: itemId,
            name: itemLabel,
            price: price,
            category: category
        });
    } else {
        cateringData.selectedItems = cateringData.selectedItems.filter(item => item.id !== itemId);
    }

    updateCateringSummary();
}

function filterMenuCategories() {
    const mealType = cateringData.mealType;
    const categories = document.querySelectorAll('.menu-category');

    if (!mealType) {
        categories.forEach(cat => cat.style.display = 'block');
        return;
    }

    const categoryMap = {
        breakfast: ['breakfast-category'],
        lunch: ['lunch-category'],
        dinner: ['dinner-category'],
        reception: ['appetizers-category', 'beverages-category', 'desserts-category'],
        snacks: ['appetizers-category', 'beverages-category', 'desserts-category']
    };

    categories.forEach(cat => {
        const shouldShow = categoryMap[mealType]?.includes(cat.id);
        cat.style.display = shouldShow ? 'block' : 'none';
    });
}

function updateCateringSummary() {
    const itemsCount = cateringData.selectedItems.length;
    const perPersonCost = cateringData.selectedItems.reduce((sum, item) => sum + item.price, 0);
    const totalCost = perPersonCost * cateringData.guestCount;

    document.getElementById('summary-guests').textContent = cateringData.guestCount;
    document.getElementById('summary-items').textContent = itemsCount;
    document.getElementById('summary-per-person').textContent = window.UCFUtils.formatCurrency(perPersonCost);
    document.getElementById('summary-total').textContent = window.UCFUtils.formatCurrency(totalCost);
}

function exportCateringToExcel() {
    if (typeof XLSX === 'undefined') {
        alert('Excel library not loaded. Please refresh the page.');
        return;
    }

    if (cateringData.selectedItems.length === 0) {
        alert('Please select at least one menu item!');
        return;
    }

    // Create workbook
    const wb = XLSX.utils.book_new();

    // Create catering worksheet data
    const wsData = [
        ['UCF Event Catering Menu'],
        ['Event Name:', cateringData.eventName || 'Not specified'],
        ['Meal Type:', cateringData.mealType || 'Not specified'],
        ['Guest Count:', cateringData.guestCount || 0],
        [],
        ['SELECTED MENU ITEMS'],
        ['Category', 'Item', 'Price per Person', 'Total Cost']
    ];

    // Add selected items
    cateringData.selectedItems.forEach(item => {
        wsData.push([
            item.category.toUpperCase(),
            item.name,
            window.UCFUtils.formatCurrency(item.price),
            window.UCFUtils.formatCurrency(item.price * cateringData.guestCount)
        ]);
    });

    // Add summary
    const perPersonCost = cateringData.selectedItems.reduce((sum, item) => sum + item.price, 0);
    const totalCost = perPersonCost * cateringData.guestCount;

    wsData.push([]);
    wsData.push(['SUMMARY']);
    wsData.push(['Items Selected:', cateringData.selectedItems.length]);
    wsData.push(['Cost Per Person:', window.UCFUtils.formatCurrency(perPersonCost)]);
    wsData.push(['Number of Guests:', cateringData.guestCount]);
    wsData.push(['TOTAL ESTIMATED COST:', window.UCFUtils.formatCurrency(totalCost)]);

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Catering Menu');

    // Generate filename
    const filename = `UCF_Catering_Menu_${cateringData.eventName || 'Untitled'}_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Save file
    XLSX.writeFile(wb, filename);

    window.UCFUtils.showToast('Catering menu exported to Excel successfully!', 'success');
}

function clearCatering() {
    if (confirm('Are you sure you want to clear all selections?')) {
        // Uncheck all checkboxes
        document.querySelectorAll('.menu-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });

        // Reset data
        cateringData = {
            eventName: '',
            guestCount: 0,
            mealType: '',
            selectedItems: []
        };

        // Clear form
        document.getElementById('catering-event-name').value = '';
        document.getElementById('guest-count').value = '';
        document.getElementById('meal-type').value = '';

        updateCateringSummary();
        filterMenuCategories();

        window.UCFUtils.showToast('Catering selections cleared', 'info');
    }
}
