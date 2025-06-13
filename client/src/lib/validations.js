export const validateSignUpForm = ({ name, email, password }) => {
  if (!name.trim()) {
    return "Name is required";
  }

  if (name.length < 2 || name.length > 50) {
    return "Name must be between 2 and 50 characters";
  }

  if (!email.trim()) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Enter a valid email address";
  }

  if (!password) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/;
  if (!passwordRegex.test(password)) {
    return "Password must include at least one uppercase, lowercase, number, and special character";
  }

  return null;
};

export const validateSignInForm = ({ email }) => {
  if (!email.trim()) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Enter a valid email address";
  }

  return null;
};

export const validateCreateTaskForm = ({ title, description }) => {
  if (!title.trim()) {
    return "Email is required";
  }

  if (!description.trim()) {
    return "Description is required";
  }

  if (title.length < 5 || title.length > 100) {
    return "Title must be between 5 and 100 characters";
  }

  if (description.length < 5 || description.length > 500) {
    return "Description must be between 5 and 500 characters";
  }

  return null;
};

export const validateEditTaskForm = ({ title, description }) => {
  if (!title.trim()) {
    return "Email is required";
  }

  if (!description.trim()) {
    return "Description is required";
  }

  if (title.length < 5 || title.length > 100) {
    return "Title must be between 5 and 100 characters";
  }

  if (description.length < 5 || description.length > 500) {
    return "Description must be between 5 and 500 characters";
  }

  return null;
};

export const validatePasswordChangeForm = ({
  currentPassword,
  newpassword,
}) => {
  if (!currentPassword) {
    return "Current Password is required";
  }

  if (!newpassword) {
    return "New Password is required";
  }

  if (newpassword.length < 6) {
    return "Password must be at least 6 characters long";
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/;
  if (!passwordRegex.test(newpassword)) {
    return "Password must include at least one uppercase, lowercase, number, and special character";
  }

  return null;
};

export const validateAccountForm = ({ name, email }) => {
  if (!name.trim()) {
    return "Name is required";
  }

  if (name.length < 2 || name.length > 50) {
    return "Name must be between 2 and 50 characters";
  }

  if (!email.trim()) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Enter a valid email address";
  }

  return null;
};
