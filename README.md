# 🍽️ BiteCount

> Your smart nutrition tracking companion - Making healthy eating effortless with AI-powered food recognition and calorie counting.

[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen?style=for-the-badge)](https://bitecount.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/mdnazishpatel/BiteCount-frontend)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

## 🚀 Features Overview

### 🤖 AI-Powered Features
- **Smart Food Detection**: Upload food images for instant recognition
- **Nutritional Analysis**: Get detailed macro and micronutrient breakdowns
- **Portion Estimation**: AI-powered portion size recognition
- **Recipe Suggestions**: Get healthy alternatives based on your goals

### 📊 Tracking & Analytics
- **Daily Intake Monitoring**: Track calories, proteins, carbs, and fats
- **Progress Visualization**: Beautiful charts and graphs
- **Goal Management**: Set and track personalized nutrition goals
- **Historical Data**: View your nutrition journey over time

### 🎯 User Experience
- **Intuitive Interface**: Clean, modern design with Tailwind CSS
- **Mobile Responsive**: Works perfectly on all device sizes
- **Fast Performance**: Optimized React components for smooth experience
- **Secure Authentication**: JWT-based user authentication

## 🚀 Live Demo

Check out the live application: [bitecount.vercel.app](https://bitecount.vercel.app)

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- JavaScript/ES6+
- Responsive Design

**Backend:**
- Node.js
- Express.js
- RESTful API
- JWT Authentication

**Database:**
- MongoDB
- Mongoose ODM

**AI/ML Integration:**
- Food Recognition API
- Nutrition Analysis
- Machine Learning Models
- Image Processing

**Deployment:**
- Vercel (Frontend)
- MongoDB Atlas (Database)
- Node.js hosting platform (Backend)

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mdnazishpatel/BiteCount-frontend.git
   cd BiteCount-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Frontend Environment Variables
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_AI_API_KEY=your_ai_api_key
   
   # Backend Environment Variables (if running full stack locally)
   MONGODB_URI=mongodb://localhost:27017/bitecount
   JWT_SECRET=your_jwt_secret_key
   AI_API_KEY=your_food_recognition_api_key
   PORT=5000
   ```

4. **Run the application**
   
   For development:
   ```bash
   # Start the development server
   npm start
   # or
   yarn start
   ```
   
   For production build:
   ```bash
   # Build the application
   npm run build
   # or
   yarn build
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
BiteCount-frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   ├── Dashboard/
│   │   ├── FoodRecognition/
│   │   └── UI/
│   ├── pages/
│   ├── services/
│   │   ├── api.js
│   │   └── auth.js
│   ├── utils/
│   ├── styles/
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## 🔧 API Integration

BiteCount integrates with powerful AI services for food recognition and nutrition analysis:

- **Food Recognition**: Identifies food items from uploaded images
- **Nutrition API**: Fetches detailed nutritional information
- **Calorie Calculation**: Automatic portion-based calorie counting
- **Macro Analysis**: Breaks down proteins, carbs, and fats

1. **Sign Up/Login** - Create your account or login to get started
2. **Take a Photo** - Snap a picture of your meal using your camera
3. **AI Analysis** - Let our AI identify the food and calculate nutrition
4. **Track Progress** - View your daily intake and progress toward goals
5. **Set Goals** - Customize your daily calorie and macro targets
6. **Analyze Trends** - Use the analytics dashboard to track your journey


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Nazish Patel**
- GitHub: [@mdnazishpatel](https://github.com/mdnazishpatel)
- LinkedIn: [https://www.linkedin.com]
- Portfolio: [https://sikandarpatel.vercel.app]

## 🙏 Acknowledgments

- Thanks to all the open-source projects that made this possible
- Special thanks to the nutrition and food recognition APIs
- Inspiration from the health and wellness community

## 📞 Support

If you have any questions or need support, please:
- Open an issue on GitHub
- Email: [patelnazish7@gmail.com]

---

⭐ If you found this project helpful, please give it a star!

**Made with ❤️ by [Nazish Patel](https://github.com/mdnazishpatel)**
