import { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

function Modal({ onClose, children }: ModalProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-2xl p-4">
      <div onClick={onClose} className="flex justify-end cursor-pointer mb-2">
        <X size={20} />
      </div>
      <div>{children}</div>
    </div>
  );
}

export default Modal;