"use client";

import { sendSMS } from "@/app/lib/send-sms";
import { useFormStatus, useFormState } from "react-dom";

const initialState = {
    response: null,
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            aria-disabled={pending}
            className="border rounded-md hover:bg-slate-50 p-2 flex justify-center items-center"
        >
            {pending ? (
                <>
                    <div className="border-gray-300 h-5 w-5 animate-spin rounded-full border-2 border-t-blue-600 mr-2" />
                    Sending...
                </>
            ) : (
                "Send"
            )}
        </button>
    );
}

export function SendForm() {
    const [state, formAction] = useFormState(sendSMS, initialState);

    return (
        <form action={formAction} className="flex flex-col gap-2 mx-44 p-10 bg-black text-white shadow-md rounded-xl">
            <div className="flex p-3 items-center justify-between">
                <img src="../vonage.svg" alt="Vonage" />
                <h2 className="text-lg font-medium">Send SMS with the Vonage APIs</h2>
            </div>
            <label htmlFor="number">Phone number:</label>
            <input
                name="number"
                id="number"
                type="phone"
                placeholder="919009009099"
                autoComplete="off"
                className="border rounded p-2 text-black"
                required
            />
            <label htmlFor="text">Message:</label>
            <textarea
                name="text"
                id="text"
                rows={4}
                cols={40}
                placeholder="Hello from Next.js App!"
                className="border rounded p-2 text-black mb-5"
                required
            />
            <SubmitButton />
            <p aria-live="polite">{state?.response}</p>
        </form>
    );
}