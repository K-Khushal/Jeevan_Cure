"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import AddContact from "./Modal";
import EditContact from "./EditContact";
import { sendSMS } from "@/app/lib/send-sms";


const STORAGE_KEY = "emergency_contacts";
export default function EmergencyContact() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setContacts(storedContacts);
  }, []);

  const handleAddContact = (newContact) => {
    const updatedContacts = [...contacts, { ...newContact, id: Date.now() }];
    setContacts(updatedContacts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedContacts));
  };

  // const handleEditContact = (contactId, updatedContact) => {
  //   const updatedContacts = contacts.map((contact) =>
  //     contact.id === contactId ? { ...contact, ...updatedContact } : contact
  //   );
  //   setContacts(updatedContacts);
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedContacts));
  //   setIsEditModalOpen(false); // Close the edit contact modal after editing
  // };

  // const handleEditClick = (contact) => {
  //   setContactToEdit(contact);
  //   setIsEditModalOpen(true);
  // };

  const handleEmergencyClick = () => {
    const numbers = contacts.map((contact) => String(contact.number));
    console.log(numbers);
    for(let i=0; i<numbers.length; i++){
      sendSMS(numbers[i]).then(r => console.log(r, numbers[i]));
    }
  };

  return (
    <div className="my-20">
      <h1 className="text-4xl font-semibold font-serif">Emergency Call</h1>
      <div className="flex flex-col gap-5 my-10">
        {contacts.map((data, index) => (
          <div key={index} className="flex items-center justify-between pr-10">
            <div className="flex gap-5 items-center">
              {/* <Image
                src={persons.img}
                height={400}
                width={400}
                alt={`${data.name}-icon`}
                className="rounded-full border-2 border-black object-cover h-20 w-20"
              /> */}
              <div>
                <p className=" font-semibold tracking-[3px] text-3xl">
                  {data.name}
                </p>
                <p className="font-semibold text-gray-700 tracking-[2px] text-md">
                  +{data.number}, {data.relation}
                </p>
              </div>
            </div>
            <FaUserEdit
              size={32}
              color="gray"
              // onClick={() => handleEditClick(data)}
            />
          </div>
        ))}
        <div className="flex  text-2xl items-start gap-5 mt-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 w-80 font-bold text-white drop-shadow-xl 
            rounded-lg p-2 px-4"
          >
            Add Contact
          </button>
          <button
            onClick={handleEmergencyClick}
            className="bg-red-600 w-80 font-bold text-white drop-shadow-xl
            rounded-lg p-2 px-4"
          >
            Emergency
          </button>
        </div>
      </div>
      <AddContact
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onAddContact={handleAddContact}
      />
      {/* <EditContact
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        onEditContact={handleEditContact}
        contactToEdit={contactToEdit}
      /> */}
    </div>
  );
}
