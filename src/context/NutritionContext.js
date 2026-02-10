import React, { createContext, useContext, useState } from 'react';

const NutritionContext = createContext();

export const NutritionProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [nutrients, setNutrients] = useState({});
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  return (
   <NutritionContext.Provider
  value={{
    name,
    setName,
    nutrients,
    setNutrients,
    image,
    setImage,
    description,
    setDescription,
  }}
>

      {children}
    </NutritionContext.Provider>
  );
};

// Custom hook for easy access
export const useNutrition = () => {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
};
