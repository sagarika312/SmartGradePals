
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Download, Presentation, Loader2, Palette } from 'lucide-react';

type Slide = {
  id: number;
  title: string;
  content: string[];
  notes?: string;
};

const PptGeneratorComponent: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCount, setSlideCount] = useState('5');
  const [presentationType, setPresentationType] = useState('educational');
  const [themeColor, setThemeColor] = useState('blue');
  
  const themeStyles = {
    blue: {
      bg: "bg-gradient-to-br from-blue-50 to-blue-100",
      title: "text-blue-800",
      border: "border-blue-200",
      bullet: "text-blue-500",
    },
    green: {
      bg: "bg-gradient-to-br from-green-50 to-green-100",
      title: "text-green-800",
      border: "border-green-200",
      bullet: "text-green-500",
    },
    amber: {
      bg: "bg-gradient-to-br from-amber-50 to-amber-100",
      title: "text-amber-800",
      border: "border-amber-200",
      bullet: "text-amber-500",
    },
    purple: {
      bg: "bg-gradient-to-br from-purple-50 to-purple-100",
      title: "text-purple-800",
      border: "border-purple-200",
      bullet: "text-purple-500",
    },
    rose: {
      bg: "bg-gradient-to-br from-rose-50 to-rose-100",
      title: "text-rose-800",
      border: "border-rose-200",
      bullet: "text-rose-500",
    },
  };

  const handleGeneratePPT = async () => {
    if (!topic) {
      toast.error('Please enter a topic');
      return;
    }

    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const generatedSlides = generateMockSlides(topic, parseInt(slideCount), presentationType);
      setSlides(generatedSlides);
      setCurrentSlide(0);
      toast.success('Presentation generated successfully!');
    } catch (error) {
      toast.error('Failed to generate presentation. Please try again.');
      console.error('Error generating PPT:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    toast.success('Download feature would save the presentation as a .pptx file');
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const currentTheme = themeStyles[themeColor as keyof typeof themeStyles];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Presentation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium mb-1">
                Presentation Topic
              </label>
              <Input
                id="topic"
                placeholder="Enter your presentation topic (e.g., Photosynthesis in plants)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="slide-count" className="block text-sm font-medium mb-1">
                  Number of Slides
                </label>
                <Select value={slideCount} onValueChange={setSlideCount}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of slides" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 slides</SelectItem>
                    <SelectItem value="5">5 slides</SelectItem>
                    <SelectItem value="7">7 slides</SelectItem>
                    <SelectItem value="10">10 slides</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="presentation-type" className="block text-sm font-medium mb-1">
                  Presentation Type
                </label>
                <Select value={presentationType} onValueChange={setPresentationType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select presentation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="scientific">Scientific</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="theme-color" className="block text-sm font-medium mb-1">
                  Color Theme
                </label>
                <Select value={themeColor} onValueChange={setThemeColor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="amber">Amber</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="rose">Rose</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              onClick={handleGeneratePPT} 
              disabled={loading || !topic} 
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Presentation className="mr-2 h-4 w-4" />
                  Generate Presentation
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {slides.length > 0 && (
        <div className="space-y-6">
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="preview">Preview Slides</TabsTrigger>
              <TabsTrigger value="outline">Outline View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" className="pt-4">
              <Card className={`${currentTheme.border} shadow-lg border-2`}>
                <CardContent className="p-8">
                  <div className={`aspect-video ${currentTheme.bg} rounded-lg p-6 flex flex-col justify-center items-center text-center shadow-inner`}>
                    <div className="w-full mb-8 flex items-center justify-center">
                      <h2 className={`text-3xl font-bold ${currentTheme.title}`}>
                        {slides[currentSlide].title}
                      </h2>
                    </div>
                    <ul className="text-left w-full max-w-md space-y-4">
                      {slides[currentSlide].content.map((point, idx) => (
                        <li key={idx} className="flex items-start animate-fade-in" style={{ animationDelay: `${idx * 150}ms` }}>
                          <span className={`${currentTheme.bullet} mr-3 text-xl`}>•</span> 
                          <span className="text-lg">{point}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="absolute bottom-4 right-4 text-sm text-gray-500">
                      Slide {currentSlide + 1} / {slides.length}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6">
                    <Button variant="outline" onClick={prevSlide} disabled={currentSlide === 0}>
                      <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                    </Button>
                    
                    <div className="flex space-x-2">
                      {slides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`w-2.5 h-2.5 rounded-full ${
                            idx === currentSlide 
                              ? `bg-${themeColor}-500` 
                              : 'bg-gray-300 hover:bg-gray-400'
                          } transition-colors`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                    
                    <Button variant="outline" onClick={nextSlide} disabled={currentSlide === slides.length - 1}>
                      Next <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="outline" className="pt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {slides.map((slide, idx) => (
                      <div 
                        key={idx} 
                        className={`p-4 rounded-md cursor-pointer hover:bg-gray-100 transition-colors ${
                          idx === currentSlide 
                            ? `bg-gray-100 border-l-4 border-${themeColor}-500` 
                            : ''
                        }`}
                        onClick={() => setCurrentSlide(idx)}
                      >
                        <h3 className="font-medium">Slide {idx + 1}: {slide.title}</h3>
                        <ul className="text-sm text-gray-600 mt-2 ml-5">
                          {slide.content.slice(0, 2).map((point, pidx) => (
                            <li key={pidx} className="list-disc">
                              {point.length > 50 ? `${point.substring(0, 50)}...` : point}
                            </li>
                          ))}
                          {slide.content.length > 2 && (
                            <li className="list-disc text-gray-400">
                              +{slide.content.length - 2} more points
                            </li>
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end">
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download as PowerPoint
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

function generateMockSlides(topic: string, count: number, type: string): Slide[] {
  const slides: Slide[] = [];
  
  slides.push({
    id: 1,
    title: topic,
    content: [
      "An educational presentation",
      `Created using SmartGrade AI Assistant - ${new Date().toLocaleDateString()}`
    ]
  });
  
  if (topic.toLowerCase().includes('photosynthesis')) {
    slides.push(
      {
        id: 2,
        title: "What is Photosynthesis?",
        content: [
          "The process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water",
          "Converts light energy into chemical energy",
          "Essential for all aerobic life on Earth"
        ]
      },
      {
        id: 3,
        title: "The Photosynthesis Equation",
        content: [
          "6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂",
          "Carbon dioxide + water + light energy → glucose + oxygen",
          "Occurs in chloroplasts containing the pigment chlorophyll"
        ]
      },
      {
        id: 4,
        title: "Light-Dependent Reactions",
        content: [
          "Take place in thylakoid membranes",
          "Convert light energy to chemical energy (ATP and NADPH)",
          "Release oxygen as a byproduct"
        ]
      },
      {
        id: 5,
        title: "Light-Independent Reactions (Calvin Cycle)",
        content: [
          "Takes place in the stroma of chloroplasts",
          "Uses ATP and NADPH from light-dependent reactions",
          "Converts CO₂ into glucose and other carbohydrates"
        ]
      }
    );
  } else {
    for (let i = 2; i <= count; i++) {
      slides.push({
        id: i,
        title: `Key Aspect ${i-1} of ${topic}`,
        content: [
          `Important point #1 about ${topic}`,
          `Critical concept related to ${topic}`,
          `Key insight regarding ${topic}`,
          `Application of ${topic} in real-world contexts`
        ]
      });
    }
  }
  
  slides.push({
    id: count + 1,
    title: "Conclusion",
    content: [
      `Summary of key points about ${topic}`,
      "Questions and discussion",
      "References and further reading"
    ]
  });
  
  return slides.slice(0, count);
}

export default PptGeneratorComponent;
