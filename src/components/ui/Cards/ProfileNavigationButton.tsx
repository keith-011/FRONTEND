interface ProfileButtonProps {
    text: string;
  }

  const ProfileNavigationButton: React.FC<ProfileButtonProps> = ({text}) => {
    return (
      <button className="text-xs text-accent-600">{text}</button>
    );
  };

  export default ProfileNavigationButton;