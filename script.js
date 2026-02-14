// Movie data
const moviedata = {
  m101: {
    name: "Sinners",
    genre: "Horror",
    desc: "A terrifying journey into the supernatural where a group of friends unwittingly unleash an ancient evil. Prepare for heart-pounding scares and psychological terror.",
    runtime: "1 hour 30 mins",
    rating: "4.54",
    options: {
      location: ["PVR: Forum Mall", "INOX: City Centre", "Cinepolis: Central Plaza"],
      date: ["2024-12-08", "2024-12-09", "2024-12-10"],
      time: ["6:00 PM", "9:00 PM", "11:30 PM"]
    }
  },
  m201: {
    name: "Look Back",
    genre: "Animation",
    desc: "A heartwarming animated tale about friendship, dreams, and the beautiful moments that shape our lives. A visual masterpiece that will touch your soul.",
    runtime: "2 hours",
    rating: "5.0",
    options: {
      location: ["PVR: City Walk", "INOX: Metro Mall", "Cinepolis: Downtown"],
      date: ["2024-12-09", "2024-12-10", "2024-12-11"],
      time: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"]
    }
  },
  m301: {
    name: "Skyfall",
    genre: "Action",
    desc: "James Bond's loyalty to M is tested when her past comes back to haunt her. When MI6 comes under attack, 007 must track down and destroy the threat.",
    runtime: "2 hours 23 mins",
    rating: "4.8",
    options: {
      location: ["PVR: Grand Mall", "INOX: Pacific", "Cinepolis: Riviera"],
      date: ["2024-12-07", "2024-12-08", "2024-12-09", "2024-12-12"],
      time: ["1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"]
    }
  },
  m102: {
    name: "Iron Lung",
    genre: "Horror",
    desc: "In a distant future, a convict is sent to investigate an ocean of blood on a desolate moon. What he discovers will haunt him forever.",
    runtime: "1 hour 30 mins",
    rating: "4.6",
    options: {
      location: ["PVR: Galaxy", "INOX: Starlight", "Cinepolis: Moonlight"],
      date: ["2024-12-01", "2024-12-02", "2024-12-03"],
      time: ["8:00 PM", "10:30 PM"]
    }
  },
  m302: {
    name: "Casino Royale",
    genre: "Action",
    desc: "Armed with a license to kill, Secret Agent James Bond sets out on his first mission as 007 and must defeat a private banker funding terrorists.",
    runtime: "2 hours 24 mins",
    rating: "4.9",
    options: {
      location: ["PVR: Platinum", "INOX: Gold Class", "Cinepolis: VIP"],
      date: ["2024-12-02", "2024-12-07", "2024-12-09"],
      time: ["2:00 PM", "5:00 PM", "8:00 PM", "11:00 PM"]
    }
  },
  m103: {
    name: "Nosferatu",
    genre: "Horror",
    desc: "A classic tale of horror reimagined. Count Orlok's obsession with a young woman brings terror to a German town in this gothic masterpiece.",
    runtime: "2 hours 15 mins",
    rating: "4.7",
    options: {
      location: ["PVR: Classic", "INOX: Heritage", "Cinepolis: Vintage"],
      date: ["2024-12-03", "2024-12-05", "2024-12-06"],
      time: ["7:00 PM", "10:00 PM"]
    }
  },
  m202: {
    name: "When Marnie Was There",
    genre: "Animation",
    desc: "A shy, artistic girl befriends a mysterious girl in the marshes. A beautiful Studio Ghibli film about friendship, memory, and self-discovery.",
    runtime: "1 hour 43 mins",
    rating: "4.9",
    options: {
      location: ["PVR: Family Mall", "INOX: Kids Arena", "Cinepolis: Rainbow"],
      date: ["2024-12-06", "2024-12-08", "2024-12-09"],
      time: ["11:00 AM", "2:00 PM", "5:00 PM"]
    }
  },
  m303: {
    name: "No Time to Die",
    genre: "Action",
    desc: "James Bond has left active service. His peace is short-lived when his old friend from the CIA turns up asking for help, leading him onto the trail of a mysterious villain.",
    runtime: "2 hours 43 mins",
    rating: "4.8",
    options: {
      location: ["PVR: IMAX", "INOX: 4DX", "Cinepolis: ScreenX"],
      date: ["2024-12-07", "2024-12-09", "2024-12-10"],
      time: ["12:00 PM", "3:30 PM", "7:00 PM", "10:30 PM"]
    }
  }
};

// Bookmarks array
let bookmarks = [];

