# robot

This is a repository containing some experiments in the context of artificial intelligence for controlling a "robot". Everything is implemented in TypeScript and JavaScript for easy use in the web.

## Algorithms implemented

For now all the algorithms will be used in a partially observable environment. The agent will be similar to a mole, able to "smell" the location of the destination from a long distance, but only able to recognize obstacles in its immediate surroundings.
- [x] **Greedy:** the agent exclusively runs in the direction of the food.
- [x] **LRTA:** by using a variation of A*, the agent can keep track of where it has been and updates the heuristics accordingly. This algorithm is guaranteed to find the exit as long as there is a path to it.
