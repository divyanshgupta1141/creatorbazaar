import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FloatingFeedback = ({ currentLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim()) {
      // Mock submission
      setIsSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
        setFeedback('');
        setEmail('');
      }, 2000);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-r from-primary to-accent text-white rounded-full shadow-2xl flex items-center justify-center touch-target glow-effect"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: [
              "0 0 20px rgba(0, 180, 198, 0.3)",
              "0 0 30px rgba(0, 180, 198, 0.5)",
              "0 0 20px rgba(0, 180, 198, 0.3)"
            ]
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <Icon name="MessageCircle" size={24} strokeWidth={2.5} />
        </motion.button>
      </motion.div>

      {/* Feedback Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="relative bg-surface rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {!isSubmitted ? (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-border">
                    <div>
                      <h3 className="text-xl font-bold text-primary">
                        {currentLanguage === 'hi' ? 'फीडबैक दें' : 'Share Feedback'}
                      </h3>
                      <p className="text-sm text-text-secondary mt-1">
                        {currentLanguage === 'hi' ?'आपकी राय हमारे लिए महत्वपूर्ण है' :'Your opinion matters to us'
                        }
                      </p>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-background rounded-lg transition-colors touch-target"
                    >
                      <Icon name="X" size={20} className="text-text-secondary" />
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        {currentLanguage === 'hi' ? 'आपका फीडबैक' : 'Your Feedback'}
                      </label>
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder={currentLanguage === 'hi' ?'हमें बताएं कि आप क्या सोचते हैं...' :'Tell us what you think...'
                        }
                        className="w-full h-32 px-4 py-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        {currentLanguage === 'hi' ? 'ईमेल (वैकल्पिक)' : 'Email (Optional)'}
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={currentLanguage === 'hi' ?'आपका ईमेल पता' :'your@email.com'
                        }
                      />
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        className="flex-1"
                      >
                        {currentLanguage === 'hi' ? 'रद्द करें' : 'Cancel'}
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        className="flex-1"
                        iconName="Send"
                        iconPosition="right"
                      >
                        {currentLanguage === 'hi' ? 'भेजें' : 'Send'}
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                /* Success State */
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 300 }}
                    className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Icon name="Check" size={32} className="text-success-600" strokeWidth={3} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {currentLanguage === 'hi' ? 'धन्यवाद!' : 'Thank You!'}
                  </h3>
                  <p className="text-text-secondary">
                    {currentLanguage === 'hi' ?'आपका फीडबैक हमें मिल गया है। हम जल्द ही आपसे संपर्क करेंगे।' :'We received your feedback. We\'ll get back to you soon.'
                    }
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingFeedback;