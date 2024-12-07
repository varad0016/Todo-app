import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 py-12 min-h-screen">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          About Me
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-lg text-gray-700">
            Hi! My name is <strong>Varad Annasaheb Sawant</strong>. I am a
            second-year engineering student at VIIT Pune, passionate about
            coding and software development. I love building interactive web
            applications and experimenting with new technologies.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            I am always eager to learn and explore new opportunities in the
            tech field.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
