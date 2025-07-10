import { BsCloudArrowDown } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useToast } from "src/hooks/use-toast";

const useMenuItems = () => {
  const { toast } = useToast();

  const handleExportOptionClick = (format) => {
    toast({
      title: `Exported as ${format}!`,
      description: <pre><b className="text-sm">Participants data exported successfully as {format}</b></pre>,
      duration: 1500,
    });
    // Implement actual export logic here based on the format
    console.log(`Exporting as ${format}`);
  };

  const menuItems = [
    {
      icon: <BsCloudArrowDown className="text-xl" />,
      key: "export",
      label: "Export",
      color: "yellow",
      subItems: [
        {
          icon: <IoDocumentTextOutline className="!text-lg" />, // You might want a different icon for sub-items
          key: "csv",
          label: "Export as .CSV",
          onClick: () => handleExportOptionClick(".CSV"),
        },
        {
          icon: <IoDocumentTextOutline className="!text-lg" />, // You might want a different icon for sub-items
          key: "xlsx",
          label: "Export as .XLSX",
          onClick: () => handleExportOptionClick(".XLSX"),
        },
        {
          icon: <IoDocumentTextOutline className="!text-lg" />, // You might want a different icon for sub-items
          key: "pdf",
          label: "Export as .PDF",
          onClick: () => handleExportOptionClick(".PDF"),
        },
      ],
    },
  ];

  return menuItems;
};

export default useMenuItems;