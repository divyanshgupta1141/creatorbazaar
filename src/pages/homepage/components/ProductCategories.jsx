import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const ProductCategories = ({ currentLanguage }) => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'audio',
      title: currentLanguage === 'hi' ? 'Audio' : 'Audio',
      description: currentLanguage === 'hi' 
        ? 'अपने कानों और दिमाग को इंटरव्यू, ध्यान और सच्चे अपराध रोमांच के लिए खोलें।'
        : 'Open your ears and mind to interviews, meditations, and true crime thrillers.',
      icon: 'Headphones',
      color: 'bg-red-500',
      slug: 'audio'
    },
    {
      id: 'business',
      title: currentLanguage === 'hi' ? 'Business & Money' : 'Business & Money',
      description: currentLanguage === 'hi'
        ? 'बढ़ती अप्रत्याशित दुनिया में कमाई करना सीखें।'
        : 'Learn to earn in an increasingly unpredictable world.',
      icon: 'Banknote',
      color: 'bg-green-600',
      slug: 'business'
    },
    {
      id: '3d',
      title: currentLanguage === 'hi' ? '3D' : '3D',
      description: currentLanguage === 'hi'
        ? 'Dreamworks और Pixar में उपयोग किए जाने वाले समान उपकरणों से अपनी कला को परिष्कृत करें।'
        : 'Perfect your craft with the same tools used at Dreamworks and Pixar.',
      icon: 'Box',
      color: 'bg-teal-600',
      slug: '3d'
    },
    {
      id: 'design',
      title: currentLanguage === 'hi' ? 'Art & Design' : 'Art & Design',
      description: currentLanguage === 'hi'
        ? 'डिजिटल आर्ट, चित्र और डिज़ाइन संपत्ति के साथ अपनी रचनात्मकता को व्यक्त करें।'
        : 'Express your creativity with digital art, illustrations, and design assets.',
      icon: 'Palette',
      color: 'bg-purple-600',
      slug: 'design'
    },
    {
      id: 'education',
      title: currentLanguage === 'hi' ? 'Education' : 'Education',
      description: currentLanguage === 'hi'
        ? 'व्यापक पाठ्यक्रम और ट्यूटोरियल के माध्यम से ज्ञान साझा करें।'
        : 'Share knowledge through comprehensive courses and tutorials.',
      icon: 'GraduationCap',
      color: 'bg-blue-600',
      slug: 'education'
    },
    {
      id: 'ebooks',
      title: currentLanguage === 'hi' ? 'eBooks' : 'eBooks',
      description: currentLanguage === 'hi'
        ? 'डिजिटल प्रारूप में अपनी कहानियां, गाइड और ज्ञान प्रकाशित करें।'
        : 'Publish your stories, guides, and knowledge in digital format.',
      icon: 'BookOpen',
      color: 'bg-orange-600',
      slug: 'ebooks'
    },
    {
      id: 'coaching',
      title: currentLanguage === 'hi' ? 'Coaching' : 'Coaching',
      description: currentLanguage === 'hi'
        ? 'व्यक्तिगत मार्गदर्शन और मेंटरशिप कार्यक्रम प्रदान करें।'
        : 'Offer personalized guidance and mentorship programs.',
      icon: 'Users',
      color: 'bg-green-500',
      slug: 'coaching'
    },
    {
      id: 'templates',
      title: currentLanguage === 'hi' ? 'Templates' : 'Templates',
      description: currentLanguage === 'hi'
        ? 'विभिन्न प्लेटफॉर्म के लिए तैयार-से-उपयोग टेम्प्लेट के साथ समय बचाएं।'
        : 'Save time with ready-to-use templates for various platforms.',
      icon: 'FileText',
      color: 'bg-indigo-600',
      slug: 'templates'
    },
    {
      id: 'coding',
      title: currentLanguage === 'hi' ? 'Coding' : 'Coding',
      description: currentLanguage === 'hi'
        ? 'अपना कोड, थीम और विकास संसाधन साझा करें।'
        : 'Share your code, themes, and development resources.',
      icon: 'Code',
      color: 'bg-gray-700',
      slug: 'coding'
    }
  ];

  const handleCategoryClick = (slug) => {
    navigate(`/category/${slug}`);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container-responsive">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6">
            {currentLanguage === 'hi' ? 'श्रेणियों में खोजें' : 'Explore Categories'}
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            {currentLanguage === 'hi'
              ? 'हर रचनाकार के लिए कुछ न कुछ। अपनी रुचि की श्रेणी खोजें।'
              : 'Something for every creator. Find your category of interest.'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className={`${category.color} rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => handleCategoryClick(category.slug)}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                  <Icon name={category.icon} size={24} color="white" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold">{category.title}</h3>
              </div>
              
              <p className="text-white/90 leading-relaxed">
                {category.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;