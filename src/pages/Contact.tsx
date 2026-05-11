import { useState } from "react";
import emailjs from "@emailjs/browser";

type FormData = {
  name: string;
  email: string;
  message: string;
};

 function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 
  const validate = () => {
    if (!formData.name || !formData.email || !formData.message) {
      return "Please fill in all fields.";
    }
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(formData.email)) {
      return "Invalid email format.";
    }
    return "";
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setStatus(error);
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const response = await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        {
          from_name: formData.name,   
          from_email: formData.email, 
          message: formData.message,  
        },
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      );
      const existingMessages = JSON.parse(localStorage.getItem("messages") || "[]");
      const newMessage = { 
        name: formData.name, 
        email: formData.email, 
        message: formData.message 
      };
      localStorage.setItem("messages", JSON.stringify([...existingMessages, newMessage]));

      console.log("SUCCESS:", response);
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("ERROR:", error);
      setStatus("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ padding: "50px 20px" }}>
      <div style={{ maxWidth: "500px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Contact Me</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "15px", padding: "12px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "15px", padding: "12px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "15px", padding: "12px", borderRadius: "4px", border: "1px solid #ccc", minHeight: "150px" }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ 
              width: "100%", 
              padding: "12px", 
              backgroundColor: loading ? "#666" : "#222", 
              color: "#fff", 
              border: "none", 
              borderRadius: "4px", 
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "bold"
            }}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status && (
          <p style={{ 
            marginTop: "20px", 
            textAlign: "center", 
            color: status.includes("successfully") ? "green" : "red",
            fontWeight: "500"
          }}>
            {status}
          </p>
        )}
      </div>
    </section>
  );
}
export default Contact;