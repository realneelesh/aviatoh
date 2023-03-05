import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { showPage } from "../App";
import { auth, updateOrCreateDocument, usersCollection } from "../db";

function EducationForm(props) {
  useEffect(()=>{
    showPage();
});
  const { email } = props;

  const { register, handleSubmit, errors } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    // adding a new field to the educationData to differenciate it from experienceData
    data.type = "edu";

    // a new field named [data.degree] will created in the document 
    updateOrCreateDocument(usersCollection, email, { [data.degree.replaceAll(' ', '')]: data })
      .then((res) => {
        alert("Successfully added");
        navigate("/profile");
      })
      .catch(() => {
        alert("Something went wrong");
      });
  };

  return (
    <div
      align="left"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <div style={{fontSize: '23px'}}>Add Education</div>
      <form align="center" onSubmit={handleSubmit(onSubmit)}>
        <br />
        <input
          type="text"
          placeholder="Level"
          name="degree"
          required="true"
          {...register("degree", { required: true })}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="Institution name"
          name="institution"
          required="true"
          {...register("institution", { required: true })}
        />
        <br />
        <br />
        <input
          name="year"
          type="text"
          placeholder="Year of graduation"
          required="true"
          {...register("yearOfGraduation", { required: true })}
        />
        <br />
        <br />
        <input
          onClick={() => {
            console.log(auth.email);
          }}
          type="submit"
          className="submit"
        />
      </form>
    </div>
  );
}

export default EducationForm;
