document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('tenantForm');
    
    // Form validation
    form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            // Here you would typically send the form data to your server
            handleFormSubmission(form);
        }
        
        form.classList.add('was-validated');
    });

    // Handle form submission
    function handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';
        submitButton.disabled = true;

        // Simulate API call (replace with actual API endpoint)
        setTimeout(() => {
            // Show success message
            showMessage('success', 'Thank you! Your application has been submitted successfully. We will contact you soon.');
            
            // Reset form
            form.reset();
            form.classList.remove('was-validated');
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 1500);
    }

    // Show message function
    function showMessage(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
        alertDiv.role = 'alert';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        form.parentNode.insertBefore(alertDiv, form.nextSibling);
        
        // Auto dismiss after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }

    // Optional: Add dynamic form behavior
    const petCheck = document.getElementById('petCheck');
    if (petCheck) {
        petCheck.addEventListener('change', function() {
            if (this.checked) {
                // Could dynamically add pet details form fields
                const petDetails = document.createElement('div');
                petDetails.id = 'petDetails';
                petDetails.className = 'mt-3';
                petDetails.innerHTML = `
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Pet Type</label>
                            <input type="text" class="form-control" name="petType">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Pet Breed</label>
                            <input type="text" class="form-control" name="petBreed">
                        </div>
                    </div>
                `;
                this.parentNode.appendChild(petDetails);
            } else {
                const petDetails = document.getElementById('petDetails');
                if (petDetails) {
                    petDetails.remove();
                }
            }
        });
    }
}); 