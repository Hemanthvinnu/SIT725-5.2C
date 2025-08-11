$(document).ready(function() {
    // Initialize Materialize components
    $('.materialboxed').materialbox();
    $('.modal').modal();
    $('.tabs').tabs();
    
    // Load kitten cards from API
    getProjects();
    
    // Form submission handler (with proper event prevention)
    $('#formSubmit').click(function(e) {
        e.preventDefault();
        submitForm();
    });
    
    // Click me button handler
    $('#clickMeButton').click(function(e) {
        if (!$(e.target).hasClass('modal-trigger')) {
            showToast();
        }
    });
});

/**
 * Fetches kitten data from the API and updates the UI
 */
const getProjects = () => {
    // Show loading state
    $('#card-section').html(`
        <div class="center-align" style="padding: 2rem;">
            <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-blue">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
            <p class="grey-text">Loading adorable kittens...</p>
        </div>
    `);

    // Fetch data from API
    $.get('/api/projects')
        .done((response) => {
            if (response.statusCode === 200) {
                renderCards(response.data);
            } else {
                showErrorState('Server returned an unexpected response');
            }
        })
        .fail((jqXHR, textStatus, errorThrown) => {
            console.error('API Error:', textStatus, errorThrown);
            showErrorState('Failed to load kitten data');
        });
};

/**
 * Renders kitten cards to the page
 * @param {Array} items - Array of kitten objects
 */
const renderCards = (items) => {
    if (!items || items.length === 0) {
        showErrorState('No kittens found');
        return;
    }

    // Clear and rebuild card section
    $('#card-section').empty().addClass('row');
    
    items.forEach((item, index) => {
        const cardHTML = `
        <div class="col s12 m6 l4">
            <div class="card hoverable">
                <div class="card-image">
                    <img src="${item.image}" class="materialboxed" alt="${item.title}">
                    <span class="card-title">${item.title}</span>
                </div>
                <div class="card-content">
                    <p>${item.description}</p>
                </div>
                <div class="card-tabs">
                    <ul class="tabs tabs-fixed-width">
                        <li class="tab"><a href="#details-${index}">Details</a></li>
                        <li class="tab"><a href="#personality-${index}">Personality</a></li>
                    </ul>
                </div>
                <div class="card-content grey lighten-4">
                    <div id="details-${index}">
                        <p><strong>Age:</strong> ${item.details.age}</p>
                        <p><strong>Breed:</strong> ${item.details.breed}</p>
                    </div>
                    <div id="personality-${index}">
                        <p>${item.details.personality}</p>
                    </div>
                </div>
            </div>
        </div>`;
        
        $('#card-section').append(cardHTML);
    });

    // Reinitialize Materialize components
    $('.materialboxed').materialbox();
    $('.tabs').tabs();
};

/**
 * Shows error state UI
 * @param {string} message - Error message to display
 */
const showErrorState = (message) => {
    $('#card-section').html(`
        <div class="center-align" style="padding: 2rem;">
            <i class="large material-icons grey-text">sentiment_very_dissatisfied</i>
            <h5 class="grey-text">Oops!</h5>
            <p class="grey-text">${message}</p>
            <button class="btn waves-effect waves-light blue" onclick="getProjects()">
                <i class="material-icons left">refresh</i>Try Again
            </button>
        </div>
    `);
};

/**
 * Handles form submission
 */
const submitForm = () => {
    const formData = {
        first_name: $('#first_name').val(),
        last_name: $('#last_name').val(),
        password: $('#password').val(),
        email: $('#email').val()
    };

    if (!formData.first_name || !formData.email) {
        showToast('Please fill in all required fields', 'red');
        return;
    }

    console.log('Form submitted:', formData);
    showToast('Form submitted successfully!', 'green');
    $('form')[0].reset();
    $('#modal1').modal('close');
};

/**
 * Shows Materialize toast notification
 * @param {string} message - Toast message
 * @param {string} color - Toast color (e.g., 'green', 'red')
 */
const showToast = (message = 'Action completed!', color = 'green') => {
    M.toast({
        html: message,
        classes: `rounded ${color}`,
        displayLength: 2000
    });
};

// Make functions available globally
window.getProjects = getProjects;
window.showToast = showToast;