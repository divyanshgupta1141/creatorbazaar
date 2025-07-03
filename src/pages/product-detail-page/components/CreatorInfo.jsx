import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CreatorInfo = ({ creator, currentLanguage }) => {
  return (
    <div className="bg-surface rounded-xl p-6 shadow-lg border border-border">
      <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
        <Icon name="User" size={20} />
        <span>{currentLanguage === 'hi' ? 'रचनाकार के बारे में' : 'About Creator'}</span>
      </h3>

      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-200 flex-shrink-0">
          <Image
            src={creator.avatar}
            alt={creator.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-text-primary mb-1">{creator.name}</h4>
          <p className="text-sm text-text-secondary mb-2">{creator.title}</p>
          <div className="flex items-center space-x-4 text-xs text-text-tertiary">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} className="text-warning fill-current" />
              <span>{creator.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Package" size={12} />
              <span>{creator.totalProducts} {currentLanguage === 'hi' ? 'उत्पाद' : 'products'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={12} />
              <span>{creator.followers.toLocaleString('en-IN')} {currentLanguage === 'hi' ? 'फॉलोअर्स' : 'followers'}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-text-secondary mb-4 leading-relaxed">
        {creator.bio}
      </p>

      <div className="flex items-center space-x-3 mb-4">
        {creator.badges.map((badge, index) => (
          <div
            key={index}
            className="flex items-center space-x-1 bg-success-50 text-success-700 px-2 py-1 rounded-full text-xs font-medium"
          >
            <Icon name="CheckCircle" size={12} />
            <span>{badge}</span>
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          iconName="MessageCircle"
          iconPosition="left"
          className="flex-1"
        >
          {currentLanguage === 'hi' ? 'संपर्क करें' : 'Contact'}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="UserPlus"
          iconPosition="left"
          className="flex-1"
        >
          {currentLanguage === 'hi' ? 'फॉलो करें' : 'Follow'}
        </Button>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-primary">{creator.totalSales.toLocaleString('en-IN')}</div>
            <div className="text-xs text-text-secondary">{currentLanguage === 'hi' ? 'बिक्री' : 'Sales'}</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">{creator.responseTime}</div>
            <div className="text-xs text-text-secondary">{currentLanguage === 'hi' ? 'जवाब का समय' : 'Response'}</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">{creator.joinedYear}</div>
            <div className="text-xs text-text-secondary">{currentLanguage === 'hi' ? 'से सदस्य' : 'Member Since'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorInfo;