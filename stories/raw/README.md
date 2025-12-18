# Raw Story Files

Paste Reddit stories here in the format below. Then run `node scripts/convert-stories.js` to convert them to WhatsApp story format.

## Story Format

```markdown
---
title: Story Title
characters:
  - name: Character Name 1
    role: Their role (e.g., friend, coworker)
  - name: Character Name 2
    role: Their role
conflict: One sentence describing the core conflict
---

Scene 1: Opening
Character Name 1: First message they send
Character Name 2: Response message
Character Name 1: Another message

Scene 2: Escalation
Character Name 1: Message that reveals something
Character Name 2: Reaction to the reveal
```

## How to Use

1. Find a Reddit story with good contradictions
2. Extract the key details into this format
3. Create a `.md` file with your story
4. Run: `node scripts/convert-stories.js`
5. Check `stories/processed/` for the converted WhatsApp story JSON

## What Makes a Good Story

- **Conflicting perspectives**: Different characters have contradictory versions of events
- **Hidden information**: Readers discover something the characters don't know
- **Authentic details**: Small specifics that make it feel real
- **Tension**: Escalating stakes and uncomfortable truths

## Example Story

See `example-breakup.md` for a complete example.
