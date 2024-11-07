import React from "react";
import { useFeedback } from "../context/FeedbackProvider";
import Table from "./Table";

const PDF = () => {
  const { feedback, header, sem } = useFeedback();
  console.log(feedback);
  return (
    <>
      <div className="border border-red-300 w-3/4 mx-auto">
        <header>
          <img src="" alt="image" />
        </header>
        <h1>{header}</h1>
        <h2>semester: {sem}</h2>

        <Table feedback={feedback} />

        <div className="flex w-1/2 mx-auto  justify-center gap-10 mt-5">
          <div>
            <p>
              {" "}
              <span className="font-bold"> A:</span> Syllabus Coverage{" "}
            </p>
            <p>
              {" "}
              <span className="font-bold"> B:</span> Clarity in Teaching{" "}
            </p>
            <p>
              {" "}
              <span className="font-bold"> C:</span> Punctuality{" "}
            </p>
          </div>
          <div>
            <p>
              {" "}
              <span className="font-bold"> D:</span> Handling class full time{" "}
            </p>
            <p>
              {" "}
              <span className="font-bold"> E:</span> Interaction with Students
            </p>
            <p>
              {" "}
              <span className="font-bold"> F:</span> Notes and videos shared
              with Students
            </p>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default PDF;
