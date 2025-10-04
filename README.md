# Tailwinds Lightbox
## A simple drop-in lightbox solution for Tailwinds projects

I run a few sites that utilize Tailwinds and Markdown as part of a blog system, and got annoyed at not having a good lightbox implementation for any of them.

So, I built this.

## How to use

First off: I've commented the areas you'll want to adjust for your needs.. The code is short and simple, so it shouldn't be too hard to get it adapted to what you're looking to accomplish.

For something like a LAMP-stack site (Grav CMS, for example), you can just drop this in, update line 2 to give you a selector for the images, and include it in your regular flow. No other JS libraries required (just make sure your TW CSS builder knows to watch this file, obviously).

For a React project, you'll probably want to pull the function out and pop it into the necessary wrapper. As an example, I use this on a React + Next.JS site, and pasted it in the blog wrapper this way..

1. Replacing the initial function declaration (`function initializeLightbox() {`) with `const initializeLightbox = () => {`
2. Pasting the entire contents of that function declaration at the top (below all the imports) of the wrapper file's contents.
3. If it's not already there, importing `UseEffect` (like so: `import React, { useEffect } from "react";`).
4. Adding the necessary `UseEffect` code just before the return in my code for the wrapper, like below..

```js
const PostBody = ({ content }: Props) => {
    useEffect(() => {
        initializeLightbox();
    }, [])
    
    return (
    // Rest of your awesome code here here
    )
}
```

That's it.

Note that you may need to adjust some classes to be appropriate for your typography, layout etc. Again, I've got comments noting where those changes might need to happen.

Finally, no need to credit me, pay me, whatever, but I am not responsible for any damage done to your brain, code, or children by use of this code. I mean.. It's a lightbox, but you never know what could happen.