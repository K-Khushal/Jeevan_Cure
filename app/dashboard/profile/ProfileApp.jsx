import React from "react";
import { Avatar } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { UserIcon } from "./UserIcon ";
import { Button } from "@nextui-org/react";

export default function ProfileApp() {
  return (
    <main className="min-h-screen bg-white text-black px-32 pt-10">
      <div className="w-[60%]">
        <div className="flex flex-row gap-4 items-center">
          <Avatar
            src="https://i.pravatar.cc/150?u=a04258114e29026708c"
            className="w-28 h-28"
          />
          <div>
            <p className="text-xl font-semibold">Jeevan Cure</p>
            <p>jeevancure@demo.com</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-6">
          <p className="text-xl font-semibold">Basic Info</p>
          <Input type="text" label="Name" />
          <Input type="email" label="Email" />
          <Input type="phone" label="Phone" />
          <Textarea
            label="Address"
            placeholder="Enter your Address"
            className=""
          />
          <div className="flex items-center gap-5">
            {/* <p>Change your basic info</p> */}
            <Button color="primary">Edit</Button>
            <Button color="danger" startContent={<UserIcon />}>
              Delete user
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
