import { useState } from 'react';
import { Settings as SettingsIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsProps {
  title: string;
  subtitle: string;
  defaultTime: string;
  onSettingsChange: (settings: { title: string; subtitle: string; defaultTime: string }) => void;
}

export const Settings = ({ title, subtitle, defaultTime, onSettingsChange }: SettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title,
    subtitle,
    defaultTime,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSettingsChange(formData);
    localStorage.setItem('timerSettings', JSON.stringify(formData));
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
      >
        <SettingsIcon size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md glass-panel p-6 rounded-xl z-50"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Settings</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-white/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-white/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Default Time (mm:ss)</label>
                  <input
                    type="text"
                    value={formData.defaultTime}
                    onChange={(e) => setFormData({ ...formData, defaultTime: e.target.value })}
                    pattern="[0-9]+:[0-5][0-9]"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-white/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white/10 hover:bg-white/20 py-2 rounded-lg font-medium transition-colors"
                >
                  Save Settings
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};