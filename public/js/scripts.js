const cardList = [
    {
        title: "Kitten 1",
        image: "images/kitten.jpg",
        description: "Sweet little kitten saying hello!",
        details: {
            age: "2 months",
            breed: "Tabby",
            personality: "Friendly and playful"
        }
    },
    {
        title: "Kitten 2", 
        image: "images/kitten-2.jpg",
        description: "Adorable little furball looking for cuddles",
        details: {
            age: "3 months",
            breed: "Siamese",
            personality: "Calm and affectionate"
        }
    },
    {
        title: "Kitten 3",
        image: "images/kitten-3.jpg",
        description: "Playful kitten ready for adventures",
        details: {
            age: "1.5 months",
            breed: "Persian",
            personality: "Energetic and curious"
        }
    }
];

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('.modal').modal();
    
    addCards(cardList);
    
    $('#formSubmit').click(function(e){
        e.preventDefault();
        submitForm();
    });
    
    $('#clickMeButton').click(function(e){
        if (!$(e.target).hasClass('modal-trigger')) {
            showToast();
        }
    });
});

const addCards = (items) => {
    $("#card-section").empty(); 
    
    items.forEach((item, index) => {
        let cardHTML = `
        <div class="col s12 m6 l4">
            <div class="card">
                <div class="card-image">
                    <img src="${item.image}" class="materialboxed">
                    <span class="card-title">${item.title}</span>
                </div>
                <div class="card-content">
                    <p>${item.description}</p>
                </div>
                <div class="card-tabs">
                    <ul class="tabs tabs-fixed-width">
                        <li class="tab"><a class="active" href="#details-${index}">Details</a></li>
                        <li class="tab"><a href="#personality-${index}">Personality</a></li>
                        <li class="tab"><a href="#image-${index}">Image</a></li>
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
                    <div id="image-${index}">
                        <img src="${item.image}" class="responsive-img">
                    </div>
                </div>
            </div>
        </div>`;
        
        $("#card-section").append(cardHTML);
    });
    
    $('.tabs').tabs();
}

const submitForm = () => {
    let formData = {
        first_name: $('#first_name').val(),
        last_name: $('#last_name').val(),
        password: $('#password').val(),
        email: $('#email').val()
    };

    if (!formData.first_name || !formData.email) {
        showToast('Please fill required fields!', 'red');
        return;
    }

    console.log("Form Data Submitted: ", formData);
    showToast('Form submitted successfully!', 'green');
    
    $('form')[0].reset();
    $('#modal1').modal('close');
}

const showToast = (message = 'Thanks for clicking me!', color = 'green') => {
    M.toast({
        html: message,
        classes: `rounded ${color}`,
        displayLength: 2000
    });
}