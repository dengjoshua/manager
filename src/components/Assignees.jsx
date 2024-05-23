import React, { useState } from "react";
import { Button } from "./ui/button";
import AssigneeForm from "./common/AssigneeForm";
import { format } from "date-fns";

function Assignees(props) {
  const [modalOpen, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [DOB, setDOB] = useState("");

  const formattedDOB = DOB ? format(DOB, "yyyy-MM-dd") : "";

  const createAssignee = () => {
    console.log(gender, email, name, formattedDOB);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="w-full h-screen bg-gray-100 p-4">
      <div>
        <h1>Assignees.</h1>
        <Button
          className="bg-orange-400 hover:bg-orange-300"
          onClick={() => setOpenModal(true)}
        >
          Creaate Assignee.
        </Button>
        {modalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-2/5 rounded ">
              <AssigneeForm
                name={name}
                email={email}
                closeModal={closeModal}
                gender={gender}
                setName={setName}
                setGender={setGender}
                createAssignee={createAssignee}
                setEmail={setEmail}
                DOB={DOB}
                setDOB={setDOB}
              />
            </div>
          </div>
        )}
      </div>
      <div>
        <p>Here is a list of people assigned to your projects.</p>
      </div>
    </div>
  );
}

export default Assignees;
