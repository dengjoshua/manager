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

export function SelectForm({ options, label, handleSelectOption, value }) {
  return (
    <Select onValueChange={(e) => handleSelectOption(e)} value={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an option">
          {value || "Select an option"}
        </SelectValue>
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
