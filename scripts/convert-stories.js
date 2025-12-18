import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const RAW_STORIES_DIR = path.join(__dirname, '../stories/raw');
const PROCESSED_STORIES_DIR = path.join(__dirname, '../stories/processed');

// Ensure processed directory exists
if (!fs.existsSync(PROCESSED_STORIES_DIR)) {
  fs.mkdirSync(PROCESSED_STORIES_DIR, { recursive: true });
}

/**
 * Parse a raw Reddit story format into structured data
 * Expected format:
 * ---
 * title: Story Title
 * characters:
 *   - name: Character Name
 *     role: Character Role
 * conflict: What's the core conflict?
 * ---
 * 
 * Scene 1:
 * Character: Message text
 * Character: Message text
 */
function parseStoryFile(content) {
  const parts = content.split('---');
  if (parts.length < 2) {
    throw new Error('Invalid story format. Must start with --- frontmatter ---');
  }

  const frontmatter = parts[1];
  const storyContent = parts.slice(2).join('---').trim();

  // Parse YAML-like frontmatter
  const metadata = {};
  const lines = frontmatter.split('\n').filter(l => l.trim());
  
  let currentKey = null;
  for (const line of lines) {
    if (line.includes(':')) {
      const [key, value] = line.split(':').map(s => s.trim());
      if (value === '') {
        currentKey = key;
        metadata[key] = [];
      } else {
        metadata[key] = value;
      }
    } else if (currentKey && line.startsWith('-')) {
      const itemContent = line.substring(1).trim();
      if (itemContent.includes(':')) {
        const [subkey, subvalue] = itemContent.split(':').map(s => s.trim());
        if (Array.isArray(metadata[currentKey])) {
          const lastItem = metadata[currentKey][metadata[currentKey].length - 1] || {};
          if (typeof lastItem === 'object') {
            lastItem[subkey] = subvalue;
            if (metadata[currentKey].length === 0) {
              metadata[currentKey].push(lastItem);
            }
          }
        }
      } else if (Array.isArray(metadata[currentKey])) {
        metadata[currentKey].push({ name: itemContent });
      }
    }
  }

  // Parse story scenes
  const scenes = [];
  const sceneLines = storyContent.split('\n').filter(l => l.trim());
  let currentScene = null;
  let currentMessages = [];

  for (const line of sceneLines) {
    if (line.startsWith('Scene ') || line.match(/^#{1,2}\s+Scene/i)) {
      if (currentScene) {
        scenes.push({
          title: currentScene,
          messages: currentMessages,
        });
      }
      currentScene = line.replace(/^#{1,2}\s+Scene\s+/i, '').trim();
      currentMessages = [];
    } else if (line.includes(':')) {
      const [character, ...messageParts] = line.split(':');
      const message = messageParts.join(':').trim();
      if (character.trim() && message) {
        currentMessages.push({
          character: character.trim(),
          text: message,
        });
      }
    }
  }

  if (currentScene) {
    scenes.push({
      title: currentScene,
      messages: currentMessages,
    });
  }

  return {
    title: metadata.title || 'Untitled Story',
    characters: Array.isArray(metadata.characters) ? metadata.characters : [],
    conflict: metadata.conflict || '',
    scenes,
  };
}

/**
 * Convert parsed story to WhatsApp story format
 */
function convertToWhatsAppStory(parsedStory) {
  const conversations = {};
  let globalDelay = 0;

  // Group messages by character into separate conversations
  for (const scene of parsedStory.scenes) {
    for (const msg of scene.messages) {
      const character = msg.character;
      if (!conversations[character]) {
        conversations[character] = {
          name: character,
          messages: [],
        };
      }

      // Add delay variation (messages appear every 2-5 seconds)
      const delay = 2000 + Math.random() * 3000;
      globalDelay += delay;

      conversations[character].messages.push({
        text: msg.text,
        timestamp: new Date(Date.now() + globalDelay).toISOString(),
        delay: globalDelay / 1000, // seconds for reference
      });
    }
  }

  return {
    id: parsedStory.title.toLowerCase().replace(/\s+/g, '-'),
    title: parsedStory.title,
    conflict: parsedStory.conflict,
    characters: parsedStory.characters,
    conversations: Object.values(conversations),
    totalDuration: globalDelay / 1000, // in seconds
  };
}

/**
 * Process all story files in raw directory
 */
function processAllStories() {
  if (!fs.existsSync(RAW_STORIES_DIR)) {
    console.log(`No raw stories directory found at ${RAW_STORIES_DIR}`);
    return;
  }

  const files = fs.readdirSync(RAW_STORIES_DIR).filter(f => 
    f.endsWith('.md') || f.endsWith('.txt')
  );

  if (files.length === 0) {
    console.log('No story files found in stories/raw/');
    console.log('Add .md or .txt files with the story format.');
    return;
  }

  let processedCount = 0;

  for (const file of files) {
    try {
      const filePath = path.join(RAW_STORIES_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      console.log(`\nProcessing: ${file}`);
      const parsed = parseStoryFile(content);
      const whatsAppStory = convertToWhatsAppStory(parsed);
      
      const outputFile = path.join(
        PROCESSED_STORIES_DIR,
        `${whatsAppStory.id}.json`
      );
      
      fs.writeFileSync(outputFile, JSON.stringify(whatsAppStory, null, 2));
      console.log(`✓ Saved to: ${outputFile}`);
      processedCount++;
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error.message);
    }
  }

  console.log(`\n✓ Processed ${processedCount} stories`);
}

processAllStories();
