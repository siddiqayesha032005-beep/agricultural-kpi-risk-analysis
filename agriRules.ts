/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KeywordRule, AgriCategory } from '../types/agriculture';

export const DEFAULT_RULES: KeywordRule[] = [
  // --- 1. CROP CONDITIONS ---
  { keyword: 'bumper harvest', category: 'crop_conditions', weight: 4, sentiment: 'positive', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'bumper crop', category: 'crop_conditions', weight: 4, sentiment: 'positive', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'record yield', category: 'crop_conditions', weight: 4, sentiment: 'positive', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'high yield', category: 'crop_conditions', weight: 3, sentiment: 'positive', defaultImpact: 3, defaultLikelihood: 3 },
  { keyword: 'healthy crop', category: 'crop_conditions', weight: 3, sentiment: 'positive', defaultImpact: 3, defaultLikelihood: 4 },
  { keyword: 'optimal soil moisture', category: 'crop_conditions', weight: 3, sentiment: 'positive', defaultImpact: 3, defaultLikelihood: 4 },
  { keyword: 'favorable flowering', category: 'crop_conditions', weight: 3, sentiment: 'positive', defaultImpact: 3, defaultLikelihood: 3 },
  { keyword: 'strong germination', category: 'crop_conditions', weight: 3, sentiment: 'positive', defaultImpact: 3, defaultLikelihood: 3 },
  { keyword: 'harvest progress', category: 'crop_conditions', weight: 2, sentiment: 'neutral', defaultImpact: 2, defaultLikelihood: 3 },
  { keyword: 'harvest delay', category: 'crop_conditions', weight: 3, sentiment: 'negative', defaultImpact: 3, defaultLikelihood: 3 },
  { keyword: 'yield decline', category: 'crop_conditions', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'yield loss', category: 'crop_conditions', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'crop failure', category: 'crop_conditions', weight: 5, sentiment: 'negative', defaultImpact: 5, defaultLikelihood: 4 },
  { keyword: 'stunted growth', category: 'crop_conditions', weight: 3, sentiment: 'negative', defaultImpact: 3, defaultLikelihood: 3 },
  { keyword: 'lodging', category: 'crop_conditions', weight: 3, sentiment: 'negative', defaultImpact: 3, defaultLikelihood: 3 },
  { keyword: 'flower abortion', category: 'crop_conditions', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 3 },
  { keyword: 'wilting', category: 'crop_conditions', weight: 3, sentiment: 'negative', defaultImpact: 3, defaultLikelihood: 4 },
  { keyword: 'soil degradation', category: 'crop_conditions', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 3 },
  { keyword: 'poor canopy', category: 'crop_conditions', weight: 2, sentiment: 'negative', defaultImpact: 2, defaultLikelihood: 3 },

  // --- 2. MARKET TRENDS & PRICE CHANGES ---
  { keyword: 'price surge', category: 'market_trends', weight: 4, sentiment: 'neutral', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'price hike', category: 'market_trends', weight: 4, sentiment: 'neutral', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'record prices', category: 'market_trends', weight: 4, sentiment: 'positive', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'bullish', category: 'market_trends', weight: 3, sentiment: 'positive', defaultImpact: 3, defaultLikelihood: 4 },
  { keyword: 'strong export demand', category: 'market_trends', weight: 4, sentiment: 'positive', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'export ban', category: 'market_trends', weight: 5, sentiment: 'negative', defaultImpact: 5, defaultLikelihood: 4 },
  { keyword: 'export curbs', category: 'market_trends', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'import tariff', category: 'market_trends', weight: 3, sentiment: 'negative', defaultImpact: 3, defaultLikelihood: 3 },
  { keyword: 'trade embargo', category: 'market_trends', weight: 5, sentiment: 'negative', defaultImpact: 5, defaultLikelihood: 3 },
  { keyword: 'price slump', category: 'market_trends', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'market crash', category: 'market_trends', weight: 5, sentiment: 'negative', defaultImpact: 5, defaultLikelihood: 3 },
  { keyword: 'oversupply', category: 'market_trends', weight: 3, sentiment: 'negative', defaultImpact: 3, defaultLikelihood: 4 },
  { keyword: 'market glut', category: 'market_trends', weight: 3, sentiment: 'negative', defaultImpact: 3, defaultLikelihood: 3 },
  { keyword: 'commodity inflation', category: 'market_trends', weight: 3, sentiment: 'negative', defaultImpact: 3, defaultLikelihood: 4 },
  { keyword: 'futures rally', category: 'market_trends', weight: 3, sentiment: 'positive', defaultImpact: 3, defaultLikelihood: 3 },
  { keyword: 'procurement support', category: 'market_trends', weight: 3, sentiment: 'positive', defaultImpact: 3, defaultLikelihood: 3 },
  { keyword: 'minimum support price', category: 'market_trends', weight: 3, sentiment: 'positive', defaultImpact: 3, defaultLikelihood: 4 },

  // --- 3. WEATHER-RELATED RISKS ---
  { keyword: 'severe drought', category: 'weather_risks', weight: 5, sentiment: 'negative', defaultImpact: 5, defaultLikelihood: 5 },
  { keyword: 'drought', category: 'weather_risks', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'prolonged dry spell', category: 'weather_risks', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'heatwave', category: 'weather_risks', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'extreme heat', category: 'weather_risks', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'unseasonal frost', category: 'weather_risks', weight: 5, sentiment: 'negative', defaultImpact: 5, defaultLikelihood: 3 },
  { keyword: 'freeze damage', category: 'weather_risks', weight: 5, sentiment: 'negative', defaultImpact: 5, defaultLikelihood: 3 },
  { keyword: 'flash flood', category: 'weather_risks', weight: 5, sentiment: 'negative', defaultImpact: 5, defaultLikelihood: 3 },
  { keyword: 'flooding', category: 'weather_risks', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'torrential rain', category: 'weather_risks', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 3 },
  { keyword: 'hailstorm', category: 'weather_risks', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 3 },
  { keyword: 'monsoon deficit', category: 'weather_risks', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'cyclone', category: 'weather_risks', weight: 5, sentiment: 'negative', defaultImpact: 5, defaultLikelihood: 2 },
  { keyword: 'water shortage', category: 'weather_risks', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'aquifer depletion', category: 'weather_risks', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 3 },
  { keyword: 'reservoir low', category: 'weather_risks', weight: 3, sentiment: 'negative', defaultImpact: 3, defaultLikelihood: 4 },
  { keyword: 'favorable rainfall', category: 'weather_risks', weight: 3, sentiment: 'positive', defaultImpact: 3, defaultLikelihood: 4 },
  { keyword: 'timely monsoon', category: 'weather_risks', weight: 4, sentiment: 'positive', defaultImpact: 4, defaultLikelihood: 4 },

  // --- 4. PEST & DISEASE CONCERNS ---
  { keyword: 'desert locust', category: 'pest_disease', weight: 5, sentiment: 'negative', defaultImpact: 5, defaultLikelihood: 4 },
  { keyword: 'locust swarm', category: 'pest_disease', weight: 5, sentiment: 'negative', defaultImpact: 5, defaultLikelihood: 4 },
  { keyword: 'fall armyworm', category: 'pest_disease', weight: 5, sentiment: 'negative', defaultImpact: 5, defaultLikelihood: 4 },
  { keyword: 'armyworm infestation', category: 'pest_disease', weight: 5, sentiment: 'negative', defaultImpact: 5, defaultLikelihood: 4 },
  { keyword: 'bacterial blight', category: 'pest_disease', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'stripe rust', category: 'pest_disease', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 3 },
  { keyword: 'stem rust', category: 'pest_disease', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 3 },
  { keyword: 'late blight', category: 'pest_disease', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 3 },
  { keyword: 'aphid infestation', category: 'pest_disease', weight: 3, sentiment: 'negative', defaultImpact: 3, defaultLikelihood: 4 },
  { keyword: 'fungal outbreak', category: 'pest_disease', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 3 },
  { keyword: 'pest outbreak', category: 'pest_disease', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'crop disease', category: 'pest_disease', weight: 3, sentiment: 'negative', defaultImpact: 3, defaultLikelihood: 3 },
  { keyword: 'avian flu', category: 'pest_disease', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 3 },
  { keyword: 'african swine fever', category: 'pest_disease', weight: 5, sentiment: 'negative', defaultImpact: 5, defaultLikelihood: 3 },
  { keyword: 'biosecurity alert', category: 'pest_disease', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 3 },
  { keyword: 'quarantine order', category: 'pest_disease', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 3 },
  { keyword: 'pest resistant', category: 'pest_disease', weight: 3, sentiment: 'positive', defaultImpact: 3, defaultLikelihood: 4 },
  { keyword: 'disease eradication', category: 'pest_disease', weight: 3, sentiment: 'positive', defaultImpact: 3, defaultLikelihood: 3 },

  // --- 5. PRODUCTION & SUPPLY CHAIN ISSUES ---
  { keyword: 'fertilizer shortage', category: 'supply_chain', weight: 5, sentiment: 'negative', defaultImpact: 5, defaultLikelihood: 4 },
  { keyword: 'fertilizer price spike', category: 'supply_chain', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'urea shortage', category: 'supply_chain', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'potash bottleneck', category: 'supply_chain', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 3 },
  { keyword: 'diesel price hike', category: 'supply_chain', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'fuel shortage', category: 'supply_chain', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 3 },
  { keyword: 'port strike', category: 'supply_chain', weight: 5, sentiment: 'negative', defaultImpact: 5, defaultLikelihood: 3 },
  { keyword: 'barge bottleneck', category: 'supply_chain', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'freight rate spike', category: 'supply_chain', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'supply chain disruption', category: 'supply_chain', weight: 4, sentiment: 'negative', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'labor shortage', category: 'supply_chain', weight: 3, sentiment: 'negative', defaultImpact: 3, defaultLikelihood: 4 },
  { keyword: 'storage bottleneck', category: 'supply_chain', weight: 3, sentiment: 'negative', defaultImpact: 3, defaultLikelihood: 3 },
  { keyword: 'silo capacity full', category: 'supply_chain', weight: 3, sentiment: 'negative', defaultImpact: 3, defaultLikelihood: 3 },
  { keyword: 'equipment delay', category: 'supply_chain', weight: 3, sentiment: 'negative', defaultImpact: 3, defaultLikelihood: 3 },
  { keyword: 'logistics improved', category: 'supply_chain', weight: 3, sentiment: 'positive', defaultImpact: 3, defaultLikelihood: 3 },
  { keyword: 'port reopening', category: 'supply_chain', weight: 3, sentiment: 'positive', defaultImpact: 3, defaultLikelihood: 3 },

  // --- 6. OPPORTUNITIES & STRATEGIC ADVANTAGES ---
  { keyword: 'government subsidy', category: 'opportunities', weight: 4, sentiment: 'positive', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'farm grant', category: 'opportunities', weight: 4, sentiment: 'positive', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'subsidized fertilizer', category: 'opportunities', weight: 4, sentiment: 'positive', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'regenerative agriculture grant', category: 'opportunities', weight: 4, sentiment: 'positive', defaultImpact: 4, defaultLikelihood: 3 },
  { keyword: 'carbon credit', category: 'opportunities', weight: 4, sentiment: 'positive', defaultImpact: 4, defaultLikelihood: 3 },
  { keyword: 'organic premium', category: 'opportunities', weight: 4, sentiment: 'positive', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'drip irrigation subsidy', category: 'opportunities', weight: 4, sentiment: 'positive', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'drought resistant seed', category: 'opportunities', weight: 4, sentiment: 'positive', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'precision agriculture', category: 'opportunities', weight: 3, sentiment: 'positive', defaultImpact: 3, defaultLikelihood: 4 },
  { keyword: 'solar pump rebate', category: 'opportunities', weight: 3, sentiment: 'positive', defaultImpact: 3, defaultLikelihood: 3 },
  { keyword: 'trade agreement', category: 'opportunities', weight: 4, sentiment: 'positive', defaultImpact: 4, defaultLikelihood: 3 },
  { keyword: 'new export market', category: 'opportunities', weight: 4, sentiment: 'positive', defaultImpact: 4, defaultLikelihood: 4 },
  { keyword: 'agri tech adoption', category: 'opportunities', weight: 3, sentiment: 'positive', defaultImpact: 3, defaultLikelihood: 4 },
  { keyword: 'crop insurance payout', category: 'opportunities', weight: 3, sentiment: 'positive', defaultImpact: 3, defaultLikelihood: 3 }
];

