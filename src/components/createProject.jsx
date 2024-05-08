import React, { useState } from "react";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { DatePicker } from "./DatePicker";

export function ProjectForm({
  handleCreateProject,
  setPriority,
  setDescription,
  setProjectName,
  name,
  startDate,
  priority,
  endDate,
  description,
  setStartDate,
  setEndDate,
  closeModal,
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>
          Create your new project schedule in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Name of your project"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description of your project"
              />
            </div>
            <div className="flex flex-col w-1/2 space-y-1.5">
              <Label htmlFor="framework">Priority</Label>
              <Select
                value={priority}
                onValueChange={(e) => setPriority(e.valueOf())}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <DatePicker
                name="Start Date"
                setDate={setStartDate}
                date={startDate}
              />
              <DatePicker name="End Date" setDate={setEndDate} date={endDate} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          className="bg-orange-400 hover:bg-orange-300"
          onClick={handleCreateProject}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
