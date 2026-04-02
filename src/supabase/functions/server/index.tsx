import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js'
import * as kv from './kv_store.tsx'

const app = new Hono()

// Apply CORS middleware
app.use('*', cors())

// Apply logger middleware
app.use('*', logger(console.log))

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// Artisan routes
app.get('/make-server-4763b19b/artisan/:id', async (c) => {
  try {
    const artisanId = c.req.param('id')
    const artisanData = await kv.get(`artisan:${artisanId}`)
    
    if (!artisanData) {
      return c.json({ error: 'Artisan not found' }, 404)
    }
    
    return c.json(artisanData)
  } catch (error) {
    console.log('Error fetching artisan:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.post('/make-server-4763b19b/artisan', async (c) => {
  try {
    const artisanData = await c.req.json()
    const artisanId = `artisan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const fullArtisanData = {
      id: artisanId,
      ...artisanData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    await kv.set(`artisan:${artisanId}`, fullArtisanData)
    
    return c.json({ success: true, artisan: fullArtisanData })
  } catch (error) {
    console.log('Error creating artisan:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.put('/make-server-4763b19b/artisan/:id', async (c) => {
  try {
    const artisanId = c.req.param('id')
    const updates = await c.req.json()
    
    const existingArtisan = await kv.get(`artisan:${artisanId}`)
    if (!existingArtisan) {
      return c.json({ error: 'Artisan not found' }, 404)
    }
    
    const updatedArtisan = {
      ...existingArtisan,
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    await kv.set(`artisan:${artisanId}`, updatedArtisan)
    
    return c.json({ success: true, artisan: updatedArtisan })
  } catch (error) {
    console.log('Error updating artisan:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Product routes
app.get('/make-server-4763b19b/artisan/:id/products', async (c) => {
  try {
    const artisanId = c.req.param('id')
    const products = await kv.getByPrefix(`product:${artisanId}:`)
    
    return c.json({ products: products.map(p => p.value) })
  } catch (error) {
    console.log('Error fetching products:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Get all public products for customer homepage
app.get('/make-server-4763b19b/products/public', async (c) => {
  try {
    const allProducts = await kv.getByPrefix('product:')
    const publicProducts = allProducts
      .map(p => p.value)
      .filter(product => product.is_public === true)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    return c.json({ products: publicProducts })
  } catch (error) {
    console.log('Error fetching public products:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Get trending products for customer homepage
app.get('/make-server-4763b19b/products/trending', async (c) => {
  try {
    const allProducts = await kv.getByPrefix('product:')
    const trendingProducts = allProducts
      .map(p => p.value)
      .filter(product => product.is_public === true && product.is_trending === true)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 4) // Limit to 4 trending products
    
    return c.json({ products: trendingProducts })
  } catch (error) {
    console.log('Error fetching trending products:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Get products by category
app.get('/make-server-4763b19b/products/category/:category', async (c) => {
  try {
    const category = c.req.param('category')
    const allProducts = await kv.getByPrefix('product:')
    const categoryProducts = allProducts
      .map(p => p.value)
      .filter(product => product.is_public === true && product.category === category)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    return c.json({ products: categoryProducts })
  } catch (error) {
    console.log('Error fetching category products:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Create new product (standalone route for frontend)
app.post('/make-server-4763b19b/products', async (c) => {
  try {
    const productData = await c.req.json()
    const productId = `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const fullProductData = {
      id: productId,
      name: productData.name,
      category: productData.category,
      subcategory: productData.subcategory,
      price: productData.price,
      original_price: productData.original_price,
      description: productData.description,
      shortDescription: productData.shortDescription,
      image: productData.image,
      images: productData.images,
      materials: productData.materials,
      dimensions: productData.dimensions,
      weight: productData.weight,
      origin: productData.origin,
      artisan_story: productData.artisanStory,
      tags: productData.tags,
      artisan_id: productData.artisan_id,
      is_public: productData.is_public,
      is_trending: productData.is_trending,
      is_featured: productData.is_featured,
      is_customizable: productData.is_customizable,
      rating: 0,
      reviews: 0,
      stock_count: 10, // Default stock
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    await kv.set(`product:${productData.artisan_id}:${productId}`, fullProductData)
    
    return c.json({ success: true, product: fullProductData })
  } catch (error) {
    console.log('Error creating product:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.post('/make-server-4763b19b/artisan/:id/products', async (c) => {
  try {
    const artisanId = c.req.param('id')
    const productData = await c.req.json()
    const productId = `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const fullProductData = {
      id: productId,
      artisanId,
      ...productData,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    await kv.set(`product:${artisanId}:${productId}`, fullProductData)
    
    return c.json({ success: true, product: fullProductData })
  } catch (error) {
    console.log('Error creating product:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.put('/make-server-4763b19b/product/:productId', async (c) => {
  try {
    const productId = c.req.param('productId')
    const updates = await c.req.json()
    
    // Find the product by searching all artisan products
    const allProducts = await kv.getByPrefix('product:')
    const existingProduct = allProducts.find(p => p.value.id === productId)
    
    if (!existingProduct) {
      return c.json({ error: 'Product not found' }, 404)
    }
    
    const updatedProduct = {
      ...existingProduct.value,
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    await kv.set(existingProduct.key, updatedProduct)
    
    return c.json({ success: true, product: updatedProduct })
  } catch (error) {
    console.log('Error updating product:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.delete('/make-server-4763b19b/product/:productId', async (c) => {
  try {
    const productId = c.req.param('productId')
    
    // Find the product by searching all artisan products
    const allProducts = await kv.getByPrefix('product:')
    const existingProduct = allProducts.find(p => p.value.id === productId)
    
    if (!existingProduct) {
      return c.json({ error: 'Product not found' }, 404)
    }
    
    await kv.del(existingProduct.key)
    
    return c.json({ success: true, message: 'Product deleted successfully' })
  } catch (error) {
    console.log('Error deleting product:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Analytics routes
app.get('/make-server-4763b19b/artisan/:id/analytics', async (c) => {
  try {
    const artisanId = c.req.param('id')
    
    // Get products for this artisan
    const products = await kv.getByPrefix(`product:${artisanId}:`)
    
    // Calculate analytics
    const totalProducts = products.length
    const activeProducts = products.filter(p => p.value.status === 'active').length
    const draftProducts = products.filter(p => p.value.status === 'draft').length
    
    // Mock sales data - in a real app this would come from actual sales
    const mockSalesData = [
      { month: 'Jan', sales: 12000, orders: 45, visitors: 1200 },
      { month: 'Feb', sales: 15000, orders: 52, visitors: 1450 },
      { month: 'Mar', sales: 18000, orders: 61, visitors: 1680 },
      { month: 'Apr', sales: 22000, orders: 72, visitors: 1920 },
      { month: 'May', sales: 25000, orders: 85, visitors: 2100 },
      { month: 'Jun', sales: 28000, orders: 92, visitors: 2350 }
    ]
    
    const analytics = {
      totalProducts,
      activeProducts,
      draftProducts,
      salesData: mockSalesData,
      totalRevenue: 28000,
      totalOrders: 92,
      averageRating: 4.8,
      profileViews: 2350
    }
    
    return c.json(analytics)
  } catch (error) {
    console.log('Error fetching analytics:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// User authentication and signup
app.post('/make-server-4763b19b/signup', async (c) => {
  try {
    const { email, password, fullName, userType, mobileNumber, primaryCraft } = await c.req.json()
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        fullName, 
        userType, 
        mobileNumber, 
        primaryCraft 
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    })
    
    if (error) {
      console.log('Supabase auth error:', error)
      return c.json({ error: error.message }, 400)
    }
    
    // If user is an artisan, create artisan profile
    if (userType === 'artisan') {
      const artisanData = {
        userId: data.user.id,
        name: fullName,
        email,
        phone: mobileNumber,
        location: 'India',
        craft: primaryCraft || 'Traditional Crafts',
        experience: 0,
        rating: 0,
        totalProducts: 0,
        totalSales: 0,
        revenue: 0
      }
      
      await kv.set(`artisan:${data.user.id}`, artisanData)
    }
    
    return c.json({ success: true, user: data.user })
  } catch (error) {
    console.log('Error during signup:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Artisan Stories routes
app.get('/make-server-4763b19b/artisan-stories', async (c) => {
  try {
    const allStories = await kv.getByPrefix('story:')
    const publicStories = allStories
      .map(s => s.value)
      .filter(story => story.status === 'active')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    return c.json({ stories: publicStories })
  } catch (error) {
    console.log('Error fetching artisan stories:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.get('/make-server-4763b19b/artisan/:id/stories', async (c) => {
  try {
    const artisanId = c.req.param('id')
    const stories = await kv.getByPrefix(`story:${artisanId}:`)
    
    return c.json({ stories: stories.map(s => s.value) })
  } catch (error) {
    console.log('Error fetching artisan stories:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.post('/make-server-4763b19b/artisan/:id/stories', async (c) => {
  try {
    const artisanId = c.req.param('id')
    const storyData = await c.req.json()
    const storyId = `story_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const fullStoryData = {
      id: storyId,
      artisanId,
      title: storyData.title,
      description: storyData.description,
      videoUrl: storyData.videoUrl,
      productId: storyData.productId,
      duration: storyData.duration,
      views: 0,
      likes: 0,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    await kv.set(`story:${artisanId}:${storyId}`, fullStoryData)
    
    return c.json({ success: true, story: fullStoryData })
  } catch (error) {
    console.log('Error creating artisan story:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.put('/make-server-4763b19b/story/:storyId', async (c) => {
  try {
    const storyId = c.req.param('storyId')
    const updates = await c.req.json()
    
    // Find the story by searching all artisan stories
    const allStories = await kv.getByPrefix('story:')
    const existingStory = allStories.find(s => s.value.id === storyId)
    
    if (!existingStory) {
      return c.json({ error: 'Story not found' }, 404)
    }
    
    const updatedStory = {
      ...existingStory.value,
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    await kv.set(existingStory.key, updatedStory)
    
    return c.json({ success: true, story: updatedStory })
  } catch (error) {
    console.log('Error updating story:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.delete('/make-server-4763b19b/story/:storyId', async (c) => {
  try {
    const storyId = c.req.param('storyId')
    
    // Find the story by searching all artisan stories
    const allStories = await kv.getByPrefix('story:')
    const existingStory = allStories.find(s => s.value.id === storyId)
    
    if (!existingStory) {
      return c.json({ error: 'Story not found' }, 404)
    }
    
    await kv.del(existingStory.key)
    
    return c.json({ success: true, message: 'Story deleted successfully' })
  } catch (error) {
    console.log('Error deleting story:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.post('/make-server-4763b19b/story/:storyId/view', async (c) => {
  try {
    const storyId = c.req.param('storyId')
    
    // Find the story by searching all artisan stories
    const allStories = await kv.getByPrefix('story:')
    const existingStory = allStories.find(s => s.value.id === storyId)
    
    if (!existingStory) {
      return c.json({ error: 'Story not found' }, 404)
    }
    
    const updatedStory = {
      ...existingStory.value,
      views: (existingStory.value.views || 0) + 1,
      updatedAt: new Date().toISOString()
    }
    
    await kv.set(existingStory.key, updatedStory)
    
    return c.json({ success: true, views: updatedStory.views })
  } catch (error) {
    console.log('Error updating story views:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.post('/make-server-4763b19b/story/:storyId/like', async (c) => {
  try {
    const storyId = c.req.param('storyId')
    
    // Find the story by searching all artisan stories
    const allStories = await kv.getByPrefix('story:')
    const existingStory = allStories.find(s => s.value.id === storyId)
    
    if (!existingStory) {
      return c.json({ error: 'Story not found' }, 404)
    }
    
    const updatedStory = {
      ...existingStory.value,
      likes: (existingStory.value.likes || 0) + 1,
      updatedAt: new Date().toISOString()
    }
    
    await kv.set(existingStory.key, updatedStory)
    
    return c.json({ success: true, likes: updatedStory.likes })
  } catch (error) {
    console.log('Error updating story likes:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Health check
app.get('/make-server-4763b19b/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

// Start the server
Deno.serve(app.fetch)