import React, { useState } from "react";

const StudentPannel = () => {
  const [dataSC, setDataSC] = useState(0);
  const [dataCT, setDataCT] = useState(0);
  const [dataP, setDataP] = useState(0);
  const [dataHC, setDataHC] = useState(0);
  const [dataIS, setDataIS] = useState(0);
  const [dataN, setDataN] = useState(0);
  return (
    <div>
      <form action="" className="border-2 border-red-500 mx-auto md:w-1/2 p-3 space-y-3   ">

      
      {/* <div className="border-2 border-red-500 mx-auto md:w-1/2 p-3 space-y-3"> */}
        <div>header</div>

        <div className="bg-gradient-to-r from-amber-300 to-violet-400  space-y-3 p-5 border-1 hover:shadow-gray-400 rounded-2xl hover:shadow-lg">
          <p>Software Engineering (subjectCode)</p>
          <p>Fname Fname</p>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Syllabus covarage : {dataSC}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataSC}
              onChange={(e) => setDataSC(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Clarity in Teaching : {dataCT}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataCT}
              onChange={(e) => setDataCT(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Punctuality : {dataP}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataP}
              onChange={(e) => setDataP(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Handling class full time : {dataHC}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataHC}
              onChange={(e) => setDataHC(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Interaction with students : {dataIS}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataIS}
              onChange={(e) => setDataIS(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Notes and videos shared with students : {dataN}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataN}
              onChange={(e) => setDataN(e.target.value)}
            />
          </div>
        </div>

        

        {/* <div className="bg-gradient-to-r from-amber-300 to-violet-400  space-y-3 p-5 border-1 hover:shadow-gray-400 rounded-2xl hover:shadow-lg">
          <p>Software Engineering (subjectCode)</p>
          <p>Fname Fname</p>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Syllabus covarage : {dataSC}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataSC}
              onChange={(e) => setDataSC(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Clarity in Teaching : {dataCT}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataCT}
              onChange={(e) => setDataCT(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Punctuality : {dataP}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataP}
              onChange={(e) => setDataP(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Handling class full time : {dataHC}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataHC}
              onChange={(e) => setDataHC(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Interaction with students : {dataIS}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataIS}
              onChange={(e) => setDataIS(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Notes and videos shared with students : {dataN}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataN}
              onChange={(e) => setDataN(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-300 to-violet-400  space-y-3 p-5 border-1 hover:shadow-gray-400 rounded-2xl hover:shadow-lg">
          <p>Software Engineering (subjectCode)</p>
          <p>Fname Fname</p>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Syllabus covarage : {dataSC}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataSC}
              onChange={(e) => setDataSC(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Clarity in Teaching : {dataCT}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataCT}
              onChange={(e) => setDataCT(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Punctuality : {dataP}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataP}
              onChange={(e) => setDataP(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Handling class full time : {dataHC}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataHC}
              onChange={(e) => setDataHC(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Interaction with students : {dataIS}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataIS}
              onChange={(e) => setDataIS(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Notes and videos shared with students : {dataN}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataN}
              onChange={(e) => setDataN(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-300 to-violet-400  space-y-3 p-5 border-1 hover:shadow-gray-400 rounded-2xl hover:shadow-lg">
          <p>Software Engineering (subjectCode)</p>
          <p>Fname Fname</p>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Syllabus covarage : {dataSC}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataSC}
              onChange={(e) => setDataSC(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Clarity in Teaching : {dataCT}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataCT}
              onChange={(e) => setDataCT(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Punctuality : {dataP}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataP}
              onChange={(e) => setDataP(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Handling class full time : {dataHC}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataHC}
              onChange={(e) => setDataHC(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Interaction with students : {dataIS}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataIS}
              onChange={(e) => setDataIS(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Notes and videos shared with students : {dataN}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataN}
              onChange={(e) => setDataN(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-300 to-violet-400  space-y-3 p-5 border-1 hover:shadow-gray-400 rounded-2xl hover:shadow-lg">
          <p>Software Engineering (subjectCode)</p>
          <p>Fname Fname</p>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Syllabus covarage : {dataSC}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataSC}
              onChange={(e) => setDataSC(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Clarity in Teaching : {dataCT}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataCT}
              onChange={(e) => setDataCT(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Punctuality : {dataP}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataP}
              onChange={(e) => setDataP(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Handling class full time : {dataHC}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataHC}
              onChange={(e) => setDataHC(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Interaction with students : {dataIS}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataIS}
              onChange={(e) => setDataIS(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Notes and videos shared with students : {dataN}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataN}
              onChange={(e) => setDataN(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-300 to-violet-400  space-y-3 p-5 border-1 hover:shadow-gray-400 rounded-2xl hover:shadow-lg">
          <p>Software Engineering (subjectCode)</p>
          <p>Fname Fname</p>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Syllabus covarage : {dataSC}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataSC}
              onChange={(e) => setDataSC(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Clarity in Teaching : {dataCT}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataCT}
              onChange={(e) => setDataCT(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Punctuality : {dataP}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataP}
              onChange={(e) => setDataP(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Handling class full time : {dataHC}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataHC}
              onChange={(e) => setDataHC(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Interaction with students : {dataIS}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataIS}
              onChange={(e) => setDataIS(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Notes and videos shared with students : {dataN}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataN}
              onChange={(e) => setDataN(e.target.value)}
            />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-amber-300 to-violet-400  space-y-3 p-5 border-1 hover:shadow-gray-400 rounded-2xl hover:shadow-lg">
          <p>Software Engineering (subjectCode)</p>
          <p>Fname Fname</p>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Syllabus covarage : {dataSC}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataSC}
              onChange={(e) => setDataSC(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Clarity in Teaching : {dataCT}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataCT}
              onChange={(e) => setDataCT(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Punctuality : {dataP}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataP}
              onChange={(e) => setDataP(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Handling class full time : {dataHC}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataHC}
              onChange={(e) => setDataHC(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Interaction with students : {dataIS}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataIS}
              onChange={(e) => setDataIS(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Notes and videos shared with students : {dataN}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataN}
              onChange={(e) => setDataN(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-300 to-violet-400  space-y-3 p-5 border-1 hover:shadow-gray-400 rounded-2xl hover:shadow-lg">
          <p>Software Engineering (subjectCode)</p>
          <p>Fname Fname</p>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Syllabus covarage : {dataSC}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataSC}
              onChange={(e) => setDataSC(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Clarity in Teaching : {dataCT}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataCT}
              onChange={(e) => setDataCT(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Punctuality : {dataP}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataP}
              onChange={(e) => setDataP(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Handling class full time : {dataHC}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataHC}
              onChange={(e) => setDataHC(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Interaction with students : {dataIS}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataIS}
              onChange={(e) => setDataIS(e.target.value)}
            />
          </div>

          <div className=" space-y-2 flex flex-col items-center justify-center">
            Notes and videos shared with students : {dataN}
            <br />
            <input
              className="w-1/2"
              type="range"
              min={0}
              max={5}
              step={1}
              value={dataN}
              onChange={(e) => setDataN(e.target.value)}
            />
          </div>
        </div> */}

      {/* </div> */}
      <div className="flex items-center justify-center">

      <button className=" px-5 py-2 bg-gradient-to-r from-stone-500 to-stone-700 font-bold text-white rounded-xl">submit</button>
      </div>
      </form>
    </div>
  );
};

export default StudentPannel;
