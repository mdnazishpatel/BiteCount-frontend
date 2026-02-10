import React, { useState, useEffect } from 'react';
import { Loader2, Trash2, ImageOff, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Profile = () => {
  const [nutritionData, setNutritionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const [pagination, setPagination] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNutritionData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('authToken');
        if (!token) {
          setError('You must be logged in to view your profile');
          setTimeout(() => navigate('/login'), 2000);
          return;
        }

        const response = await fetch('https://bitecount-backend.onrender.com/upload', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 401) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          setError('Session expired. Please log in again.');
          setTimeout(() => navigate('/login'), 2000);
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const responseData = await response.json();
        
        // Handle both old format (array) and new format (object with data property)
        if (Array.isArray(responseData)) {
          // Old format - direct array
          setNutritionData(responseData);
        } else if (responseData.data && Array.isArray(responseData.data)) {
          // New format - object with data property
          setNutritionData(responseData.data);
          setPagination(responseData.pagination);
        } else {
          // Fallback - ensure we always have an array
          console.warn('Unexpected response format:', responseData);
          setNutritionData([]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching nutrition data:', err);
        setError(err.message || 'Failed to load your nutrition data');
        setNutritionData([]); // Ensure it's always an array
        setLoading(false);
      }
    };

    fetchNutritionData();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('You must be logged in to delete items');
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      const response = await fetch(`https://bitecount-backend.onrender.com/upload/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setError('Session expired. Please log in again.');
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      if (response.ok) {
        setNutritionData(nutritionData.filter(item => item._id !== id));
      } else {
        setError(data.message || 'Failed to delete item');
      }
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  const extractKeyNutrients = (message) => {
    if (!message || typeof message !== 'string') {
      return { calories: 'N/A', protein: 'N/A', carbs: 'N/A' };
    }

    const lines = message.split('\n').map(line => line.trim().toLowerCase());
    const nutrients = { calories: 'N/A', protein: 'N/A', carbs: 'N/A' };

    lines.forEach(line => {
      const numberMatch = line.match(/(\d*\.?\d+)/);
      if (line.includes('calorie') || line.includes('kcal') || line.includes('cal')) {
        nutrients.calories = numberMatch ? `${numberMatch[0]} kcal` : 'N/A';
      } else if (line.includes('protein')) {
        nutrients.protein = numberMatch ? `${numberMatch[0]}g` : 'N/A';
      } else if (line.includes('carb') || line.includes('carbohydrate')) {
        nutrients.carbs = numberMatch ? `${numberMatch[0]}g` : 'N/A';
      }
    });

    return nutrients;
  };

  const parseDescription = (description) => {
    if (!description || typeof description !== 'string') return [];

    const lines = description.split('\n').filter(line => line.trim() !== '');
    return lines.map(line => {
      let cleanLine = line.trim();
      cleanLine = cleanLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      if (cleanLine.startsWith('#')) {
        const headerLevel = cleanLine.match(/^#+/)[0].length;
        const headerText = cleanLine.replace(/^#+\s*/, '');
        return { type: 'header', level: headerLevel, content: headerText };
      }

      const lowerLine = cleanLine.toLowerCase();
      let category = 'normal';
      if (lowerLine.includes('calorie') || lowerLine.includes('kcal') || lowerLine.includes('cal')) category = 'calories';
      else if (lowerLine.includes('protein')) category = 'protein';
      else if (lowerLine.includes('carb') || lowerLine.includes('carbohydrate')) category = 'carbs';
      else if (lowerLine.includes('fat') || lowerLine.includes('lipid')) category = 'fat';
      else if (lowerLine.includes('fiber') || lowerLine.includes('fibre')) category = 'fiber';
      else if (lowerLine.includes('sugar')) category = 'sugar';
      else if (lowerLine.includes('sodium') || lowerLine.includes('salt')) category = 'sodium';
      else if (lowerLine.includes('vitamin') || lowerLine.includes('mineral')) category = 'vitamin';

      return { type: 'text', category, content: cleanLine };
    });
  };

  const renderDescriptionItem = (item, index) => {
    if (item.type === 'header') {
      const HeaderTag = `h${Math.min(item.level + 3, 6)}`;
      return (
        <HeaderTag key={index} className="text-sm font-bold text-white mt-2 mb-1">
          {item.content}
        </HeaderTag>
      );
    }

    const categoryStyles = {
      calories: 'bg-red-900/20 border-red-500/20 text-red-200',
      protein: 'bg-blue-900/20 border-blue-500/20 text-blue-200',
      carbs: 'bg-yellow-900/20 border-yellow-500/20 text-yellow-200',
      fat: 'bg-purple-900/20 border-purple-500/20 text-purple-200',
      fiber: 'bg-green-900/20 border-green-500/20 text-green-200',
      sugar: 'bg-orange-900/20 border-orange-500/20 text-orange-200',
      sodium: 'bg-pink-900/20 border-pink-500/20 text-pink-200',
      vitamin: 'bg-teal-900/20 border-teal-500/20 text-teal-200',
      normal: 'bg-slate-700/20 border-slate-500/20 text-gray-300',
    };

    const style = categoryStyles[item.category] || categoryStyles.normal;

    return (
      <div key={index} className={`border rounded-md p-1.5 text-xs ${style}`}>
        <p className="font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: item.content }} />
      </div>
    );
  };

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Safe calculation with array check
  const summaryStats = Array.isArray(nutritionData) ? nutritionData.reduce(
    (acc, item) => {
      const nutrients = extractKeyNutrients(item.message);
      const calories = nutrients.calories !== 'N/A' ? parseFloat(nutrients.calories.split(' ')[0]) || 0 : 0;
      if (isNaN(calories)) {
        console.warn(`Invalid calories value for item ${item._id}: ${nutrients.calories}`);
      }
      return {
        totalMeals: acc.totalMeals + 1,
        totalCalories: acc.totalCalories + calories,
      };
    },
    { totalMeals: 0, totalCalories: 0 }
  ) : { totalMeals: 0, totalCalories: 0 };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Info className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-3">
              <span className="text-white">Your</span>
              <span className="text-red-400"> Nutrition Profile</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-xl mx-auto">
              Explore your meal history and key nutritional insights
            </p>
            {pagination && pagination.totalPages > 1 && (
              <p className="text-sm text-gray-400 mt-2">
                Showing page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalItems} total items)
              </p>
            )}
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500/50 rounded-xl p-4 flex items-center space-x-3 mb-8">
              <Info className="h-5 w-5 text-red-400 flex-shrink-0" />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {loading && (
            <div className="bg-slate-800 border border-slate-600 rounded-xl p-6 text-center">
              <div className="flex flex-col items-center space-y-3">
                <Loader2 className="h-10 w-10 text-red-400 animate-spin" />
                <h3 className="text-lg font-semibold text-white">Loading Your Data</h3>
                <p className="text-gray-400 text-sm">Fetching your nutrition history...</p>
              </div>
            </div>
          )}

          {!loading && !error && Array.isArray(nutritionData) && nutritionData.length > 0 && (
            <>
              <div className="mb-8 bg-slate-800 border border-slate-600 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold text-white mb-4">Your Stats</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-red-400">{summaryStats.totalMeals}</p>
                    <p className="text-sm text-gray-400">Meals Analyzed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-red-400">
                      {Math.round(summaryStats.totalCalories)} kcal
                    </p>
                    <p className="text-sm text-gray-400">Total Calories</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nutritionData.map(item => {
                  const nutrients = extractKeyNutrients(item.message);
                  const isExpanded = expandedItems[item._id];
                  const timestamp = item.createdAt ? new Date(item.createdAt).toLocaleString() : 'N/A';

                  return (
                    <div
                      key={item._id}
                      className="bg-slate-800 border border-slate-600 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:border-red-500/50 group"
                    >
                      <div className="relative h-40">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt="Food item"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                            <ImageOff className="h-10 w-10 text-gray-400" />
                          </div>
                        )}
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="absolute top-2 right-2 w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                          title="Delete Item"
                        >
                          <Trash2 className="h-4 w-4 text-white" />
                        </button>
                      </div>

                      <div className="p-4">
                        <p className="text-xs text-gray-400 mb-2">Analyzed: {timestamp}</p>
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          <div className="text-center">
                            <p className="text-sm font-semibold text-red-200">{nutrients.calories}</p>
                            <p className="text-xs text-gray-400">Calories</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-semibold text-blue-200">{nutrients.protein}</p>
                            <p className="text-xs text-gray-400">Protein</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-semibold text-yellow-200">{nutrients.carbs}</p>
                            <p className="text-xs text-gray-400">Carbs</p>
                          </div>
                        </div>

                        {item.message && (
                          <div>
                            <button
                              onClick={() => toggleExpand(item._id)}
                              className="w-full flex items-center justify-center text-sm text-gray-300 hover:text-red-400 transition-colors duration-200"
                            >
                              {isExpanded ? (
                                <>
                                  <span>Hide Details</span>
                                  <ChevronUp className="h-4 w-4 ml-1" />
                                </>
                              ) : (
                                <>
                                  <span>Show Details</span>
                                  <ChevronDown className="h-4 w-4 ml-1" />
                                </>
                              )}
                            </button>
                            {isExpanded && (
                              <div className="mt-2 max-h-32 overflow-y-auto custom-scrollbar">
                                {parseDescription(item.message).map((line, index) =>
                                  renderDescriptionItem(line, index)
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {!loading && !error && (!Array.isArray(nutritionData) || nutritionData.length === 0) && (
            <div className="bg-slate-800 border border-slate-600 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <Info className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No Data Yet</h3>
              <p className="text-gray-400 text-sm mb-4">
                Start analyzing your meals to build your nutrition profile!
              </p>
              <button
                onClick={() => navigate('/count')}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Analyze a Meal
              </button>
            </div>
          )}

          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgb(51, 65, 85);
              border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, rgb(220, 38, 38), rgb(185, 28, 28));
              border-radius: 4px;
              border: 1px solid rgb(71, 85, 105);
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(to bottom, rgb(239, 68, 68), rgb(220, 38, 38));
            }
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: rgb(220, 38, 38) rgb(51, 65, 85);
            }
          `}</style>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;