export const COMMODITY_DICTIONARY = [
  { name: 'Wheat', patterns: ['wheat', 'durum', 'winter wheat', 'spring wheat', 'grain'] },
  { name: 'Corn (Maize)', patterns: ['corn', 'maize', 'corn belt', 'feed corn'] },
  { name: 'Rice', patterns: ['rice', 'paddy', 'basmati', 'parboiled rice', 'milled rice'] },
  { name: 'Soybeans', patterns: ['soybean', 'soybeans', 'soya', 'soy meal', 'soy oil'] },
  { name: 'Coffee', patterns: ['coffee', 'arabica', 'robusta', 'coffee bean'] },
  { name: 'Cocoa', patterns: ['cocoa', 'cacao', 'cocoa butter'] },
  { name: 'Cotton', patterns: ['cotton', 'lint', 'cottonseed'] },
  { name: 'Barley', patterns: ['barley', 'malt'] },
  { name: 'Almonds & Nuts', patterns: ['almond', 'almonds', 'pistachio', 'walnut', 'tree nuts'] },
  { name: 'Citrus & Fruit', patterns: ['citrus', 'orange', 'apple', 'grapes', 'orchard', 'avocado'] },
  { name: 'Vegetables', patterns: ['onion', 'tomato', 'potato', 'vegetables', 'horticulture', 'pulse', 'lentils'] },
  { name: 'Dairy & Milk', patterns: ['dairy', 'milk', 'cheese', 'butter', 'cattle feed'] },
  { name: 'Livestock & Poultry', patterns: ['poultry', 'broiler', 'swine', 'cattle', 'beef', 'pork'] },
  { name: 'Sugarcane', patterns: ['sugarcane', 'cane', 'sugar', 'ethanol'] },
  { name: 'Fertilizers & Inputs', patterns: ['fertilizer', 'urea', 'potash', 'dap', 'nitrogen', 'phosphate'] }
];

