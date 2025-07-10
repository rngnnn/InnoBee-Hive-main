import React, { ReactNode } from 'react';

interface ProfileSectionProps {
  title: string;
  children: ReactNode;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ title, children }) => (
  <div className="w-full flex flex-col gap-4 bg-white rounded-lg shadow-md relative p-6 md:p-8">
    <div className="absolute top-0 left-0 h-full w-2 bg-linearGradientToBottom rounded-lg shadow-sm" />
    <h5 className="py-2 font-semibold text-lg">{title}</h5>
    <div className="mt-2">{children}</div>
  </div>
);

export default ProfileSection;