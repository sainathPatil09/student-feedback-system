import React from "react";

const Table = ({ feedback }) => {
  console.log(feedback);
  return (
    <table className="table-auto w-full mb-3  border-collapse mx-auto">
      <thead>
        <tr className="bg-gray-100 border-b border-gray-300">
          <th className="px-4 py-2 text-left font-bold text-gray-700">Name</th>
          <th className="px-4 py-2 text-left font-bold text-gray-700">
            Subject
          </th>
          <th className="px-4 py-2 text-left font-bold text-gray-700">A</th>
          <th className="px-4 py-2 text-left font-bold text-gray-700">B</th>
          <th className="px-4 py-2 text-left font-bold text-gray-700">C</th>
          <th className="px-4 py-2 text-left font-bold text-gray-700">D</th>
          <th className="px-4 py-2 text-left font-bold text-gray-700">E</th>
          <th className="px-4 py-2 text-left font-bold text-gray-700">F</th>
          <th className="px-4 py-2 text-left font-bold text-gray-700">Avg.</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {/* <tr className="bg-white hover:bg-gray-50">
            <td className="px-4 py-2">1</td>
            <td className="px-4 py-2">{feedback[0].facultyName}</td>
            <td className="px-4 py-2">Quality Control Specialist</td>
            <td className="px-4 py-2">Blue</td>
          </tr> */}

        {feedback.map((feed) => {
          console.log(feed.averageRatings[0].averageRating);
          return (
            <tr key={feed.facultyId} className="bg-white hover:bg-gray-50">
              <td className="px-4 py-2">{feed.facultyName}</td>
              <td className="px-4 py-2">{feed.subject}</td>
              <td className="px-4 py-2">
                {feed.averageRatings[0].averageRating}
              </td>
              <td className="px-4 py-2">
                {feed.averageRatings[1].averageRating}
              </td>
              <td className="px-4 py-2">
                {feed.averageRatings[2].averageRating}
              </td>
              <td className="px-4 py-2">
                {feed.averageRatings[3].averageRating}
              </td>
              <td className="px-4 py-2">
                {feed.averageRatings[4].averageRating}
              </td>
              <td className="px-4 py-2">
                {feed.averageRatings[5].averageRating}
              </td>
              <td className="px-4 py-2">
                {feed.overallAverageRating}
              </td>
            </tr>
          );
        })}

        <tr className="bg-gray-50 hover:bg-gray-100">
            <td className="px-4 py-2">2</td>
            <td className="px-4 py-2">Hart Hagerty</td>
            <td className="px-4 py-2">hee</td>
            <td className="px-4 py-2">Purple</td>
          </tr>
          <tr className="bg-white hover:bg-gray-50">
            <td className="px-4 py-2">3</td>
            <td className="px-4 py-2">Brice Swyre</td>
            <td className="px-4 py-2">Software Engineer</td>
            <td className="px-4 py-2">Yellow</td>
          </tr>
          <tr className="bg-white hover:bg-gray-50">
            <td className="px-4 py-2">3</td>
            <td className="px-4 py-2">Brice Swyre</td>
            <td className="px-4 py-2">Software Engineer</td>
            <td className="px-4 py-2">Yellow</td>
          </tr>
          <tr className="bg-white hover:bg-gray-50">
            <td className="px-4 py-2">3</td>
            <td className="px-4 py-2">Brice Swyre</td>
            <td className="px-4 py-2">Software Engineer</td>
            <td className="px-4 py-2">Yellow</td>
          </tr>
          <tr className="bg-white hover:bg-gray-50">
            <td className="px-4 py-2">3</td>
            <td className="px-4 py-2">Brice Swyre</td>
            <td className="px-4 py-2">Software Engineer</td>
            <td className="px-4 py-2">Yellow</td>
          </tr>
      </tbody>
    </table>
  );
};

export default Table;
