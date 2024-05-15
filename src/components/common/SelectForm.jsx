import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectForm({
  options,
  label,
  handleSelectOption,
  defaultValue,
}) {
  return (
    <Select onValueChange={(e) => handleSelectOption(e)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder="Select an option"
          defaultValue={defaultValue}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option, index) => (
            <SelectItem value={option.name} key={index}>
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
