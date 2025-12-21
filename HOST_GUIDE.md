# Family Feud Host Guide

This guide explains how to operate the Family Feud game as a host.

## Before the Game

### Managing Questions

Click **"Manage Questions"** on the title screen to customize questions before starting.

In the question manager you can:
- **Add New Question** - Create custom questions with answers and point values
- **Edit** - Modify existing questions
- **Delete** - Remove individual questions
- **Reset to Defaults** - Restore the original 25 questions

When creating/editing questions:
- Enter the survey question text
- Add answers with point values (higher points = less common answers)
- Optionally add "accepted variations" for flexible answer matching (e.g., "TV" for "Television")
- Answers are automatically sorted by points when saved

### Starting the Game

1. Enter team names (or keep the defaults)
2. Click **"START GAME"**
3. Click **"New Round"** to load the first question

## During Gameplay

### The Game Screen

- **Scoreboard** - Shows team names, scores, and which team is active (highlighted)
- **Round Info** - Current round number and accumulated points for this round
- **Strikes** - Three X marks that appear when wrong answers are given
- **Question** - The current survey question
- **Answer Board** - 8 slots showing hidden answers (fewer if question has fewer answers)
- **Guess Input** - Where players type their guesses

### Player Guessing

Players type answers in the guess input and press Enter or click **"GUESS"**.

The game uses flexible answer matching:
- Exact matches work
- Partial matches work (e.g., "pizza" matches "pepperoni pizza")
- Accepted variations work (configured per answer)
- Fuzzy matching catches similar spellings

Correct guesses automatically reveal the answer and add points to the round total.
Wrong guesses automatically add a strike.

### Host Controls

| Button | What It Does |
|--------|--------------|
| **New Round** | Loads a random unused question, resets strikes and round points |
| **Switch Team** | Changes which team is currently playing (visual indicator moves) |
| **Add Strike** | Manually adds a strike (use when players give wrong verbal answers) |
| **Award Points** | Gives accumulated round points to the active team, resets round points to 0 |
| **Reveal All** | Shows all remaining hidden answers (typically used at round end) |

### Manual Answer Reveal

Below the host controls are numbered buttons (1-8) to reveal specific answers directly. Use these when:
- A player says a correct answer verbally that didn't match when typed
- You want to show answers in a specific order
- The automatic matching didn't recognize a valid answer

You can also click directly on any answer row to reveal it.

## Scoring Strategy

**Typical round flow:**

1. Click **"New Round"** to start
2. Decide which team goes first (use **"Switch Team"** if needed)
3. Let players guess - correct answers reveal automatically
4. Wrong guesses add strikes automatically
5. After 3 strikes, click **"Switch Team"** - the other team gets one chance to steal
6. Click **"Award Points"** to give the round points to the winning team
7. Repeat for 5 rounds

**When to Award Points:**
- After 3 strikes, switch teams and let them try to steal with one guess
- If they get it right, award points to the stealing team
- If they miss, award points to the original team
- You can also award points at any time to end a round early

## Strike System

- 3 strikes and the round is over for that team
- After 3 strikes, a message appears: "3 strikes! Other team can steal!"
- Switch to the other team and give them one guess
- If they guess correctly, reveal that answer and any remaining answers
- Award points to whichever team deserves them

## Game End

- The game has 5 rounds total
- After awarding points in round 5, the winner screen appears automatically
- Shows final scores and declares the winner (or tie)
- Click **"PLAY AGAIN"** to return to the title screen

## Tips for Hosts

1. **Read questions aloud** - The question displays on screen but players may not see it
2. **Use verbal guessing** - Let players shout answers, then type them in or manually reveal
3. **Be flexible with matching** - Use manual reveal buttons for answers the system didn't catch
4. **Control the pace** - Use "Switch Team" to manage turn order, don't rely only on strikes
5. **Build suspense** - Reveal All at the end to show what answers were missed
6. **Prepare questions** - Use the question manager before the game to add relevant questions for your group
