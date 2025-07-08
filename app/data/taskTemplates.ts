export interface TaskTemplate {
  id: string
  title: string
  description: string
  category: string
  priority: "low" | "medium" | "high"
  estimatedTime?: string
  suggestedDueDate?: string
  tags?: string[]
}

export const taskTemplates: TaskTemplate[] = [
  // Work Templates
  {
    id: "work-1",
    title: "Weekly Team Meeting",
    description: "Prepare agenda, review project status, and discuss upcoming priorities",
    category: "work",
    priority: "medium",
    estimatedTime: "1 hour",
  },
  {
    id: "work-2",
    title: "Project Status Report",
    description: "Compile progress updates, identify blockers, and create executive summary",
    category: "work",
    priority: "high",
    estimatedTime: "2 hours",
  },
  {
    id: "work-3",
    title: "Client Follow-up Call",
    description: "Schedule and conduct follow-up call to discuss project feedback",
    category: "work",
    priority: "high",
    estimatedTime: "30 minutes",
  },
  {
    id: "work-4",
    title: "Code Review",
    description: "Review pull requests and provide constructive feedback to team members",
    category: "work",
    priority: "medium",
    estimatedTime: "45 minutes",
  },
  {
    id: "work-5",
    title: "Monthly Budget Review",
    description: "Analyze expenses, compare against budget, and prepare recommendations",
    category: "work",
    priority: "medium",
    estimatedTime: "1.5 hours",
  },

  // Personal Templates
  {
    id: "personal-1",
    title: "Plan Weekend Activities",
    description: "Research and plan fun activities for the upcoming weekend",
    category: "personal",
    priority: "low",
    estimatedTime: "30 minutes",
  },
  {
    id: "personal-2",
    title: "Call Family/Friends",
    description: "Catch up with family members or friends you haven't spoken to recently",
    category: "personal",
    priority: "medium",
    estimatedTime: "45 minutes",
  },
  {
    id: "personal-3",
    title: "Monthly Financial Review",
    description: "Review bank statements, track expenses, and update budget",
    category: "personal",
    priority: "high",
    estimatedTime: "1 hour",
  },
  {
    id: "personal-4",
    title: "Digital Declutter",
    description: "Organize photos, delete unnecessary files, and clean up digital spaces",
    category: "personal",
    priority: "low",
    estimatedTime: "2 hours",
  },
  {
    id: "personal-5",
    title: "Goal Setting Session",
    description: "Review progress on current goals and set new objectives",
    category: "personal",
    priority: "medium",
    estimatedTime: "1 hour",
  },

  // Health & Fitness Templates
  {
    id: "health-1",
    title: "Morning Workout",
    description: "Complete 30-minute cardio and strength training routine",
    category: "health",
    priority: "high",
    estimatedTime: "30 minutes",
  },
  {
    id: "health-2",
    title: "Meal Prep Sunday",
    description: "Plan and prepare healthy meals for the upcoming week",
    category: "health",
    priority: "medium",
    estimatedTime: "2 hours",
  },
  {
    id: "health-3",
    title: "Doctor's Appointment",
    description: "Schedule and attend routine health checkup",
    category: "health",
    priority: "high",
    estimatedTime: "1 hour",
  },
  {
    id: "health-4",
    title: "Meditation Session",
    description: "Practice mindfulness meditation for mental well-being",
    category: "health",
    priority: "medium",
    estimatedTime: "15 minutes",
  },
  {
    id: "health-5",
    title: "Water Intake Tracking",
    description: "Monitor and ensure adequate daily water consumption",
    category: "health",
    priority: "low",
    estimatedTime: "Throughout day",
  },

  // Education Templates
  {
    id: "education-1",
    title: "Online Course Module",
    description: "Complete next module of online course and take notes",
    category: "education",
    priority: "medium",
    estimatedTime: "1.5 hours",
  },
  {
    id: "education-2",
    title: "Read Industry Article",
    description: "Read and summarize relevant industry articles or research papers",
    category: "education",
    priority: "low",
    estimatedTime: "45 minutes",
  },
  {
    id: "education-3",
    title: "Practice New Skill",
    description: "Dedicate time to practicing a new skill or hobby",
    category: "education",
    priority: "medium",
    estimatedTime: "1 hour",
  },
  {
    id: "education-4",
    title: "Language Learning Session",
    description: "Practice vocabulary, grammar, or conversation in target language",
    category: "education",
    priority: "medium",
    estimatedTime: "30 minutes",
  },

  // Home & Family Templates
  {
    id: "home-1",
    title: "Weekly House Cleaning",
    description: "Deep clean living spaces, vacuum, dust, and organize",
    category: "home",
    priority: "medium",
    estimatedTime: "2 hours",
  },
  {
    id: "home-2",
    title: "Laundry Day",
    description: "Wash, dry, fold, and put away all laundry",
    category: "home",
    priority: "medium",
    estimatedTime: "3 hours",
  },
  {
    id: "home-3",
    title: "Garden Maintenance",
    description: "Water plants, trim bushes, and maintain outdoor spaces",
    category: "home",
    priority: "low",
    estimatedTime: "1 hour",
  },
  {
    id: "home-4",
    title: "Family Game Night",
    description: "Plan and organize fun family activities and games",
    category: "home",
    priority: "low",
    estimatedTime: "2 hours",
  },
  {
    id: "home-5",
    title: "Home Organization Project",
    description: "Declutter and organize a specific room or area of the house",
    category: "home",
    priority: "medium",
    estimatedTime: "2-3 hours",
  },

  // Shopping Templates
  {
    id: "shopping-1",
    title: "Weekly Grocery Shopping",
    description: "Plan meals, create shopping list, and purchase groceries",
    category: "shopping",
    priority: "high",
    estimatedTime: "1.5 hours",
  },
  {
    id: "shopping-2",
    title: "Household Supplies Restock",
    description: "Check inventory and purchase necessary household items",
    category: "shopping",
    priority: "medium",
    estimatedTime: "45 minutes",
  },
  {
    id: "shopping-3",
    title: "Gift Shopping",
    description: "Research and purchase gifts for upcoming occasions",
    category: "shopping",
    priority: "medium",
    estimatedTime: "2 hours",
  },
  {
    id: "shopping-4",
    title: "Seasonal Wardrobe Update",
    description: "Review and update wardrobe for the current season",
    category: "shopping",
    priority: "low",
    estimatedTime: "2 hours",
  },

  // Travel Templates
  {
    id: "travel-1",
    title: "Trip Planning Research",
    description: "Research destinations, accommodations, and activities for upcoming trip",
    category: "travel",
    priority: "medium",
    estimatedTime: "2 hours",
  },
  {
    id: "travel-2",
    title: "Travel Booking",
    description: "Book flights, hotels, and transportation for planned trip",
    category: "travel",
    priority: "high",
    estimatedTime: "1 hour",
  },
  {
    id: "travel-3",
    title: "Packing Preparation",
    description: "Create packing list and gather items for upcoming travel",
    category: "travel",
    priority: "medium",
    estimatedTime: "1.5 hours",
  },
  {
    id: "travel-4",
    title: "Travel Document Check",
    description: "Verify passport, visa, and other required travel documents",
    category: "travel",
    priority: "high",
    estimatedTime: "30 minutes",
  },

  // Maintenance Templates
  {
    id: "maintenance-1",
    title: "Car Maintenance Check",
    description: "Schedule oil change, tire rotation, and general vehicle inspection",
    category: "maintenance",
    priority: "medium",
    estimatedTime: "2 hours",
  },
  {
    id: "maintenance-2",
    title: "Home Appliance Maintenance",
    description: "Clean and maintain household appliances for optimal performance",
    category: "maintenance",
    priority: "low",
    estimatedTime: "1 hour",
  },
  {
    id: "maintenance-3",
    title: "Computer Backup",
    description: "Backup important files and update system software",
    category: "maintenance",
    priority: "medium",
    estimatedTime: "45 minutes",
  },
  {
    id: "maintenance-4",
    title: "Insurance Review",
    description: "Review and update insurance policies and coverage",
    category: "maintenance",
    priority: "medium",
    estimatedTime: "1 hour",
  },
  {
    id: "maintenance-5",
    title: "Password Security Update",
    description: "Update passwords and review security settings for online accounts",
    category: "maintenance",
    priority: "high",
    estimatedTime: "1 hour",
  },
]
