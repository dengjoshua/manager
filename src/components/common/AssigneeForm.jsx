import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DatePicker } from "./DatePicker";

function AssigneeForm({
  name,
  closeModal,
  setName,
  email,
  gender,
  setGender,
  createAssignee,
  setEmail,
  DOB,
  setDOB,
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Assignee</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Name</Label>
              <Input
                placeholder="Name"
                id="description"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-1/2 space-y-1.5">
              <Label htmlFor="framework">Gender</Label>
              <Select
                value={gender}
                onValueChange={(e) => setGender(e.valueOf())}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DatePicker name="Date of Birth" date={DOB} setDate={setDOB} />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          className="bg-orange-400 hover:bg-orange-300"
          onClick={() => createAssignee()}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AssigneeForm;
