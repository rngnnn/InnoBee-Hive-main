import React, { useState, useEffect, useRef } from 'react';
import {
  FaFacebookF,
  FaX as FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaWhatsapp,
  FaTelegram,
  FaXmark,
} from 'react-icons/fa6';
import { IoLinkOutline } from 'react-icons/io5';

const ShareChallengePopup = ({ challengeUrl, challengeTitle, onClose, platforms }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy Link');
  const popupRef = useRef(null);

  const handleShare = (platformName) => {
    let shareUrl = '';
    const encodedTitle = encodeURIComponent(challengeTitle || 'Our innovatove challenge is live on InnoBee: Innovation Management Platform. Go check it out!');
    const encodedUrl = encodeURIComponent(challengeUrl);

    switch (platformName) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/shareArticle?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedTitle}&source={innobee.buzz}`; // Replace YourAppName
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodedTitle}&body=Check out this challenge: ${encodedUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedTitle} ${encodedUrl}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(challengeUrl);
        setCopyButtonText('Link Copied!');
        setTimeout(() => setCopyButtonText('Copy Link'), 2000);
        return;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const getShareButtonClassName = (platformName) => {
    let className = 'share-button flex items-center justify-center p-2 border-none rounded-full cursor-pointer text-white transition duration-200 ease-in-out opacity-100 w-9 h-9 hover:opacity-80 bg-brown';
    switch (platformName) {
      case 'facebook':
        break;
      case 'twitter':
        break;
      case 'linkedin':
        break;
      case 'email':
        break;
      case 'whatsapp':
        break;
      case 'telegram':
        break;
      default:
        break;
    }
    return className;
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-brown flex justify-center items-center z-[1001]">
      <div className="bg-white p-8 rounded-lg shadow-md z-[1002] min-w-[350px] max-w-[500px] relative">
        <button className="absolute top-2 right-2 bg-none border-none text-gray-700 text-xl cursor-pointer p-1 transition duration-200 ease-in-out hover:text-gray-900" onClick={onClose}>
          <FaXmark />
        </button>
        <h3 className="mt-0 mb-2 text-center font-semibold text-sm text-xl text-gray-800">{challengeTitle || 'Share this Challenge'}</h3>
        <p className="text-center text-gray-600 text-sm mb-4">Spread the word to attract more challenge solvers to your challenge!</p>
        <div className="flex flex-row gap-3 mb-5 justify-center">
          {platforms.map((platform) => (
            <button
              key={platform.name}
              className={getShareButtonClassName(platform.name)}
              onClick={() => handleShare(platform.name)}
              title={`Share on ${platform.displayName}`}
            >
              {platform.icon}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-grow p-2 border border-gray-300 rounded-lg text-sm text-gray-800 overflow-hidden overflow-ellipsis h-9 flex items-center">{challengeUrl}</div>
          <button className="flex-shrink-0 bg-brown text-white rounded-lg px-4 py-2 text-sm cursor-pointer transition duration-200 ease-in-out hover:bg-pri-color flex items-center h-9" onClick={() => handleShare('copy')}>
            <IoLinkOutline className="mr-1 text-lg" /> {copyButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

ShareChallengePopup.defaultProps = {
  platforms: [
    { name: 'facebook', displayName: 'Facebook', icon: <FaFacebookF /> },
    { name: 'twitter', displayName: 'Twitter', icon: <FaTwitter /> },
    { name: 'linkedin', displayName: 'LinkedIn', icon: <FaLinkedinIn /> },
    { name: 'email', displayName: 'Email', icon: <FaEnvelope /> },
    { name: 'whatsapp', displayName: 'WhatsApp', icon: <FaWhatsapp /> },
    { name: 'telegram', displayName: 'Telegram', icon: <FaTelegram /> },
  ],
};

export default ShareChallengePopup;