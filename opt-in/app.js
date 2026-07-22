// Done by Slackbot 🤖
// Opt-In Page — Form Logic

(function () {
  const form = document.getElementById('optInForm');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  const successState = document.getElementById('successState');

  // ─── Validation Helpers ───────────────────────────────────────────
  function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    if (input) input.classList.add('invalid');
    if (errorEl) errorEl.textContent = message;
  }

  function clearError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    if (input) input.classList.remove('invalid');
    if (errorEl) errorEl.textContent = '';
  }

  function validateForm() {
    let valid = true;

    // First Name
    const firstName = document.getElementById('firstName').value.trim();
    if (!firstName) {
      showError('firstName', 'firstNameError', 'Please enter your first name.');
      valid = false;
    } else {
      clearError('firstName', 'firstNameError');
    }

    // Email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      showError('email', 'emailError', 'Please enter your email address.');
      valid = false;
    } else if (!emailRegex.test(email)) {
      showError('email', 'emailError', 'Please enter a valid email address.');
      valid = false;
    } else {
      clearError('email', 'emailError');
    }

    // Consent
    const consent = document.getElementById('consent').checked;
    if (!consent) {
      document.getElementById('consentError').textContent = 'You must agree to continue.';
      valid = false;
    } else {
      document.getElementById('consentError').textContent = '';
    }

    return valid;
  }

  // ─── Live Validation (on blur) ────────────────────────────────────
  document.getElementById('firstName').addEventListener('blur', function () {
    if (this.value.trim()) clearError('firstName', 'firstNameError');
  });

  document.getElementById('email').addEventListener('blur', function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value.trim() && emailRegex.test(this.value.trim())) {
      clearError('email', 'emailError');
    }
  });

  document.getElementById('consent').addEventListener('change', function () {
    if (this.checked) document.getElementById('consentError').textContent = '';
  });

  // ─── Submit Handler ───────────────────────────────────────────────
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    // Collect form data
    const interests = Array.from(
      document.querySelectorAll('input[name="interests"]:checked')
    ).map((cb) => cb.value);

    const payload = {
      firstName: document.getElementById('firstName').value.trim(),
      email: document.getElementById('email').value.trim(),
      interests,
      frequency: document.getElementById('frequency').value,
      consentGiven: true,
      submittedAt: new Date().toISOString(),
    };

    console.log('Opt-in payload:', payload);

    // UI — loading state
    submitBtn.disabled = true;
    btnText.hidden = true;
    btnLoading.hidden = false;

    // Simulate API call (replace with real endpoint)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Show success
    form.hidden = true;
    successState.hidden = false;

    // Reset button state
    submitBtn.disabled = false;
    btnText.hidden = false;
    btnLoading.hidden = true;
  });

  // ─── Reset (sign up another) ──────────────────────────────────────
  window.resetForm = function () {
    form.reset();
    form.hidden = false;
    successState.hidden = true;
    document.getElementById('firstName').focus();
  };
})();
