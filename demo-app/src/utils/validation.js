/**
 * Utility functions for form validation in Demo App
 */

export function validatePasswordStrength(password) {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters long.";
  if (!/\d/.test(password)) return "Password must contain at least one number.";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Password must contain at least one special character.";
  return null; // Valid
}

export function validateRegistration(username, email, password) {
  const errors = {};

  if (!username || username.trim().length === 0) {
    errors.username = "Username is required.";
  }

  if (!email || !email.includes("@")) {
    errors.email = "Valid email is required.";
  }

  // Enhanced password strength validation per ticket requirements
  const passwordError = validatePasswordStrength(password);
  if (passwordError) {
    errors.password = passwordError;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
