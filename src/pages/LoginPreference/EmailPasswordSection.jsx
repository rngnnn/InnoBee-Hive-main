// EmailPasswordSection.jsx
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import ProfileSection from "../../components/ProfileComponent/ProfileSection";

import { editVariants } from "../../anim";

const EmailPasswordSection = ({
  isEditing,
  newEmail,
  setNewEmail,
  newPassword,
  handlePasswordChange,
  confirmPassword,
  handleConfirmPasswordChange,
  passwordsMatch,
  passwordCriteria,
  showPasswordCriteria,
  handleApplyChanges,
  handleCancelEdit,
  handleEditClick,
}) => {
  return (
    <div className="max-w-[600px] flex flex-col gap-6 border-t-1 border-gray-300 max-lg:w-full xl:min-w-[500px] lg:min-w-[400px] py-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col w-full">
          <label htmlFor="email" className="font-semibold mb-2">
            Email Address
          </label>
          {isEditing ? (
            <motion.input
              variants={editVariants}
              initial="closed"
              animate="open"
              exit="closed"
              type="email"
              name="email"
              id="email"
              placeholder="Enter new email"
              className="h-10 w-full bg-white px-3 outline-none border-1 focus:border-pri-color rounded-lg"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          ) : (
            <motion.p className="py-2">john@doe.com</motion.p>
          )}
        </div>
      </div>
      {isEditing && (
        <>
          <div className="flex flex-col w-full">
            <label htmlFor="newPassword" className="font-semibold mb-2">
              New Password
            </label>
            <motion.input
              variants={editVariants}
              initial="closed"
              animate="open"
              exit="closed"
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="Enter new password"
              className="h-10 w-full bg-white px-3 outline-none border-1 focus:border-pri-color rounded-lg"
              value={newPassword}
              onChange={handlePasswordChange}
            />
            {showPasswordCriteria && (
              <div className="mt-2 text-sm">
                <p className={passwordCriteria.length ? "text-green-500" : "text-red-500"}>
                  Must be at least 8 characters long
                </p>
                <p className={passwordCriteria.uppercase ? "text-green-500" : "text-red-500"}>
                  Contains at least one uppercase letter
                </p>
                <p className={passwordCriteria.lowercase ? "text-green-500" : "text-red-500"}>
                  Contains at least one lowercase letter
                </p>
                <p className={passwordCriteria.number ? "text-green-500" : "text-red-500"}>
                  Contains at least one number
                </p>
                <p className={passwordCriteria.symbol ? "text-green-500" : "text-red-500"}>
                  Contains at least one symbol (e.g., !@#$)
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmPassword" className="font-semibold mb-2">
              Confirm New Password
            </label>
            <motion.input
              variants={editVariants}
              initial="closed"
              animate="open"
              exit="closed"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm new password"
              className="h-10 w-full bg-white px-3 outline-none border-1 focus:border-pri-color rounded-lg"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {!passwordsMatch && <p className="text-sm text-red-500 mt-1">Passwords do not match</p>}
          </div>
          <div className="flex gap-2 mt-4">
            <button
              className="bg-brown hover:bg-pri-color text-white py-2 rounded-lg w-60"
              onClick={handleApplyChanges}
              disabled={!passwordsMatch || !Object.values(passwordCriteria).every((value) => value)}
            >
              Apply Changes
            </button>
            <button
              className="hover:text-white bg-white text-brown py-2 rounded-lg w-60 hover:bg-brown border border-brown"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        </>
      )}
      {!isEditing && (
        <button className="w-60 bg-brown hover:bg-pri-color text-white py-2 rounded-lg mt-4" onClick={handleEditClick}>
          Edit Email and Password
        </button>
      )}
    </div>
  );
};

export default EmailPasswordSection;