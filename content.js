// Main feed only disappears on home page

function hideFeedOnHomepage() {
  if (window.location.pathname === '/') {
    const feed = document.querySelector('ytd-rich-grid-renderer');
    if (feed) {
      feed.style.display = 'none';
      return true;
    }
  }
  return false;
}

if (!hideFeedOnHomepage()) {
  const observer = new MutationObserver(() => {
    if (hideFeedOnHomepage()) {
      observer.disconnect();
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}


// Comments toggle button
function addCommentsToggle() {
  if (window.location.pathname.startsWith('/watch')) {
    // Wait for comments section to load
    const checkComments = setInterval(() => {
      const comments = document.querySelector('#comments');
      if (comments && !document.querySelector('#youflow-toggle')) {
        // Create toggle button
        const button = document.createElement('button');
        button.id = 'youflow-toggle';
        button.textContent = 'Show Comments';
        button.style.cssText = 'padding: 8px 16px; margin: 10px 0; cursor: pointer;';
        
        // Insert before comments
        comments.parentNode.insertBefore(button, comments);
        
        // Hide comments by default
        comments.style.display = 'none';
        
        // Toggle on click
        button.addEventListener('click', () => {
          if (comments.style.display === 'none') {
            comments.style.display = 'block';
            button.textContent = 'Hide Comments';
          } else {
            comments.style.display = 'none';
            button.textContent = 'Show Comments';
          }
        });
        
        clearInterval(checkComments);
      }
    }, 500);
  }
}

addCommentsToggle();