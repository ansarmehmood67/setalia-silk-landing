import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { EnquiryButton } from "@/components/ui/enquiry-button";
import { useToast } from "@/hooks/use-toast";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Thank you",
      description: "Our team will contact you shortly.",
      className: "bg-black-silk border-champagne-gold text-pure-white",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black-silk border-champagne-gold max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-champagne-gold text-center">
            ENQUIRY
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-secondary text-pure-white text-sm uppercase tracking-wider">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="bg-transparent border-champagne-gold text-pure-white focus:border-champagne-gold-bright"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="font-secondary text-pure-white text-sm uppercase tracking-wider">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="bg-transparent border-champagne-gold text-pure-white focus:border-champagne-gold-bright"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message" className="font-secondary text-pure-white text-sm uppercase tracking-wider">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              className="bg-transparent border-champagne-gold text-pure-white focus:border-champagne-gold-bright resize-none"
            />
          </div>
          
          <div className="flex justify-center pt-4">
            <EnquiryButton 
              type="submit" 
              disabled={isSubmitting}
              className={isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EnquiryModal;