export const REGION_DICTIONARY = [
  { name: 'North America', patterns: ['united states', 'usa', 'u.s.', 'midwest', 'california', 'canada', 'iowa', 'kansas', 'texas'] },
  { name: 'South America', patterns: ['brazil', 'argentina', 'paraguay', 'matto grosso', 'latin america', 'colombia'] },
  { name: 'European Union', patterns: ['europe', 'france', 'germany', 'spain', 'italy', 'poland', 'european union', 'eu'] },
  { name: 'Black Sea / Eastern Europe', patterns: ['ukraine', 'russia', 'black sea', 'romania', 'bulgaria'] },
  { name: 'South Asia', patterns: ['india', 'pakistan', 'bangladesh', 'punjab', 'haryana', 'uttar pradesh'] },
  { name: 'Southeast Asia', patterns: ['vietnam', 'thailand', 'indonesia', 'philippines', 'malaysia', 'mekong'] },
  { name: 'East Asia', patterns: ['china', 'japan', 'south korea', 'yellow river'] },
  { name: 'Sub-Saharan Africa', patterns: ['africa', 'kenya', 'nigeria', 'ethiopia', 'south africa', 'ghana', 'ivory coast'] },
  { name: 'Australia & Oceania', patterns: ['australia', 'new zealand', 'queensland', 'new south wales'] },
  { name: 'Middle East & North Africa', patterns: ['egypt', 'morocco', 'middle east', 'turkey', 'saudi arabia'] }
];

export const CATEGORY_META: Record<AgriCategory, { label: string; color: string; description: string }> = {
  crop_conditions: {
    label: 'Crop Conditions',
    color: '#059669', // Emerald
    description: 'Crop health, vegetative vigor, canopy quality, and harvest yields'
  },
  market_trends: {
    label: 'Market & Price Trends',
    color: '#2563eb', // Blue
    description: 'Commodity price shifts, export policies, futures, and trading sentiment'
  },
  weather_risks: {
    label: 'Weather Risks',
    color: '#d97706', // Amber
    description: 'Droughts, floods, unseasonal frost, heatwaves, and soil moisture stress'
  },
  pest_disease: {
    label: 'Pests & Diseases',
    color: '#dc2626', // Red
    description: 'Pathogen outbreaks, fungal blights, locust swarms, and biosecurity warnings'
  },
  supply_chain: {
    label: 'Supply Chain & Inputs',
    color: '#7c3aed', // Purple
    description: 'Fertilizer availability, diesel costs, freight rates, and port bottlenecks'
  },
  opportunities: {
    label: 'Strategic Opportunities',
    color: '#0d9488', // Teal
    description: 'Subsidies, grants, carbon credits, organic premiums, and agritech adoption'
  }
};
