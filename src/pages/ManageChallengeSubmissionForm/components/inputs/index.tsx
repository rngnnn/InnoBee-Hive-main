import {
  DataType,
  options,
  OptionType,
  AnswerTypes,
} from "../../lib/types/formdata";
import { useEffect, useMemo, useState } from "react";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "src/components/ui/tooltip";

import { CapitalizeFirstLetter } from "../../lib/utils";
import { Check, Copy, EllipsisVertical, Trash } from "lucide-react";
import { Switch } from "../ui/switch";
import InputOptions from "./options";
import { useFormData } from "../../context/formdata";

export default function InputCard({
  currentItem,
  duplicate,
}: {
  currentItem: DataType;
  firstValue: boolean;
  duplicate: boolean;
}) {
  const [selected, setSelected] = useState<AnswerTypes>(currentItem.type);
  const { setFormData } = useFormData();
  const [description, setDescription] = useState(false);

  const onNameChange = (e: string) => {
    setFormData((prev) => {
      return prev.map((input) => {
        if (input.uuid === currentItem.uuid) {
          return {
            ...input,
            name: e,
          };
        }
        return input;
      });
    });
  };

  const onLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return prev.map((input) => {
        if (input.uuid === currentItem.uuid) {
          return {
            ...input,
            label: e.target.value,
          };
        }
        return input;
      });
    });
  };
  const onPlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return prev.map((input) => {
        if (input.uuid === currentItem.uuid) {
          return {
            ...input,
            placeholder: e.target.value,
          };
        }
        return input;
      });
    });
  };

  const onRequiredChange = (e: boolean) => {
    setFormData((prev) => {
      return prev.map((input) => {
        if (input.uuid === currentItem.uuid) {
          return {
            ...input,
            required: e,
          };
        }
        return input;
      });
    });
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return prev.map((input) => {
        if (input.uuid === currentItem.uuid) {
          return {
            ...input,
            description: e.target.value,
          };
        }
        return input;
      });
    });
  };

  const onDuplicate = () => {
    const newItem = JSON.parse(
      JSON.stringify({ ...currentItem, uuid: Date.now().toString() })
    );
    setFormData((prev) => {
      return [...prev, newItem];
    });
  };
  const onDelete = () => {
    setFormData((prev) => {
      return prev.filter((it) => it.uuid !== currentItem.uuid);
    });
  };
  useEffect(() => {
    const randomUUID = crypto.randomUUID().split("-")[0];
    setFormData((prev) => {
      return prev.map((item) => {
        if (currentItem.uuid === item.uuid) {
          return { ...currentItem, type: selected };
        }
        return item;
      });
    });
    onNameChange(`${selected}_${randomUUID}`);
  }, [selected]);

  const availableOptionTypes: AnswerTypes[] = useMemo(() => options, []);
  const initialCheckboxOptions: OptionType[] = useMemo(() => {
    if (currentItem.options) return currentItem.options;
    const uuid = crypto.randomUUID();
    return [{ label: "Option 1", value: "option1", checked: false, uuid }];
  }, [currentItem]);
  const initialRadioOptions: OptionType[] = useMemo(() => {
    if (currentItem.options) return currentItem.options;
    const uuid = crypto.randomUUID();
    return [{ label: "Option 1", value: "option1", uuid }];
  }, [currentItem]);
  return (
    <div className="flex gap-2 w-full parent">
      <Card
        className={`w-full h-full min-h-[200px] flex flex-col gap-4 justify-between p-4 pl-5 input-card
      relative ${duplicate ? `border-2 border-pri-color` : ``}`}
      >
        <div className="h-full w-[6px] bg-linearGradientToBottom dark:bg-muted   absolute rounded-l-3xl focus-bar left-0 top-0" />
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col gap-2 w-full">
            <p className="text-sm font-bold">Label </p>
            <Input
              onChange={onLabelChange}
              value={currentItem.label || ""}
              required={currentItem.required}
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold">Type</p>
            <Select
              onValueChange={(e: string) => setSelected(e as AnswerTypes)}
              value={selected}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Input Type" />
              </SelectTrigger>
              <SelectContent>
                {availableOptionTypes.map((option) => (
                  <SelectItem key={option} value={option}>
                    {CapitalizeFirstLetter(option)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {description && (
          <div className="flex flex-col gap-2 w-full">
            <p className="text-sm font-bold">Description</p>
            <Input
              onChange={onDescriptionChange}
              value={currentItem.description || ""}
              type="text"
            />
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-2">
          {/* <div className="flex flex-col gap-2 w-full"> */}
          {/* <p className="text-sm font-bold">Name</p> */}
          {/* <Input
              onChange={(e) => onNameChange(e.target.value)}
              value={currentItem.name}
              required={currentItem.required}
              type="text"
            /> */}
          {/* </div> */}
          <div className="flex flex-col gap-2 w-full">
            <p className="text-sm font-bold">Placeholder</p>
            <Input
              onChange={onPlaceholderChange}
              // defaultValue={currentItem.placeholder}
              value={currentItem.placeholder || ""}
              required={currentItem.required}
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {(currentItem.type === "checkbox" ||
            currentItem.type === "radio") && (
            <p className="text-sm font-bold">Options</p>
          )}
          {currentItem.type === "checkbox" && (
            <InputOptions
              uuid={currentItem.uuid}
              options={initialCheckboxOptions}
            />
          )}
          {currentItem.type === "radio" && (
            <InputOptions
              uuid={currentItem.uuid}
              options={initialRadioOptions}
            />
          )}
          {currentItem.type === "dropdown" && (
            <InputOptions
              uuid={currentItem.uuid}
              options={initialRadioOptions}
            />
          )}
        </div>
        <div className="flex gap-4 md:gap-8 w-full justify-end">
          <div className="flex gap-4 md:gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <Switch
                  defaultChecked={currentItem.required}
                  onCheckedChange={onRequiredChange}
                />
                <p className="text-xs">Required</p>
              </div>
              <div className="flex gap-2 items-center">
                <Switch
                  defaultChecked={false}
                  // onCheckedChange={onRequiredChange}
                />
                <p className="text-xs">Hide from judges</p>
              </div>
            </div>
          </div>
          <div className="border-r border-2 border-gray-300" />
          <div className="flex items-center font-bold gap-2">
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Copy size={20} onClick={onDuplicate} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Duplicate</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger onClick={onDelete}>
                  <Trash size={20} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[180px]">
                <DropdownMenuItem
                  onClick={() => setDescription(!description)}
                  className="flex justify-between items-center"
                >
                  Description {description && <Check size={16} />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Card>
    </div>
  );
}
