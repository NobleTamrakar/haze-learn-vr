import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Play, BookOpen, HelpCircle, BarChart3, Headset } from "lucide-react";
import { useNavigate } from "react-router-dom";
import topics from "@/data/topics.json";
// import FlashcardDeck from "@/components/FlashcardDeck";
// import VideoLesson from "@/components/VideoLesson";
// import QuizEngine from "@/components/QuizEngine";
// import PerformanceAnalytics from "@/components/PerformanceAnalytics";

const LEARNING_STEPS = ['topic', 'flashcards', 'video', 'quiz', 'analysis'];

const Learn = () => {
  const navigate = useNavigate();
  const { user, currentTopic, progress, updateProgress, isVRMode, toggleVRMode } = useStore();
  const [currentStep, setCurrentStep] = useState('topic');
  const [stepProgress, setStepProgress] = useState(0);
  
  if (!user || !user.onboardingCompleted) {
    navigate("/onboarding");
    return null;
  }

  const topic = topics.find(t => t.id === currentTopic);
  const topicProgress = progress.find(p => p.topicId === currentTopic);
  
  useEffect(() => {
    if (topicProgress) {
      setCurrentStep(topicProgress.currentStep);
    }
  }, [topicProgress]);

  const handleStepComplete = (step: string, data?: any) => {
    if (currentTopic) {
      updateProgress(currentTopic, step, data);
      const currentIndex = LEARNING_STEPS.indexOf(step);
      if (currentIndex < LEARNING_STEPS.length - 1) {
        setCurrentStep(LEARNING_STEPS[currentIndex + 1]);
      }
    }
  };

  const getStepIcon = (step: string) => {
    switch (step) {
      case 'topic': return BookOpen;
      case 'flashcards': return Brain;
      case 'video': return Play;
      case 'quiz': return HelpCircle;
      case 'analysis': return BarChart3;
      default: return BookOpen;
    }
  };

  const getCurrentStepIndex = () => LEARNING_STEPS.indexOf(currentStep);
  const getProgressPercentage = () => ((getCurrentStepIndex() + 1) / LEARNING_STEPS.length) * 100;

  const renderCurrentStep = () => {
    if (!topic || !currentTopic) return null;

    switch (currentStep) {
      case 'topic':
        return (
          <Card className="card-bg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{topic.name}</CardTitle>
                <Badge variant="outline" className="text-primary border-primary">
                  {topic.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{topic.description}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>⏱️ Estimated time: {topic.estimatedTime} minutes</span>
              </div>
              <Button 
                onClick={() => handleStepComplete('topic')}
                className="w-full hero-gradient"
              >
                Start Learning
              </Button>
            </CardContent>
          </Card>
        );
      
      case 'flashcards':
        return (
          <Card className="card-bg">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-4">Flashcards component will be implemented here</p>
              <Button onClick={() => handleStepComplete('flashcards')} className="hero-gradient">
                Complete Flashcards
              </Button>
            </CardContent>
          </Card>
        );
      
      case 'video':
        return (
          <Card className="card-bg">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-4">Video lesson component will be implemented here</p>
              <Button onClick={() => handleStepComplete('video')} className="hero-gradient">
                Complete Video
              </Button>
            </CardContent>
          </Card>
        );
      
      case 'quiz':
        return (
          <Card className="card-bg">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-4">Quiz component will be implemented here</p>
              <Button onClick={(data) => handleStepComplete('quiz', { accuracy: 85, timeSpent: 10 })} className="hero-gradient">
                Complete Quiz
              </Button>
            </CardContent>
          </Card>
        );
      
      case 'analysis':
        return (
          <Card className="card-bg">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-4">Performance analytics will be shown here</p>
              <Button onClick={() => handleStepComplete('analysis')} className="hero-gradient">
                View Analysis
              </Button>
            </CardContent>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card-bg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">NEET AI VR Tutor</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleVRMode}
                className={isVRMode ? "bg-primary text-primary-foreground" : ""}
              >
              <Headset className="h-4 w-4 mr-2" />
              {isVRMode ? "Exit VR" : "VR Mode"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Progress Section */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Learning Progress</h2>
            {isVRMode && (
              <Button 
                variant="outline" 
                onClick={() => navigate("/vr/preview")}
                className="flex items-center gap-2"
              >
                <Headset className="h-4 w-4" />
                Open VR Viewer
              </Button>
            )}
          </div>
          
          <Progress value={getProgressPercentage()} className="h-3" />
          
          <div className="flex justify-between">
            {LEARNING_STEPS.map((step, index) => {
              const Icon = getStepIcon(step);
              const isCompleted = topicProgress?.completedSteps.includes(step);
              const isCurrent = step === currentStep;
              
              return (
                <div key={step} className="flex flex-col items-center space-y-2">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors
                    ${isCompleted ? 'bg-success text-white border-success' : 
                      isCurrent ? 'bg-primary text-primary-foreground border-primary' : 
                      'bg-muted text-muted-foreground border-muted'}
                  `}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`text-xs capitalize ${isCurrent ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                    {step === 'flashcards' ? 'Cards' : step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="space-y-6">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default Learn;