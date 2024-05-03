import React from 'react';

const About = () => {
    return (
        <main className='flex flex-col items-center pt-24 font-serif'>
            <p className='w-full xl:w-200 p-5 pb-0'>
                The web application, developed on the <strong>MERN</strong> stack (MongoDB, Express, React, and Node.js), features an advanced authorization system with access and refresh tokens, allowing users to create both personal and group ToDo lists. It includes a calendar to track all unfinished tasks.
            </p>
            <div className='w-full xl:w-200 p-5'>
                <h2 className="text-xl font-bold mb-3">Frontend technologies:</h2>
                <ul className="list-disc ml-5 mb-5">
                    <li>React (v18.2)</li>
                    <li>Redux Toolkit and RTK Query</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>Framer Motion</li>
                </ul>
                <h2 className="text-xl font-bold mb-3">Backend technologies:</h2>
                <ul className="list-disc ml-5 mb-5">
                    <li>Node.js / Express</li>
                    <li>JsonWebToken</li>
                    <li>NodeMailer</li>
                </ul>
                <p className="mb-3">For the database, MongoDB is utilized with the following structure:</p>
                <img
                    src="/Data Structure.jpg"
                    alt="MongoDB Structure"
                    className="w-full xl:w-200 max-w-[50rem]"
                />
                <p className="mb-3">You can find more details about the <a href="https://github.com/Temich21/ToDo-Frontend" className="underline">frontend</a> and <a href="https://github.com/Temich21/ToDo-Backend" className="underline">backend</a> on my <a href="https://github.com/Temich21" className="underline">GitHub</a>.</p>
            </div>
        </main>
    )
}

export default About