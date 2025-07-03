import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OTPInput = ({ phoneNumber, onSubmit, onBack, isLoading, error, currentLanguage }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    // Countdown timer
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleInputChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only the last digit
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      setTimeout(() => onSubmit(newOtp.join('')), 100);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    
    setOtp(newOtp);
    
    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex(digit => digit === '');
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResend = () => {
    setTimeLeft(30);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length === 6) {
      onSubmit(otpString);
    }
  };

  const content = {
    en: {
      title: "Enter Verification Code",
      subtitle: `We've sent a 6-digit code to +91 ${phoneNumber}`,
      button: "Verify OTP",
      resend: "Resend OTP",
      resendIn: "Resend in",
      seconds: "seconds",
      back: "Change Number",
      hint: "Demo OTP: 123456"
    },
    hi: {
      title: "सत्यापन कोड दर्ज करें",
      subtitle: `हमने +91 ${phoneNumber} पर 6 अंकों का कोड भेजा है`,
      button: "OTP सत्यापित करें",
      resend: "OTP पुनः भेजें",
      resendIn: "पुनः भेजें",
      seconds: "सेकंड में",
      back: "नंबर बदलें",
      hint: "डेमो OTP: 123456"
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center mb-4">
          <Icon name="MessageSquare" size={32} color="white" strokeWidth={2} />
        </div>
        <h2 className="text-2xl font-bold text-text-primary">
          {text.title}
        </h2>
        <p className="text-text-secondary text-sm">
          {text.subtitle}
        </p>
      </div>

      {/* OTP Input Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* OTP Input Grid */}
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 spring-transition ${
                  digit 
                    ? 'border-primary bg-primary-50 text-primary' :'border-border bg-surface text-text-primary hover:border-primary-300'
                } ${error ? 'border-error bg-error-50' : ''}`}
                maxLength={1}
                disabled={isLoading}
              />
            ))}
          </div>

          {error && (
            <div className="flex items-center justify-center space-x-2 text-error text-sm">
              <Icon name="AlertCircle" size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Demo Hint */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 px-3 py-2 bg-warning-50 border border-warning-200 rounded-lg">
              <Icon name="Info" size={16} className="text-warning-600" />
              <span className="text-warning-700 text-sm font-medium">{text.hint}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={otp.join('').length !== 6 || isLoading}
            loading={isLoading}
            className="py-3 text-lg font-semibold spring-transition glow-effect"
          >
            {text.button}
          </Button>

          {/* Resend OTP */}
          <div className="text-center">
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                className="text-accent hover:text-accent-600 font-medium text-sm transition-colors duration-200 spring-transition"
              >
                {text.resend}
              </button>
            ) : (
              <p className="text-text-tertiary text-sm">
                {text.resendIn} {timeLeft} {text.seconds}
              </p>
            )}
          </div>

          {/* Back Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center justify-center space-x-2 text-text-secondary hover:text-primary font-medium text-sm transition-colors duration-200 spring-transition mx-auto"
              disabled={isLoading}
            >
              <Icon name="ArrowLeft" size={16} />
              <span>{text.back}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OTPInput;