# Found Phone - Interactive Story Experience

An interactive fiction app where you discover a lost phone and watch real-time WhatsApp conversations unfold. Uncover hidden truths, conflicting perspectives, and moral dilemmas as you witness conversations between multiple characters simultaneously.

## Project Vision

**The Concept:**
You find a phone with no password. As you explore WhatsApp, messages start arriving in real-time. You're watching multiple conversations happen simultaneously—some characters are lying, some are protecting secrets, and you're discovering contradictions as the story unfolds.

Unlike traditional found-phone games (which are mostly puzzles), this focuses on:
- **Real-time drama** - Messages appear naturally with typing indicators
- **Multiple perspectives** - Watch 3-4 conversations simultaneously
- **Moral choices** - Decide whether to keep watching, return the phone, or intervene
- **Authentic storytelling** - Stories driven by Reddit's real-life conflicts adapted to the found-phone format

## Current Status

- ✅ Migrated from Bolt environment to Replit
- ✅ WhatsApp-style UI with lock screen
- 🚧 Story conversion pipeline (in progress)
- ⏳ Real-time message system (planned)
- ⏳ Episode management (planned)

## Tech Stack

- **Frontend:** React + TypeScript + Vite
- **UI Components:** Custom WhatsApp clone with Tailwind CSS
- **Design:** Mobile-first, authentic WhatsApp appearance

## Development Guide

### Story Creation & Conversion Pipeline

We use a folder-based system to convert raw Reddit stories into WhatsApp story format.

#### Step 1: Add a Raw Story

1. Find a compelling Reddit story (try r/AmItheAsshole, r/BestofRedditor_Updates, r/Cheating, etc.)
2. Copy-paste the story content into `stories/raw/`
3. Create a `.md` file with the story in the format below:

```markdown
---
title: Story Title
characters:
  - name: Character Name
    role: Their role
conflict: One sentence describing core conflict
---

Scene 1: Scene Title
Character: Their message
Character: Another message

Scene 2: Another Scene
Character: Message
```

#### Step 2: Convert the Story

```bash
node scripts/convert-stories.js
```

This converts all `.md` files in `stories/raw/` to WhatsApp JSON format and saves them to `stories/processed/`.

#### Step 3: Review Converted Story

Check `stories/processed/[story-id].json` to see the structured WhatsApp story with:
- Character conversations grouped separately
- Message timing automatically distributed
- Total duration calculated

### Story Selection Tips

**Best Subreddits for Story Material:**
- r/BestofRedditor_Updates - Multi-part sagas with reveals
- r/AmItheAsshole - Moral ambiguity and conflicting perspectives
- r/JustNoMIL - Family manipulation and hidden agendas
- r/Cheating - Betrayal with specific details
- r/NarcissisticAbuse - Psychological patterns
- r/WorkplaceStories - Office drama with group dynamics

**What Makes a Good Story:**
1. **Conflicting perspectives** - Different characters have contradictory versions
2. **Hidden information** - Readers discover something the characters don't know
3. **Specific details** - Small facts that make it feel authentic
4. **Escalating tension** - Stakes increase through the story
5. **Uncomfortable truths** - Moments where the reader realizes something darker

### Example Story

See `stories/raw/example-breakup.md` for a complete example of the format and `stories/raw/README.md` for detailed instructions.

## Project Structure

```
src/
├── components/          # UI components
│   ├── ChatView.tsx
│   ├── ContactList.tsx
│   ├── MessageBubble.tsx
│   ├── WhatsAppHeader.tsx
│   └── LockScreen.tsx
├── data/
│   └── storyData.ts     # Story data
├── hooks/
│   └── useStory.ts      # Story logic hook
├── utils/
│   └── storage.ts       # Local storage utils
├── App.tsx
├── main.tsx
└── index.css

stories/
├── raw/                 # Raw Reddit story files (paste here)
│   ├── README.md
│   └── example-breakup.md
└── processed/           # Converted WhatsApp stories (auto-generated)

scripts/
└── convert-stories.js   # Story conversion pipeline
```

## Running the App

```bash
npm install
npm run dev
```

The app will start on `http://localhost:5000`

## Building for Production

```bash
npm run build
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run typecheck` - Type check with TypeScript
- `node scripts/convert-stories.js` - Convert raw stories to WhatsApp format

## Workflow

1. **Research** - Find compelling Reddit stories
2. **Adapt** - Use the story format to extract key narrative elements
3. **Convert** - Run the conversion script to create WhatsApp story JSON
4. **Integrate** - Add story JSON to the app
5. **Test** - Verify message timing and pacing feels natural

## Next Steps

- [ ] Integrate converted stories into the app
- [ ] Build real-time message delivery system with variable timing
- [ ] Add choice/decision points in stories
- [ ] Implement battery drain mechanic
- [ ] Create episode rotation system
- [ ] Add more story examples (romance, thriller, comedy, mystery)

## Future Features

- **Episode rotation** - New stories every week
- **Multiple genres** - Horror, romance, drama, comedy, workplace, family
- **User choices** - Decisions that affect story outcomes
- **Community features** - Discuss theories, vote on endings
- **Video messages** - Some conversations include actual video/voice notes
- **Social sharing** - Share story theories and reactions
