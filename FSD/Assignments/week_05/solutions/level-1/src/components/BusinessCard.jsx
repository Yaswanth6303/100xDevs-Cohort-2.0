import React from "react";

const BusinessCard = ({ name, description, interests, linkedin, twitter }) => {
  return (
    <div className="max-w-sm border border-gray-300 rounded-lg p-5 m-5 shadow-md bg-gray-100">
      <h1 className="text-2xl mb-2.5 text-gray-800 font-bold">{name}</h1>
      <p className="text-base text-gray-600 mb-4">{description}</p>

      <h3 className="text-lg mb-2.5 text-gray-800 font-semibold">Interests</h3>
      <ul className="list-none p-0 m-0">
        {interests.map((interest, index) => (
          <li key={index} className="text-sm mb-1.5 text-gray-600">
            {interest}
          </li>
        ))}
      </ul>

      <div className="flex mb-4">
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline text-white py-2.5 px-4 rounded-md bg-blue-500 m-2.5 shadow hover:bg-blue-600"
        >
          LinkedIn
        </a>
        <a
          href={twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline text-white py-2.5 px-4 rounded-md bg-blue-500 m-2.5 shadow hover:bg-blue-600"
        >
          Twitter
        </a>
      </div>
    </div>
  );
};

export default BusinessCard;
