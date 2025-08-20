import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Icon } from "@iconify/react";

import AppLayout from "@/components/AppLayout";
import Button from "@/components/Button";
import PageIntroBanner from "@/components/ui/PageWrapper";
import { MessageCircle, Phone, Space } from "lucide-react";
import { color } from "framer-motion";
import LocationMap from "@/components/LocationMap";

import { getServiceCategories } from "../data/service-offerings";

const serviceCategories = getServiceCategories();
const serviceOptions = serviceCategories.flatMap(
  (category) => category.services
);

const ContactPage = () => {
  const contacts = [
    {
      type: "Main Office",
      address:
        "Purok 8B Tiera Nueva Brgy. Tacunan, Davao City, Philippines 8000",
      phoneNumbers: ["(082) 308 0715", "+63 (995) 122 5449"],
      email: "contactus@ladonco.ph",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800, // animation duration
      once: true, // animate only once on scroll
    });
  }, []);

  return (
    <div className="overflow-hidden">
      <AppLayout showCTA={false}>
        <PageIntroBanner
          backgroundImageUrl="/assets/images/intro/bg-image8.jpg"
          title="Contact Us"
          pageName="Contact"
        >
          <section className="contact-us-wrap mt-5">
            <div className="container aos-init aos-animate" data-aos="fade-up">
              <div className="row">
                <div className="contact-info col-md-6">
                  <h2 className="text-uppercase mb-3 left-pattern">About Us</h2>
                  <h3 className="mb-4">Contact information</h3>

                  <p>
                    <b>We’re ready when you are.</b> Connect with Ladon
                    Construction Services — where every conversation begins with
                    care and ends in lasting craftsmanship.
                  </p>
                  <div className="page-content">
                    {contacts.map((contact) => (
                      <div className="col-md-6">
                        <div className="content-box my-5">
                          <h5 className="element-title text-uppercase fs-6 fw-bold mb-3">
                            {contact.type}
                          </h5>
                          <div className="contact-address">
                            <p>{contact.address}</p>
                          </div>
                          <div className="contact-number ">
                            {contact.phoneNumbers.map((phone, idx) => (
                              <a href="#">
                                {idx === 0 ? "" : ", "} {phone}
                              </a>
                            ))}
                          </div>
                          <div className="email-address">
                            <p>
                              <a href="#"> {contact.email}</a>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="mt-8 space-y-4">
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white"
                        onClick={() =>
                          (window.location.href = "tel:+639951225449")
                        }
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        &nbsp;Call Now
                      </Button>
                      &nbsp; &nbsp;
                      <Button
                        variant="outline"
                        className="w-full border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-gray-800"
                        onClick={() =>
                          window.open("https://wa.me/639951225449", "_blank")
                        }
                      >
                        <MessageCircle
                          color="#25D366"
                          className="mr-2 h-4 w-4 text-green-600 dark:text-green-400"
                          style={{ color: "green" }}
                        />
                        &nbsp; WhatsApp Us
                      </Button>
                    </div>

                    <div className="col-md-7">
                      <div className="content-box my-5">
                        <h5 className="element-title text-uppercase fs-6 fw-bold mb-3">
                          Social info
                        </h5>
                        <div className="social-links">
                          <ul className="list-unstyled d-flex gap-3 mt3 ">
                            <li>
                              <a href="#" className="text-secondary me-3 p-0">
                                <Icon
                                  icon="ri:facebook-fill"
                                  className="social-icon"
                                />
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-secondary me-3 p-0">
                                <Icon
                                  icon="ri:instagram-line"
                                  className="social-icon"
                                />
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-secondary me-3 p-0">
                                <Icon
                                  icon="ri:twitter-fill"
                                  className="social-icon"
                                />
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-secondary me-3 p-0">
                                <Icon
                                  icon="ri:youtube-fill"
                                  className="social-icon"
                                />
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-secondary me-3 p-0">
                                <Icon
                                  icon="ri:linkedin-fill"
                                  className="social-icon"
                                />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="inquiry-item col-md-6 mt-10">
                  <h3 className="mb-5">
                    Let’s talk. Message us or request a personalized quote
                    today.
                  </h3>

                  <p>Use the form below to get in touch with us.</p>
                  <form
                    name="contactform"
                    action="contact.php"
                    method="post"
                    className="form-group contact-form mt-4"
                  >
                    <div className="form-input col-lg-12 d-flex justify-content-between mb-3">
                      <div className="w-100 me-3">
                        <label className="mb-2 fs-6 text-dark">
                          Your Name*
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Write Your Name Here"
                          className="form-control shadow-none px-3 py-2"
                          required
                        />
                      </div>
                      <div className="w-100">
                        <label className="mb-2 fs-6 text-dark">
                          Your E-mail*
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Write Your Email Here"
                          className="form-control shadow-none px-3 py-2"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-12 mb-3">
                      <label className="mb-2 fs-6 text-dark">
                        Phone Number
                      </label>
                      <input
                        type="number"
                        name="phone"
                        placeholder="Phone Number"
                        className="form-control shadow-none px-3 py-2"
                      />
                    </div>

                    <div className="col-lg-12 mb-3">
                      <label className="mb-2 fs-6 text-dark">
                        Service Type (Optional)
                      </label>
                      <select
                        name="service"
                        className="form-control shadow-none px-3 py-2"
                        defaultValue=""
                      >
                        <option value="">Just an inquiry / Not sure</option>
                        {serviceOptions.map((service) => (
                          <option key={service.slug} value={service.name}>
                            {service.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-lg-12 mb-3">
                      <label className="mb-2 fs-6 text-dark">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Write Your Subject Here"
                        className="form-control shadow-none px-3 py-2"
                      />
                    </div>

                    <div className="col-lg-12 mb-3">
                      <label className="mb-2 fs-6 text-dark">
                        Your Message*
                      </label>
                      <textarea
                        name="message"
                        placeholder="Write Your Message Here"
                        className="form-control shadow-none px-3 py-2"
                        style={{ height: "150px" }}
                        required
                      ></textarea>
                    </div>

                    <div className="col-lg-12 mb-3">
                      <label className="mb-2 fs-6 text-dark">
                        Preferred Days to Call
                      </label>
                      <div className="d-flex flex-wrap gap-3">
                        {[
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                        ].map((day) => (
                          <div key={day} className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="preferred_days[]"
                              value={day}
                              id={`day-${day}`}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`day-${day}`}
                            >
                              {day}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="col-lg-12 mb-3">
                      <label className="mb-2 fs-6 text-dark">
                        Preferred Time of Day
                      </label>
                      <select
                        name="preferred_time"
                        className="form-control shadow-none px-3 py-2"
                        defaultValue=""
                      >
                        <option value="">No preference</option>
                        <option value="morning">Morning (8AM–11AM)</option>
                        <option value="midday">Midday (11AM–2PM)</option>
                        <option value="afternoon">Afternoon (2PM–5PM)</option>
                        <option value="evening">Evening (5PM–7PM)</option>
                      </select>
                    </div>

                    <div className="d-grid">
                      <Button
                        type="submit"
                        variant="dark"
                        size="medium"
                        className="btn-arrow btn-primary btn-lg fs-6"
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "30px" }}>
              <LocationMap />
            </div>
          </section>
        </PageIntroBanner>
      </AppLayout>
    </div>
  );
};

export default ContactPage;
