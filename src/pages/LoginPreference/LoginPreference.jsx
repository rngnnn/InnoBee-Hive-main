import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileSection from "../../components/ProfileComponent/ProfileSection";
import GoogleLoginSection from "./GoogleLoginSection";
import EmailPasswordSection from "./EmailPasswordSection";
import TwoFactorAuthSection from "./TwoFactorAuthSection"; // Import the new component

const LoginPreference = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPasswordCriteria, setShowPasswordCriteria] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordCriteria({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        symbol: false,
      });
      return;
    }

    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handlePasswordChange = (e) => {
    const newPass = e.target.value;
    setNewPassword(newPass);
    checkPasswordStrength(newPass);
    if (isEditing) {
      setPasswordsMatch(newPass === confirmPassword);
    }
    if (newPass) {
      setShowPasswordCriteria(true);
    } else {
      setShowPasswordCriteria(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPass = e.target.value;
    setConfirmPassword(confirmPass);
    if (isEditing) {
      setPasswordsMatch(newPassword === confirmPass);
    }
  };

  const handleApplyChanges = () => {
    if (!passwordsMatch) {
      alert("Passwords do not match.");
      return;
    }
    const allCriteriaMet = Object.values(passwordCriteria).every((value) => value);
    if (!allCriteriaMet) {
      alert("Password does not meet all strength requirements.");
      return;
    }
    console.log("Applying changes:", { email: newEmail, password: newPassword });
    setIsEditing(false);
    setNewEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordCriteria({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      symbol: false,
    });
    setPasswordsMatch(true);
    setShowPasswordCriteria(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordCriteria({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      symbol: false,
    });
    setPasswordsMatch(true);
    setShowPasswordCriteria(false);
  };

  return (
    <>
      <h4 className="y-3 font-semibold text-xl">Login Preferences</h4>
      <p className="py-6">
        Change your login preferences by connecting your social accounts or setting an email and password.
        Please{" "}
        <Link to="/support" className="text-brown">
          contact support
        </Link>{" "}
        if you need assistance.
      </p>

      <ProfileSection title="Login Information">
        <GoogleLoginSection />
        <EmailPasswordSection
          isEditing={isEditing}
          newEmail={newEmail}
          setNewEmail={setNewEmail}
          newPassword={newPassword}
          handlePasswordChange={handlePasswordChange}
          confirmPassword={confirmPassword}
          handleConfirmPasswordChange={handleConfirmPasswordChange}
          passwordsMatch={passwordsMatch}
          passwordCriteria={passwordCriteria}
          showPasswordCriteria={showPasswordCriteria}
          handleApplyChanges={handleApplyChanges}
          handleCancelEdit={handleCancelEdit}
          handleEditClick={handleEditClick}
        />
      </ProfileSection>

      <div className="flex-center gap-2 pt-4"></div>
      <ProfileSection title="2-Factor Authentication">
        <TwoFactorAuthSection />
      </ProfileSection>

      <div className="flex-center gap-2 pt-4 pb-8">
        <ProfileSection title="Delete your account">
          <div className="max-w-[1000px] w-full">
            <div className="flex w-full flex-col my-4 gap-1">
              <div className="md:w-full w-full flex flex-col gap-1"><div>
                <p className="text-gray-700 space-y-2">
                  By deleting your account, you’ll no longer be able to access any of your challenges, submission, judging scores, and other information.
                </p>
                <p className="text-gray-700 pb-5">
                  However, please note that your submissions, intellectual property, agreements, and the information you shared with other users or challenge posters will remain actionable and valid.
                </p>
                <button
                  className="w-60 bg-[#ED1A3B] hover:bg-[#CE1030] text-white py-2 rounded-lg mt-4 mb-2" >
                  Delete Account
                </button>
              </div>
              </div>
            </div>
          </div>
        </ProfileSection>
      </div>
    </>
  );
};

export default LoginPreference;