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
import { ChevronLeft, ChevronRight, Download, Presentation, Loader2 } from 'lucide-react';

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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Card className="bg-white shadow-lg border-2">
                <CardContent className="p-8">
                  <div className="aspect-video bg-white rounded-lg p-6 flex flex-col justify-center items-center text-center">
                    <h2 className="text-2xl font-bold mb-6">{slides[currentSlide].title}</h2>
                    <ul className="text-left w-full max-w-md space-y-3">
                      {slides[currentSlide].content.map((point, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2">•</span> 
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6">
                    <Button variant="outline" onClick={prevSlide} disabled={currentSlide === 0}>
                      <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                    </Button>
                    <span className="text-sm text-gray-500">
                      Slide {currentSlide + 1} of {slides.length}
                    </span>
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
                          idx === currentSlide ? 'bg-gray-100 border-l-4 border-brand-600' : ''
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
