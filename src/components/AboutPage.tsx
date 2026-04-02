import { ArrowLeft, Users, Globe, Sparkles, Heart, TrendingUp, Video, ShoppingBag, Handshake, Zap, Check, Star, MapPin, Award, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { unsplash_tool } from '../utils/unsplash';

interface AboutPageProps {
  onBack: () => void;
  onNavigate: (page: 'home' | 'products' | 'auth' | 'artisan-stories') => void;
}

export function AboutPage({ onBack, onNavigate }: AboutPageProps) {
  const features = [
    {
      icon: Video,
      title: 'Artisan Story Videos',
      description: 'Sharing real stories of artisans behind the crafts, connecting customers with authentic heritage.'
    },
    {
      icon: ShoppingBag,
      title: 'Global Marketplace',
      description: 'A comprehensive online shop featuring authentic handmade products from skilled artisans.'
    },
    {
      icon: Handshake,
      title: 'Direct Connection',
      description: 'Buyers can directly support artisans without middlemen, ensuring fair compensation.'
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Support',
      description: 'Helping artisans with product descriptions, pricing strategies, and marketing insights.'
    }
  ];

  const uniquePoints = [
    {
      icon: Heart,
      title: 'Authentic Heritage',
      description: 'Every product comes with a real story, preserving traditional craftsmanship for future generations.'
    },
    {
      icon: TrendingUp,
      title: 'Fair Trade Model',
      description: 'Transparent pricing ensures artisans receive fair compensation for their skilled work.'
    },
    {
      icon: Zap,
      title: 'Technology Meets Tradition',
      description: 'Combining age-old craftsmanship with modern AI tools and digital marketing.'
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'More than a marketplace - we\'re building a global community of craft enthusiasts.'
    }
  ];

  const impactStats = [
    { number: '500+', label: 'Artisans Empowered', icon: Users },
    { number: '10,000+', label: 'Handmade Items Sold', icon: ShoppingBag },
    { number: '20+', label: 'Countries Reached', icon: Globe },
    { number: '4.8★', label: 'Average Rating', icon: Star }
  ];

  const teamMembers = [
    {
      name: 'Priya Sharma',
      role: 'Founder & CEO',
      bio: 'Former tech executive passionate about preserving Indian heritage crafts through technology.',
      image: '/api/placeholder/120/120'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Head of Artisan Relations',
      bio: 'Born in a family of weavers, bridging the gap between traditional artisans and modern markets.',
      image: '/api/placeholder/120/120'
    },
    {
      name: 'Ananya Patel',
      role: 'AI & Technology Lead',
      bio: 'AI specialist dedicated to creating tools that empower artisans and enhance customer experience.',
      image: '/api/placeholder/120/120'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl font-medium text-foreground">About KalaKriti</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-amber-600 text-white">
            Empowering Artisans Since 2024
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            About <span className="text-amber-600">KalaKriti</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Empowering artisans by connecting tradition with technology. 
            We bridge the gap between authentic craftsmanship and global markets.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => onNavigate('products')}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Explore Marketplace
            </Button>
            <Button 
              variant="outline"
              onClick={() => onNavigate('artisan-stories')}
            >
              Watch Artisan Stories
            </Button>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Who We Are</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              KalaKriti is a revolutionary digital platform that bridges the gap between traditional 
              Indian artisans and global buyers. We provide artisans with cutting-edge tools to showcase 
              their skills, tell their stories, and sell their authentic creations to customers worldwide. 
              Our platform combines the beauty of traditional craftsmanship with the power of modern 
              technology and artificial intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="p-8 border-l-4 border-l-amber-600">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-8 h-8 text-amber-600" />
                  <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To preserve traditional craftsmanship and provide artisans with fair earning 
                  opportunities through modern digital tools. We're committed to ensuring that 
                  every artisan has access to global markets while maintaining the authenticity 
                  and cultural significance of their craft.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-l-4 border-l-blue-600">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We envision a world where every artisan has equal access to global markets and 
                  receives recognition for their craft. A future where traditional arts thrive 
                  alongside technology, creating sustainable livelihoods while preserving cultural 
                  heritage for generations to come.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">What We Do</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the comprehensive features and services that make KalaKriti the premier 
              platform for authentic Indian craftsmanship.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose KalaKriti</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What makes us different from other marketplaces and why artisans and customers 
              trust us for authentic handmade products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {uniquePoints.map((point, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{point.title}</h3>
                  <p className="text-muted-foreground">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Impact</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how we're making a difference in the lives of artisans and preserving 
              traditional craftsmanship for future generations.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {impactStats.map((stat, index) => (
              <Card key={index} className="p-6 text-center">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Founded by technologists and artists, KalaKriti was built to empower rural 
              communities and preserve heritage crafts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-6 text-center">
                <CardContent className="p-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-amber-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-amber-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the KalaKriti Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Whether you're an artisan looking to share your craft or a buyer seeking authentic 
            handmade products, KalaKriti is your gateway to a world of traditional artistry.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg"
              onClick={() => onNavigate('products')}
              className="bg-white text-amber-600 hover:bg-gray-50"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Shop Authentic Products
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => onNavigate('auth')}
              className="border-white text-white hover:bg-white hover:text-amber-600"
            >
              <Users className="w-5 h-5 mr-2" />
              Join as Artisan
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => onNavigate('artisan-stories')}
              className="border-white text-white hover:bg-white hover:text-amber-600"
            >
              <Video className="w-5 h-5 mr-2" />
              Watch Stories
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-sm opacity-80">
              Have questions? Contact us at{' '}
              <a href="mailto:hello@kalakriti.com" className="underline hover:no-underline">
                hello@kalakriti.com
              </a>
              {' '}or call +91-XXXX-XXXX
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}