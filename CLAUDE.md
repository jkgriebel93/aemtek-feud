# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AEMtek-Feud is a web-based Family Feud game implementation. It's a pure vanilla JavaScript application with no build system, package manager, or external dependencies - just HTML, CSS, and JavaScript files that run directly in a browser.

## Running the Application

Open `index.html` directly in a modern web browser. No build step or server required.

For development with live reload, use any static file server:
```bash
python3 -m http.server 8000
# or
npx serve .
```

## Architecture

### Core Classes

**FamilyFeudGame** (game.js:3-485) - Main game controller
- Manages game state: rounds, scores, strikes, active team
- Handles DOM manipulation and event listeners
- Implements answer matching with fuzzy logic (70% substring similarity threshold)

**QuestionManagementUI** (game.js:488-785) - Host question editor
- Modal-based CRUD interface for questions
- Switches between list view and edit view

**QuestionManager** (questions.js:299-377) - Data persistence layer
- Stores questions in browser localStorage (key: `familyFeud_questions`)
- Falls back to DEFAULT_QUESTIONS array if storage is empty

### Screen Navigation

Three screens controlled by `.active` class: title screen → game screen → winner screen

### Data Flow

1. Questions loaded from localStorage or defaults on page load
2. Game instantiated when "Start Game" clicked with team names
3. Each round loads a question, players guess answers
4. Points accumulated from revealed answers, awarded to active team
5. After 5 rounds, winner determined by total score

## Key Implementation Details

- **Answer Matching**: Checks exact match → accepted variations → substring match → fuzzy match (70% threshold)
- **Strike System**: 3 wrong answers triggers steal opportunity for other team
- **Styling**: Mobile-first responsive CSS with breakpoints at 768px and 480px
- **No Backend**: All data persists in browser localStorage only
