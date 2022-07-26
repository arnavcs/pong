# Lissajous Curve Generator

## What is a Lissajous Curve?
Lissajous curves, also knows as Bowditch curves, are parametrically defined according to the following parametric equation:
$$x(t) = A \sin(at + \delta)$$
$$y(t) = B \sin(bt)$$

## How to use the Website?
The values of $A$ and $B$ are chosen automatically based on the size of the window. If the window is resized, refresh the page to change the values of $A$ and $B$.

The value of $\delta$ cannot be changed and will always be set to $0$.

The values of $a$ and $b$ are based on the relative position of the user's mouse on the window area. Move the mouse in order to change the values of $a$ and $b$.

# Pong
This program uses p5.js, a javascript library for graphics, in order to the game of pong. You can try it out at [arnavcs.github.io/pong](https://arnavcs.github.io/pong/).

## Game Controls
The `w` and `s` key move the left paddle up and down the screen respectively, and the `up arrow` and `down arrow` keys move the right paddle up and down the screen respectively.

## Game Window
Whenever the window is resized, refresh the page so that the program uses the correct window dimensions. This unfortunately means that the score of the current game will be reset.
