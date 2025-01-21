import { ChangeEvent } from 'react';

export const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const specialCharacter = "/";
    let value = e.target.value;
    const numbers = /^[0-9!@#$%^&*()-?":{}|<>{/}]+$/;

    if (value.match(numbers)) {
      value =
        value.length === 3 && !value.includes(specialCharacter)
          ? `${value.substring(0, 2)}${specialCharacter}${value.substring(2)}`
          : value.length === 6 && value[value.length - 1] !== specialCharacter
          ? `${value.substring(0, 5)}${specialCharacter}${value.substring(5)}`
          : value;

      e.target.value = value; // Directly modifying the input value
    } else {
      e.target.value = ""; // Clear input if invalid character is entered
    }
  };