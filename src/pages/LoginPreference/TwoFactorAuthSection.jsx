// TwoFactorAuthSection.jsx
import React, { useState } from "react";
import { IoClipboardOutline } from "react-icons/io5";

const TwoFactorAuthSection = () => {
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [recoveryCodes, setRecoveryCodes] = useState([]);

  const handleEnableTwoFactor = () => {
    // In a real application, you would trigger the 2FA setup process here.
    // This might involve generating a QR code and secret key for an authenticator app,
    // or sending a verification code via SMS.
    setIsTwoFactorEnabled(true);
    // For example, generate some dummy recovery codes:
    setRecoveryCodes(["CODE1-AAAA", "CODE2-BBBB", "CODE3-CCCC"]);
  };

  const handleDisableTwoFactor = () => {
    // In a real application, you would trigger the 2FA disable process here.
    setIsTwoFactorEnabled(false);
    setRecoveryCodes([]);
  };

  const handleCopyToClipboard = (text) => {
    // In a real application, you would use a library like 'clipboard-copy'
    // to actually copy the text to the clipboard.
    alert(`Copied to clipboard: ${text}`); // Placeholder for demonstration
  };

  return (
    <div className="max-w-[600px] w-full">
      <div className="flex w-full flex-col my-4 gap-6">
        {/* Current Status */}
        <div>
          <h6 className="font-semibold text-lg text-gray-800">Current Status</h6>
          <div className="mt-2">
            {isTwoFactorEnabled ? (
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Enabled
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
                Disabled
              </span>
            )}
          </div>
        </div>

        {/* Enable/Disable Action */}
        {!isTwoFactorEnabled ? (
          <button
            onClick={handleEnableTwoFactor}
            className="w-60 bg-brown hover:bg-pri-color text-white py-2 rounded-lg"
          >
            Enable 2-Factor Authentication
          </button>
        ) : (
          <button
            onClick={handleDisableTwoFactor}
            className="hover:text-white bg-white text-brown py-2 rounded-lg w-60 hover:bg-brown border border-brown"
          >
            Disable 2-Factor Authentication
          </button>
        )}

        {isTwoFactorEnabled && (
          <div className="mt-4 border-t pt-4">
            {/* Directly show Authenticator App Setup */}
            <h6 className="font-semibold text-lg text-gray-800">Authenticator App Setup</h6>
            <p className="text-gray-700 mt-2">
              1. Open your authenticator app (e.g., Google Authenticator, Authy).
              <br />
              2. Tap the '+' icon or 'Add account'.
              <br />
              3. Select 'Scan a QR code' and scan the code below.
            </p>
            <div className="border p-4 rounded-lg bg-gray-100 flex justify-center mt-2">
              {/* Placeholder for QR Code */}
              <div className="w-32 h-32 bg-gray-300 flex items-center justify-center text-gray-500">
                QR Code
              </div>
            </div>
            <p className="text-gray-700 mt-2 flex items-center gap-2">
              Or, enter this setup key manually:
              <span className="font-mono bg-gray-200 px-2 py-1 rounded ml-1">YOUR_SECRET_KEY</span>
              <button onClick={() => handleCopyToClipboard("YOUR_SECRET_KEY")} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                <IoClipboardOutline className="h-6 w-6" />
              </button>
            </p>

            {recoveryCodes.length > 0 && (
              <div className="mt-4 border-t pt-4">
                <h6 className="font-semibold text-lg text-gray-800">Recovery Codes</h6>
                <p className="text-gray-700 mt-2">
                  Store these codes in a safe place. You can use them to log in if you lose access to your
                  2-Factor Authentication method. Each code can only be used once.
                </p>
                <ul className="list-disc list-inside mt-2">
                  {recoveryCodes.map((code, index) => (
                    <li key={index} className="font-mono bg-gray-200 px-2 py-1 rounded inline-block mr-2 mb-1 flex items-center gap-1">
                      {code}
                      <button onClick={() => handleCopyToClipboard(code)} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                        <IoClipboardOutline className="h-5 w-5" />
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  className="bg-brown hover:bg-pri-color text-white py-2 rounded-lg mt-2 w-60"
                >
                  Generate New Recovery Codes
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TwoFactorAuthSection;