import React from "react";
import { useUserContext } from "../contexts/user.context";
import { Formik } from "formik";
import * as Yup from "yup";

const FormFullName = ({ fullName }) => {
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Required"),
  });

  const { updateUser } = useUserContext();

  return (
    <Formik
      initialValues={{ fullName }}
      onSubmit={(values) => {
        updateUser(values);
      }}
      validationSchema={validationSchema}
    >
      {({ values, handleChange, handleSubmit, errors }) => (
        <form
          onSubmit={handleSubmit}
          className="text-[16px] relative border rounded-full bg-quaternary w-fit px-10 h-[80px] flex items-center justify-start gap-3"
        >
          <label
            className="absolute top-[-16px] bg-quaternary rounded-full px-2 py-[2px] font-bowlby font-thin tracking-widest text-white border left-8 "
            htmlFor="fullName"
          >
            Full Name
          </label>

          <input
            className="rounded-lg bg-black border-none outline-none px-3 py-2"
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
          />
          {errors?.fullName && <p className="text-[12px]">{errors.fullName}</p>}
          <button className="bg-primary px-4 py-2 rounded-lg" type="submit">
            Update
          </button>
        </form>
      )}
    </Formik>
  );
};

const FormPassword = () => {
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("Required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Required")
      .min(6, "Password must be at least 6 characters")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  const { updatePassword } = useUserContext();

  return (
    <Formik
      initialValues={{
        newPassword: "",
        confirmPassword: "",
      }}
      onSubmit={(values) => {
        updatePassword(values.newPassword);
      }}
      validationSchema={validationSchema}
    >
      {({ values, handleChange, handleSubmit, errors }) => (
        <form
          onSubmit={handleSubmit}
          className="text-[16px] relative border rounded-full bg-quaternary w-fit px-10 h-[80px] flex items-center justify-start gap-3"
        >
          <label
            className="absolute top-[-16px] bg-quaternary rounded-full px-2 py-[2px] font-bowlby font-thin tracking-widest text-white border left-8 "
            htmlFor="password"
          >
            Password
          </label>

          <input
            placeholder="New Password"
            className="rounded-lg bg-black border-none outline-none px-3 py-2"
            type="password"
            name="newPassword"
            value={values.newPassword}
            onChange={handleChange}
          />
          {errors?.newPassword && (
            <p className="text-[12px]">{errors.newPassword}</p>
          )}

          <input
            placeholder="Confirm New Password"
            className="rounded-lg bg-black border-none outline-none px-3 py-2"
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {errors?.confirmPassword && (
            <p className="text-[12px]">{errors.confirmPassword}</p>
          )}

          <button className="bg-primary px-4 py-2 rounded-lg" type="submit">
            Update
          </button>
        </form>
      )}
    </Formik>
  );
};

const DeleteAccount = () => {
  const { deleteAccount } = useUserContext();

  return (
    <div className="text-[16px] w-[300px] relative border rounded-full bg-quaternary px-10 h-[120px] flex items-center justify-start gap-3">
      <label
        className="absolute top-[-16px] bg-quaternary rounded-full px-2 py-[2px] font-bowlby font-thin tracking-widest text-white border left-8 "
        htmlFor="password"
      >
        Delete Account
      </label>

      <button
        onDoubleClick={() => {
          deleteAccount();
        }}
        className="bg-red-900 hover:bg-red-500 transition-all font-normal hover:font-bold hover:shadow-lg shadow rounded-full text-[14px] px-4 py-2 text-white"
      >
        Double Click To Delete Account
      </button>
    </div>
  );
};

export default function SettingsPage() {
  const { user } = useUserContext();
  return (
    user.username && (
      <div className="text-white w-full min-h-[500px] bg-quinary rounded-lg gap-8 p-4 my-2 flex flex-col lg:items-start items-center">
        <h1 className="text-[42px] font-rubik font-extrabold "> Settings </h1>

        <FormFullName fullName={user.fullName} />

        <FormPassword />

        <DeleteAccount />
      </div>
    )
  );
}
