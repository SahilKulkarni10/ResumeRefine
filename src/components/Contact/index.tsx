"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .send(
        "service_zz47vzo", 
        "template_5suhiqe",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "kulkarnisahil882@gmail.com",
        },
        "6jjVwrK_vvRunMlB3" 
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
          setIsSubmitting(false);
        },
        (err) => {
          console.error("FAILED...", err);
          alert("Failed to send the message, please try again.");
          setIsSubmitting(false);
        }
      );
  };

  return (
    <section id="contact" className="overflow-hidden py-10 md:py-16 lg:py-24">
      <div className="container px-4 sm:px-8 mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="mb-12 rounded-sm bg-white px-4 py-8 shadow-three dark:bg-gray-dark sm:p-[35px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s"
            >
              <h2 className="mb-3 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-2xl xl:text-3xl">
                Need Help? 
              </h2>
              <p className="mb-8 text-sm sm:text-base font-medium text-body-color">
                Our support team will get back to you ASAP via email.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-6 md:mb-8">
                      <label htmlFor="name" className="mb-2 md:mb-3 block text-xs sm:text-sm font-medium text-dark dark:text-white">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-6 md:mb-8">
                      <label htmlFor="email" className="mb-2 md:mb-3 block text-xs sm:text-sm font-medium text-dark dark:text-white">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-6 md:mb-8">
                      <label htmlFor="message" className="mb-2 md:mb-3 block text-xs sm:text-sm font-medium text-dark dark:text-white">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Enter your Message"
                        value={formData.message}
                        onChange={handleChange}
                        className="border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button 
                      className="rounded-sm bg-primary px-7 py-3 text-sm sm:text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
