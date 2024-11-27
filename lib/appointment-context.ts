import { Appointment } from "@/types/index";
import { createContext } from "react";

export const AppointmentsContext = createContext<Appointment[]>([]);
