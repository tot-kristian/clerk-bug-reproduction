"use client";

import { useSignUp, useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {Input} from "@/components/Input";
import {SubmitButton} from "@/components/SubmitButton";

interface IFormInput {
  firstName: string;
  lastName: string;
  password: string;
}

const SignUpPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<IFormInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  // Handle signed-in users visiting this page
  // This will also redirect the user once they finish the sign-up process
  useEffect(() => {
    if (user?.id) {
      router.push("/");
    }
  }, [user, router]);

  // Get the token from the query params
  const token = useSearchParams().get("__clerk_ticket");

  // If there is no invitation token, restrict access to this page
  if (!token) {
    return <p>No invitation token found.</p>;
  }

  // Handle submission of the sign-up form
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!isLoaded) return;

    try {
      if (!token) return null;

      // Create a new sign-up with the supplied invitation token.
      // Make sure you're also passing the ticket strategy.
      // After the below call, the user's email address will be
      // automatically verified because of the invitation token.
      const signUpAttempt = await signUp.create({
        strategy: "ticket",
        ticket: token,
        ...data,
      });

      // If the sign-up was completed, set the session to active
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className="grid w-full h-screen flex-grow items-center bg-gradient-to-br from-rose-500 to-primary px-4 sm:justify-center">
      <div>
        <header className="text-center">
          <h1 className="font-kalnia text-primary text-3xl">VMNKK</h1>
          <h1 className="mt-4 text-xl font-medium tracking-tight text-neutral font-montserrat">
            Accept invite to VMNKK-inventory
          </h1>
        </header>
        <div className="mt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center">
              <label htmlFor="firstName">Enter first name</label>
              <Input
                placeholder="Enter your first name"
                register={register("firstName", {
                  required: true,
                  maxLength: 20,
                })}
              />
            </div>
            <div className="flex justify-center">
              <label htmlFor="lastName">Enter last name</label>
              <Input
                placeholder="Enter your last name"
                register={register("lastName", {
                  required: true,
                  maxLength: 20,
                })}
              />
            </div>
            <div className="flex justify-center">
              <label htmlFor="password">Enter password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                register={register("password", {
                  required: true,
                  maxLength: 20,
                })}
              />
            </div>
            <div className="flex justify-center">
              <SubmitButton disabled={!isValid}>Submit</SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
