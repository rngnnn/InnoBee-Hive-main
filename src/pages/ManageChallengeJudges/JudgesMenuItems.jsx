import { useState } from "react";
import { IoAdd, IoMailOutline, IoMenu, IoSaveOutline } from "react-icons/io5";
import { useToast } from "src/hooks/use-toast";

const useMenuItems = () => {
  const { toast } = useToast();
  const [isAddJudgeModalOpen, setIsAddJudgeModalOpen] = useState(false);
  const [isInviteByEmailModalOpen, setIsInviteByEmailModalOpen] = useState(false);
  const [isManageInvitationsModalOpen, setIsManageInvitationsModalOpen] = useState(false);

  const handleOpenAddJudgeModal = () => {
    setIsAddJudgeModalOpen(true);
  };

  const handleCloseAddJudgeModal = () => {
    setIsAddJudgeModalOpen(false);
  };

  const handleOpenInviteByEmailModal = () => {
    setIsInviteByEmailModalOpen(true);
  };

  const handleCloseInviteByEmailModal = () => {
    setIsInviteByEmailModalOpen(false);
  };

  const handleOpenManageInvitationsModal = () => {
    setIsManageInvitationsModalOpen(true);
  };

  const handleCloseManageInvitationsModal = () => {
    setIsManageInvitationsModalOpen(false);
  };

  const handleUpdate = () => {
    toast({
      title: "Judges updated!",
      description: (
        <pre>
          <b className="text-sm">
            Judges Tab is updated and saved successfully
          </b>
        </pre>
      ),
      duration: 1500,
    });
  };

  const handleManageInvitations = () => {
    handleOpenManageInvitationsModal();
  };

  const menuItems = [
    {
      icon: <IoAdd className="text-xl" />,
      key: "add-judge",
      label: "Add Judge",
      onClick: handleOpenAddJudgeModal,
      color: "brown",
    },
    {
      icon: <IoMailOutline className="text-xl" />, // Using IoMailOutline
      key: "invite-by-email",
      label: "Invite by email",
      onClick: handleOpenInviteByEmailModal,
      color: "white",
    },
    {
      icon: <IoMenu className="text-xl" />, // You might want a different icon for manage invitations
      key: "manage-invitations",
      label: "Manage Invitations",
      onClick: handleManageInvitations,
      color: "white",
    },
    {
      icon: <IoSaveOutline className="text-xl" />,
      key: "save",
      label: "Save",
      onClick: handleUpdate,
      color: "yellow",
    },
  ];

  return {
    menuItems,
    isAddJudgeModalOpen,
    setIsAddJudgeModalOpen,
    isInviteByEmailModalOpen,
    setIsInviteByEmailModalOpen,
    isManageInvitationsModalOpen,
    setIsManageInvitationsModalOpen,
  };
};

export default useMenuItems;