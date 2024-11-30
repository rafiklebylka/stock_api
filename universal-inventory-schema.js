// Core Product/Service Schema
const ProductSchema = {
  // Universal Unique Identifier
  id: {
    type: String,
    required: true,
    unique: true
  },
  
  // Business/Owner Information
  business: {
    id: String,
    name: String,
    industryType: String
  },

  // Core Identification
  name: {
    type: String,
    required: true,
    multilingual: true  // Support for multiple language names
  },
  
  // Flexible Categorization
  categories: {
    primary: String,
    secondary: [String],
    globalTaxonomyCode: String  // International standard classification
  },

  // Pricing and Economic Attributes
  pricing: {
    basePrice: Number,
    currency: String,
    taxRate: Number,
    discountEligible: Boolean,
    priceHistory: [
      {
        date: Date,
        price: Number,
        reason: String
      }
    ]
  },

  // Enhanced Inventory Management
  inventory: {
    trackingMethod: {
      type: String,
      enum: ['by_variant', 'total_stock']
    },
    variants: [
      {
        id: String,
        attributes: {
          color: String,
          size: {
            value: String,
            type: String,   // e.g., 'clothing', 'shoes', 'numeric'
            system: String  // e.g., 'US', 'EU', 'UK'
          },
          // Additional custom attributes
          customAttributes: Map
        },
        stockInfo: {
          currentStock: Number,
          reservedStock: Number,
          minimumStockLevel: Number,
          maxStockLevel: Number
        },
        identifiers: {
          barcode: String,
          sku: String
        },
        availability: {
          status: String,  // 'in_stock', 'low_stock', 'out_of_stock'
          lastChecked: Date,
          checkHistory: [
            {
              timestamp: Date,
              status: String,
              stockLevel: Number,
              notes: String
            }
          ]
        }
      }
    ],
    totalCurrentStock: Number,
    totalReservedStock: Number,
    trackInventory: Boolean
  },

  // Flexible Product Attributes
  attributes: {
    // Dynamic key-value store for any possible attribute
    type: Map,
    of: {
      value: Schema.Types.Mixed,
      metadata: {
        unit: String,
        source: String,
        lastUpdated: Date
      }
    }
  },

  // Service-Specific Attributes
  serviceDetails: {
    duration: Number,  // In minutes
    availabilitySchedule: [
      {
        dayOfWeek: String,
        startTime: String,
        endTime: String
      }
    ],
    requiresBooking: Boolean
  },

  // Physical Product Specific
  physicalProperties: {
    weight: {
      value: Number,
      unit: String
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      unit: String
    },
    material: [String],
    color: [String]
  },

  // Digital Product Specific
  digitalProperties: {
    fileType: String,
    downloadLink: String,
    size: Number,  // In bytes
    licenseType: String
  },

  // Comprehensive Availability Tracking
  availability: {
    overallStatus: String,  // 'fully_available', 'partially_available', 'unavailable'
    mostRecentCheck: Date,
    variantAvailabilitySummary: [
      {
        variantId: String,
        status: String,
        stockLevel: Number,
        additionalDetails: Map
      }
    ]
  },

  // Compliance and Regulation
  compliance: {
    certifications: [String],
    regulatoryBody: String,
    restrictions: [String]
  },

  // Tracking and Metadata
  metadata: {
    createdAt: Date,
    updatedAt: Date,
    createdBy: String,
    source: String,  // Where the product was originally sourced/entered
    status: {
      type: String,
      enum: ['active', 'discontinued', 'pending', 'restricted']
    }
  },

  // Global Identifiers
  globalIdentifiers: {
    barcode: String,
    sku: String,
    gtin: String,  // Global Trade Item Number
    isbn: String   // For books/publications
  },

  // Geo-Specific Variations
  geoVariations: [
    {
      countryCode: String,
      localName: String,
      localPrice: Number,
      taxRate: Number,
      availability: Boolean
    }
  ]
}

