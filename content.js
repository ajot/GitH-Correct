// Function to replace specific text in a given DOM node
function replaceText(node) {
  // Check if the node is a text node
  if (node.nodeType === Node.TEXT_NODE) {
    // Replace all case-insensitive occurrences of 'github' with 'GitHub'
    node.textContent = node.textContent.replace(/github/gi, "GitHub");
    
    // Replace all case-insensitive occurrences of 'git hub' with 'GitHub'
    node.textContent = node.textContent.replace(/git\s+hub/gi, "GitHub");
  } else {
    // If it's not a text node, loop through its children
    node.childNodes.forEach(replaceText);
  }
}

// Create a new MutationObserver object
// This will observe changes to the DOM and run the specified callback function
const observer = new MutationObserver((mutations) => {
  // Loop through all detected mutations (changes)
  mutations.forEach((mutation) => {
    // Check if new nodes were added
    if (mutation.addedNodes.length) {
      // If so, loop through all new nodes and run the text replacement on each
      mutation.addedNodes.forEach(replaceText);
    }
  });
});

// Start observing the entire body of the document
// Configuration options specify that we want to observe
// both the addition of new child nodes and any changes to subtree nodes
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Run the text replacement function on the existing content of the page
// This handles all the text already present before the MutationObserver started
replaceText(document.body);
