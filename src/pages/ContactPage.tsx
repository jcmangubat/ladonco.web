import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import Button from "@/components/Button";
import PageIntroBanner from "@/components/ui/PageWrapper";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import LocationMap from "@/components/LocationMap";
import { getServiceCategories } from "../data/service-offerings";
import styles from "../styles/_pages/ContactPage.module.css";
import { isValidPhone } from "@/lib/utils";

const serviceCategories = getServiceCategories();
const serviceOptions = serviceCategories.flatMap(
  (category) => category.services
);

// Define TypeScript interface for form data
interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  subject: string;
  message: string;
  preferred_days: string[];
  preferred_time: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    subject: "",
    message: "",
    preferred_days: [],
    preferred_time: "",
  });

  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<"contact" | "location">("contact");

  const contacts = [
    {
      type: "Main Office",
      address:
        "Purok 8B Tiera Nueva Brgy. Tacunan, Davao City, Philippines 8000",
      phoneNumbers: ["(082) 308 0715", "+63 (995) 122 5449"],
      email: "contactus@ladonco.ph",
      hours: "Monday - Saturday: 8:00 AM - 5:00 PM",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[name as keyof FormData]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormData];
        return newErrors;
      });
    }
  };

  const handleDayChange = (day: string) => {
    setFormData((prev) => {
      const days = [...prev.preferred_days];
      if (days.includes(day)) {
        return { ...prev, preferred_days: days.filter((d) => d !== day) };
      } else {
        return { ...prev, preferred_days: [...days, day] };
      }
    });
  };

  const validateForm = () => {
    const errors: Partial<FormData> = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.message.trim()) errors.message = "Message is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real implementation, you would send the data to your backend
      console.log("Form submitted:", formData);

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        subject: "",
        message: "",
        preferred_days: [],
        preferred_time: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const socialLinks = [
    { icon: "ri:facebook-fill", url: "#", color: "#1877F2" },
    { icon: "ri:instagram-line", url: "#", color: "#E4405F" },
    { icon: "ri:twitter-fill", url: "#", color: "#1DA1F2" },
    { icon: "ri:youtube-fill", url: "#", color: "#FF0000" },
    { icon: "ri:linkedin-fill", url: "#", color: "#0A66C2" },
  ];

  return (
    <div className="overflow-hidden">
      <AppLayout showCTA={false}>
        <PageIntroBanner
          backgroundImageUrl="/images/intro/bg-image4.png"
          title="Contact Us"
          pageName="Contact"
        >
          <section className="contact-us-wrap mt-5">
            <div className="container" data-aos="fade-up">
              <div className="row">
                {/* Contact Information */}
                <div
                  className={`col-md-6 ${
                    activeTab === "contact" ? "block" : "hidden md:block"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={styles.card}
                  >
                    <h2 className="text-uppercase mb-3 left-pattern mb-5">
                      Get In Touch
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      <b>We’re ready when you are.</b> Connect with Ladon
                      Construction Services — where every conversation begins
                      with care and ends in lasting craftsmanship.
                    </p>

                    {contacts.map((contact, index) => (
                      <div key={index} className="space-y-6">
                        <div className={styles.contactItem}>
                          <div className={styles.iconContainer}>
                            <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div className={styles.contactContent}>
                            <h3>{contact.type}</h3>
                            <p>{contact.address}</p>
                          </div>
                        </div>

                        <div className={styles.contactItem}>
                          <div className={styles.iconContainer}>
                            <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div className={styles.contactContent}>
                            <h3>Phone</h3>
                            <div className="space-y-1">
                              {contact.phoneNumbers.map((phone, idx) => (
                                <a
                                  key={idx}
                                  href={`tel:${phone.replace(/\D/g, "")}`}
                                  className={styles.contactLink}
                                >
                                  {phone}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className={styles.contactItem}>
                          <div className={styles.iconContainer}>
                            <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div className={styles.contactContent}>
                            <h3>Email</h3>
                            <a
                              href={`mailto:${contact.email}`}
                              className={styles.contactLink}
                            >
                              {contact.email}
                            </a>
                          </div>
                        </div>

                        <div className={styles.contactItem}>
                          <div className={styles.iconContainer}>
                            <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div className={styles.contactContent}>
                            <h3>Business Hours</h3>
                            <p>{contact.hours}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className={styles.buttonContainer}>
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white flex items-center justify-center"
                        onClick={() =>
                          (window.location.href = "tel:+639951225449")
                        }
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Call Now
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-gray-800 flex items-center justify-center"
                        onClick={() =>
                          window.open("https://wa.me/639951225449", "_blank")
                        }
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        WhatsApp Us
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={styles.card}
                  >
                    <h3 className={styles.elementTitle}>Follow Us</h3>
                    <div className={styles.socialContainer}>
                      {socialLinks.map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.url}
                          className={styles.socialButton}
                          style={{ backgroundColor: `${social.color}20` }}
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: social.color,
                            color: "white",
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon icon={social.icon} className="text-xl" />
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Contact Form */}
                <div
                  className={`col-md-6 ${
                    activeTab === "location" ? "hidden md:block" : "block"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={styles.card}
                  >
                    {/* <h2 className={styles.heading}>Send Us a Message</h2> */}
                    {/* <div className={styles.accentLine}></div> */}

                    <h2 className="text-uppercase mb-3 left-pattern mb-5">
                      Send Us a Message
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Fill out the form below and we'll get back to you as soon
                      as possible.
                    </p>

                    {submitStatus === "success" && (
                      <div
                        className={`${styles.statusMessage} ${styles.successMessage}`}
                      >
                        <CheckCircle
                          className={`${styles.statusIcon} h-5 w-5`}
                        />
                        <p>
                          Thank you for your message! We'll get back to you
                          soon.
                        </p>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div
                        className={`${styles.statusMessage} ${styles.errorMessage}`}
                      >
                        <AlertCircle
                          className={`${styles.statusIcon} h-5 w-5`}
                        />
                        <p>Something went wrong. Please try again later.</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={styles.formGroup}>
                          <label htmlFor="name" className={styles.formLabel}>
                            Your Name*
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className={`${styles.formInput} ${
                              formErrors.name ? "border-red-500" : ""
                            }`}
                          />
                          {formErrors.name && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                              {formErrors.name}
                            </p>
                          )}
                        </div>

                        <div className={styles.formGroup}>
                          <label htmlFor="email" className={styles.formLabel}>
                            Your Email*
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            className={`${styles.formInput} ${
                              formErrors.email ? "border-red-500" : ""
                            }`}
                          />
                          {formErrors.email && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                              {formErrors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.formLabel}>
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+63 XXX XXX XXXX"
                          className={styles.formInput}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="service" className={styles.formLabel}>
                          Service Type (Optional)
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className={styles.formSelect}
                        >
                          <option value="">Just an inquiry / Not sure</option>
                          {serviceOptions.map((service) => (
                            <option key={service.slug} value={service.name}>
                              {service.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="subject" className={styles.formLabel}>
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="How can we help you?"
                          className={styles.formInput}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="message" className={styles.formLabel}>
                          Your Message*
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us more about your project or inquiry..."
                          rows={4}
                          className={`${styles.formTextarea} ${
                            formErrors.message ? "border-red-500" : ""
                          }`}
                        ></textarea>
                        {formErrors.message && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {formErrors.message}
                          </p>
                        )}
                      </div>

                      {formData.phone && isValidPhone(formData.phone) && (
                        <>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                              Preferred Days to Call
                            </label>
                            <div className={styles.checkboxGroup}>
                              {[
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday",
                              ].map((day) => (
                                <div key={day} className={styles.checkboxItem}>
                                  <input
                                    type="checkbox"
                                    id={`day-${day}`}
                                    checked={formData.preferred_days.includes(
                                      day
                                    )}
                                    onChange={() => handleDayChange(day)}
                                    className={styles.checkboxInput}
                                  />
                                  <label
                                    htmlFor={`day-${day}`}
                                    className={styles.checkboxLabel}
                                  >
                                    {day}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className={styles.formGroup}>
                            <label
                              htmlFor="preferred_time"
                              className={styles.formLabel}
                            >
                              Preferred Time of Day
                            </label>
                            <select
                              id="preferred_time"
                              name="preferred_time"
                              value={formData.preferred_time}
                              onChange={handleInputChange}
                              className={styles.formSelect}
                            >
                              <option value="">No preference</option>
                              <option value="morning">
                                Morning (8AM–11AM)
                              </option>
                              <option value="midday">Midday (11AM–2PM)</option>
                              <option value="afternoon">
                                Afternoon (2PM–5PM)
                              </option>
                              <option value="evening">Evening (5PM–7PM)</option>
                            </select>
                          </div>
                        </>
                      )}

                      <div className="pt-4">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className={styles.submitButton}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                              Sending...
                            </>
                          ) : (
                            "Send Message"
                          )}
                        </Button>
                      </div>
                    </form>
                  </motion.div>
                </div>

                {/* Location Map - shown on mobile when location tab is active */}
                <div
                  className={`col-md-12 ${
                    activeTab === "location" ? "block" : "hidden md:hidden"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={styles.card}
                  >
                    <h2 className="text-uppercase mb-3 left-pattern mb-5">
                      Our Location
                    </h2>
                    <LocationMap />
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </PageIntroBanner>
      </AppLayout>
    </div>
  );
};

export default ContactPage;