// Example Product Instance
const mensSweaterExample = {
  id: "unique-uuid-v4",
  name: {
    en: "Classic Wool Crew Neck Sweater",
    es: "Jersey Clásico de Lana con Cuello Redondo"
  },
  business: {
    id: "fashion-co-001",
    name: "Urban Threads",
    industryType: "Fashion Apparel"
  },
  categories: {
    primary: "Clothing",
    secondary: ["Menswear", "Knitwear"],
    globalTaxonomyCode: "CL-MW-KN-001"
  },
  pricing: {
    basePrice: 129.99,
    currency: "USD",
    taxRate: 0.07,
    discountEligible: true,
    priceHistory: [
      {
        date: new Date('2024-01-15'),
        price: 149.99,
        reason: "Initial launch price"
      },
      {
        date: new Date('2024-02-01'),
        price: 129.99,
        reason: "Seasonal adjustment"
      }
    ]
  },
  inventory: {
    trackingMethod: "by_variant",
    variants: [
      {
        id: "sweater-navy-medium",
        attributes: {
          color: "Navy",
          size: {
            value: "M",
            type: "clothing",
            system: "US"
          },
          customAttributes: new Map([
            ["material_composition", "80% Wool, 20% Polyamide"],
            ["care_instructions", "Machine wash cold, lay flat to dry"]
          ])
        },
        stockInfo: {
          currentStock: 75,
          reservedStock: 10,
          minimumStockLevel: 20,
          maxStockLevel: 150
        },
        identifiers: {
          barcode: "7890123456789",
          sku: "SWEATER-NVY-M"
        },
        availability: {
          status: "in_stock",
          lastChecked: new Date(),
          checkHistory: [
            {
              timestamp: new Date(),
              status: "in_stock",
              stockLevel: 75,
              notes: "Regular inventory check"
            }
          ]
        }
      },
      {
        id: "sweater-navy-large",
        attributes: {
          color: "Navy",
          size: {
            value: "L",
            type: "clothing",
            system: "US"
          },
          customAttributes: new Map([
            ["material_composition", "80% Wool, 20% Polyamide"],
            ["care_instructions", "Machine wash cold, lay flat to dry"]
          ])
        },
        stockInfo: {
          currentStock: 60,
          reservedStock: 5,
          minimumStockLevel: 20,
          maxStockLevel: 150
        },
        identifiers: {
          barcode: "7890123456788",
          sku: "SWEATER-NVY-L"
        },
        availability: {
          status: "in_stock",
          lastChecked: new Date(),
          checkHistory: [
            {
              timestamp: new Date(),
              status: "in_stock",
              stockLevel: 60,
              notes: "Regular inventory check"
            }
          ]
        }
      }
    ],
    totalCurrentStock: 135,
    totalReservedStock: 15,
    trackInventory: true
  },
  physicalProperties: {
    weight: { value: 0.5, unit: "kg" },
    dimensions: {
      length: 70,
      width: 55,
      height: 5,
      unit: "cm"
    },
    material: ["Wool", "Polyamide"],
    color: ["Navy"]
  },
  attributes: new Map([
    ["season", { 
      value: "Fall/Winter 2024", 
      metadata: { 
        source: "Product Design Team",
        lastUpdated: new Date() 
      }
    }],
    ["sustainability_rating", { 
      value: 4.5, 
      metadata: { 
        unit: "out of 5",
        source: "Internal Sustainability Assessment",
        lastUpdated: new Date() 
      }
    }]
  ]),
  compliance: {
    certifications: ["Responsible Wool Standard"],
    regulatoryBody: "Textile Exchange",
    restrictions: ["No international trade restrictions"]
  },
  metadata: {
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "product-team-user-123",
    source: "Internal Product Development",
    status: "active"
  },
  globalIdentifiers: {
    barcode: "7890123456789",
    sku: "SWEATER-NVY-M",
    gtin: "01234567890123"
  },
  geoVariations: [
    {
      countryCode: "US",
      localName: "Classic Wool Crew Neck Sweater",
      localPrice: 129.99,
      taxRate: 0.07,
      availability: true
    },
    {
      countryCode: "CA",
      localName: "Classic Wool Crew Neck Sweater",
      localPrice: 169.99,
      taxRate: 0.10,
      availability: true
    }
  ]
}


const computerExample = {
  id: "unique-uuid-v4",
  name: {
    en: "High Performance Laptop",
    es: "Portátil de Alto Rendimiento"
  },
  categories: {
    primary: "Electronics",
    secondary: ["Computers", "Laptops"],
    globalTaxonomyCode: "EL-CP-LP-001"
  },
  pricing: {
    basePrice: 1299.99,
    currency: "USD",
    taxRate: 0.08
  },
  inventory: {
    trackingMethod: "by_variant",
    variants: [
      {
        id: "laptop-silver-16gb",
        attributes: {
          color: "Silver",
          size: {
            value: "16\"",
            type: "screen_size",
            system: "inches"
          }
        },
        stockInfo: {
          currentStock: 50,
          reservedStock: 5,
          minimumStockLevel: 10,
          maxStockLevel: 100
        },
        identifiers: {
          sku: "LAPTOP-SLV-16GB"
        },
        availability: {
          status: "in_stock",
          lastChecked: new Date()
        }
      }
    ],
    totalCurrentStock: 50,
    totalReservedStock: 5,
    trackInventory: true
  },
  physicalProperties: {
    weight: { value: 1.5, unit: "kg" },
    dimensions: {
      length: 35,
      width: 24,
      height: 2,
      unit: "cm"
    }
  }
}

// Example Service Instance
const yogaClassExample = {
  id: "unique-uuid-v4",
  name: {
    en: "Vinyasa Yoga Class",
    fr: "Cours de Yoga Vinyasa"
  },
  categories: {
    primary: "Fitness",
    secondary: ["Yoga", "Group Classes"]
  },
  serviceDetails: {
    duration: 60,
    availabilitySchedule: [
      { 
        dayOfWeek: "Monday", 
        startTime: "18:00", 
        endTime: "19:00" 
      }
    ],
    requiresBooking: true
  }
}

module.exports = {
  mensSweaterExample,
  ProductSchema,
  computerExample,
  yogaClassExample
};
