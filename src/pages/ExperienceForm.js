import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { showPage } from "../App";
import { updateOrCreateDocument, usersCollection } from "../db";

function ExperienceForm(props) {
  useEffect(()=>{
    showPage();
});
  const { email } = props;

  const { register, handleSubmit, errors } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    // adding a new field to the educationData to differenciate it from experienceData
    data.type = "exp";

    // a new field named [data.degree] will created in the document 
    updateOrCreateDocument(usersCollection, email, { [data.jobTitle.replaceAll(' ', '') + data.company.replaceAll(' ', '')]: data })
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
        height: "90vh",
        height: "70vh",
      }}
    >
      <div style={{fontSize: '23px'}}>Add Experience</div>
      <form align="center" onSubmit={handleSubmit(onSubmit)}>
        <br />
        <input
          type="text"
          placeholder="Position"
          name="jobTitle"
          required="true"
          {...register("jobTitle", { required: true })}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="Company name"
          name="company"
          required="true"
          {...register("company", { required: true })}
        />
        <br />
        <br />
        <input
          name="tech"
          type="text"
          placeholder="Technologies used (comma separated list)"
          required="true"
          {...register("tech", { required: true })}
        />
        <br />
        <br />
        <textarea
          type="text"
          name="details"
          placeholder="Your daily responsibilities at this job"
          required="true"
          rows={7}
          {...register("responsibilities", { required: true })}
        />
        <br />
        <br />
        <input type="submit" className="submit" />
      </form>
    </div>
  );
}

export default ExperienceForm;
