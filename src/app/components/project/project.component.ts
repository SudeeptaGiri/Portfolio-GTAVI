import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Project {
  id: number;
  name: string;
  category: string;
  description: string;
  techStack: string[];
  codeLink?: string;
  liveLink?: string;
  thumbnail: string;
  type: 'Solo' | 'Group';
  status: 'Completed' | 'In Progress' | 'Planned';
  features: string[];
  challenges?: string[];
  isLive?: boolean;
}

@Component({
  selector: 'app-projects',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  standalone: false
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  hoveredProject: Project | null = null;
  selectedProject: Project | null = null;
  showModal = false;

  constructor(private http:HttpClient) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.http.get<Project[]>('projects.json').subscribe((data: any) => {
      this.projects = data.projects;
      console.log('Projects loaded successfully:', data.projects);
    }, error => {
      console.error('Error loading projects:', error);
      this.projects = [
        {
          id: 1,
          name: "rent-car",
          category: "Full Stack Development",
          description: "A comprehensive car rental platform built during internship with team of 8 developers. Users can login, book cars, filter options, make payments with automatic calculations, manage bookings, and provide ratings. Includes service agent and admin dashboards with complete booking management system.",
          techStack: ["MongoDB", "Express.js", "Angular", "Node.js", "TypeScript"],
          codeLink: "https://github.com/username/rent-car",
          liveLink: "https://rent-car-demo.com",
          thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
          type: "Group",
          status: "Completed",
          features: [
            "User authentication and profile management",
            "Car filtering and search functionality",
            "Automatic payment calculation based on time",
            "Booking management and tracking system",
            "Rating and feedback system",
            "Service agent dashboard for booking management",
            "Admin panel with comprehensive reports",
            "Responsive design for all devices"
          ],
          challenges: [
            "Implementing complex booking logic with time-based pricing",
            "Managing multiple user roles and permissions",
            "Integrating payment gateway securely",
            "Coordinating with team of 8 using Agile methodologies",
            "Ensuring data consistency across different user actions"
          ]
        },
        {
          id: 2,
          name: "kanban board",
          category: "AI-Powered Productivity",
          description: "An intelligent task management application that uses AI to automatically break down complex tasks into smaller, manageable subtasks. Features a Jira-like Kanban board interface for tracking task progress from todo to completion with temperature-based AI analysis.",
          techStack: ["Angular", "TypeScript", "AI/ML Integration", "RxJS"],
          codeLink: "https://github.com/username/ai-kanban-board",
          liveLink: "https://ai-kanban-demo.com",
          thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
          type: "Solo",
          status: "Completed",
          features: [
            "AI-powered task breakdown using temperature analysis",
            "Jira-inspired Kanban board interface",
            "Drag-and-drop task management",
            "Progress tracking (Todo → In Progress → Completed)",
            "Task complexity analysis and recommendations",
            "Real-time updates and synchronization",
            "Responsive design with modern UI"
          ],
          challenges: [
            "Integrating AI for meaningful task breakdown",
            "Creating intuitive drag-and-drop functionality",
            "Implementing efficient state management",
            "Balancing AI suggestions with user control"
          ]
        },
        {
          id: 3,
          name: "boxcar",
          category: "Frontend Development",
          description: "A responsive frontend application for a second-hand car marketplace. Built with modern web technologies focusing on user experience, mobile responsiveness, and clean design aesthetics for car browsing and purchasing interface.",
          techStack: ["HTML5", "Tailwind CSS", "TypeScript", "Responsive Design"],
          codeLink: "https://github.com/username/boxcar-frontend",
          liveLink: "https://boxcar-marketplace.com",
          thumbnail: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
          type: "Solo",
          status: "Completed",
          features: [
            "Fully responsive design for all devices",
            "Modern UI with Tailwind CSS styling",
            "Car listing and detail pages",
            "Advanced filtering and search functionality",
            "Image gallery with zoom functionality",
            "Mobile-first approach",
            "Fast loading and optimized performance"
          ],
          challenges: [
            "Creating pixel-perfect responsive designs",
            "Optimizing performance for image-heavy content",
            "Implementing complex filtering logic",
            "Ensuring cross-browser compatibility"
          ]
        },
        {
          id: 4,
          name: "mindease",
          category: "Mental Health Platform",
          description: "A comprehensive mental health screening platform built with team of 3 developers. Features standardized assessments (PHQ-9, GAD-7), AI-powered personalized improvement plans, integrated helpline with Google Maps API for nearby medical facilities, and volunteer connection system.",
          techStack: ["React", "Spring Boot", "MySQL", "Google Maps API", "AI/ML"],
          codeLink: "https://github.com/username/mindease",
          liveLink: "https://mindease-platform.com",
          thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
          type: "Group",
          status: "Completed",
          features: [
            "Standardized mental health assessments (PHQ-9, GAD-7)",
            "AI-powered personalized improvement plans",
            "Score tracking and progress monitoring",
            "Integrated helpline with Google Maps API",
            "Nearby medical facilities and doctor information",
            "Volunteer connection and verification system",
            "Admin dashboard for volunteer verification",
            "Secure user data handling and privacy protection"
          ],
          challenges: [
            "Implementing accurate mental health assessment algorithms",
            "Creating personalized AI recommendations",
            "Integrating Google Maps API for location services",
            "Ensuring user privacy and data security",
            "Building volunteer verification system"
          ]
        },
        {
          id: 5,
          name: "nagarik aur samvidhan",
          category: "Educational Gaming",
          description: "A gamified learning platform for Indian Constitution education built with team of 6 developers. Features diverse game formats including Spin the Wheel, Card Games, and Board Games to engage users in learning constitutional concepts through interactive gameplay.",
          techStack: ["HTML5", "CSS3", "JavaScript", "Node.js", "MongoDB"],
          codeLink: "https://github.com/username/nagarik-samvidhan",
          liveLink: "https://nagarik-samvidhan.gov.in",
          thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
          type: "Group",
          status: "Completed",
          features: [
            "Multiple game formats (Spin the Wheel, Card Games, Board Games)",
            "Constitutional concept mapping into gamified content",
            "Interactive learning modules",
            "Progress tracking and achievements",
            "Responsive design for educational institutions",
            "Backend database for content management",
            "Landing page with engaging visuals"
          ],
          challenges: [
            "Converting complex constitutional concepts into engaging games",
            "Creating diverse game mechanics for different learning styles",
            "Implementing backend routing for game data",
            "Ensuring educational accuracy while maintaining engagement"
          ]
        },
        {
          id: 6,
          name: "ai career navigator",
          category: "AI-Powered Career Guidance",
          description: "An intelligent career guidance platform built with team of 6 developers using AI-driven analysis to provide personalized job recommendations, educational pathways, and salary insights for students and career counselors.",
          techStack: ["JavaScript", "Python", "Flask", "Machine Learning", "API Integration"],
          codeLink: "https://github.com/username/ai-career-navigator",
          liveLink: "https://ai-career-navigator.com",
          thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
          type: "Group",
          status: "Completed",
          features: [
            "AI-driven job description analysis and recommendations",
            "Educational pathway suggestions based on career goals",
            "Salary insights and market trends",
            "Customized career guidance for students",
            "Counselor dashboard with student insights",
            "API integration for real-time job market data",
            "Interactive career assessment tools"
          ],
          challenges: [
            "Implementing complex machine learning algorithms",
            "Managing API integration and data synchronization",
            "Creating accurate career prediction models",
            "Optimizing DOM manipulation for smooth user experience"
          ]
        },
        {
          id: 7,
          name: "integrated academic calendar",
          category: "Education Management",
          description: "A centralized academic calendar system for all Indian Universities built with team of 5 developers. Designed to align academic schedules for fairness and simplicity in admissions with integrated event management system.",
          techStack: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
          codeLink: "https://github.com/username/academic-calendar",
          liveLink: "https://academic-calendar.edu.in",
          thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
          type: "Group",
          status: "Completed",
          features: [
            "Centralized calendar for all Indian Universities",
            "Academic schedule alignment system",
            "Event management and scheduling",
            "Admission timeline coordination",
            "Responsive frontend design",
            "University-specific customization options",
            "Real-time updates and notifications"
          ],
          challenges: [
            "Coordinating schedules across multiple universities",
            "Creating flexible event management system",
            "Ensuring responsive design across devices",
            "Managing complex database relationships"
          ]
        },
        {
          id: 8,
          name: "ai coach & sports community",
          category: "Sports Technology",
          description: "An AI-powered sports coaching platform built with team of 4 developers. Provides real-time feedback for sports improvement and creates a community platform for sports enthusiasts to connect, share progress, and receive personalized coaching.",
          techStack: ["React.js", "Node.js", "MongoDB", "Vertex AI", "Real-time APIs"],
          codeLink: "https://github.com/username/ai-sports-coach",
          liveLink: "https://ai-sports-coach.com",
          thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
          type: "Group",
          status: "Completed",
          features: [
            "AI-powered real-time feedback system",
            "Sports community platform and networking",
            "Personalized coaching recommendations",
            "Progress tracking and analytics",
            "Video analysis and technique improvement",
            "Responsive design for mobile and desktop",
            "Integration with Vertex AI for advanced analytics"
          ],
          challenges: [
            "Implementing real-time AI feedback algorithms",
            "Creating responsive UI for sports video analysis",
            "Integrating Vertex AI for complex data processing",
            "Building community features with real-time updates"
          ]
        }
      ];
    });
    
  }

  onProjectHover(project: Project): void {
    this.hoveredProject = project;
  }

  onProjectLeave(): void {
    this.hoveredProject = null;
  }

  selectProject(project: Project): void {
    this.selectedProject = project;
  }

  openProjectModal(project: Project): void {
    this.selectedProject = project;
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedProject = null;
    document.body.style.overflow = 'auto';
  }

  getStatusColor(status: string): string {
    switch(status.toLowerCase()) {
      case 'completed': return 'text-green-400';
      case 'in progress': return 'text-yellow-300';
      case 'on hold': return 'text-red-400';
      default: return 'text-gray-400';
    }
  }
  
}