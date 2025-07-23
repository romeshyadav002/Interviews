 
## Stoplight with React and CSS
## Objective:
Create a stoplight component using React and CSS that can render both vertically and horizontally. The stoplight should have three lights: red, yellow, and green. Each light should follow a specific timing sequence:
• **Red light:** 2 seconds
• **Yellow light:** 0.5 seconds
• **Green light:** 1 second
The stoplight should automatically cycle through these lights in the specified order.
## Requirements:
### React Component:
• Implement a Stoplight component in React.
• The component should be able to render in both vertical and horizontal orientations based on a prop (orientation), which can be either "vertical" or "horizontal".
• The component should cycle through the lights in the following order:
    Red -> Green -> Yellow -> Red…
### CSS:
• Use CSS to style the stoplight in both orientations.
• Ensure that the layout adjusts correctly when switching between vertical and horizontal modes.
• The lights should be circles, and the inactive lights should be dimmed.
### Timing:
• Use React state and hooks to manage the timing and transitions between the lights.
• The red light should be active for 2 seconds, the green light for 1 second, and the yellow light for 0.5 seconds.
### Rendering:
• When the orientation prop is "vertical", the lights should stack on top of each other.
• When the orientation prop is "horizontal", the lights should be aligned side by side.
  
### Bonus:
• Add a button to toggle between the vertical and horizontal orientations.
• Implement unit tests for the Stoplight component to ensure the timing and transitions work correctly.
 