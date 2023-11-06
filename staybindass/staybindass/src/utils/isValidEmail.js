export const isValidEmail = (email) => {
    // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|mil|info|name|coop|int|eu|aero|museum|jobs|mobi|tel|travel|asia|cat|pro|post|xxx|example)$/i;
    return emailRegex.test(email);
  };
