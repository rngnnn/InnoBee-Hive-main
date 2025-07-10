import { useState } from "react";
import { IoAdd, IoPersonAddOutline, IoSaveOutline } from "react-icons/io5";
import { useToast } from "src/hooks/use-toast";
import { useModeratorsData } from "./ModeratorsContext";

const useMenuItems = () => {
  const { toast } = useToast();
  const { addNewItem } = useModeratorsData();
  const [isAddModeratorModalOpen, setIsAddModeratorModalOpen] = useState(false);
  const [isManageUserRolesModalOpen, setIsManageUserRolesModalOpen] = useState(false);

  const handleOpenAddModeratorModal = () => {
    setIsAddModeratorModalOpen(true);
  };

  const handleCloseAddModeratorModal = () => {
    setIsAddModeratorModalOpen(false);
  };

  const handleOpenManageUserRolesModal = () => {
    setIsManageUserRolesModalOpen(true);
  };

  const handleCloseManageUserRolesModal = () => {
    setIsManageUserRolesModalOpen(false);
  };

  const handleUpdate = () => {
    toast({
      title: "Moderators updated!",
      description: (
        <pre>
          <b className="text-sm">
            Moderators Tab is updated and saved successfully
          </b>
        </pre>
      ),
      duration: 1500,
    });
  };

  const handleUserRoles = () => {
    handleOpenManageUserRolesModal();
  };

  const menuItems = [
    {
        icon: <IoAdd className="text-xl" />,
        key: "add-moderator",
        label: "Add Moderator",
        onClick: handleOpenAddModeratorModal,
        color: "brown",
      },
    {
        icon: <IoPersonAddOutline className="text-xl" />,
        key: "user-roles",
        label: "User Roles",
        onClick: handleUserRoles,
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
    isAddModeratorModalOpen,
    handleCloseAddModeratorModal,
    isManageUserRolesModalOpen,
    handleCloseManageUserRolesModal,
  };
};

export default useMenuItems;