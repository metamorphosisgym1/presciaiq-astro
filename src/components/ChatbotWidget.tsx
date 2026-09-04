import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/61400457006?text=Hi%20PresciaIQ%2C%20I%27d%20like%20to%20discuss%20an%20AI%20project.";

/**
 * Retains the existing site mount while replacing the on-site AI chatbot with
 * a direct, human-led WhatsApp conversion path.
 */
const ChatbotWidget = () => (
  <motion.a
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-sans font-semibold text-sm shadow-lg hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] transition-shadow duration-300"
    aria-label="Chat with PresciaIQ on WhatsApp"
  >
    <MessageCircle className="w-5 h-5" aria-hidden="true" />
    Chat on WhatsApp
  </motion.a>
);

export default ChatbotWidget;