// Validation functions
function validateName(name) {
  return name && name.trim().length >= 2;
}

function validateAge(age) {
  return age && age >= 1 && age <= 120;
}

function validateCardNumber(cardNumber) {
  // Remove spaces and check if it's 16 digits
  const cleanNumber = cardNumber.replace(/\s/g, '');
  return /^\d{16}$/.test(cleanNumber);
}

function validateCVV(cvv) {
  return /^\d{3}$/.test(cvv);
}

function validateExpiry(expiry) {
  if (!expiry) return false;
  const [year, month] = expiry.split('-');
  const expiryDate = new Date(year, month);
  const today = new Date();
  return expiryDate > today;
}

function validateSelect(selectValue) {
  return selectValue && selectValue !== '';
}

function showError(inputElement, message) {
  // Remove any existing error
  const existingError = inputElement.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Add error class to input
  inputElement.classList.add('error');
  
  // Create and insert error message
  const error = document.createElement('div');
  error.className = 'error-message';
  error.textContent = message;
  error.style.color = '#ff6b6b';
  error.style.fontSize = '12px';
  error.style.marginTop = '5px';
  
  inputElement.parentElement.appendChild(error);
}

function clearError(inputElement) {
  inputElement.classList.remove('error');
  const existingError = inputElement.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
}

function validateForm(formData) {
  let isValid = true;
  const errors = [];
  
  // Validate name
  const name = formData.get('name');
  if (!validateName(name)) {
    showError(document.getElementById('name'), 'Name must be at least 2 characters long');
    isValid = false;
    errors.push('Invalid name');
  } else {
    clearError(document.getElementById('name'));
  }
  
  // Validate age
  const age = formData.get('age');
  if (!validateAge(parseInt(age))) {
    showError(document.getElementById('age'), 'Age must be between 1 and 120');
    isValid = false;
    errors.push('Invalid age');
  } else {
    clearError(document.getElementById('age'));
  }
  
  // Validate gender
  const gender = formData.get('gender');
  if (!validateSelect(gender)) {
    showError(document.getElementById('gender'), 'Please select a gender');
    isValid = false;
    errors.push('Gender not selected');
  } else {
    clearError(document.getElementById('gender'));
  }
  
  // Validate card name
  const cardName = formData.get('cardName');
  if (!validateName(cardName)) {
    showError(document.getElementById('cardName'), 'Please enter the name on card');
    isValid = false;
    errors.push('Invalid card name');
  } else {
    clearError(document.getElementById('cardName'));
  }
  
  // Validate card number
  const cardNumber = formData.get('cardNumber');
  if (!validateCardNumber(cardNumber)) {
    showError(document.getElementById('cardNumber'), 'Card number must be 16 digits');
    isValid = false;
    errors.push('Invalid card number');
  } else {
    clearError(document.getElementById('cardNumber'));
  }
  
  // Validate expiry
  const expiry = formData.get('expiry');
  if (!validateExpiry(expiry)) {
    showError(document.getElementById('expiry'), 'Expiry date must be in the future');
    isValid = false;
    errors.push('Invalid expiry date');
  } else {
    clearError(document.getElementById('expiry'));
  }
  
  // Validate CVV
  const cvv = formData.get('cvv');
  if (!validateCVV(cvv)) {
    showError(document.getElementById('cvv'), 'CVV must be 3 digits');
    isValid = false;
    errors.push('Invalid CVV');
  } else {
    clearError(document.getElementById('cvv'));
  }
  
  // Validate booking options
  const location = formData.get('location');
  if (!validateSelect(location)) {
    showError(document.querySelector('select[name="location"]'), 'Please select a location');
    isValid = false;
    errors.push('Location not selected');
  } else {
    clearError(document.querySelector('select[name="location"]'));
  }
  
  const date = formData.get('date');
  if (!validateSelect(date)) {
    showError(document.querySelector('select[name="date"]'), 'Please select a date');
    isValid = false;
    errors.push('Date not selected');
  } else {
    clearError(document.querySelector('select[name="date"]'));
  }
  
  const time = formData.get('time');
  if (!validateSelect(time)) {
    showError(document.querySelector('select[name="time"]'), 'Please select a time');
    isValid = false;
    errors.push('Time not selected');
  } else {
    clearError(document.querySelector('select[name="time"]'));
  }
  
  // Validate seats
  const seats = formData.get('seats');
  if (!seats || seats < 1 || seats > 10) {
    showError(document.getElementById('seats'), 'Number of seats must be between 1 and 10');
    isValid = false;
    errors.push('Invalid seat count');
  } else {
    clearError(document.getElementById('seats'));
  }
  
  if (!isValid) {
    showFormError('Please fix the errors in the form');
  }
  
  return isValid;
}

