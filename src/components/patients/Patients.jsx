import React from 'react';
import { motion } from 'framer-motion';

const Patients = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <p className="text-gray-600">Patient management system coming soon...</p>
      </div>
    </motion.div>
  );
};

export default Patients;