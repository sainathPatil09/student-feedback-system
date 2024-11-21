import React from "react";
import { useFeedback } from "../context/FeedbackProvider";
import Table from "./Table";

const PDF = () => {
  const { feedback, header, sem } = useFeedback();
  console.log(feedback);
  return (
    <>
      <div className="border border-red-300 w-3/4 mx-auto h-full p-5 ">
        <header className="border">
          <img className="h-32" src="" alt="image" />
        </header>
        <div className="flex flex-col items-center gap-2 mt-2 mb-2">
          <h1 className="text-3xl">{header}</h1>
          <h2 className="text-2xl">semester: {sem}</h2>
        </div>

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

        <div className="flex w-3/4 mx-auto border-2 justify-between mt-32">
          <div>
            <p>CLASS CO_ORDINATOR</p>
            <p>abc</p>
          </div>
          <div>
            <p>HOD</p>
            <p>pqr</p>
          </div>
          <div>
            <p>PRINCIPAL</p>
            <p>xyz</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PDF;