function showFormError(message) {
  // Remove existing form error
  const existingError = document.getElementById('form-error');
  if (existingError) {
    existingError.remove();
  }
  
  // Create form error
  const error = document.createElement('div');
  error.id = 'form-error';
  error.textContent = message;
  error.style.backgroundColor = '#ff6b6b';
  error.style.color = 'white';
  error.style.padding = '10px';
  error.style.borderRadius = '5px';
  error.style.marginBottom = '15px';
  error.style.textAlign = 'center';
  
  const form = document.getElementById('bookingForm');
  form.insertBefore(error, form.firstChild);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (error.parentElement) {
      error.remove();
    }
  }, 5000);
}

// Add input formatting for card number
document.addEventListener('DOMContentLoaded', function() {
  const cardInput = document.getElementById('cardNumber');
  if (cardInput) {
    cardInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\s/g, '');
      if (value.length > 0) {
        // Add space every 4 digits
        value = value.match(/.{1,4}/g)?.join(' ') || value;
      }
      e.target.value = value;
    });
  }
  
  // Add real-time validation
  const inputs = document.querySelectorAll('#bookingForm input, #bookingForm select');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
  });
});

function validateField(field) {
  const id = field.id || field.name;
  const value = field.value;
  
  switch(id) {
    case 'name':
    case 'cardName':
      if (!validateName(value)) {
        showError(field, 'Must be at least 2 characters');
      } else {
        clearError(field);
      }
      break;
    case 'age':
      if (!validateAge(parseInt(value))) {
        showError(field, 'Age must be between 1 and 120');
      } else {
        clearError(field);
      }
      break;
    case 'gender':
    case 'location':
    case 'date':
    case 'time':
      if (!validateSelect(value)) {
        showError(field, 'Please select an option');
      } else {
        clearError(field);
      }
      break;
    case 'cardNumber':
      if (!validateCardNumber(value.replace(/\s/g, ''))) {
        showError(field, 'Card number must be 16 digits');
      } else {
        clearError(field);
      }
      break;
    case 'expiry':
      if (!validateExpiry(value)) {
        showError(field, 'Expiry date must be in the future');
      } else {
        clearError(field);
      }
      break;
    case 'cvv':
      if (!validateCVV(value)) {
        showError(field, 'CVV must be 3 digits');
      } else {
        clearError(field);
      }
      break;
    case 'seats':
      if (!value || value < 1 || value > 10) {
        showError(field, 'Seats must be between 1 and 10');
      } else {
        clearError(field);
      }
      break;
  }
}

