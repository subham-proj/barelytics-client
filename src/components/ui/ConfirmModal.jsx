import React from 'react';
import { Button } from './button';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, description, confirmText = 'Confirm', loading }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="mb-6 text-sm text-gray-700">{description}</p>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {loading ? 'Processing...' : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal; 