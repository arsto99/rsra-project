import React from 'react';

const PasswordStrength = ({ password }) => {
  const calculateStrength = (password) => {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
  };

  const getStrengthText = (strength) => {
    switch (strength) {
      case 0: return 'ضعيف جداً';
      case 1: return 'ضعيف';
      case 2: return 'متوسط';
      case 3: return 'جيد';
      case 4: return 'قوي';
      case 5: return 'قوي جداً';
      default: return '';
    }
  };

  const strength = calculateStrength(password);
  const strengthText = getStrengthText(strength);
  const strengthWidth = (strength / 5) * 100;

  return (
    <div className="mt-2">
      <div className="h-2 w-full bg-gray-200 rounded-full">
        <div 
          className={`h-full rounded-full transition-all duration-300 ${
            strength <= 1 ? 'bg-red-500' :
            strength <= 2 ? 'bg-orange-500' :
            strength <= 3 ? 'bg-yellow-500' :
            'bg-green-500'
          }`}
          style={{ width: `${strengthWidth}%` }}
        />
      </div>
      <p className="text-sm mt-1 text-gray-600">{strengthText}</p>
    </div>
  );
};

export default PasswordStrength;