// Movie Details Modal
function deets(rowid) {
  const movie = moviedata[rowid];
  const modal = document.getElementById("movieModal");
  const span = document.getElementsByClassName("close")[0];

  document.getElementById('modalMovieTitle').textContent = movie.name;
  document.getElementById('mgenre').textContent = movie.genre;
  document.getElementById('mdesc').textContent = movie.desc;
  document.getElementById('mruntime').textContent = movie.runtime;
  document.getElementById('mrating').textContent = movie.rating + " ⭐";

  const bookbtn = document.getElementById("bookbtn");
  bookbtn.setAttribute("data-movieid", rowid);
  
  // Make sure the bookbtn onclick is set correctly
  bookbtn.onclick = function() {
    book(rowid);
  };

  modal.style.display = "block";

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

// BOOK FUNCTION
function book(movieId) {
  // Close the details modal
  document.getElementById("movieModal").style.display = "none";
  
  // Get movie data
  const movie = moviedata[movieId];
  
  // Set the booking modal title
  document.getElementById("bookingMovieTitle").textContent = `Book Tickets - ${movie.name}`;
  document.getElementById("bookingMovieId").value = movieId;
  
  // Generate booking options (location, date, time dropdowns)
  const optionsDiv = document.getElementById("bookingOptions");
  let optionsHtml = '';
  
  for (const [optionName, optionValues] of Object.entries(movie.options)) {
    let selectHtml = `<div class="booking-option"><label>${optionName.charAt(0).toUpperCase() + optionName.slice(1)}:</label>`;
    selectHtml += `<select name="${optionName}" required>`;
    selectHtml += `<option value="">Select ${optionName}</option>`;
    
    for (const value of optionValues) {
      selectHtml += `<option value="${value}">${value}</option>`;
    }
    
    selectHtml += `</select></div>`;
    optionsHtml += selectHtml;
  }
  
  optionsDiv.innerHTML = optionsHtml;
  
  // Clear any previous form errors
  const formError = document.getElementById('form-error');
  if (formError) {
    formError.remove();
  }
  
  // Clear all field errors
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(msg => msg.remove());
  
  const errorFields = document.querySelectorAll('.error');
  errorFields.forEach(field => field.classList.remove('error'));
  
  // Show the booking modal
  document.getElementById("bookingModal").style.display = "block";
}

// Close Booking Modal
function closeBookingModal() {
  document.getElementById("bookingModal").style.display = "none";
  document.getElementById("bookingForm").reset();
  
  // Clear all errors
  const formError = document.getElementById('form-error');
  if (formError) {
    formError.remove();
  }
  
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(msg => msg.remove());
  
  const errorFields = document.querySelectorAll('.error');
  errorFields.forEach(field => field.classList.remove('error'));
}

// Handle Booking Form Submit
document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  
  // Validate the form
  if (!validateForm(formData)) {
    return;
  }
  
  const movieId = formData.get("movieId");
  const movie = moviedata[movieId];
  
  // Generate Ticket
  const ticketHtml = `
    <div class="ticket-header">
      <h2>🎬 CineBook</h2>
      <h3>Movie Ticket</h3>
    </div>
    <div class="ticket-details">
      <div class="ticket-item">
        <span class="label">Movie</span>
        <span class="value">${movie.name}</span>
      </div>
      <div class="ticket-item">
        <span class="label">Name</span>
        <span class="value">${formData.get("name")}</span>
      </div>
      <div class="ticket-item">
        <span class="label">Age/Gender</span>
        <span class="value">${formData.get("age")}/${formData.get("gender")}</span>
      </div>
      <div class="ticket-item">
        <span class="label">Seats</span>
        <span class="value">${formData.get("seats")}</span>
      </div>
      <div class="ticket-item">
        <span class="label">Location</span>
        <span class="value">${formData.get("location")}</span>
      </div>
      <div class="ticket-item">
        <span class="label">Date</span>
        <span class="value">${formData.get("date")}</span>
      </div>
      <div class="ticket-item">
        <span class="label">Time</span>
        <span class="value">${formData.get("time")}</span>
      </div>
      <div class="ticket-item">
        <span class="label">Payment</span>
        <span class="value">●●●● ●●●● ●●●● ${formData.get("cardNumber").slice(-4)}</span>
      </div>
      <div class="ticket-item">
        <span class="label">Booking ID</span>
        <span class="value">#${Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
      </div>
    </div>
    <div class="ticket-footer">
      <p>Thank you for booking with CineBook!</p>
      <p>Please arrive 15 minutes before the show</p>
    </div>
  `;
  
  document.getElementById("ticketContent").innerHTML = ticketHtml;
  closeBookingModal();
  document.getElementById("ticketModal").style.display = "block";
});

// Close Ticket Modal
function closeTicketModal() {
  document.getElementById("ticketModal").style.display = "none";
}

// Bookmark Function
function bookmark(movieId) {
  const movie = moviedata[movieId];
  if (!bookmarks.includes(movieId)) {
    bookmarks.push(movieId);
    alert(`✅ "${movie.name}" added to bookmarks!`);
    
    // Visual feedback
    const btn = event.target;
    btn.style.transform = "scale(1.5)";
    setTimeout(() => {
      btn.style.transform = "scale(1)";
    }, 200);
  } else {
    alert(`"${movie.name}" is already in your bookmarks!`);
  }
}

// Search Function
function myFunction() {
  var input, filter, table, tr, td, cv, i, txtValue, cvval;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    cv = tr[i].getElementsByTagName("td")[1];
    
    if (td && cv) {
      txtValue = td.textContent || td.innerText;
      cvval = cv.textContent || cv.innerText;
      
      if (txtValue.toUpperCase().indexOf(filter) > -1 || 
          cvval.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        tr[i].style.animation = "fadeIn 0.5s";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

// Close modals when clicking outside
window.onclick = function(event) {
  const movieModal = document.getElementById("movieModal");
  const bookingModal = document.getElementById("bookingModal");
  const ticketModal = document.getElementById("ticketModal");
  
  if (event.target == movieModal) {
    movieModal.style.display = "none";
  }
  if (event.target == bookingModal) {
    closeBookingModal();
  }
  if (event.target == ticketModal) {
    ticketModal.style.display = "none";
  }
}