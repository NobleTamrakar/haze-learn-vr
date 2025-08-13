import { useNavigate } from "react-router-dom";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Headset, BarChart3, Users, Zap, Shield } from "lucide-react";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useStore();

  // Auto redirect if user is logged in
  useEffect(() => {
    if (user) {
      if (user.onboardingCompleted) {
        navigate("/dashboard");
      } else {
        navigate("/onboarding");
      }
    }
  }, [user, navigate]);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Personalized study plans adapted to your learning style and weak areas"
    },
    {
      icon: Headset,
      title: "VR Experience",
      description: "Immersive 180° VR environments for enhanced visual learning"
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description: "Detailed insights into your performance and study patterns"
    },
    {
      icon: Users,
      title: "Expert Content",
      description: "Curated by NEET toppers and experienced educators"
    },
    {
      icon: Zap,
      title: "Adaptive Testing",
      description: "Smart quizzes that adjust to your skill level"
    },
    {
      icon: Shield,
      title: "Proven Results",
      description: "Trusted by thousands of successful NEET aspirants"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm">
                🚀 Launch your NEET preparation journey
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                AI VR Tutor for
                <span className="block text-gradient bg-white/90 bg-clip-text text-transparent">
                  NEET Success
                </span>
              </h1>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Transform your NEET preparation with AI-powered personalization and immersive VR learning. 
                Experience the future of medical entrance exam preparation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold"
                  onClick={() => navigate("/auth/sign-up")}
                >
                  Start Free Trial
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
                  onClick={() => navigate("/auth/sign-in")}
                >
                  Sign In
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-8 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  No setup required
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Free to start
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  VR compatible
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our AI VR Tutor?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge technology meets proven pedagogy to deliver the most effective NEET preparation experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="card-bg border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">Ready to Transform Your NEET Preparation?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of students who have already experienced the power of AI-driven learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="hero-gradient px-8 py-4 text-lg font-semibold"
                onClick={() => navigate("/auth/sign-up")}
              >
                Get Started Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 text-lg"
                onClick={() => navigate("/auth/sign-in")}
              >
                I Have an Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card-bg border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-semibold">NEET AI VR Tutor</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 NEET AI VR Tutor. Transforming medical entrance preparation.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
