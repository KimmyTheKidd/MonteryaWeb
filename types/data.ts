import React from 'react';
export const BugTypes = [
  { key: 'mapCollision', label: 'Map Collision' },
  { key: 'npc', label: 'NPC' },
  { key: 'Inventory', label: 'Inventory' },
  { key: 'Interaction', label: 'Interaction' },
  { key: 'crafting', label: 'Crafting' },
  { key: 'farm', label: 'Farm' },
  { key: 'market', label: 'Market' },
  { key: 'other', label: 'Other' },
];

export const Tutorial_Pages = [
  {
    title: 'Resources',
    content: [
      {
        name: 'Tree',
        image: '/Tutorial/tree_tier1.png',
        description:
          'Trees provide wood for crafting. There are several tiers of resources available.',
        tooltip:
          'Trees are essential for gathering wood. Higher tiers provide better quality wood.',
      },
      {
        name: 'Rock',
        image: '/Tutorial/rock_tier1.png',
        description:
          'Rocks are used to gather stones. Explore higher tiers for better resources.',
        tooltip:
          'Rocks are basic for gathering stones. Look for higher tiers to get different stone types.',
      },
      {
        name: 'Ore',
        image: '/Tutorial/ore_tier1.png',
        description:
          'Ores can be mined for minerals. Different tiers offer different types of ores.',
        tooltip:
          'Ores are crucial for mining minerals. Various tiers offer different ores with special properties.',
      },
    ],
    tooltip:
      'There are different tiers of resources in the game. Use appropriate tools for harvesting; otherwise, they might break.',
  },
  {
    title: 'NPCs',
    content: [
      {
        name: 'Carpenter NPC',
        image: '/Tutorial/Carpenter_NPC.png',
        description: 'The carpenter helps with wood-related items.',
        tooltip: 'The Carpenter NPC is at the top of the big tree',
      },
      {
        name: 'Clothing NPC',
        image: '/Tutorial/cloting_NPC.png',
        description: 'Provides clothing and gear.',
        tooltip: 'The Clothing NPC is on the right side of where you spawn',
      },
      {
        name: 'Farmer NPC',
        image: '/Tutorial/Farmer_NPC.png',
        description: 'Assists with farming and gathering food.',
        tooltip: 'The Farmer NPC is at the bottom of wher you spawn ',
      },
      {
        name: 'OreSmith NPC',
        image: '/Tutorial/OreSmith_NPC.png',
        description: 'Specializes in working with ores.',
        tooltip: 'OreSmith NPC is at the North-Eeast of wher you spawned',
      },
      {
        name: 'StoneSmith NPC',
        image: '/Tutorial/StoneSmith_NPC.png',
        description: 'Handles stone-related tasks.',
        tooltip: 'StoneSmith NPC is at the South-East of wher you spawn ',
      },
      {
        name: 'Toolsmith NPC',
        image: '/Tutorial/Toolsmith_NPC.png',
        description: 'Crafts and repairs tools.',
        tooltip: 'The Toolsmith NPC is at the bottom of wher you spawn ',
      },
    ],
    tooltip:
      "Many NPCs are scattered around the King Forge City. Try walking around and exploring; maybe you'll find one.",
  },
  {
    title: 'Goal',
    content:
      'Your main objective is to gather resources, craft items, and interact with NPCs to progress in the game.',
    tooltip:
      'This is the overarching goal of your adventure. Keep this in mind as you explore and interact with the game world.',
  },
];
